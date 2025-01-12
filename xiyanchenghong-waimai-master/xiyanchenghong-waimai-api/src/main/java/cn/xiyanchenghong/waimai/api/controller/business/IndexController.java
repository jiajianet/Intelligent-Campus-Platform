package cn.xiyanchenghong.waimai.api.controller.business;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
@RequestMapping("/")
public class IndexController {



    @RequestMapping(method = RequestMethod.GET)

    public Object index(Map<String, Object> map){
       return  "点击查看<a href=\"/swagger-ui.html\">api文档</a>";
    }


}
