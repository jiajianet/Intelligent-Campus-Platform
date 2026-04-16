package com.xiyanchenghong.backenduser.ai.model;

import com.xiyanchenghong.backenduser.ai.dto.ReferenceItem;
import com.xiyanchenghong.backenduser.ai.dto.ToolCallView;

import java.util.List;
import java.util.Map;

public class AiToolExecutionResult {
    private String toolName;
    private boolean success;
    private String summary;
    private Map<String, Object> data;
    private List<ReferenceItem> references;

    public String getToolName() { return toolName; }
    public void setToolName(String toolName) { this.toolName = toolName; }
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public Map<String, Object> getData() { return data; }
    public void setData(Map<String, Object> data) { this.data = data; }
    public List<ReferenceItem> getReferences() { return references; }
    public void setReferences(List<ReferenceItem> references) { this.references = references; }

    public ToolCallView toView() {
        return new ToolCallView(toolName, summary, success);
    }
}
