package cn.xiyanchenghong.waimai.api.controller.front.officialsite;

import cn.xiyanchenghong.waimai.api.controller.BaseController;
import cn.xiyanchenghong.waimai.bean.entity.cms.Article;
import cn.xiyanchenghong.waimai.bean.enumeration.cms.BannerTypeEnum;
import cn.xiyanchenghong.waimai.bean.enumeration.cms.ChannelEnum;
import cn.xiyanchenghong.waimai.bean.vo.front.Rets;
import cn.xiyanchenghong.waimai.bean.vo.offcialsite.BannerVo;
import cn.xiyanchenghong.waimai.bean.vo.offcialsite.Solution;
import cn.xiyanchenghong.waimai.service.cms.ArticleService;
import cn.xiyanchenghong.waimai.service.cms.BannerService;
import cn.xiyanchenghong.waimai.utils.Maps;
import cn.xiyanchenghong.waimai.utils.factory.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/offcialsite/solution")
public class SolutionController extends BaseController {
    @Autowired
    private BannerService bannerService;
    @Autowired
    private ArticleService articleService;

    @RequestMapping(method = RequestMethod.GET)
    public Object index() {
        Map<String, Object> dataMap =  Maps.newHashMap();

        BannerVo banner = bannerService.queryBanner(BannerTypeEnum.SOLUTION.getValue());
        dataMap.put("banner", banner);

        List<Solution> solutions = new ArrayList<>();
        Page<Article> articlePage = articleService.query(1, 10, ChannelEnum.SOLUTION.getId());
        for (Article article : articlePage.getRecords()) {
            solutions.add(new Solution(article.getId(), article.getTitle(), article.getImg()));
        }
        dataMap.put("solutionList", solutions);

        Map map =  Maps.newHashMap("data",dataMap);
        return Rets.success(map);

    }
}
