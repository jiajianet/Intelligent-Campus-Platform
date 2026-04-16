package com.xiyanchenghong.backenduser.ai.model;

import java.util.List;

public class AiConversationMessage {
    private String role;
    private String content;
    private String toolName;
    private List<ToolCall> toolCalls;

    public AiConversationMessage() {}
    public AiConversationMessage(String role, String content) {
        this.role = role;
        this.content = content;
    }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getToolName() { return toolName; }
    public void setToolName(String toolName) { this.toolName = toolName; }
    public List<ToolCall> getToolCalls() { return toolCalls; }
    public void setToolCalls(List<ToolCall> toolCalls) { this.toolCalls = toolCalls; }

    public static class ToolCall {
        private String name;
        private java.util.Map<String, Object> arguments;

        public ToolCall() {}
        public ToolCall(String name, java.util.Map<String, Object> arguments) {
            this.name = name;
            this.arguments = arguments;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public java.util.Map<String, Object> getArguments() { return arguments; }
        public void setArguments(java.util.Map<String, Object> arguments) { this.arguments = arguments; }
    }
}
