package cn.xiyanchenghong.waimai.api.controller.system;

import cn.xiyanchenghong.waimai.api.controller.BaseController;
import cn.xiyanchenghong.waimai.bean.core.BussinessLog;
import cn.xiyanchenghong.waimai.bean.dictmap.DictMap;
import cn.xiyanchenghong.waimai.bean.entity.system.Dict;
import cn.xiyanchenghong.waimai.bean.enumeration.BizExceptionEnum;
import cn.xiyanchenghong.waimai.bean.enumeration.Permission;
import cn.xiyanchenghong.waimai.bean.exception.ApplicationException;
import cn.xiyanchenghong.waimai.bean.vo.front.Rets;
import cn.xiyanchenghong.waimai.service.system.DictService;
import cn.xiyanchenghong.waimai.utils.BeanUtil;
import cn.xiyanchenghong.waimai.utils.StringUtils;
import cn.xiyanchenghong.waimai.utils.ToolUtil;
import cn.xiyanchenghong.waimai.warpper.DictWarpper;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * DictController
 *
 *@Author xiyanchenghong
 */
@RestController
@RequestMapping("/dict")
public class DictController extends BaseController {
    @Autowired
    private DictService dictService;

    /**
     * 获取所有字典列表
     */
    @RequestMapping(value = "/list",method = RequestMethod.GET)
    @RequiresPermissions(value = {Permission.DICT})
    public Object list(String name) {

        if(StringUtils.isNotEmpty(name)){
            List<Dict> list = dictService.findByNameLike(name);
            return Rets.success(new DictWarpper(BeanUtil.objectsToMaps(list)).warp());
        }
        List<Dict> list = dictService.findByPid(0L);
        return Rets.success(new DictWarpper(BeanUtil.objectsToMaps(list)).warp());
    }

    @RequestMapping(method = RequestMethod.POST)
    @BussinessLog(value = "添加字典", key = "dictName",dict=DictMap.class)
    @RequiresPermissions(value = {Permission.DICT_EDIT})
    public Object add(String dictName, String dictValues) {
        if (ToolUtil.isOneEmpty(dictName, dictValues)) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }
        dictService.addDict(dictName, dictValues);
        return Rets.success();
    }

    @RequestMapping(method = RequestMethod.PUT)
    @BussinessLog(value = "修改字典", key = "dictName",dict=DictMap.class)
    @RequiresPermissions(value = {Permission.DICT_EDIT})
    public Object update(Long id,String dictName, String dictValues) {
        if (ToolUtil.isOneEmpty(dictName, dictValues)) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }
        dictService.editDict(id,dictName, dictValues);
        return Rets.success();
    }


    @RequestMapping(method = RequestMethod.DELETE)
    @BussinessLog(value = "删除字典", key = "id",dict=DictMap.class)
    @RequiresPermissions(value = {Permission.DICT_EDIT})
    public Object delete(@RequestParam Long id) {
        dictService.delteDict(id);
        return Rets.success();
    }

}
