package cn.xiyanchenghong.waimai.api.controller.business;

import cn.xiyanchenghong.waimai.api.controller.BaseController;
import cn.xiyanchenghong.waimai.bean.entity.front.Activity;
import cn.xiyanchenghong.waimai.bean.vo.front.Rets;
import cn.xiyanchenghong.waimai.dao.MongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 *
 *@Author xiyanchenghong
 */
@RestController
public class ActivityController extends BaseController {
    @Autowired
    private MongoRepository mongoRepository;

    @RequestMapping(value = "/shopping/v1/restaurants/activity_attributes",method = RequestMethod.GET)
    @ResponseBody
    public Object list(@RequestParam(value = "latitude",required = false) String latitude,
                       @RequestParam(value = "longitude",required = false) String longitude){
        return Rets.success(mongoRepository.findAll(Activity.class));
    }
}
