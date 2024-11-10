package com.xiyanchenghong.backenduser.controller;

import com.xiyanchenghong.backenduser.service.serviceImpl.EmailService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @Resource
    private EmailService emailService;
//    @Autowired
    @GetMapping("/testEmail")
    public String testEmail() {
        emailService.sendEmail("recipient@example.com", "Test Email", "This is a test email.");
        return "Email sent successfully";
    }
}
