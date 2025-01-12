package cn.xiyanchenghong.waimai.dao.system;


import cn.xiyanchenghong.waimai.bean.entity.system.Dept;
import cn.xiyanchenghong.waimai.dao.BaseRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 *
 *@Author xiyanchenghong
 */
public interface DeptRepository  extends BaseRepository<Dept, Long> {
    List<Dept> findByPidsLike(String pid);
    @Query(nativeQuery = true,value = "SELECT id, pid AS pId, simplename AS NAME, ( CASE WHEN (pId = 0 OR pId IS NULL) THEN 'true' ELSE 'false' END ) AS isOpen FROM t_sys_dept")
    List tree();

    List<Dept> findBySimplenameLikeOrFullnameLike(String name,String name2);
}
