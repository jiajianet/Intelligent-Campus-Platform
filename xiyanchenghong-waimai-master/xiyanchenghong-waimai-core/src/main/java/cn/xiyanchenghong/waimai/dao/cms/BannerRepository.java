
package cn.xiyanchenghong.waimai.dao.cms;

import cn.xiyanchenghong.waimai.bean.entity.cms.Banner;
import cn.xiyanchenghong.waimai.dao.BaseRepository;

import java.util.List;

public interface BannerRepository extends BaseRepository<Banner,Long> {
    /**
     * 查询指定类别的banner列表
     * @param type
     * @return
     */
    List<Banner> findAllByType(String type);
}
