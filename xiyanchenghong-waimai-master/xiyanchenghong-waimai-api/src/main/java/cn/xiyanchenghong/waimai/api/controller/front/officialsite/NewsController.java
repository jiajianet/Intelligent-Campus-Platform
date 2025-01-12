package cn.xiyanchenghong.waimai.api.controller.front.officialsite;

import cn.xiyanchenghong.waimai.api.controller.BaseController;
import cn.xiyanchenghong.waimai.bean.entity.cms.Article;
import cn.xiyanchenghong.waimai.bean.enumeration.cms.BannerTypeEnum;
import cn.xiyanchenghong.waimai.bean.enumeration.cms.ChannelEnum;
import cn.xiyanchenghong.waimai.bean.vo.front.Rets;
import cn.xiyanchenghong.waimai.bean.vo.offcialsite.BannerVo;
import cn.xiyanchenghong.waimai.bean.vo.offcialsite.News;
import cn.xiyanchenghong.waimai.service.cms.ArticleService;
import cn.xiyanchenghong.waimai.service.cms.BannerService;
import cn.xiyanchenghong.waimai.utils.factory.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/offcialsite/news")
public class NewsController extends BaseController {
    @Autowired
    private BannerService bannerService;
    @Autowired
    private ArticleService articleService;

    @RequestMapping(method = RequestMethod.GET)
    public Object list() {
        Map<String, Object> dataMap = new HashMap<>(10);
        BannerVo banner = bannerService.queryBanner(BannerTypeEnum.NEWS.getValue());
        dataMap.put("banner", banner);

        List<News> newsList = new ArrayList<>();
        Page<Article> articlePage = articleService.query(1, 10, ChannelEnum.NEWS.getId());

        for (cn.xiyanchenghong.waimai.bean.entity.cms.Article article : articlePage.getRecords()) {
            News news = new News();
            news.setDesc(article.getTitle());
            news.setUrl("/article?id=" + article.getId());
            news.setSrc("static/images/icon/user.png");
            newsList.add(news);
        }

        dataMap.put("list", newsList);

        Map map = new HashMap(2);

        map.put("data", dataMap);
        return Rets.success(map);

    }
}
