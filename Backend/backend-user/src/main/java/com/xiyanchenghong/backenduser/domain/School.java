package com.xiyanchenghong.backenduser.domain;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class School {
    private Long id;
    private Long companyId;
    private Long warehouseId;
    private String name;
    private Integer province;
    private Integer city;
    private Integer district;
    private String address;
    private Float lat;
    private Float lng;
    private String provinceName;
    private String cityName;
    private String districtName;
    private Integer nightHour;
    private Float managerSalaryPercent;
    private Float agentSalaryPercent;
    private Integer status;
    private Timestamp createTime;
    private String adcode;
}