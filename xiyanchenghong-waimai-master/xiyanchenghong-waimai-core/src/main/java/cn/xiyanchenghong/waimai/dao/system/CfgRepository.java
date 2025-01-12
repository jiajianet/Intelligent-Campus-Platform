
package cn.xiyanchenghong.waimai.dao.system;

import cn.xiyanchenghong.waimai.bean.entity.system.Cfg;
import cn.xiyanchenghong.waimai.dao.BaseRepository;
/**
 * 全局参数dao
 *
 * @Author xiyanchenghong
 */
public interface CfgRepository extends BaseRepository<Cfg,Long> {

    Cfg findByCfgName(String cfgName);
}
