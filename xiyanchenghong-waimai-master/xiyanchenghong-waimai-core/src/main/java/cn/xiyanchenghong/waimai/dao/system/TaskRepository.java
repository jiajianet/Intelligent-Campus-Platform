
package cn.xiyanchenghong.waimai.dao.system;


import cn.xiyanchenghong.waimai.bean.entity.system.Task;
import cn.xiyanchenghong.waimai.dao.BaseRepository;

import java.util.List;

public interface TaskRepository extends BaseRepository<Task,Long> {

    long countByNameLike(String name);

    List<Task> findByNameLike(String name);
    List<Task> findAllByDisabled(boolean disable);
}
