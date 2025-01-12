package cn.xiyanchenghong.waimai.api.controller.system;

import cn.xiyanchenghong.waimai.api.controller.BaseController;
import cn.xiyanchenghong.waimai.bean.entity.system.Notice;
import cn.xiyanchenghong.waimai.bean.vo.front.Rets;
import cn.xiyanchenghong.waimai.service.system.NoticeService;
import com.google.common.base.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * NoticeController
 *
 *@Author xiyanchenghong
 */
@RestController
@RequestMapping("/notice")
public class NoticeController extends BaseController {
    @Autowired
    private NoticeService noticeService;
    /**
     * 获取通知列表
     */
    @RequestMapping(value = "/list")
    public Object list(String condition) {
        List<Notice> list = null;
        if(Strings.isNullOrEmpty(condition)) {
            list =  noticeService.queryAll();
        }else{
            list = noticeService.findByTitleLike(condition);
        }
        return Rets.success(list);
    }
}
