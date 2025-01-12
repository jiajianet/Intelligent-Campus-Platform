package cn.xiyanchenghong.waimai.api.controller.business;

import cn.xiyanchenghong.waimai.api.controller.BaseController;
import cn.xiyanchenghong.waimai.bean.entity.front.Delivery;
import cn.xiyanchenghong.waimai.bean.vo.front.Rets;
import cn.xiyanchenghong.waimai.dao.MongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 *@Author xiyanchenghong
 */
@RestController
public class DeliveryController extends BaseController {
    @Autowired
    private MongoRepository mongoRepository;

    @RequestMapping(value = "/shopping/v1/restaurants/delivery_modes",method = RequestMethod.GET)
    public Object list(@RequestParam(value = "latitude",required = false) String latitude,
                       @RequestParam(value = "longitude",required = false) String longitude){
        return Rets.success(mongoRepository.findAll(Delivery.class));
    }
}
