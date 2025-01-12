package cn.xiyanchenghong.waimai.service.cms;

import cn.xiyanchenghong.waimai.bean.entity.cms.Contacts;
import cn.xiyanchenghong.waimai.dao.cms.ContactsRepository;
import cn.xiyanchenghong.waimai.service.BaseService;
import org.springframework.stereotype.Service;

@Service
public class ContactsService extends BaseService<Contacts,Long,ContactsRepository> {
}
