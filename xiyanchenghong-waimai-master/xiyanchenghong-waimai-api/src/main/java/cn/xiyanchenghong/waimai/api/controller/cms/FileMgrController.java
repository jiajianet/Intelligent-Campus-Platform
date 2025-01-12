package cn.xiyanchenghong.waimai.api.controller.cms;

import cn.xiyanchenghong.waimai.api.controller.BaseController;
import cn.xiyanchenghong.waimai.bean.constant.factory.PageFactory;
import cn.xiyanchenghong.waimai.bean.entity.system.FileInfo;
import cn.xiyanchenghong.waimai.bean.enumeration.Permission;
import cn.xiyanchenghong.waimai.bean.vo.front.Rets;
import cn.xiyanchenghong.waimai.bean.vo.query.SearchFilter;
import cn.xiyanchenghong.waimai.service.system.FileService;
import cn.xiyanchenghong.waimai.utils.StringUtils;
import cn.xiyanchenghong.waimai.utils.factory.Page;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fileMgr")
public class FileMgrController extends BaseController {

    @Autowired
    private FileService fileService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @RequiresPermissions(value = {Permission.FILE})
    public Object list(@RequestParam(required = false) String originalFileName
    ) {
        Page<FileInfo> page = new PageFactory<FileInfo>().defaultPage();
        if (StringUtils.isNotEmpty(originalFileName)) {
            page.addFilter(SearchFilter.build("originalFileName", SearchFilter.Operator.LIKE, originalFileName));
        }
        page = fileService.queryPage(page);
        return Rets.success(page);
    }
}
