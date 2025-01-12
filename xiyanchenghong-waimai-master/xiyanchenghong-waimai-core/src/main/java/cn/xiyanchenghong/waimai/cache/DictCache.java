package cn.xiyanchenghong.waimai.cache;

import cn.xiyanchenghong.waimai.bean.entity.system.Dict;

import java.util.List;

/**
 * 字典缓存
 *
 */
public interface DictCache  extends Cache{

    List<Dict> getDictsByPname(String dictName);
    String getDict(Long dictId);
}
