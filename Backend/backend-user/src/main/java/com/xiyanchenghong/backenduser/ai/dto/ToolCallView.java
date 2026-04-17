package com.xiyanchenghong.backenduser.ai.dto;

public class ToolCallView {
    private String toolName;
    private String summary;
    private boolean success;

    public ToolCallView() {}
    public ToolCallView(String toolName, String summary, boolean success) {
        this.toolName = toolName;
        this.summary = summary;
        this.success = success;
    }

    public String getToolName() { return toolName; }
    public void setToolName(String toolName) { this.toolName = toolName; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
}
