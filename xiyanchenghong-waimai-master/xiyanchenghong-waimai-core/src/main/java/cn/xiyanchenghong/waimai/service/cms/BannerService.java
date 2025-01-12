package cn.xiyanchenghong.waimai.service.cms;

import cn.xiyanchenghong.waimai.bean.entity.cms.Banner;
import cn.xiyanchenghong.waimai.bean.enumeration.cms.BannerTypeEnum;
import cn.xiyanchenghong.waimai.bean.vo.offcialsite.BannerVo;
import cn.xiyanchenghong.waimai.dao.cms.BannerRepository;
import cn.xiyanchenghong.waimai.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BannerService extends BaseService<Banner,Long,BannerRepository> {
    @Autowired
    private BannerRepository bannerRepository;

    /**
     * 查询首页banner数据
     * @return
     */
    public BannerVo queryIndexBanner(){
    return queryBanner(BannerTypeEnum.INDEX.getValue());
    }

    public BannerVo queryBanner(String type){
        BannerVo banner = new BannerVo();
        List<cn.xiyanchenghong.waimai.bean.entity.cms.Banner> bannerList = bannerRepository.findAllByType(type);
        banner.setIndex(0);
        banner.setList(bannerList);
        return  banner;
    }
}
