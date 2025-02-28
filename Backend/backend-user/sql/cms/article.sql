/*
 Navicat Premium Data Transfer

 Source Server         : Test
 Source Server Type    : MySQL
 Source Server Version : 80038 (8.0.38)
 Source Host           : localhost:3306
 Source Schema         : data_user

 Target Server Type    : MySQL
 Target Server Version : 80038 (8.0.38)
 File Encoding         : 65001

 Date: 26/02/2025 18:59:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `channel_id` bigint NULL DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `type` int NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `comment_count` int NULL DEFAULT 0,
  `like_count` int NULL DEFAULT 0,
  `read_count` int NULL DEFAULT 0,
  `status` int NOT NULL DEFAULT 0,
  `pub_date` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_channel_id`(`channel_id` ASC) USING BTREE,
  CONSTRAINT `FK_channel_id` FOREIGN KEY (`channel_id`) REFERENCES `channel` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 124 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (119, 6, '<p>我爱你中国</p>', 'http://localhost:8081/user/images/b6d697df_屏幕截图_2025-02-23_191241.png', 1, '这是测试文本', 0, 0, 0, 0, '2025-02-24 13:46:04');
INSERT INTO `article` VALUES (120, 5, '<p>测试</p>', 'http://localhost:8081/user/images/262b2814_屏幕截图_2025-02-22_110739.png', 1, '从v额是', 0, 0, 0, 0, '2025-02-25 03:11:34');
INSERT INTO `article` VALUES (121, 1, '<p>测试</p>', NULL, 0, '测试', 0, 0, 0, 0, '2025-02-25 03:12:18');
INSERT INTO `article` VALUES (122, 6, '<p>我爱你</p>', NULL, 0, '爱你', 0, 0, 0, 0, '2025-02-25 17:07:47');
INSERT INTO `article` VALUES (123, 2, '<p>cecececececeec</p>', NULL, 0, '爱你', 0, 0, 0, 0, '2025-02-26 10:58:07');

SET FOREIGN_KEY_CHECKS = 1;
