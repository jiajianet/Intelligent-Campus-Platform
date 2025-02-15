package com.xiyanchenghong.backenduser.controller;

import com.xiyanchenghong.backenduser.domain.School;
import com.xiyanchenghong.backenduser.service.SchoolService;
import com.xiyanchenghong.backenduser.utils.JwtUtils;
import com.xiyanchenghong.backenduser.utils.Result;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/school")
public class SchoolController {

    @Autowired
    private SchoolService schoolService;

    @GetMapping("/getSchoolAddress")
    public Result<SchoolAddressResponse> getSchoolAddress(@RequestHeader("Authorization") String token, @RequestParam("name") String schoolName) {
        try {
            // 验证token
            Claims claims = JwtUtils.parseJwt(token.substring(7));
            if (JwtUtils.isTokenExpired(token.substring(7))) {
                return Result.error(403, "Token expired");
            }

            // 获取学校信息
            School school = schoolService.getSchoolByName(schoolName);
            if (school != null) {
                SchoolAddressResponse response = new SchoolAddressResponse(school.getLat(), school.getLng(), school.getAddress());
                return Result.success(response);
            } else {
                return Result.error(404, "School not found");
            }
        } catch (Exception e) {
            return Result.error(403, "Invalid token");
        }
    }

    private static class SchoolAddressResponse {
        private Float lat;
        private Float lng;
        private String address;

        public SchoolAddressResponse(Float lat, Float lng, String address) {
            this.lat = lat;
            this.lng = lng;
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

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }
    }
}