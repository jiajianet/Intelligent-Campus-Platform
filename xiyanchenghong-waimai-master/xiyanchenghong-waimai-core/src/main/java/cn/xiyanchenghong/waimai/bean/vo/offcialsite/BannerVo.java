package cn.xiyanchenghong.waimai.bean.vo.offcialsite;

import lombok.Data;

import java.util.List;

@Data
public class BannerVo {
    private Integer index = 0;
    private List<cn.xiyanchenghong.waimai.bean.entity.cms.Banner> list;

}
