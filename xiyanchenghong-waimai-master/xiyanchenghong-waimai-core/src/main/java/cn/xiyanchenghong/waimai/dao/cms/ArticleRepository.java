
package cn.xiyanchenghong.waimai.dao.cms;

import cn.xiyanchenghong.waimai.bean.entity.cms.Article;
import cn.xiyanchenghong.waimai.dao.BaseRepository;

import java.util.List;

public interface ArticleRepository extends BaseRepository<Article,Long> {
    /**
     * 查询指定栏目下所有文章列表
     * @param idChannel
     * @return
     */
    List<Article> findAllByIdChannel(Long idChannel);
}
