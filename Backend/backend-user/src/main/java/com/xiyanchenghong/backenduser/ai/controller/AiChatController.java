package com.xiyanchenghong.backenduser.ai.controller;

import com.xiyanchenghong.backenduser.ai.dto.*;
import com.xiyanchenghong.backenduser.ai.service.AiChatService;
import com.xiyanchenghong.backenduser.utils.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/ai")
public class AiChatController {
    private static final Logger log = LoggerFactory.getLogger(AiChatController.class);
    private final AiChatService aiChatService;

    public AiChatController(AiChatService aiChatService) {
        this.aiChatService = aiChatService;
    }

    @PostMapping("/chat")
    public ResponseEntity<Result<AiChatResponse>> chat(@RequestBody AiChatRequest request) {
        try {
            AiChatResponse response = aiChatService.chat(request);
            return ResponseEntity.ok(Result.success(response, "OK"));
        } catch (Exception e) {
            log.error("AI 对话失败，请求内容: {}, 异常信息: ", request, e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(Result.error(500, "AI 服务暂时不可用，请稍后重试"));
        }
    }

    @GetMapping("/session/{sessionId}/history")
    public ResponseEntity<Result<AiSessionHistoryResponse>> history(@PathVariable String sessionId) {
        return ResponseEntity.ok(Result.success(aiChatService.getSessionHistory(sessionId), "OK"));
    }

    @GetMapping("/tools/schema")
    public ResponseEntity<Result<Object>> toolSchema() {
        return ResponseEntity.ok(Result.success(aiChatService.getToolSchema(), "OK"));
    }
}
