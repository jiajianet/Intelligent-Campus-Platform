package com.xiyanchenghong.backenduser.ai.dto;

import java.util.List;

public class AiSessionHistoryResponse {
    private String sessionId;
    private List<HistoryMessageView> messages;

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
    public List<HistoryMessageView> getMessages() { return messages; }
    public void setMessages(List<HistoryMessageView> messages) { this.messages = messages; }
}
