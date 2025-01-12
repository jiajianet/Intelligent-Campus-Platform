package cn.xiyanchenghong.waimai.service.task.job;

import cn.xiyanchenghong.waimai.bean.entity.system.Cfg;
import cn.xiyanchenghong.waimai.service.system.CfgService;
import cn.xiyanchenghong.waimai.service.task.JobExecuter;
import cn.xiyanchenghong.waimai.utils.DateUtil;
import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * HelloJob
 *
 */
@Component
public class HelloJob extends JobExecuter {
    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private CfgService cfgService;
    @Override
    public void execute(Map<String, Object> dataMap) throws Exception {
        Cfg cfg = cfgService.get(1L);
        cfg.setCfgDesc("update by "+ DateUtil.getTime());
        cfgService.update(cfg);
        logger.info("hello :"+JSON.toJSONString(dataMap));
    }
}
