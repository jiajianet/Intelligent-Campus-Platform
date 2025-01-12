package cn.xiyanchenghong.waimai.bean.dictmap;

import cn.xiyanchenghong.waimai.bean.dictmap.base.AbstractDictMap;

/**
 * 字典map
 *
 * @Author xiyanchenghong
 */
public class TaskDict extends AbstractDictMap {

    @Override
    public void init() {
        put("taskId","任务id");
        put("name","任务名称");
    }

    @Override
    protected void initBeWrapped() {

    }
}
