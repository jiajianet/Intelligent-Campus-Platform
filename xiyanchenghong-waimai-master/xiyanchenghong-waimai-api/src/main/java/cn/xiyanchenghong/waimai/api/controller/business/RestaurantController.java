package cn.xiyanchenghong.waimai.api.controller.business;

import cn.xiyanchenghong.waimai.api.controller.BaseController;
import cn.xiyanchenghong.waimai.bean.vo.front.Rets;
import cn.xiyanchenghong.waimai.dao.MongoRepository;
import cn.xiyanchenghong.waimai.utils.Lists;
import cn.xiyanchenghong.waimai.utils.Maps;
import cn.xiyanchenghong.waimai.utils.gps.Distance;
import org.nutz.json.Json;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.geo.GeoResults;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * 
 *@Author xiyanchenghong
 */
@RestController
public class RestaurantController extends BaseController {
    @Autowired
    private MongoRepository mongoRepository;

    @RequestMapping(value = "/v4/restaurants", method = RequestMethod.GET)
    public Object restaurants(@RequestParam("geohash") String geoHash, @RequestParam("keyword") String keyWord) {
        String[] geoHashArr = geoHash.split(",");
        String longitude = geoHashArr[1];
        String latitude = geoHashArr[0];
        Map<String, Object> params = Maps.newHashMap("name", keyWord);
        System.out.println(Json.toJson(params));
        GeoResults<Map> geoResults = mongoRepository.near(Double.valueOf(longitude), Double.valueOf(latitude),
                "shops", params);
        List<GeoResult<Map>> geoResultList = geoResults.getContent();
        List<Map> list = Lists.newArrayList();
        for (int i = 0; i < geoResultList.size(); i++) {
            Map map = geoResultList.get(i).getContent();
            Distance distance = new Distance(Double.valueOf(longitude), Double.valueOf(latitude),
                    Double.valueOf(map.get("longitude").toString()), Double.valueOf(map.get("latitude").toString()));
            map.put("distance", distance.getDistance());
            list.add(map);
        }
        return Rets.success(list);
    }
}
