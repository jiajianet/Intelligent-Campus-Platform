package cn.xiyanchenghong.waimai.api.controller.cms;

import cn.xiyanchenghong.waimai.api.controller.BaseController;
import cn.xiyanchenghong.waimai.bean.constant.factory.PageFactory;
import cn.xiyanchenghong.waimai.bean.entity.cms.Contacts;
import cn.xiyanchenghong.waimai.bean.enumeration.Permission;
import cn.xiyanchenghong.waimai.bean.vo.front.Rets;
import cn.xiyanchenghong.waimai.bean.vo.query.SearchFilter;
import cn.xiyanchenghong.waimai.service.cms.ContactsService;
import cn.xiyanchenghong.waimai.utils.DateUtil;
import cn.xiyanchenghong.waimai.utils.factory.Page;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 邀约信息管理
 */
@RestController
@RequestMapping("/contacts")
public class ContactsController extends BaseController {
    @Autowired
    private ContactsService contactsService;
    @RequestMapping(value = "/list",method = RequestMethod.GET)
    @RequiresPermissions(value = {Permission.CONTACTS})
    public Object list(@RequestParam(required = false) String userName,
                       @RequestParam(required = false) String mobile,
                       @RequestParam(required = false) String startDate,
                       @RequestParam(required = false) String endDate

    ) {
        Page<Contacts> page = new PageFactory<Contacts>().defaultPage();
        page.addFilter("createTime", SearchFilter.Operator.GTE, DateUtil.parse(startDate,"yyyyMMddHHmmss"));
        page.addFilter("createTime", SearchFilter.Operator.LTE, DateUtil.parse(endDate,"yyyyMMddHHmmss"));
        page.addFilter("userName", SearchFilter.Operator.EQ,userName);
        page.addFilter("mobile", SearchFilter.Operator.EQ,mobile);
        page = contactsService.queryPage(page);
        return Rets.success(page);
    }
}
