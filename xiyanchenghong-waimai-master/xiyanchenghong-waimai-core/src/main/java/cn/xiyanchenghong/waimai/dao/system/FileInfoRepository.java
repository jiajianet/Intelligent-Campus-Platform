package cn.xiyanchenghong.waimai.dao.system;

import cn.xiyanchenghong.waimai.bean.entity.system.FileInfo;
import cn.xiyanchenghong.waimai.dao.BaseRepository;

public interface FileInfoRepository  extends BaseRepository<FileInfo,Long> {
    FileInfo findByRealFileName(String fileName);
}
