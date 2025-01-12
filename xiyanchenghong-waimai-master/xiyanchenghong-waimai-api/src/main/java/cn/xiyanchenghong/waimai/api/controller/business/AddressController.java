package cn.xiyanchenghong.waimai.api.controller.business;

import cn.xiyanchenghong.waimai.api.controller.BaseController;
import cn.xiyanchenghong.waimai.bean.entity.front.Address;
import cn.xiyanchenghong.waimai.bean.entity.front.Ids;
import cn.xiyanchenghong.waimai.bean.enumeration.BizExceptionEnum;
import cn.xiyanchenghong.waimai.bean.exception.ApplicationException;
import cn.xiyanchenghong.waimai.bean.vo.business.City;
import cn.xiyanchenghong.waimai.bean.vo.front.Rets;
import cn.xiyanchenghong.waimai.dao.MongoRepository;
import cn.xiyanchenghong.waimai.service.front.IdsService;
import cn.xiyanchenghong.waimai.service.front.PositionService;
import cn.xiyanchenghong.waimai.utils.Maps;
import cn.xiyanchenghong.waimai.utils.ToolUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 *@Author xiyanchenghong
 */
@RestController
public class AddressController extends BaseController {
    private Logger logger = LoggerFactory.getLogger(AddressController.class);
    @Autowired
    private MongoRepository mongoRepository;
    @Autowired
    private IdsService idsService;
    @Autowired
    private PositionService positionService;
    @RequestMapping(value = "/v1/users/{user_id}/addresses",method = RequestMethod.GET)
    public Object address(@PathVariable("user_id") Long userId){
        return Rets.success(mongoRepository.findAll(Address.class,"user_id",userId));
    }
    @RequestMapping(value = "/v1/users/{user_id}/addresses",method =  RequestMethod.POST)
    public Object save(@PathVariable("user_id") Long userId){
        City city = positionService.guessCity(getIp());
        Address address = getRequestPayload(Address.class);
        address.setUser_id(userId);
        address.setCity_id(city.getId());
        address.setId(idsService.getId(Ids.ADDRESS_ID));
        mongoRepository.save(address);
        return Rets.success("添加地址成功");
    }
    @RequestMapping(value = "/v1/users/${user_id}/addresses/${address_id}",method =  RequestMethod.POST)
    public Object delete(@PathVariable("user_id") Long userId, @PathVariable("address_id") Long addressId){
        mongoRepository.delete("addresses", Maps.newHashMap("user_id",userId,"id",addressId));
        return Rets.success("删除地址成功");
    }

    @RequestMapping(value="/address/{id}",method = RequestMethod.GET)
    public Object get(@PathVariable Long id){
        logger.info("id:{}",id);
        if (ToolUtil.isEmpty(id)) {
            throw new ApplicationException(BizExceptionEnum.REQUEST_NULL);
        }
         return Rets.success(mongoRepository.findOne(Address.class,id));
    }
}
