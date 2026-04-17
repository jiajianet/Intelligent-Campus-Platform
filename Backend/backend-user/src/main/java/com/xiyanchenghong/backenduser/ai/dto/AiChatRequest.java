package com.xiyanchenghong.backenduser.ai.dto;

import java.util.Map;

public class AiChatRequest {
    private String sessionId;
    private String message;
    private String mode;
    private Map<String, Object> pageContext;

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }
    public Map<String, Object> getPageContext() { return pageContext; }
    public void setPageContext(Map<String, Object> pageContext) { this.pageContext = pageContext; }
}
