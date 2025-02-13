package com.xiyanchenghong.backenduser.domain;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
public class School {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public Long getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Long warehouseId) {
        this.warehouseId = warehouseId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getProvince() {
        return province;
    }

    public void setProvince(Integer province) {
        this.province = province;
    }

    public Integer getCity() {
        return city;
    }

    public void setCity(Integer city) {
        this.city = city;
    }

    public Integer getDistrict() {
        return district;
    }

    public void setDistrict(Integer district) {
        this.district = district;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Float getLat() {
        return lat;
    }

    public void setLat(Float lat) {
        this.lat = lat;
    }

    public Float getLng() {
        return lng;
    }

    public void setLng(Float lng) {
        this.lng = lng;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getDistrictName() {
        return districtName;
    }

    public void setDistrictName(String districtName) {
        this.districtName = districtName;
    }

    public Integer getNightHour() {
        return nightHour;
    }

    public void setNightHour(Integer nightHour) {
        this.nightHour = nightHour;
    }

    public Float getManagerSalaryPercent() {
        return managerSalaryPercent;
    }

    public void setManagerSalaryPercent(Float managerSalaryPercent) {
        this.managerSalaryPercent = managerSalaryPercent;
    }

    public Float getAgentSalaryPercent() {
        return agentSalaryPercent;
    }

    public void setAgentSalaryPercent(Float agentSalaryPercent) {
        this.agentSalaryPercent = agentSalaryPercent;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    public String getAdcode() {
        return adcode;
    }

    public void setAdcode(String adcode) {
        this.adcode = adcode;
    }
}