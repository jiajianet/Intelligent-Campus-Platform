package com.xiyanchenghong.backenduser.controller;


import com.xiyanchenghong.backenduser.domain.Channel;
import com.xiyanchenghong.backenduser.service.ChannelService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class ChannelController {

    private final ChannelService channelService;

    public ChannelController(ChannelService channelService) {
        this.channelService = channelService;
    }

    @GetMapping("/channels")
    public List<Channel> getChannels() {
        return channelService.getChannels();
    }
}
