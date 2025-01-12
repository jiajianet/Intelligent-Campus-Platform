package cn.xiyanchenghong.waimai.bean.dictmap;

import cn.xiyanchenghong.waimai.bean.dictmap.base.AbstractDictMap;

/**
 * 通知的映射
 *
 * @Author xiyanchenghong
 */
public class NoticeMap extends AbstractDictMap {

    @Override
    public void init() {
        put("title", "标题");
        put("content", "内容");
    }

    @Override
    protected void initBeWrapped() {
    }
}
