package cn.xiyanchenghong.waimai.dao.system;


import cn.xiyanchenghong.waimai.bean.entity.system.User;
import cn.xiyanchenghong.waimai.dao.BaseRepository;

/**
 *
 *@Author xiyanchenghong
 */
public interface UserRepository extends BaseRepository<User,Long> {
    User findByAccount(String account);

    User findByAccountAndStatusNot(String account, Integer status);
}
