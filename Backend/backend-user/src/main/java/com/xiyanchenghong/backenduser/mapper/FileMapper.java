package com.xiyanchenghong.backenduser.mapper;


import com.xiyanchenghong.backenduser.domain.FileEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FileMapper {
    FileEntity findByUid(String uid);

    List<FileEntity> findByStatusOrderBySortOrderAsc(String status);

    Integer findMaxSortOrder();

    int insert(FileEntity fileEntity);

    void deleteByUid(String uid);

    void updateSortOrder(@Param("uid") String uid, @Param("sortOrder") Integer sortOrder);

}
