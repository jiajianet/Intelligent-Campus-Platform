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

 Date: 09/11/2024 12:52:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
  PRIMARY KEY (`uid`) USING BTREE,
  UNIQUE INDEX `uno`(`uno`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('广州软件学院', 12, '2340709133', '123456', '小杨', 'default_avatar.png');
INSERT INTO `user` VALUES ('广州软件学院;', 13, '2340709131', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '小贾', 'default_avatar.png');
INSERT INTO `user` VALUES ('广州软件学院;', 14, '2340709132', '123456', '小李', 'default_avatar.png');
INSERT INTO `user` VALUES ('广州软件学院;', 15, '2340709134', '123456', '小王', 'default_avatar.png');
INSERT INTO `user` VALUES ('广州软件学院', 16, '2340709137', '123456', '小刘', 'default_avatar.png');

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
