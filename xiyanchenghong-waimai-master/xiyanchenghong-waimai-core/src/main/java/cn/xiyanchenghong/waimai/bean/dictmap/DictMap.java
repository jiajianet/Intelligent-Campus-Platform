package cn.xiyanchenghong.waimai.bean.dictmap;

import cn.xiyanchenghong.waimai.bean.dictmap.base.AbstractDictMap;

/**
 * 字典map
 *
 * @Author xiyanchenghong
 */
public class DictMap extends AbstractDictMap {

    @Override
    public void init() {
        put("dictId","字典名称");
        put("dictName","字典名称");
        put("dictValues","字典内容");
    }

    @Override
    protected void initBeWrapped() {

    }
}
