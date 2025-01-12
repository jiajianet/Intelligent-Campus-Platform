package cn.xiyanchenghong.waimai.dao.system;


import cn.xiyanchenghong.waimai.bean.entity.system.OperationLog;
import cn.xiyanchenghong.waimai.dao.BaseRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

/**
 *
 *@Author xiyanchenghong
 */
public interface OperationLogRepository extends BaseRepository<OperationLog,Long> {
    @Modifying
    @Transactional
    @Query(nativeQuery = true,value = "delete from t_sys_operation_log")
    int clear();
}
