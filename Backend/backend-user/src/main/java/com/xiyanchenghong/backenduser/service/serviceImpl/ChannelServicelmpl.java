package com.xiyanchenghong.backenduser.service.serviceImpl;

import com.xiyanchenghong.backenduser.domain.Channel;
import com.xiyanchenghong.backenduser.mapper.ChannelMapper;
import com.xiyanchenghong.backenduser.service.ChannelService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChannelServicelmpl implements ChannelService {
    private final ChannelMapper channelMapper;

    public ChannelServicelmpl(ChannelMapper channelMapper) {
        this.channelMapper = channelMapper;
    }

    public List<Channel> getChannels() {
        // 从数据库获取所有频道
        return channelMapper.getAllChannels();
    }
}