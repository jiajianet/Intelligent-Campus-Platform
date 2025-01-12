package cn.xiyanchenghong.waimai.dao.message;


import cn.xiyanchenghong.waimai.bean.entity.message.Message;
import cn.xiyanchenghong.waimai.dao.BaseRepository;

import java.util.ArrayList;


public interface MessageRepository extends BaseRepository<Message,Long> {
    void deleteAllByIdIn(ArrayList<String> list);
}

