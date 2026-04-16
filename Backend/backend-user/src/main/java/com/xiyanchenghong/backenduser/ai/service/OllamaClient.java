package com.xiyanchenghong.backenduser.ai.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xiyanchenghong.backenduser.ai.model.AiConversationMessage;
import com.xiyanchenghong.backenduser.ai.model.OllamaChatResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class OllamaClient {
    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private final String defaultModel;

    public OllamaClient(
            ObjectMapper objectMapper,
            @Value("${ollama.base-url:http://127.0.0.1:11434}") String baseUrl,
            @Value("${ollama.model:llama3}") String defaultModel
    ) {
        this.restClient = RestClient.builder().baseUrl(baseUrl).build();
        this.objectMapper = objectMapper;
        this.defaultModel = defaultModel;
    }

    public OllamaChatResult chat(List<AiConversationMessage> messages, List<Map<String, Object>> tools) {
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", defaultModel);
        requestBody.put("stream", false);
        requestBody.put("messages", buildMessages(messages));
        if (tools != null && !tools.isEmpty()) {
            requestBody.put("tools", tools);
        }

        JsonNode response = restClient.post()
                .uri("/api/chat")
                .contentType(MediaType.APPLICATION_JSON)
                .body(requestBody)
                .retrieve()
                .body(JsonNode.class);

        return parseResponse(response);
    }

    private List<Map<String, Object>> buildMessages(List<AiConversationMessage> messages) {
        List<Map<String, Object>> payload = new ArrayList<>();
        for (AiConversationMessage message : messages) {
            Map<String, Object> item = new HashMap<>();
            item.put("role", message.getRole());
            item.put("content", message.getContent());
            if (message.getToolName() != null && !message.getToolName().isBlank()) {
                item.put("name", message.getToolName());
            }
            if (message.getToolCalls() != null && !message.getToolCalls().isEmpty()) {
                List<Map<String, Object>> toolCalls = new ArrayList<>();
                for (AiConversationMessage.ToolCall toolCall : message.getToolCalls()) {
                    Map<String, Object> function = new HashMap<>();
                    function.put("name", toolCall.getName());
                    function.put("arguments", toolCall.getArguments());
                    Map<String, Object> call = new HashMap<>();
                    call.put("type", "function");
                    call.put("function", function);
                    toolCalls.add(call);
                }
                item.put("tool_calls", toolCalls);
            }
            payload.add(item);
        }
        return payload;
    }

    private OllamaChatResult parseResponse(JsonNode response) {
        OllamaChatResult result = new OllamaChatResult();
        JsonNode message = response.path("message");
        result.setContent(message.path("content").asText(""));
        JsonNode toolCalls = message.path("tool_calls");
        if (toolCalls.isArray()) {
            for (JsonNode toolCallNode : toolCalls) {
                JsonNode functionNode = toolCallNode.path("function");
                Map<String, Object> arguments = parseArguments(functionNode.path("arguments"));
                result.getToolCalls().add(new OllamaChatResult.ToolCall(
                        functionNode.path("name").asText(""),
                        arguments
                ));
            }
        }
        return result;
    }

    private Map<String, Object> parseArguments(JsonNode argumentsNode) {
        if (argumentsNode == null || argumentsNode.isMissingNode() || argumentsNode.isNull()) {
            return new HashMap<>();
        }
        try {
            if (argumentsNode.isObject()) {
                return objectMapper.convertValue(argumentsNode, new TypeReference<>() {});
            }
            if (argumentsNode.isTextual()) {
                String raw = argumentsNode.asText();
                if (raw == null || raw.isBlank()) {
                    return new HashMap<>();
                }
                return objectMapper.readValue(raw, new TypeReference<>() {});
            }
        } catch (JsonProcessingException ignored) {
        }
        return new HashMap<>();
    }
}
