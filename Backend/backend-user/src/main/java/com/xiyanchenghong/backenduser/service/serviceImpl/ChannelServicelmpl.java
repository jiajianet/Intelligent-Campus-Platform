package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.Channel;
import com.xiyanchenghong.backenduser.repository.ChannelRepository;
import com.xiyanchenghong.backenduser.service.ChannelService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChannelServicelmpl implements ChannelService {
    private final ChannelRepository channelRepository;

    public ChannelServicelmpl(ChannelRepository channelRepository) {
        this.channelRepository = channelRepository;
    }

    public List<Channel> getChannels() {
        // 从数据库获取所有频道
        return channelRepository.findAll();
    }
}
