package cn.xiyanchenghong.waimai.service.cms;

import cn.xiyanchenghong.waimai.bean.entity.cms.Article;
import cn.xiyanchenghong.waimai.bean.enumeration.cms.ChannelEnum;
import cn.xiyanchenghong.waimai.bean.vo.query.SearchFilter;
import cn.xiyanchenghong.waimai.dao.cms.ArticleRepository;
import cn.xiyanchenghong.waimai.service.BaseService;
import cn.xiyanchenghong.waimai.utils.factory.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService extends BaseService<Article, Long, ArticleRepository> {
    @Autowired
    private ArticleRepository articleRepository;

    /**
     * 查询首页最近5条资讯数据
     *
     * @return
     */
    public List<Article> queryIndexNews() {
        Page<Article> page = query(1, 5, ChannelEnum.NEWS.getId());
        return page.getRecords();
    }

    public Page<Article> query(int currentPage, int size, Long idChannel) {
        Page page = new Page(currentPage, size, "id");
        page.addFilter(SearchFilter.build("idChannel", SearchFilter.Operator.EQ, idChannel));
        return queryPage(page);

    }
}
