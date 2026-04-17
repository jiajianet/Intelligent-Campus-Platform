package com.xiyanchenghong.backenduser.ai.model;

import java.util.ArrayList;
import java.util.List;

public class OllamaChatResult {
    private String content;
    private List<ToolCall> toolCalls = new ArrayList<>();

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
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
