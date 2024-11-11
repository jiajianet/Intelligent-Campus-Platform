/*
 Navicat Premium Data Transfer

 Source Server         : chenchen
 Source Server Type    : MySQL
 Source Server Version : 80039
 Source Host           : localhost:3306
 Source Schema         : data_user

 Target Server Type    : MySQL
 Target Server Version : 80039
 File Encoding         : 65001

 Date: 11/11/2024 02:10:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for password_reset_token
-- ----------------------------
DROP TABLE IF EXISTS `password_reset_token`;
CREATE TABLE `password_reset_token`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int(0) NOT NULL,
  `expiry_date` timestamp(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `password_reset_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of password_reset_token
-- ----------------------------
INSERT INTO `password_reset_token` VALUES (1, '907bee2a-d5d2-462c-8989-db0a6a772334', 12, '2024-11-09 19:29:44');
INSERT INTO `password_reset_token` VALUES (2, '2cc63bbe-c342-4910-ac57-e3b30793c9fd', 12, '2024-11-09 19:30:40');
INSERT INTO `password_reset_token` VALUES (3, '41e96083-f1a7-494c-8871-fca32613f1f7', 12, '2024-11-09 19:46:30');
INSERT INTO `password_reset_token` VALUES (4, '60e0511a-8f00-4e9c-8cd6-0d0f8a748a2c', 12, '2024-11-10 05:56:34');
INSERT INTO `password_reset_token` VALUES (5, 'f8e86020-07fe-4d6d-923b-c2ef292b43d2', 12, '2024-11-10 06:04:36');
INSERT INTO `password_reset_token` VALUES (6, '49ced1d5-9941-4d90-8e94-a296028654b9', 12, '2024-11-10 09:26:40');
INSERT INTO `password_reset_token` VALUES (7, 'af7a10ce-f515-4a64-a39d-0843aa0540e1', 12, '2024-11-10 18:06:13');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `uschool` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `uid` int(0) NOT NULL AUTO_INCREMENT,
  `uno` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `uname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `upic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'default_avatar.png',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`uid`) USING BTREE,
  UNIQUE INDEX `uno`(`uno`) USING BTREE,
  UNIQUE INDEX `unique_email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('广州软件学院', 12, '2340709133', '123456', '小杨', 'default_avatar.png', '1074711419@qq.com');
INSERT INTO `user` VALUES ('广州软件学院;', 13, '2340709131', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '小贾', 'default_avatar.png', '1074711417@qq.com');
INSERT INTO `user` VALUES ('广州软件学院;', 14, '2340709132', '123456', '小李', 'default_avatar.png', '1074711418@qq.com');
INSERT INTO `user` VALUES ('广州软件学院;', 15, '2340709134', '123456', '小王', 'default_avatar.png', '1074711411@qq.com');
INSERT INTO `user` VALUES ('广州软件学院', 16, '2340709137', '123456', '小刘', 'default_avatar.png', '1074711412@qq.com');

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `uid` int(0) NOT NULL COMMENT '连接user的外键uid',
  `upic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '头像',
  `uname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  PRIMARY KEY (`uid`) USING BTREE,
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
