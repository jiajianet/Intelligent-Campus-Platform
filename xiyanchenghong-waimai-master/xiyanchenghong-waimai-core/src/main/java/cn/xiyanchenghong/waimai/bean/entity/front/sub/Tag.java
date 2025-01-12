package cn.xiyanchenghong.waimai.bean.entity.front.sub;

import lombok.Data;


@Data
public class Tag {
    private Integer count = 0;
    private String name;
    private Boolean unsatisfied=false;
}
