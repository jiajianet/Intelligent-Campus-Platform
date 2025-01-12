package cn.xiyanchenghong.waimai.bean.entity.front.sub;

import cn.xiyanchenghong.waimai.utils.Maps;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 *
 *@Author xiyanchenghong
 */
@Data
public class OrderBasket {

    private List<OrderFee> abandoned_extra = new ArrayList<OrderFee>();
    private OrderFee deliver_fee = new OrderFee();
    private Map packing_fee = Maps.newHashMap();
    private List extra = new ArrayList();
    private List pindan_map = new ArrayList();
    private List<List<OrderItem>> group = new ArrayList<List<OrderItem>>();

}
