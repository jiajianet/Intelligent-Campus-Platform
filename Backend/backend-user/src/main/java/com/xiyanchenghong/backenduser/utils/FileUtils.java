package com.xiyanchenghong.backenduser.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.File;

public class FileUtils {
    private static final Logger log = LoggerFactory.getLogger(FileUtils.class);

    public static void deleteFile(String baseDir, String fileUrl){
        if(fileUrl == null || fileUrl.isEmpty())
            return;

        String fileName = fileUrl.substring(fileUrl.lastIndexOf("/")+1);
        File fileFile = new File(baseDir,fileName);

        if (fileFile.exists()) {
            boolean deleted = fileFile.delete();
            if(!deleted){
                log.error("删除图片失败：{}",fileFile.getAbsolutePath());
            } else {
                log.info("成功删除图片：{}",fileFile.getAbsolutePath());
            }
        }

    }


}
