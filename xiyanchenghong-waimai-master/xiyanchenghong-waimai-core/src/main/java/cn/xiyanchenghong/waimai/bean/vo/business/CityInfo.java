package cn.xiyanchenghong.waimai.bean.vo.business;

import lombok.Data;

import java.io.Serializable;


@Data
public class CityInfo implements Serializable {
    private String lat;
    private String lng;
    private String city;
}
