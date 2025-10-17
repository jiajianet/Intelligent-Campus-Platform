package com.xiyanchenghong.backenduser.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.File;

public class ArticleImageUtils {
    private static final Logger log = LoggerFactory.getLogger(ArticleImageUtils.class);

    public static void deleteImage(String uploadDir, String imageUrl){
        if(imageUrl == null || imageUrl.isEmpty())
            return;

        String fileName = imageUrl.substring(imageUrl.lastIndexOf("/")+1);
        File imageFile = new File(uploadDir,fileName);

        if (imageFile.exists()) {
            boolean deleted = imageFile.delete();
            if(!deleted){
                log.error("删除图片失败：{}",imageFile.getAbsolutePath());
            } else {
                log.info("成功删除图片：{}",imageFile.getAbsolutePath());
            }
        }

    }


}
