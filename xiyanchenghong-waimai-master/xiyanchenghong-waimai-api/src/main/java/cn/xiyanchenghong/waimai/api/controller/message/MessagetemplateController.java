package cn.xiyanchenghong.waimai.api.controller.message;

import cn.xiyanchenghong.waimai.bean.constant.factory.PageFactory;
import cn.xiyanchenghong.waimai.bean.core.BussinessLog;
import cn.xiyanchenghong.waimai.bean.dictmap.CommonDict;
import cn.xiyanchenghong.waimai.bean.entity.message.MessageTemplate;
import cn.xiyanchenghong.waimai.bean.enumeration.BizExceptionEnum;
import cn.xiyanchenghong.waimai.bean.enumeration.Permission;
import cn.xiyanchenghong.waimai.bean.exception.ApplicationException;
import cn.xiyanchenghong.waimai.bean.vo.front.Rets;
import cn.xiyanchenghong.waimai.service.message.MessagetemplateService;
import cn.xiyanchenghong.waimai.utils.ToolUtil;
import cn.xiyanchenghong.waimai.utils.factory.Page;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/message/template")
public class MessagetemplateController {
    @Autowired
    private MessagetemplateService messagetemplateService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @RequiresPermissions(value = {Permission.MSG_TPL})
    public Object list() {
        Page<MessageTemplate> page = new PageFactory<MessageTemplate>().defaultPage();
        page = messagetemplateService.queryPage(page);
        page.setRecords(page.getRecords());
        return Rets.success(page);
    }

    @RequestMapping(method = RequestMethod.POST)
    @BussinessLog(value = "编辑消息模板", key = "name", dict = CommonDict.class)
    @RequiresPermissions(value = {Permission.MSG_TPL_EDIT})
    public Object save(@ModelAttribute @Valid MessageTemplate tMessageTemplate) {
        if(tMessageTemplate.getId()!=null)
        {
            messagetemplateService.update(tMessageTemplate);
        }else{
            messagetemplateService.insert(tMessageTemplate);
        }
        return Rets.success();
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @BussinessLog(value = "删除消息模板", key = "id", dict = CommonDict.class)
    @RequiresPermissions(value = {Permission.MSG_TPL_DEL})
    public Object remove(Long id) {
        if (ToolUtil.isEmpty(id)) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }
        messagetemplateService.delete(id);
        return Rets.success();
    }
}