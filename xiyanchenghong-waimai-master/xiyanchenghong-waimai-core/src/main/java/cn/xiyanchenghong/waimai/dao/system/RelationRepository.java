package cn.xiyanchenghong.waimai.dao.system;

import cn.xiyanchenghong.waimai.bean.entity.system.Relation;
import cn.xiyanchenghong.waimai.dao.BaseRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 *@Author xiyanchenghong
 */
public interface RelationRepository extends BaseRepository<Relation,Long> {
    @Transactional
    @Modifying
    @Query(nativeQuery = true,value = "delete from t_sys_relation where roleid=?1")
    int deleteByRoleId(Long roleId);
}
