# 智慧校园服务一体化平台项目

智慧校园服务一体化平台由犀焰澄泓团队开发

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react" alt="React 18">
  <img src="https://img.shields.io/badge/Vue.js-3-4FC08D?logo=vuedotjs" alt="Vue.js 3">
  <img src="https://img.shields.io/badge/Spring%20Boot-3.3-6DB33F?logo=springboot" alt="Spring Boot">
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql" alt="MySQL">
  <img src="https://img.shields.io/badge/Redis-7.0-DC382D?logo=redis" alt="Redis">
  <img src="https://img.shields.io/badge/Java-20-007396?logo=openjdk" alt="Java 20">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs" alt="Node.js">
  <img src="https://img.shields.io/badge/Ant%20Design-5-1677FF?logo=antdesign" alt="Ant Design">
  <img src="https://img.shields.io/badge/MyBatis-3.0-000000?logo=mybatis" alt="MyBatis">
  <img src="https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens" alt="JWT">
</p>

## 目录

- [项目概述](#项目概述)
- [主要功能模块说明](#主要功能模块说明)
- [安装步骤](#安装步骤)
- [使用说明](#使用说明)
- [配置指南](#配置指南)
- [贡献方法](#贡献方法)
- [接口文档](#接口文档)
- [AI助手API接口文档](#ai助手api接口文档)
- [Q&A](#qa)

---

## 项目概述

### 项目背景

随着信息技术的快速发展和教育信息化的深入推进，传统的校园管理模式已经无法满足现代高校的教学、管理和服务需求。智慧校园服务一体化平台应运而生，旨在通过先进的技术手段，整合校园各类资源，为师生提供便捷、高效、智能的一站式服务。

### 项目目标

本项目致力于构建一个功能完善、性能稳定、用户体验优秀的智慧校园服务平台，实现以下核心目标：

- **资源整合**：统一管理校园内的各类教学资源、管理资源和服务资源
- **服务优化**：为师生提供便捷的在线服务，提升校园服务效率和质量
- **数据共享**：实现各业务系统间的数据互通，消除信息孤岛
- **智能化管理**：通过技术手段提升校园管理的智能化水平
- **用户体验**：提供友好的用户界面和流畅的操作体验

### 适用场景

本平台适用于以下场景：

- **高校日常管理**：学生信息管理、教师信息管理、课程管理、考试管理等
- **在线教学**：在线课堂、课程表管理、作业管理、考试管理等
- **校园服务**：文章发布、信息通知、文件管理等
- **数据分析**：教学数据分析、学生行为分析、校园资源利用分析等
- **移动办公**：支持移动端访问，方便师生随时随地使用平台服务

---

## 主要功能模块说明

### 前端平台

前端平台是本项目主要内容网页Web端的实现，前端平台代码位于仓库 `Frontend` 文件夹下，由 H5 + CSS + JS 代码编写。

#### 功能特性

- **用户认证**：登录、注册、密码重置、滑块验证码
- **用户中心**：个人信息管理、头像上传、信息修改
- **课程管理**：课程查询、选课、课程表管理
- **在线课堂**：在线课程学习、课堂互动
- **作业管理**：作业提交、作业查看、作业批改
- **考试管理**：在线考试、成绩查询
- **文章浏览**：文章列表、文章详情、文章分类

#### 课程表功能

课程表功能代码位于仓库 `Frontend/timetable` 文件夹下，采用Vue.js+Webpack进行编写。

**技术栈**：Vue.js 3 + Vite + Webpack

**功能特性**：
- 可视化课程表展示
- 课程信息编辑
- 课程表导入导出
- 响应式设计，支持多终端访问

### 前端管理平台

前端平台管理项目是管理智慧校园平台系统的网页Web端的实现，前端管理平台项目代码位于仓库 `Frontend-admin` 文件夹下，由 React.js + Ant Design 框架编写。

#### 功能特性

- **用户管理**：用户列表、用户添加、用户编辑、用户删除、角色管理
- **文章管理**：文章发布、文章编辑、文章审核、文章删除、分类管理
- **课程管理**：课程信息管理、课程分配、课程统计
- **考试管理**：试题管理、考试安排、成绩管理
- **数据统计**：用户统计、文章统计、访问统计
- **系统配置**：系统参数配置、权限管理

**技术栈**：React 18 + Ant Design 5 + Redux Toolkit + React Router

### 后端服务平台

后端服务平台是本项目全部内容后台服务端的实现，后端服务平台代码位于仓库 `Backend` 文件夹下，采用 SpringBoot + MySQL + Redis 技术。

#### 功能特性

- **用户服务**：用户注册、登录、信息管理、权限控制
- **文章服务**：文章CRUD、分类管理、评论管理、点赞管理
- **课程服务**：课程管理、选课管理、课程表生成
- **考试服务**：试题管理、考试管理、成绩管理
- **文件服务**：文件上传、文件下载、文件管理
- **验证服务**：滑块验证码、邮箱验证、密码重置
- **缓存服务**：Redis缓存、分布式锁

**技术栈**：
- Spring Boot 3.3.4
- MyBatis 3.0.3
- MySQL 8.0
- Redis
- JWT认证
- AJ-Captcha验证码

### AI助手模块

AI助手模块是本项目智能交互的核心组件，为用户提供智能问答、资源查询、数据分析等AI驱动的服务。后端AI代码位于仓库 `Backend/backend-user/src/main/java/com/xiyanchenghong/backenduser/ai` 文件夹下。

#### 核心功能特性

- **智能对话**：基于Ollama本地大模型，支持自然语言交互
- **多轮会话**：支持会话管理，保持对话上下文
- **工具调用**：集成多种内置工具，自动执行任务
- **文章智能查询**：获取文章统计、搜索、推荐等功能
- **内容生成**：支持TTS文本生成、内容总结等
- **会话历史**：保存完整的对话历史记录

#### 模块架构

**后端技术栈**：
- Ollama大模型引擎
- Spring Boot REST API
- 工具调用系统（Tool Calling）
- 会话管理
- JSON数据交互

**模块结构**：
```
Backend/backend-user/src/main/java/com/xiyanchenghong/backenduser/ai/
├── controller/
│   └── AiChatController.java              # AI聊天REST接口
├── service/
│   ├── AiChatService.java                 # 主要聊天逻辑服务
│   ├── OllamaClient.java                  # Ollama客户端
│   └── AiToolDispatcher.java              # 工具调度器
├── model/
│   ├── AiConversationMessage.java         # 对话消息模型
│   ├── OllamaChatResult.java              # Ollama返回结果
│   ├── AiToolExecutionResult.java         # 工具执行结果
│   ├── AiChatResult.java                  # 聊天结果模型
│   └── AiArticleStatsRow.java             # 文章统计模型
└── dto/
    ├── AiChatRequest.java                 # 请求DTO
    ├── AiChatResponse.java                # 响应DTO
    ├── AiSessionHistoryResponse.java      # 会话历史响应
    ├── HistoryMessageView.java            # 历史消息视图
    ├── ToolCallView.java                  # 工具调用视图
    └── ReferenceItem.java                 # 参考信息
```

#### 支持的工具集

| 工具名称 | 描述 | 参数 |
|---------|------|------|
| `get_article_count` | 获取文章总数 | 无 |
| `get_recent_articles` | 获取最近文章 | limit: 数量 |
| `get_pending_articles` | 获取待审核文章 | limit: 数量 |
| `search_articles_by_title` | 按标题搜索文章 | title: 标题关键词 |
| `get_article_by_id` | 根据ID获取文章 | id: 文章ID |
| `get_article_stats` | 获取文章统计数据 | 无 |

#### 系统提示词

系统根据页面上下文动态生成提示词，引导AI在不同场景下提供针对性的服务：

- **首页**：推荐校园公告、课程信息、活动资讯
- **文章页面**：提供文章相关的智能问答、内容推荐
- **用户中心**：个人信息查询、学习进度分析
- **管理平台**：数据分析、内容管理建议

---

## 安装步骤

### 环境要求

#### 后端环境

- **Java**：JDK 20 或更高版本
- **MySQL**：8.0 或更高版本
- **Redis**：5.0 或更高版本
- **Maven**：3.6 或更高版本

#### 前端环境

- **Node.js**：16.x 或更高版本
- **npm**：8.x 或更高版本

#### 开发工具（可选）

- **IntelliJ IDEA**：推荐用于后端开发
- **VSCode**：推荐用于前端开发
- **Git**：版本控制工具

### 依赖安装

#### 1. 克隆项目

```bash
git clone https://github.com/your-repo/Intelligent-Campus-Platform.git
cd Intelligent-Campus-Platform
```

#### 2. 数据库配置

##### 创建数据库

```sql
CREATE DATABASE data_user CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

##### 导入SQL文件

将以下SQL文件导入到数据库中：

- `Backend/backend-user/sql/backend/data_user.sql`
- `Backend/backend-user/sql/backend/school.sql`
- `Backend/backend-user/sql/cms/article.sql`
- `Backend/backend-user/sql/cms/channel.sql`
- `Backend/backend-user/sql/cms/file_entity.sql`

使用MySQL客户端导入：

```bash
mysql -u root -p data_user < Backend/backend-user/sql/backend/data_user.sql
mysql -u root -p data_user < Backend/backend-user/sql/backend/school.sql
mysql -u root -p data_user < Backend/backend-user/sql/cms/article.sql
mysql -u root -p data_user < Backend/backend-user/sql/cms/channel.sql
mysql -u root -p data_user < Backend/backend-user/sql/cms/file_entity.sql
```

#### 3. 后端配置

##### 修改数据库配置

编辑 `Backend/backend-user/src/main/resources/application.properties` 文件，修改数据库连接信息：

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/data_user?serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
```

##### 修改Redis配置（如果使用Redis）

```properties
spring.data.redis.host=localhost
spring.data.redis.port=6379
```

##### 修改邮件配置（如果需要邮件功能）

```properties
spring.mail.host=smtp.qq.com
spring.mail.port=465
spring.mail.username=your_email@qq.com
spring.mail.password=your_email_password
```

##### 安装后端依赖

```bash
cd Backend/backend-user
mvn clean install
```

#### 4. 前端平台配置

##### 安装依赖

```bash
cd Frontend
npm install
```

##### 课程表模块配置

```bash
cd Frontend/timetable
npm install
```

#### 5. 前端管理平台配置

##### 安装依赖

```bash
cd Frontend-admin/react-app
npm install
```

### 初始化流程

#### 1. 启动Redis（如果使用）

```bash
redis-server
```

#### 2. 启动MySQL服务

确保MySQL服务已启动。

#### 2.1 安装并启动Ollama（可选，用于AI功能）

AI助手模块需要Ollama大模型引擎支持。如需使用AI功能，请：

##### 安装Ollama

1. 访问 [Ollama官方网站](https://ollama.ai) 下载安装程序
2. 根据操作系统选择相应版本（Windows/Mac/Linux）
3. 安装完成后，Ollama会以服务形式运行

##### 下载模型

```bash
# 下载Llama3模型（推荐）
ollama pull llama3

# 或下载其他模型
ollama pull mistral
ollama pull neural-chat
```

##### 启动Ollama服务

```bash
# Windows：安装后自动启动，默认监听 http://127.0.0.1:11434

# Mac/Linux：
ollama serve

# 验证服务是否运行
curl http://127.0.0.1:11434/api/tags
```

> **注意**：Ollama默认配置足以满足开发需求。若需要在其他地址运行或修改模型，可修改配置文件或环境变量

#### 3. 启动后端服务

```bash
cd Backend/backend-user
mvn spring-boot:run
```

或者直接运行主类：
```bash
java -jar target/backend-user-0.0.1-SNAPSHOT.jar
```

后端服务默认运行在 `http://localhost:8081`

#### 4. 启动前端平台

##### 启动主前端

```bash
cd Frontend
# 使用本地服务器（如Live Server）打开 index.html
```

##### 启动课程表模块

```bash
cd Frontend/timetable
npm run dev
```

课程表模块默认运行在 `http://localhost:5173`

#### 5. 启动前端管理平台

```bash
cd Frontend-admin/react-app
npm start
```

前端管理平台默认运行在 `http://localhost:3000`

### 验证安装

1. 访问前端平台：`http://localhost:5173`（课程表模块）
2. 访问前端管理平台：`http://localhost:3000`
3. 访问后端API：`http://localhost:8081`
4. 尝试注册和登录功能，验证系统是否正常运行

---

## 使用说明

### 基础操作指南

#### 用户注册

1. 访问前端平台注册页面
2. 填写用户信息（学号/工号、姓名、邮箱、密码）
3. 完成滑块验证码验证
4. 提交注册信息
5. 查收邮箱验证邮件（如果启用邮箱验证）

#### 用户登录

1. 访问前端平台登录页面
2. 输入学号/工号和密码
3. 完成滑块验证码验证
4. 点击登录按钮

#### 文章管理（管理员）

##### 发布文章

1. 登录管理平台
2. 进入"文章管理"模块
3. 点击"发布文章"按钮
4. 填写文章标题、选择分类、编写内容
5. 上传封面图片（可选）
6. 点击"发布"按钮

##### 编辑文章

1. 在文章列表中找到要编辑的文章
2. 点击"编辑"按钮
3. 修改文章内容
4. 点击"保存"按钮

##### 删除文章

1. 在文章列表中找到要删除的文章
2. 点击"删除"按钮
3. 确认删除操作

#### 课程表管理

##### 查看课程表

1. 登录前端平台
2. 进入"课程表"模块
3. 查看当前学期的课程安排

##### 导入课程表

1. 进入课程表管理页面
2. 点击"导入"按钮
3. 选择课程表文件（支持Excel格式）
4. 确认导入

### 常见用例

#### 用例1：学生选课

1. 学生登录系统
2. 进入"选课中心"
3. 浏览可选课程列表
4. 查看课程详细信息
5. 点击"选课"按钮
6. 确认选课信息
7. 查看选课结果

#### 用例2：教师发布作业

1. 教师登录系统
2. 进入"作业管理"模块
3. 点击"发布作业"
4. 填写作业标题、要求、截止日期
5. 上传作业附件（可选）
6. 选择目标班级
7. 发布作业

#### 用例3：管理员审核文章

1. 管理员登录管理平台
2. 进入"文章审核"模块
3. 查看待审核文章列表
4. 点击文章查看详情
5. 选择"通过"或"拒绝"
6. 填写审核意见（可选）
7. 提交审核结果

#### 用例4：学生查看成绩

1. 学生登录系统
2. 进入"成绩查询"模块
3. 选择学期
4. 查看各科成绩
5. 查看成绩详情（包括平时成绩、考试成绩等）

#### 用例5：教师管理班级

1. 教师登录系统
2. 进入"班级管理"模块
3. 查看所教班级列表
4. 点击班级查看学生信息
5. 查看学生出勤情况
6. 导出班级数据

#### 用例6：使用AI助手查询校园信息

1. 登录系统
2. 在任意页面（首页、文章页、用户中心等）激活AI助手
3. 输入自然语言问题，如："最近有什么校园活动？"、"帮我总结一下最新文章"
4. AI助手将调用相关工具获取信息并生成回复
5. 查看AI的回复结果和相关参考资源
6. 继续提问进行多轮对话，系统将保持上下文

#### 用例7：查看AI会话历史

1. 与AI助手进行对话
2. 系统自动保存会话ID
3. 使用会话ID查询历史对话记录
4. 可在任何时间恢复该会话继续对话

---

## 配置指南

### 配置文件说明

#### 后端配置文件

**文件路径**：`Backend/backend-user/src/main/resources/application.properties`

##### 数据库配置

```properties
# 数据库驱动
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# 数据库连接URL
spring.datasource.url=jdbc:mysql://localhost:3306/data_user?serverTimezone=UTC

# 数据库用户名
spring.datasource.username=root

# 数据库密码
spring.datasource.password=your_password
```

##### 服务器配置

```properties
# 应用名称
spring.application.name=backend-user

# 服务器端口
server.port=8081
```

##### MyBatis配置

```properties
# Mapper文件位置
mybatis.mapper-locations=classpath:mapper/xml/*.xml
```

##### 邮件配置

```properties
# 邮件服务器主机
spring.mail.host=smtp.qq.com

# 邮件服务器端口
spring.mail.port=465

# 发件人邮箱
spring.mail.username=your_email@qq.com

# 发件人邮箱密码（授权码）
spring.mail.password=your_email_password

# 发件人地址
mail.sendFrom=your_email@qq.com

# SMTP认证
spring.mail.properties.mail.smtp.auth=true

# SSL启用
spring.mail.properties.mail.smtp.ssl.enable=true

# 信任邮件服务器
spring.mail.properties.mail.smtp.ssl.trust=smtp.qq.com
```

##### 文件上传配置

```properties
# 文件上传大小限制
spring.servlet.multipart.max-file-size=100MB
spring.servlet.multipart.max-request-size=100MB
server.tomcat.max-swallow-size=100MB

# 文章封面上传目录
upload.dir=/path/to/uploads

# 图片访问基础URL
image.base-url=http://localhost:8081/user/images/

# 文件上传目录
file.upload-dir=/path/to/files

# 文件访问基础URL
file.base-url=http://localhost:8081/user/files/upload/

# 静态资源位置
spring.web.resources.static-locations=file:uploads/
```

##### Redis配置

```properties
# Redis主机
spring.data.redis.host=localhost

# Redis端口
spring.data.redis.port=6379

# Redis密码（如果需要）
# spring.data.redis.password=your_redis_password
```

##### 验证码配置

```properties
# 验证码类型（default: 两种都实例化）
aj.captcha.type=default

# 滑块验证码底图路径
aj.captcha.jigsaw=classpath:images/jigsaw

# 点选验证码底图路径
aj.captcha.pic-click=classpath:images/pic-click

# 缓存类型（local/redis）
aj.captcha.cache-type=local

# 水印文字
aj.captcha.water-mark=智慧校园服务平台

# 滑动拼图允许误差偏移量（默认5像素）
aj.captcha.slip-offset=5

# AES加密坐标开启或禁用
aj.captcha.aes-status=true

# 滑动干扰项(0/1/2)
aj.captcha.interference-options=2
```

##### 日志配置

```properties
# 邮件日志级别
logging.level.org.springframework.mail=DEBUG
logging.level.org.springframework.mail.javamail=DEBUG
```

##### AI模块配置

```properties
# Ollama服务地址
ollama.base-url=http://127.0.0.1:11434

# 使用的AI模型名称
ollama.model=llama3

# AI会话最大上下文消息数
ai.max-context-messages=12

# AI工具调用最大轮数
ai.max-tool-rounds=3

# 是否启用AI功能
ai.enabled=true
```

#### 前端配置文件

**文件路径**：`Frontend-admin/react-app/craco.config.js`

```javascript
const CracoAlias = require("react-app-alias");

module.exports = {
  webpack: {
    alias: {
      "@": "./src",
      "@components": "./src/components",
      "@assets": "./src/assets",
      "@utils": "./src/utils",
      "@apis": "./src/apis",
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
    },
  ],
};
```

**环境变量文件**：`Frontend-admin/react-app/.env`

```env
# API基础URL
REACT_APP_API_BASE_URL=http://localhost:8081

# 应用标题
REACT_APP_TITLE=智慧校园管理平台
```

### 参数解释

#### 后端关键参数

| 参数名称 | 默认值 | 说明 |
|---------|--------|------|
| server.port | 8081 | 后端服务监听端口 |
| spring.datasource.url | - | 数据库连接URL |
| spring.datasource.username | root | 数据库用户名 |
| spring.datasource.password | - | 数据库密码 |
| upload.dir | - | 文件上传存储路径 |
| image.base-url | - | 图片访问基础URL |
| aj.captcha.type | default | 验证码类型 |
| aj.captcha.cache-type | local | 验证码缓存类型 |
| aj.captcha.slip-offset | 5 | 滑块验证允许误差偏移量 |

#### 前端关键参数

| 参数名称 | 默认值 | 说明 |
|---------|--------|------|
| REACT_APP_API_BASE_URL | http://localhost:8081 | 后端API基础URL |
| REACT_APP_TITLE | 智慧校园管理平台 | 应用标题 |

### 配置建议

1. **生产环境配置**：
   - 修改数据库密码为强密码
   - 修改Redis密码
   - 使用HTTPS协议
   - 配置跨域设置
   - 启用日志记录

2. **开发环境配置**：
   - 使用本地数据库
   - 启用调试日志
   - 关闭验证码（可选）
   - 使用热重载

3. **安全配置**：
   - 定期更新依赖包
   - 启用HTTPS
   - 配置防火墙规则
   - 定期备份数据库

---

## 贡献方法

我们欢迎所有开发者参与智慧校园服务一体化平台的建设和改进。以下是贡献指南：

### 代码提交规范

#### 分支管理策略

本项目采用 Git Flow 工作流：

- **main**：主分支，用于生产环境，始终保持稳定
- **develop**：开发分支，用于集成新功能
- **feature/***：功能分支，从develop分支创建，用于开发新功能
- **bugfix/***：修复分支，从develop分支创建，用于修复bug
- **hotfix/***：紧急修复分支，从main分支创建，用于紧急修复生产环境问题

#### 分支命名规范

```
feature/功能描述
bugfix/问题描述
hotfix/问题描述
```

示例：
```
feature/user-management
bugfix/login-error
hotfix/security-patch
```

#### 提交信息规范

采用 Conventional Commits 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type（类型）**：
- `feat`：新功能
- `fix`：修复bug
- `docs`：文档更新
- `style`：代码格式（不影响代码运行的变动）
- `refactor`：重构（既不是新增功能，也不是修改bug的代码变动）
- `test`：增加测试
- `chore`：构建过程或辅助工具的变动

**示例**：
```
feat(user): add user registration feature

- Implement user registration API
- Add email verification
- Add form validation

Closes #123
```

### PR流程

#### 1. Fork项目

1. 访问项目GitHub页面
2. 点击"Fork"按钮
3. 将项目克隆到本地

```bash
git clone https://github.com/your-username/Intelligent-Campus-Platform.git
cd Intelligent-Campus-Platform
```

#### 2. 创建功能分支

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

#### 3. 开发和测试

1. 在功能分支上进行开发
2. 编写代码
3. 运行测试确保代码质量
4. 确保代码符合项目规范

#### 4. 提交代码

```bash
git add .
git commit -m "feat(module): add your feature description"
git push origin feature/your-feature-name
```

#### 5. 创建Pull Request

1. 访问你的Fork项目页面
2. 点击"New Pull Request"
3. 选择源分支和目标分支
4. 填写PR标题和描述
5. 提交PR

#### PR模板

```markdown
## 描述
简要描述这个PR的目的和内容

## 变更类型
- [ ] 新功能
- [ ] Bug修复
- [ ] 文档更新
- [ ] 代码重构
- [ ] 性能优化
- [ ] 其他

## 测试
描述你如何测试这些变更

## 截图（如果适用）
添加相关的截图

## 检查清单
- [ ] 代码符合项目规范
- [ ] 已添加必要的注释
- [ ] 已通过本地测试
- [ ] 已更新相关文档
- [ ] 无控制台错误或警告

## 相关Issue
关闭 #issue_number
```

#### 6. 代码审查

1. 维护者会审查你的PR
2. 根据反馈进行修改
3. 确保所有检查通过
4. 等待合并

### 开发规范

#### 代码风格

**Java代码规范**：
- 遵循Google Java Style Guide
- 使用Lombok简化代码
- 添加必要的注释
- 方法和类命名使用驼峰命名法

**JavaScript/React代码规范**：
- 遵循Airbnb JavaScript Style Guide
- 使用ES6+语法
- 组件命名使用PascalCase
- 函数和变量命名使用camelCase

#### 注释规范

**Java注释示例**：
```java
/**
 * 用户服务接口
 * 提供用户相关的业务逻辑处理
 */
public interface UserService {
    
    /**
     * 根据用户ID查询用户信息
     * @param userId 用户ID
     * @return 用户信息
     * @throws BizException 用户不存在时抛出异常
     */
    User getUserById(Long userId);
}
```

**JavaScript注释示例**：
```javascript
/**
 * 获取用户信息
 * @param {number} userId - 用户ID
 * @returns {Promise<Object>} 用户信息对象
 */
async function getUserInfo(userId) {
    // 实现代码
}
```

#### 测试规范

- 为新功能编写单元测试
- 确保测试覆盖率不低于80%
- 使用有意义的测试用例名称
- 测试失败时提供清晰的错误信息

### 问题反馈

如果你发现了bug或有功能建议，请通过以下方式反馈：

1. **GitHub Issues**：在项目Issues页面提交问题
2. **Issue模板**：
   - 描述问题
   - 提供复现步骤
   - 附上截图或日志
   - 说明环境信息（操作系统、浏览器版本等）

### 行为准则

- 尊重所有贡献者
- 保持友好和专业的态度
- 接受建设性的批评
- 关注对社区最有利的事情

---

## 接口文档

### 1. 获取token

- [请查看其他文档](#qa)

### 2. 请求接口示例

下面是对`axios`库的封装一部分，用于处理`http`请求

```js
const request = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8081',
    timeout: 5000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8'
    },
})
```

这是获取用户频道信息的`api`，通过返回已经封装好的`request`函数去发起请求

```js
export function getChannelAPI() {
    return request({
        url: '/user/channels',
        method: 'GET'
    })
}

```

### 3. 接口返回对象

接口返回对象有一个`Result`去统一处理返回的数据

```java
public class Result{
    private String code;
    private String msg;
    private T data;
    private String token;

    //getter,setter
}

```

- `code`返回时的状态值
- `msg`返回信息的描述
- `data`返回的具体数据
- `token`请求返回时的具体令牌JWT

### 4. 接口返回的分页对象

前端发送请求传输请求页码和每页数量，通过页码和每页数量在数据库中用limit和offset子句去约束输出结果

```java
  public ResponseEntity<Object> getArticles(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "perPage", defaultValue = "10") int perPage,
            @RequestParam(value = "status", required = false) Integer status,
            @RequestParam(value = "channelId", required = false) Long channelId,
            @RequestParam(value = "beginPubDate", required = false) String beginPubDate,
            @RequestParam(value = "endPubDate", required = false) String endPubDate)

```

- `page`是请求页码
- `perPage`是每页数量

### 5. 滑块验证码

本系统的滑块验证出自[AJ-Captcha: 行为验证码(滑动拼图、点选文字)，前后端交互，包含vue/h5/Android/IOS/flutter/uni-app/react/php/go/微信小程序的源码和实现](https://gitee.com/anji-plus/captcha)

- 获取图片接口地址POST`/captcha/get`

- 参数

  - `captchaType`
  - `clientUid`
  - `ts`

- 参数数据结构

```json
{
    "captchaType": "blockPuzzle",
    "clientUid": "slider-234c78f8-aa26-47d9-903f-bfe358816e03",
    "ts": 1740493730856
}
```

- 返回

```json
{
    "repCode": "0000",
    "repMsg": null,
    "repData": {
        "captchaId": null,
        "projectCode": null,
        "captchaType": null,
        "captchaOriginalPath": null,
        "captchaFontType": null,
        "captchaFontSize": null,
        "secretKey": "yHvNOAADvF2FKwG4",
        "wordList": null,
        "jigsawImageBase64": base64,
        "originalImageBase64": base64,
        "pointList": null,
        "pointJson": null,
        "token": "e00e71ee5ca2495cbe9f1dedf0a3d06e",
        "result": false,
        "captchaVerification": null,
        "clientUid": null,
        "ts": null,
        "browserInfo": null
    },
    "success": true
}
```

- 验证图片接口地址POST`/capthca/check`

- 参数

  - `captchaType`
  - `pointJson`
  - `token`
  - `clientUid`
  - `ts`

- 返回响应成功

```json
{
    "repCode": "0000",
    "repMsg": null,
    "repData": {
        "captchaId": null,
        "projectCode": null,
        "captchaType": "blockPuzzle",
        "captchaOriginalPath": null,
        "captchaFontType": null,
        "captchaFontSize": null,
        "secretKey": null,
        "originalImageBase64": null,
        "point": null,
        "jigsawImageBase64": null,
        "wordList": null,
        "pointList": null,
        "pointJson": "tjcUx5kcRRXBVOqvskE2Ig==",
        "token": "e00e71ee5ca2495cbe9f1dedf0a3d06e",
        "result": true,
        "captchaVerification": null,
        "clientUid": null,
        "ts": 1740493733782,
        "browserInfo": null
    },
    "success": true
}
```

- 返回响应过时

```json
{
    "repCode": "6110",
    "repMsg": "验证码已失效，请重新获取",
    "repData": null,
    "success": false
}
```

- 返回响应失败

```json
{
    "repCode": "6111",
    "repMsg": "验证失败",
    "repData": null,
    "success": false
}
```

### 6. 用户相关

#### 6.1 登录

- 提交表单地址POST`/user/login`
- 参数
  - uno
  - password（哈希加密）
  - captchaVerification
- 返回

```json
{
    "code": "0",
    "msg": "登录成功！",
    "data": {
        "uid": 21,
        "uschool": "好学校",
        "uno": "123454321",
        "password": "",
        "uname": "小曾",
        "email": "",
        "upic": "/www/jars/avatars/default_avatar.png",
        "schedfile": "",
        "role": "STUDENT",
        "emailVerified": true
    },
    "token": ""
}
```

#### 6.2 获取-用户信息

- 地址GET`/user/getUserInfo`
- 参数
  - 无
- 返回

```json
{
    "code": "0",
    "msg": "查询成功！",
    "data": {
        "uid": 21,
        "uschool": "广州软件学院",
        "role": "STUDENT",
        "uname": "小曾",
        "uno": "",
        "avatarBase64": "",
        "email": "",
        "emailverified": true
    },
    "token": null
}
```

- 只是模板，功能待实现

### 7. 文章管理

#### 7.1 获取-文章列表

- 地址GET`/user/articles`
- 参数
  - channelId:
  - beginPubDate:
  - endPubDate:
  - page: 1
  - perPage: 4
- 返回

```json
{
    "code": "0",
    "msg": "OK",
    "data": {
        "id": null,
        "title": null,
        "channelId": null,
        "content": null,
        "cover": null,
        "pubDate": null,
        "results": [
            {
                "id": 116,
                "title": "爱你",
                "status": 0,
                "commentCount": 0,
                "likeCount": 0,
                "readCount": 0,
                "channelId": 6,
                "pubDate": "2025-02-20 23:05:48",
                "content": "<p>测试测试册谔</p>",
                "cover": {
                    "type": 1,
                    "image": "http://localhost:8081/user/images/927704e1_logo.png"
                }
            }
        ],
        "totalCount": 5,
        "totalPages": 2,
        "page": 1,
        "perPage": 4
    },
    "token": null
}
```

#### 7.2 获取-文章详细

- 地址GET`/user/articles/{id}`
- 参数
  - `id`
- 返回

```json
{
    "code": "0",
    "msg": "OK",
    "data": {
        "id": "116",
        "title": "爱你",
        "channelId": 6,
        "content": "<p>测试测试册谔</p>",
        "cover": {
            "type": 1,
            "image": "http://localhost:8081/user/images/927704e1_logo.png"
        },
        "pubDate": "2025-02-20T23:05:48",
        "results": null,
        "totalCount": 0,
        "totalPages": 0,
        "page": 0,
        "perPage": 0
    },
    "token": null
}
```

#### 7.3 编辑-文章

- 地址PUT`/user/articles/{id}?draft=false`
- 参数
  - `title`
  - `content`
  - `cover`
    - `type`
    - `image`
    - `channelId`
    - `id`
- 返回

```json
{
    "code": "0",
    "msg": "文章更新成功",
    "data": {
        "id": 116,
        "title": "爱你",
        "status": 0,
        "commentCount": 0,
        "likeCount": 0,
        "readCount": 0,
        "channelId": 6,
        "pubDate": "2025-02-20 23:05:48",
        "content": "<p>测试测试册谔</p>",
        "cover": {
            "type": 1,
            "image": "http://localhost:8081/user/images/927704e1_logo.png"
        }
    },
    "token": null
}
```

#### 7.4 删除-文章

- 地址DELETE`/user/articles/{id}`
- 参数
  - `id`
- 返回
  - `文章删除成功`

#### 7.5 新增-文章

- 地址POST`/user/articles?draft=false`
- 参数
  - `title`
  - `content`
  - `cover`
    - `type`
    - `image`
  - `channelId`
- 返回

```json
{
    "id": 122,
    "title": "爱你",
    "status": 0,
    "commentCount": 0,
    "likeCount": 0,
    "readCount": 0,
    "channelId": 6,
    "pubDate": "2025-02-26 01:07:46",
    "content": "<p>我爱你</p>",
    "cover": {
        "type": 0,
        "image": null
    }
}
```

### 8. 其他接口

#### 8.1 获取-文章频道

- 地址GET`user/channels`
- 参数
  - `无`
- 返回

```json
[
    {
        "id": 1,
        "name": "推荐"
    },
    {
        "id": 2,
        "name": "科技"
    },
    {
        "id": 3,
        "name": "娱乐"
    }
]
```

#### 8.2 上传图片

- 地址POST`/user/upload`
- 参数
  - `image(binary)`
- 返回

```json
{
    "code": "0",
    "msg": "上传成功",
    "data": {
        "url": "http://localhost:8081/user/images/a20e491b_屏幕截图_2025-02-22_110739.png"
    },
    "token": null
}
```

#### 8.3 获取-图片

- 地址GET`user/images/{imageName}`
- 参数
  - `imageName`
- 返回
  - `图片`

---

## AI助手API接口文档

### 9. AI聊天接口

#### 9.1 发起AI对话

- **接口地址**：POST `/user/ai/chat`
- **认证要求**：需要JWT token
- **请求头**：
  ```
  Authorization: Bearer {token}
  Content-Type: application/json
  ```

- **请求参数**：

```json
{
    "sessionId": "会话ID（可选，不传则创建新会话）",
    "message": "用户输入的消息",
    "mode": "对话模式（可选）",
    "pageContext": {
        "page": "当前页面标识",
        "channelId": "频道ID（可选）",
        "articleId": "文章ID（可选）"
    }
}
```

**参数说明**：
- `sessionId`：会话唯一标识，用于维持对话上下文。若不提供则自动生成新会话
- `message`：用户的输入消息
- `mode`：对话模式（如：normal、search等），影响系统提示词
- `pageContext`：页面上下文，帮助AI理解用户所在的功能模块

- **响应成功示例**：

```json
{
    "code": "0",
    "msg": "OK",
    "data": {
        "sessionId": "550e8400-e29b-41d4-a716-446655440000",
        "assistantMessage": "根据您的查询，校园内有15篇最新文章。其中包括...",
        "ttsText": "根据您的查询，校园内有15篇最新文章",
        "toolCalls": [
            {
                "name": "get_recent_articles",
                "arguments": {
                    "limit": 5
                }
            }
        ],
        "references": [
            {
                "type": "article",
                "id": "116",
                "title": "最新校园通知",
                "url": "/articles/116"
            }
        ]
    },
    "token": null
}
```

**响应字段说明**：
- `sessionId`：当前会话ID，后续请求需要使用此ID
- `assistantMessage`：AI助手的回复文本
- `ttsText`：可用于文本转语音的简化版文本
- `toolCalls`：AI执行的工具调用列表
- `references`：相关引用资源（文章、数据等）

#### 9.2 获取会话历史

- **接口地址**：GET `/user/ai/session/{sessionId}/history`
- **认证要求**：需要JWT token
- **请求头**：
  ```
  Authorization: Bearer {token}
  ```

- **路径参数**：
  - `sessionId`：会话ID

- **响应示例**：

```json
{
    "code": "0",
    "msg": "OK",
    "data": {
        "sessionId": "550e8400-e29b-41d4-a716-446655440000",
        "messages": [
            {
                "role": "user",
                "content": "最近有什么校园动态吗？"
            },
            {
                "role": "assistant",
                "content": "根据我的查询，最近有以下校园动态..."
            },
            {
                "role": "user",
                "content": "能详细介绍一下吗？"
            },
            {
                "role": "assistant",
                "content": "当然可以，让我为您详细介绍..."
            }
        ]
    },
    "token": null
}
```

#### 9.3 获取工具架构

- **接口地址**：GET `/user/ai/tools/schema`
- **认证要求**：需要JWT token
- **请求头**：
  ```
  Authorization: Bearer {token}
  ```

- **响应示例**：

```json
{
    "code": "0",
    "msg": "OK",
    "data": [
        {
            "type": "function",
            "function": {
                "name": "get_article_count",
                "description": "获取文章总数",
                "parameters": {
                    "type": "object",
                    "properties": {}
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "get_recent_articles",
                "description": "获取最近发布的文章列表",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "limit": {
                            "type": "integer",
                            "description": "返回文章数量"
                        }
                    },
                    "required": ["limit"]
                }
            }
        }
    ],
    "token": null
}
```

### 10. 错误处理

#### AI服务错误响应

当AI服务出现错误时，返回以下格式：

```json
{
    "code": "500",
    "msg": "AI 服务暂时不可用，请稍后重试",
    "data": null,
    "token": null
}
```

**常见错误**：
- `500`：AI服务不可用（Ollama未运行或网络问题）
- `400`：请求参数错误
- `401`：未授权（token无效或过期）
- `429`：请求过于频繁

---

## Q&A

### 关于其他文档

本系统只是当前项目的分支，要去对应的模块看相应的文档

### 高校名单获取（ctrl+鼠标左键前往）

[最新全国高校数据库信息及全国地区数据表:本仓库提供了一个包含最新全国高校数据库信息及全国地区数据表的资源文件。该文件详细记录了全国2854所高校的相关信息，并附带了全国地区数据表，方便用户进行数据分析和研究 - GitCode](https://gitcode.com/open-source-toolkit/aadcc/overview?utm_source=tools_gitcode&index=bottom&type=card&&isLogin=1)

---

## 联系方式

- 项目主页：[GitHub](https://github.com/your-repo/Intelligent-Campus-Platform)
- 问题反馈：[Issues](https://github.com/your-repo/Intelligent-Campus-Platform/issues)
- 邮箱：contact@example.com

---

**智慧校园服务一体化平台** - 让校园生活更智能、更便捷！
