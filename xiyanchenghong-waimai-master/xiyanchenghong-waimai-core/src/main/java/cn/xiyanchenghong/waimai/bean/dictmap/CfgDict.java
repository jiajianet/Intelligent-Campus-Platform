package cn.xiyanchenghong.waimai.bean.dictmap;

import cn.xiyanchenghong.waimai.bean.dictmap.base.AbstractDictMap;

/**
 * 字典map
 *
 * @Author xiyanchenghong
 */
public class CfgDict extends AbstractDictMap {

    @Override
    public void init() {
        put("id","参数id");
        put("cfgName","参数名称");
        put("cfgDesc","备注");
    }

    @Override
    protected void initBeWrapped() {

    }
}
