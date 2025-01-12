package cn.xiyanchenghong.waimai.bean.entity.front.sub;

import lombok.Data;


@Data
public class RatingItem {
    private Integer food_id;
    private String food_name;
    private String image_hash = "";
    private Integer is_valid = 1;
}
