package cn.xiyanchenghong.waimai.api.controller.cms;

import cn.xiyanchenghong.waimai.api.controller.BaseController;
import cn.xiyanchenghong.waimai.bean.core.BussinessLog;
import cn.xiyanchenghong.waimai.bean.dictmap.CommonDict;
import cn.xiyanchenghong.waimai.bean.entity.cms.Channel;
import cn.xiyanchenghong.waimai.bean.enumeration.Permission;
import cn.xiyanchenghong.waimai.bean.vo.front.Rets;
import cn.xiyanchenghong.waimai.service.cms.ChannelService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

/**
 * 栏目管理
 */
@RestController
@RequestMapping("/channel")
public class ChannelMgrController extends BaseController {
    @Autowired
    private ChannelService channelService;

    @RequestMapping(method = RequestMethod.POST)
    @BussinessLog(value = "编辑栏目", key = "name", dict = CommonDict.class)
    @RequiresPermissions(value = {Permission.CHANNEL_EDIT})
    public Object save(@ModelAttribute @Valid Channel channel) {
        if(channel.getId()==null){
            channelService.insert(channel);
        }else{
            channelService.update(channel);
        }
        return Rets.success();
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @BussinessLog(value = "删除栏目", key = "id", dict = CommonDict.class)
    @RequiresPermissions(value = {Permission.CHANNEL_DEL})
    public Object remove(Long id) {
        channelService.delete(id);
        return Rets.success();
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @RequiresPermissions(value = {Permission.CHANNEL})
    public Object list() {
        List<Channel> list = channelService.queryAll();
        return Rets.success(list);
    }
}
