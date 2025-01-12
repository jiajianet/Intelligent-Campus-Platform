package cn.xiyanchenghong.waimai.service.system;

import cn.xiyanchenghong.waimai.bean.entity.system.Notice;
import cn.xiyanchenghong.waimai.dao.system.NoticeRepository;
import cn.xiyanchenghong.waimai.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * descript
 *
 */
@Service
public class NoticeService extends BaseService<Notice,Long, NoticeRepository> {
    @Autowired
    private NoticeRepository noticeRepository;
    public List<Notice> findByTitleLike(String title) {
        return noticeRepository.findByTitleLike("%"+title+"%");
    }
}
