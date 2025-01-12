package cn.xiyanchenghong.waimai.dao.system;


import cn.xiyanchenghong.waimai.bean.entity.system.Notice;
import cn.xiyanchenghong.waimai.dao.BaseRepository;

import java.util.List;

/**
 *
 *@Author xiyanchenghong
 */
public interface NoticeRepository extends BaseRepository<Notice,Long> {
    List<Notice> findByTitleLike(String name);
}
