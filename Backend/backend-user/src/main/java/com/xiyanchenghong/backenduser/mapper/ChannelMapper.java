package com.xiyanchenghong.backenduser.mapper;

import com.xiyanchenghong.backenduser.domain.Channel;
import org.apache.ibatis.annotations.*;
import java.util.List;
@Mapper
public interface ChannelMapper {

    Channel getChannelById(Integer id);

    List<Channel> getAllChannels();

    void insertChannel(Channel channel);

    void updateChannel(Channel channel);

    void deleteChannel(Integer id);
}