package cn.xiyanchenghong.waimai.api.controller.cms;

import cn.xiyanchenghong.waimai.api.controller.BaseController;
import cn.xiyanchenghong.waimai.bean.core.BussinessLog;
import cn.xiyanchenghong.waimai.bean.dictmap.CommonDict;
import cn.xiyanchenghong.waimai.bean.entity.cms.Banner;
import cn.xiyanchenghong.waimai.bean.enumeration.Permission;
import cn.xiyanchenghong.waimai.bean.vo.front.Rets;
import cn.xiyanchenghong.waimai.bean.vo.query.SearchFilter;
import cn.xiyanchenghong.waimai.service.cms.BannerService;
import cn.xiyanchenghong.waimai.utils.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * banner管理
 */
@RestController
@RequestMapping("/banner")
public class BannerMgrController extends BaseController {
    @Autowired
    private BannerService bannerService;

    @RequestMapping(method = RequestMethod.POST)
    @BussinessLog(value = "编辑banner", key = "title", dict = CommonDict.class)
    @RequiresPermissions(value = {Permission.BANNER_EDIT})
    public Object save(@ModelAttribute @Valid Banner banner) {
        if(banner.getId()==null){
            bannerService.insert(banner);
        }else {
            bannerService.update(banner);
        }
        return Rets.success();
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @BussinessLog(value = "删除banner", key = "id", dict = CommonDict.class)
    @RequiresPermissions(value = {Permission.BANNER_DEL})
    public Object remove(Long id) {
        bannerService.delete(id);
        return Rets.success();
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @RequiresPermissions(value = {Permission.BANNER})
    public Object list(@RequestParam(required = false) String title) {
        SearchFilter filter = null;
        if(StringUtils.isNotEmpty(title)){
             filter =  SearchFilter.build("title", SearchFilter.Operator.LIKE,title);
        }
        List<Banner> list = bannerService.queryAll(filter);
        return Rets.success(list);
    }
}
