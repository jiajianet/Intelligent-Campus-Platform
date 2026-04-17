package com.xiyanchenghong.backenduser.ai.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xiyanchenghong.backenduser.ai.dto.*;
import com.xiyanchenghong.backenduser.ai.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class AiChatService {
    private static final Logger log = LoggerFactory.getLogger(AiChatService.class);
    private static final int MAX_CONTEXT_MESSAGES = 12;
    private static final int MAX_TOOL_ROUNDS = 3;

    private final ConcurrentHashMap<String, List<AiConversationMessage>> sessions = new ConcurrentHashMap<>();
    private final OllamaClient ollamaClient;
    private final AiToolDispatcher toolDispatcher;
    private final ObjectMapper objectMapper;

    public AiChatService(OllamaClient ollamaClient, AiToolDispatcher toolDispatcher, ObjectMapper objectMapper) {
        this.ollamaClient = ollamaClient;
        this.toolDispatcher = toolDispatcher;
        this.objectMapper = objectMapper;
    }

    public AiChatResponse chat(AiChatRequest request) {
        validateRequest(request);
        AiChatResult result = runConversation(request);
        AiChatResponse response = new AiChatResponse();
        response.setSessionId(result.getSessionId());
        response.setAssistantMessage(result.getAssistantMessage());
        response.setTtsText(result.getTtsText());
        response.setToolCalls(result.getToolCalls());
        response.setReferences(result.getReferences());
        return response;
    }

    public AiSessionHistoryResponse getSessionHistory(String sessionId) {
        AiSessionHistoryResponse response = new AiSessionHistoryResponse();
        response.setSessionId(sessionId);
        List<AiConversationMessage> messages = sessions.getOrDefault(sessionId, Collections.emptyList());
        response.setMessages(messages.stream()
                .filter(message -> "user".equals(message.getRole()) || "assistant".equals(message.getRole()))
                .map(message -> new HistoryMessageView(message.getRole(), message.getContent()))
                .collect(Collectors.toList()));
        return response;
    }

    public List<Map<String, Object>> getToolSchema() {
        return toolDispatcher.getToolSchema();
    }

    private AiChatResult runConversation(AiChatRequest request) {
        String sessionId = request.getSessionId();
        if (sessionId == null || sessionId.isBlank()) {
            sessionId = UUID.randomUUID().toString();
        }

        List<AiConversationMessage> sessionMessages = sessions.computeIfAbsent(sessionId, key -> new ArrayList<>());
        List<AiConversationMessage> workingMessages = new ArrayList<>();
        workingMessages.add(systemMessage(buildSystemPrompt(request)));
        workingMessages.addAll(trimContext(sessionMessages));
        workingMessages.add(new AiConversationMessage("user", request.getMessage().trim()));

        List<AiToolExecutionResult> toolResults = new ArrayList<>();
        String assistantContent = "";

        for (int i = 0; i < MAX_TOOL_ROUNDS; i++) {
            OllamaChatResult ollamaResult = ollamaClient.chat(workingMessages, toolDispatcher.getToolSchema());
            if (ollamaResult.getToolCalls() == null || ollamaResult.getToolCalls().isEmpty()) {
                assistantContent = fallbackAssistantContent(ollamaResult.getContent(), toolResults);
                workingMessages.add(new AiConversationMessage("assistant", assistantContent));
                updateSession(sessionMessages, request.getMessage().trim(), assistantContent);
                return toChatResult(sessionId, assistantContent, toolResults);
            }

            AiConversationMessage assistantToolMessage = new AiConversationMessage("assistant", normalizeContent(ollamaResult.getContent()));
            assistantToolMessage.setToolCalls(ollamaResult.getToolCalls().stream()
                    .map(call -> new AiConversationMessage.ToolCall(call.getName(), call.getArguments()))
                    .collect(Collectors.toList()));
            workingMessages.add(assistantToolMessage);

            for (OllamaChatResult.ToolCall toolCall : ollamaResult.getToolCalls()) {
                AiToolExecutionResult toolResult;
                try {
                    toolResult = toolDispatcher.execute(toolCall.getName(), toolCall.getArguments());
                } catch (Exception ex) {
                    toolResult = new AiToolExecutionResult();
                    toolResult.setSuccess(false);
                    toolResult.setToolName(toolCall.getName());
                    toolResult.setSummary(ex.getMessage());
                    toolResult.setData(Map.of());
                }
                toolResults.add(toolResult);

                AiConversationMessage toolMessage = new AiConversationMessage("tool", toolDispatcher.serializeForToolMessage(toolResult));
                toolMessage.setToolName(toolCall.getName());
                workingMessages.add(toolMessage);
            }
        }

        assistantContent = fallbackAssistantContent("", toolResults);
        updateSession(sessionMessages, request.getMessage().trim(), assistantContent);
        return toChatResult(sessionId, assistantContent, toolResults);
    }

    private AiChatResult toChatResult(String sessionId, String assistantContent, List<AiToolExecutionResult> toolResults) {
        AiChatResult result = new AiChatResult();
        result.setSessionId(sessionId);
        result.setAssistantMessage(assistantContent);
        result.setTtsText(assistantContent);
        result.setToolCalls(toolResults.stream().map(AiToolExecutionResult::toView).collect(Collectors.toList()));
        LinkedHashMap<String, ReferenceItem> referenceMap = new LinkedHashMap<>();
        toolResults.stream()
                .flatMap(toolResult -> toolResult.getReferences().stream())
                .forEach(reference -> referenceMap.putIfAbsent(
                        reference.getType() + ":" + reference.getId(),
                        reference
                ));
        result.setReferences(new ArrayList<>(referenceMap.values()));
        return result;
    }

    private void validateRequest(AiChatRequest request) {
        if (request == null || request.getMessage() == null || request.getMessage().isBlank()) {
            throw new IllegalArgumentException("message 不能为空。");
        }
    }

    private AiConversationMessage systemMessage(String content) {
        return new AiConversationMessage("system", content);
    }

    private List<AiConversationMessage> trimContext(List<AiConversationMessage> sessionMessages) {
        if (sessionMessages.size() <= MAX_CONTEXT_MESSAGES) {
            return new ArrayList<>(sessionMessages);
        }
        return new ArrayList<>(sessionMessages.subList(sessionMessages.size() - MAX_CONTEXT_MESSAGES, sessionMessages.size()));
    }

    private void updateSession(List<AiConversationMessage> sessionMessages, String userMessage, String assistantMessage) {
        sessionMessages.add(new AiConversationMessage("user", userMessage));
        sessionMessages.add(new AiConversationMessage("assistant", assistantMessage));
        if (sessionMessages.size() > MAX_CONTEXT_MESSAGES) {
            int removeCount = sessionMessages.size() - MAX_CONTEXT_MESSAGES;
            sessionMessages.subList(0, removeCount).clear();
        }
    }

    private String buildSystemPrompt(AiChatRequest request) {
        String pageContextJson = serializePageContext(request.getPageContext());
        return """
                你是智慧校园文章管理后台的 AI 助手。

                ## 角色能力
                - 只回答与智慧校园文章管理系统相关的问题
                - 可以查询文章数据、频道信息、统计信息等
                - 优先调用工具获取数据，不要臆造数据库内容

                ## 限制
                - 只能使用**只读**工具，不能执行新增、修改、删除、发布等写操作
                - 当用户请求写操作时，明确拒绝并说明当前助手只支持只读查询

                ## 输出格式
                - 回答要简洁、准确，优先使用中文
                - 可以使用 Markdown 格式美化输出（如标题、列表、表格等）
                - 若工具无结果，要明确说明

                当前页面上下文：""" + pageContextJson;
    }

    private String serializePageContext(Map<String, Object> pageContext) {
        if (pageContext == null || pageContext.isEmpty()) {
            return "{}";
        }
        try {
            return objectMapper.writeValueAsString(pageContext);
        } catch (JsonProcessingException e) {
            return "{}";
        }
    }

    private String fallbackAssistantContent(String content, List<AiToolExecutionResult> toolResults) {
        String normalized = normalizeContent(content);
        if (!normalized.isBlank()) {
            return normalized;
        }
        if (!toolResults.isEmpty()) {
            return toolResults.get(toolResults.size() - 1).getSummary();
        }
        return "我暂时没有拿到可用结果，请稍后重试。";
    }

    private String normalizeContent(String content) {
        return content == null ? "" : content.trim();
    }
}
