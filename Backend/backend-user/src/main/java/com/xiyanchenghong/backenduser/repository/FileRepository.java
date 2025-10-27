package com.xiyanchenghong.backenduser.repository;

import com.xiyanchenghong.backenduser.domain.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface FileRepository extends JpaRepository<FileEntity, Long> {
    FileEntity findByUid(String uid);
    List<FileEntity> findByStatusOrderBySortOrderAsc(String status);

    @Query("select max(f.sortOrder) from FileEntity f")
    Optional<Integer> findMaxSortOrder();
}