package cn.xiyanchenghong.waimai.api.controller.business;

import cn.xiyanchenghong.waimai.api.controller.BaseController;
import cn.xiyanchenghong.waimai.bean.entity.front.Entry;
import cn.xiyanchenghong.waimai.bean.vo.front.Rets;
import cn.xiyanchenghong.waimai.dao.MongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 *@Author xiyanchenghong
 */
@RestController
public class EntryController extends BaseController {
    @Autowired
    private MongoRepository mongoRepository;
    @RequestMapping(value = "/v2/index_entry",method = RequestMethod.GET)
    public Object list(){
        return Rets.success(mongoRepository.findAll(Entry.class));
    }
}
