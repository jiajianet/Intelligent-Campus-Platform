package cn.xiyanchenghong.waimai.api.controller.business;

import cn.xiyanchenghong.waimai.api.controller.BaseController;
import cn.xiyanchenghong.waimai.bean.vo.front.Rets;
import cn.xiyanchenghong.waimai.utils.Maps;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/payapi/payment")
public class PaymentController extends BaseController {
    @RequestMapping(value = "/queryOrder",method = RequestMethod.GET)
    public Object queryOrder(@RequestParam("merchantId") Long merchantId,
                             @RequestParam("merchantOrderNo") String merchantOrderNo,
                             @RequestParam("source") String source,
                             @RequestParam("userId") Long userId,
                             @RequestParam("version") String version){
        return Rets.success(
                Maps.newHashMap(
                        "status", 0,
                        "type","PAY_FAILED",
                        "message","暂不开放支付功能"
                )
        );
    }
}
