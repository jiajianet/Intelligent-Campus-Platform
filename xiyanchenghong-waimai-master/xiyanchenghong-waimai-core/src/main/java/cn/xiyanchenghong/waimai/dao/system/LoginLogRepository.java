package cn.xiyanchenghong.waimai.dao.system;

import cn.xiyanchenghong.waimai.bean.entity.system.LoginLog;
import cn.xiyanchenghong.waimai.dao.BaseRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 *@Author xiyanchenghong
 */
public interface LoginLogRepository extends BaseRepository<LoginLog,Long> {
    @Modifying
    @Transactional
    @Query(nativeQuery = true,value = "delete from t_sys_login_log")
    int clear();
}
