package com.xiyanchenghong.backenduser.ai.model;

import com.xiyanchenghong.backenduser.ai.dto.ReferenceItem;
import com.xiyanchenghong.backenduser.ai.dto.ToolCallView;

import java.util.List;

public class AiChatResult {
    private String sessionId;
    private String assistantMessage;
    private String ttsText;
    private List<ToolCallView> toolCalls;
    private List<ReferenceItem> references;

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
    public String getAssistantMessage() { return assistantMessage; }
    public void setAssistantMessage(String assistantMessage) { this.assistantMessage = assistantMessage; }
    public String getTtsText() { return ttsText; }
    public void setTtsText(String ttsText) { this.ttsText = ttsText; }
    public List<ToolCallView> getToolCalls() { return toolCalls; }
    public void setToolCalls(List<ToolCallView> toolCalls) { this.toolCalls = toolCalls; }
    public List<ReferenceItem> getReferences() { return references; }
    public void setReferences(List<ReferenceItem> references) { this.references = references; }
}
