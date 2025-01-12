package cn.xiyanchenghong.waimai.service.front;

import cn.xiyanchenghong.waimai.bean.entity.front.Ids;
import cn.xiyanchenghong.waimai.dao.MongoRepository;
import cn.xiyanchenghong.waimai.utils.Beans;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class IdsService {
    @Autowired
    private MongoRepository mongoRepository;
    public synchronized Long getId(String propName){
        Ids ids =  mongoRepository.findOne(Ids.class);
        if(ids==null){
            ids = new Ids();
            Beans beans = Beans.me(ids);
            ids.setRestaurant_id(0L);
            ids.setFood_id(0L);
            ids.setOrder_id(0L);
            ids.setUser_id(0L);
            ids.setAddress_id(0L);
            ids.setCart_id(0L);
            ids.setImg_id(0L);
            ids.setSku_id(0L);
            ids.setAdmin_id(0L);
            ids.setStatis_id(0L);
            ids.setItem_id(0L);
            beans.set(propName,1L);
            mongoRepository.save(ids);
            return 1L;
        }else{
            Beans beans = Beans.me(ids);
            Long val = (Long) beans.get(propName);
            val++;
            beans.set(propName,val);
            mongoRepository.save(ids);
            return val;
        }
    }
}
