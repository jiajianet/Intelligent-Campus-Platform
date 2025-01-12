package cn.xiyanchenghong.waimai.service.task;


import cn.xiyanchenghong.waimai.bean.entity.system.TaskLog;
import cn.xiyanchenghong.waimai.dao.system.TaskLogRepository;
import cn.xiyanchenghong.waimai.service.BaseService;
import org.springframework.stereotype.Service;

/**
 * 定时任务日志服务类
 */
@Service
public class TaskLogService extends BaseService<TaskLog,Long,TaskLogRepository> {
}
