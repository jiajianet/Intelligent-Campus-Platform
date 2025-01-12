package cn.xiyanchenghong.waimai.bean.entity.front.sub;

import lombok.Data;

/**
 *
 *@Author xiyanchenghong
 */
@Data
public class OrderFee {
    private Long category_id;
    private String name;
    private Double price;
    private Double quantity;

}
