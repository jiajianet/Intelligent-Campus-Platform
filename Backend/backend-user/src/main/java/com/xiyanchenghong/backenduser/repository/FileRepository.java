package com.xiyanchenghong.backenduser.repository;

import com.xiyanchenghong.backenduser.domain.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface FileRepository extends JpaRepository<FileEntity, Long> {
    FileEntity findByUid(String uid);
    List<FileEntity> findByStatus(String status);
    
    @Query("SELECT f FROM FileEntity f WHERE f.status = 'done' ORDER BY f.sortOrder ASC")
    List<FileEntity> findAllActiveOrdered();
    
    @Transactional
    @Modifying
    @Query("UPDATE FileEntity f SET f.sortOrder = ?2 WHERE f.uid = ?1")
    void updateSortOrder(String uid, Integer sortOrder);
}