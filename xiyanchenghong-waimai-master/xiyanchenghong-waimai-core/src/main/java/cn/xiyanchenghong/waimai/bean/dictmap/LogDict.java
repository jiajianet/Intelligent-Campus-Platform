package cn.xiyanchenghong.waimai.bean.dictmap;

import cn.xiyanchenghong.waimai.bean.dictmap.base.AbstractDictMap;

/**
 * 日志的字典
 *
 * @Author xiyanchenghong
 */
public class LogDict extends AbstractDictMap {

    @Override
    public void init() {
        put("tips","备注");
    }

    @Override
    protected void initBeWrapped() {

    }
}
