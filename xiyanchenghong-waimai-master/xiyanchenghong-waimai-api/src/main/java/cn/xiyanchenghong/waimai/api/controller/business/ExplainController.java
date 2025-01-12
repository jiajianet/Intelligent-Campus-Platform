package cn.xiyanchenghong.waimai.api.controller.business;

import cn.xiyanchenghong.waimai.api.controller.BaseController;
import cn.xiyanchenghong.waimai.bean.entity.front.Explain;
import cn.xiyanchenghong.waimai.bean.vo.front.Rets;
import cn.xiyanchenghong.waimai.dao.MongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExplainController extends BaseController {
    @Autowired
    private MongoRepository mongoRepository;
    @RequestMapping(value="/v3/profile/explain",method = RequestMethod.GET)
    public Object getData(){
        Explain explain = mongoRepository.findOne(Explain.class);
        return Rets.success(explain);
    }
    
}