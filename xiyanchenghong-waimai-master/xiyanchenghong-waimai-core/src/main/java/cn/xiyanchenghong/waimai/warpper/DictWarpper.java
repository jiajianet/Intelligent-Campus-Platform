package cn.xiyanchenghong.waimai.warpper;

import cn.xiyanchenghong.waimai.bean.entity.system.Dict;
import cn.xiyanchenghong.waimai.service.system.impl.ConstantFactory;
import cn.xiyanchenghong.waimai.utils.ToolUtil;

import java.util.List;
import java.util.Map;

/**
 * 字典列表的包装
 *
 */
public class DictWarpper extends BaseControllerWarpper {

    public DictWarpper(Object list) {
        super(list);
    }

    @Override
    public void warpTheMap(Map<String, Object> map) {
        StringBuffer detail = new StringBuffer();
        Long id = (Long) map.get("id");
        List<Dict> dicts = ConstantFactory.me().findInDict(id);
        if(dicts != null){
            for (Dict dict : dicts) {
                detail.append(dict.getNum() + ":" +dict.getName() + ",");
            }
            map.put("detail", ToolUtil.removeSuffix(detail.toString(),","));
        }
    }

}
