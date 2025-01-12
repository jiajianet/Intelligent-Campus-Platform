package cn.xiyanchenghong.waimai.dao.message;


import cn.xiyanchenghong.waimai.bean.entity.message.MessageTemplate;
import cn.xiyanchenghong.waimai.dao.BaseRepository;

import java.util.List;


public interface MessagetemplateRepository extends BaseRepository<MessageTemplate,Long> {
    MessageTemplate findByCode(String code);

    List<MessageTemplate> findByIdMessageSender(Long idMessageSender);
}

