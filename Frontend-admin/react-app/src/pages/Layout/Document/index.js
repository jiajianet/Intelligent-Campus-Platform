import {useState, useEffect} from 'react'
import {
    Card,
    Tree,
    Input,
    Select,
    Button,
    Space,
    Typography,
    Breadcrumb,
    Tag,
    Divider,
    Empty,
    Tooltip,
    Badge,
    Row,
    Col
} from 'antd'
import {
    FileTextOutlined,
    FolderOutlined,
    FolderOpenOutlined,
    SearchOutlined,
    EyeOutlined,
    ClockCircleOutlined,
    UserOutlined,
    SyncOutlined,
    BookOutlined,
    AppstoreOutlined,
    RightOutlined
} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import './index.scss'

// TODO: 后端API未实现
// 使用文档功能需要实现以下后端API:
// - GET /api/doc/categories - 获取文档分类
// - GET /api/doc/list - 获取文档列表（支持分类筛选）
// - GET /api/doc/{id} - 获取文档详情
// - POST /api/doc - 创建文档
// - PUT /api/doc/{id} - 更新文档
// - DELETE /api/doc/{id} - 删除文档
// - GET /api/doc/search - 全文搜索文档

const {Title, Text, Paragraph} = Typography
const {Option} = Select

/**
 * @typedef {Object} DocCategory
 * @property {number} id
 * @property {string} name
 * @property {string} icon
 */

/**
 * @typedef {Object} DocItem
 * @property {number} id
 * @property {string} title
 * @property {string} category
 * @property {string} content
 * @property {string[]} tags
 * @property {string} author
 * @property {string} createTime
 * @property {string} updateTime
 * @property {number} viewCount
 */

/** 模拟文档分类数据 */
const mockCategories = [
    {id: 1, name: '用户管理', icon: 'user', key: 'user'},
    {id: 2, name: '权限管理', icon: 'safety', key: 'permission'},
    {id: 3, name: '系统配置', icon: 'setting', key: 'system'},
    {id: 4, name: '运维管理', icon: 'tool', key: 'operation'},
    {id: 5, name: '帮助中心', icon: 'question', key: 'help'}
]

/** 模拟文档数据 */
const mockDocuments = [
    {
        id: 1,
        title: '用户创建与权限管理',
        category: 'user',
        categoryName: '用户管理',
        content: `# 用户创建与权限管理

## 概述
本文档介绍如何在智慧校园平台中创建用户并分配相应的权限。

## 创建用户步骤

### 1. 登录管理后台
使用管理员账号登录系统后台。

### 2. 进入用户管理
点击左侧菜单"用户管理" -> "用户列表"。

### 3. 创建新用户
点击右上角"创建用户"按钮，填写以下信息：
- 用户名（必填，唯一）
- 密码（必填，至少6位）
- 真实姓名
- 邮箱
- 手机号
- 角色分配

### 4. 分配角色
创建用户后，可以为用户分配不同的角色，每个角色拥有不同的权限。

## 权限说明

| 角色 | 权限描述 |
|-----|---------|
| 超级管理员 | 拥有所有权限 |
| 普通管理员 | 部分管理权限 |
| 教师 | 内容管理权限 |
| 学生 | 基本查看权限 |

## 常见问题

**Q: 用户名可以重复吗？**
A: 不可以，用户名必须唯一。

**Q: 如何禁用用户账号？**
A: 在用户列表中，点击用户状态开关即可启用/禁用。`,
        tags: ['用户', '创建', '权限'],
        author: '管理员',
        createTime: '2024-01-15 10:30:00',
        updateTime: '2024-03-10 15:20:00',
        viewCount: 1250
    },
    {
        id: 2,
        title: '角色与权限配置',
        category: 'permission',
        categoryName: '权限管理',
        content: `# 角色与权限配置

## 角色管理概述
角色管理是系统的核心功能之一，通过角色可以灵活控制用户的权限。

## 创建角色

### 基本信息
- 角色名称：输入角色的显示名称
- 角色标识：唯一标识符，用于代码中权限判断
- 角色描述：详细说明角色的职责

### 权限配置
系统采用树形结构管理权限：
1. 一级权限：模块级（如用户管理、文章管理）
2. 二级权限：页面级（如用户列表、创建用户）
3. 三级权限：操作级（如查看、编辑、删除）

## 权限分配示例

\`\`\`javascript
// 示例：判断用户是否有权限
function hasPermission(userRole, permissionKey) {
    const rolePermissions = getRolePermissions(userRole)
    return rolePermissions.includes(permissionKey)
}
\`\`\`

## 最佳实践

1. **最小权限原则**：只分配必要的权限
2. **角色清晰**：每个角色职责明确
3. **定期审计**：定期检查权限分配是否合理`,
        tags: ['角色', '权限', '配置'],
        author: '管理员',
        createTime: '2024-01-20 14:00:00',
        updateTime: '2024-03-08 09:30:00',
        viewCount: 980
    },
    {
        id: 3,
        title: '系统基本设置',
        category: 'system',
        categoryName: '系统配置',
        content: `# 系统基本设置

## 系统信息配置

### 基本信息
- 系统名称：智慧校园管理平台
- 系统版本：v1.0.0
- 版权信息：© 2024 智慧校园

### 邮件配置
配置SMTP服务器用于发送邮件通知：
- SMTP服务器地址
- 端口号（默认25或465）
- 用户名和密码
- 发件人邮箱

### 上传配置
- 最大文件大小：10MB
- 允许的文件类型：jpg, png, pdf, doc, docx
- 存储路径：/uploads

## 安全设置

### 密码策略
- 最小密码长度：6位
- 密码复杂度要求：大写+小写+数字
- 登录失败锁定：5次

### 会话管理
- Session超时时间：30分钟
- Token有效期：7天`,
        tags: ['系统', '配置', '设置'],
        author: '管理员',
        createTime: '2024-02-01 09:00:00',
        updateTime: '2024-03-01 11:00:00',
        viewCount: 756
    },
    {
        id: 4,
        title: '日志查看与分析',
        category: 'operation',
        categoryName: '运维管理',
        content: `# 日志查看与分析

## 日志类型

### 登录日志
记录用户的登录和登出行为，包括：
- 登录时间
- IP地址
- 登录结果（成功/失败）

### 操作日志
记录用户在系统中的操作：
- 操作类型（增删改查）
- 操作对象
- 操作结果
- 耗时

## 日志筛选

### 按时间筛选
选择日期范围查看特定时间段内的日志。

### 按用户筛选
输入用户名筛选特定用户的操作记录。

### 按操作类型筛选
- 用户登录/登出
- 数据创建/修改/删除
- 系统配置变更

## 日志导出
支持将日志导出为Excel格式，便于离线分析。

## 日志保留策略
- 登录日志：保留90天
- 操作日志：保留180天
- 自动清理过期日志`,
        tags: ['日志', '运维', '监控'],
        author: '管理员',
        createTime: '2024-02-10 16:00:任务',
        updateTime: '2024-02-28 14:30:00',
        viewCount: 520
    },
    {
        id: 5,
        title: '定时任务配置',
        category: 'operation',
        categoryName: '运维管理',
        content: `# 定时任务配置

## 定时任务概述
定时任务用于自动化执行系统的周期性任务。

## 创建任务

### 基本信息
- 任务名称：任务的显示名称
- 任务标识：唯一标识符
- Cron表达式：任务的执行时间规则

### 常用Cron表达式

| 表达式 | 含义 |
|--------|------|
| 0 0 2 * * ? | 每天凌晨2点 |
| 0 0/30 * * * ? | 每30分钟 |
| 0 0 0/6 * * ? | 每6小时 |
| 0 0 ? * MON-FRI | 工作日每天 |

### 执行方法
指定任务执行的具体方法：
\`\`\`
BackupService.backup
EmailService.sendNotification
LogService.cleanLogs
\`\`\`

## 任务监控

### 执行日志
每次任务执行都会记录日志，包括：
- 执行时间
- 执行结果（成功/失败）
- 执行耗时
- 详细输出

### 任务状态
- 运行中：任务正常执行
- 已暂停：任务暂停，不会执行`,
        tags: ['任务', '定时', '调度'],
        author: '管理员',
        createTime: '2024-02-15 10:00:00',
        updateTime: '2024-03-05 16:45:00',
        viewCount: 420
    },
    {
        id: 6,
        title: '常见问题FAQ',
        category: 'help',
        categoryName: '帮助中心',
        content: `# 常见问题FAQ

## 账号相关

**Q: 忘记密码怎么办？**
A: 联系管理员重置密码。

**Q: 如何修改个人头像？**
A: 进入"用户中心"，点击头像进行上传。

**Q: 账号被锁定如何解决？**
A: 等待30分钟后自动解锁，或联系管理员。

## 系统使用

**Q: 上传文件大小有限制吗？**
A: 默认最大10MB。

**Q: 支持哪些浏览器？**
A: 推荐使用Chrome、Firefox、Edge最新版本。

**Q: 如何反馈问题？**
A: 在"常见问题"页面提交反馈，或联系技术支持。`,
        tags: ['FAQ', '帮助', '问题'],
        author: '管理员',
        createTime: '2024-03-01 09:00:00',
        updateTime: '2024-03-12 10:00:00',
        viewCount: 2100
    }
]

/** 文档目录树数据 */
const generateDocTree = (categories, documents) => {
    return categories.map(cat => ({
        key: cat.key,
        title: cat.name,
        icon: cat.icon,
        children: documents
            .filter(doc => doc.category === cat.key)
            .map(doc => ({
                key: `doc-${doc.id}`,
                title: doc.title,
                isDoc: true,
                docId: doc.id
            }))
    }))
}

const Document = () => {
    const [loading, setLoading] = useState(false)
    const [selectedKeys, setSelectedKeys] = useState([])
    const [documents, setDocuments] = useState([])
    const [currentDoc, setCurrentDoc] = useState(null)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [treeData, setTreeData] = useState([])

    // 加载文档数据
    useEffect(() => {
        fetchDocuments()
    }, [])

    /**
     * 获取文档列表
     */
    const fetchDocuments = () => {
        setLoading(true)
        setTimeout(() => {
            setDocuments(mockDocuments)
            setTreeData(generateDocTree(mockCategories, mockDocuments))
            // 默认选中第一个文档
            if (mockDocuments.length > 0) {
                setSelectedKeys([`doc-${mockDocuments[0].id}`])
                setCurrentDoc(mockDocuments[0])
            }
            setLoading(false)
        }, 300)
    }

    /**
     * 处理树节点选择
     */
    const handleTreeSelect = (keys, {node}) => {
        if (node.isDoc) {
            setSelectedKeys(keys)
            const doc = documents.find(d => d.id === node.docId)
            setCurrentDoc(doc)
        }
    }

    /**
     * 处理搜索
     */
    const handleSearch = (value) => {
        setSearchKeyword(value)
        if (value) {
            const filtered = mockDocuments.filter(doc =>
                doc.title.toLowerCase().includes(value.toLowerCase()) ||
                doc.content.toLowerCase().includes(value.toLowerCase()) ||
                doc.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
            )
            setDocuments(filtered)
            setTreeData(generateDocTree(mockCategories, filtered))
        } else {
            setDocuments(mockDocuments)
            setTreeData(generateDocTree(mockCategories, mockDocuments))
        }
    }

    /**
     * 处理分类筛选
     */
    const handleCategoryChange = (value) => {
        setCategoryFilter(value)
        if (value === 'all') {
            setDocuments(mockDocuments)
            setTreeData(generateDocTree(mockCategories, mockDocuments))
        } else {
            const filtered = mockDocuments.filter(doc => doc.category === value)
            setDocuments(filtered)
            setTreeData(generateDocTree(mockCategories, filtered))
        }
    }

    /**
     * 渲染树节点图标
     */
    const renderTreeIcon = (node) => {
        if (node.isDoc) {
            return <FileTextOutlined/>
        }
        return selectedKeys.includes(node.key) ?
            <FolderOpenOutlined/> : <FolderOutlined/>
    }

    return (
        <div className="document-container">
            {/* 页面头部 */}
            <Card className="doc-card">
                <div className="card-header">
                    <Breadcrumb
                        items={[
                            {title: <Link to={'/help'}><BookOutlined/>帮助中心</Link>},
                            {title: '使用文档'}
                        ]}
                    />
                    <Title level={4} style={{marginTop: 10, marginBottom: 0}}>使用文档</Title>
                </div>
            </Card>

            {/* 筛选区域 */}
            <Card className="filter-card">
                <div className="filter-content">
                    <div className="filter-left">
                        <Input.Search
                            placeholder="搜索文档标题/内容/标签"
                            allowClear
                            enterButton={<SearchOutlined/>}
                            onSearch={handleSearch}
                            style={{width: 300}}
                            className="search-input"
                        />
                        <Select
                            placeholder="选择分类"
                            style={{width: 160}}
                            value={categoryFilter}
                            onChange={handleCategoryChange}
                            className="category-select"
                        >
                            <Option value="all">全部分类</Option>
                            {mockCategories.map(cat => (
                                <Option key={cat.key} value={cat.key}>
                                    {cat.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="filter-right">
                        <Text type="secondary">
                            共 {documents.length} 篇文档
                        </Text>
                    </div>
                </div>
            </Card>

            {/* 文档主体 */}
            <div className="doc-main">
                {/* 左侧目录 */}
                <Card className="sidebar-card">
                    <div className="doc-tree">
                        {treeData.length > 0 ? (
                            <Tree
                                showIcon
                                treeData={treeData}
                                selectedKeys={selectedKeys}
                                onSelect={handleTreeSelect}
                                icon={renderTreeIcon}
                                defaultExpandAll
                                blockNode
                            />
                        ) : (
                            <Empty description="暂无文档"/>
                        )}
                    </div>
                </Card>

                {/* 右侧内容 */}
                <Card className="content-card">
                    {currentDoc ? (
                        <div className="doc-content">
                            <div className="doc-header">
                                <Title level={3}>{currentDoc.title}</Title>
                                <div className="doc-meta">
                                    <Space>
                                        <Tag icon={<UserOutlined/>} color="blue">
                                            {currentDoc.author}
                                        </Tag>
                                        <Tag icon={<ClockCircleOutlined/>}>
                                            更新于 {currentDoc.updateTime}
                                        </Tag>
                                        <Badge
                                            count={<EyeOutlined/>}
                                            style={{backgroundColor: '#fff', color: '#999', boxShadow: 'none'}}
                                        >
                                            <Text type="secondary">{currentDoc.viewCount}</Text>
                                        </Badge>
                                    </Space>
                                </div>
                                <div className="doc-tags">
                                    {currentDoc.tags.map(tag => (
                                        <Tag key={tag} color="purple">{tag}</Tag>
                                    ))}
                                </div>
                            </div>
                            <Divider/>
                            <div className="doc-body">
                                <Paragraph>
                                    {currentDoc.content.split('\n').map((line, index) => {
                                        if (line.startsWith('# ')) {
                                            return <Title key={index} level={2}>{line.replace('# ', '')}</Title>
                                        } else if (line.startsWith('## ')) {
                                            return <Title key={index} level={3}>{line.replace('## ', '')}</Title>
                                        } else if (line.startsWith('### ')) {
                                            return <Title key={index} level={4}>{line.replace('### ', '')}</Title>
                                        } else if (line.startsWith('- ')) {
                                            return <Paragraph key={index} style={{marginLeft: 20}}>• {line.replace('- ', '')}</Paragraph>
                                        } else if (line.startsWith('| ')) {
                                            return <Paragraph key={index} style={{marginLeft: 20, fontFamily: 'monospace'}}>{line}</Paragraph>
                                        } else if (line.startsWith('```')) {
                                            return null
                                        } else if (line.trim() === '') {
                                            return <br key={index}/>
                                        } else {
                                            return <Paragraph key={index}>{line}</Paragraph>
                                        }
                                    })}
                                </Paragraph>
                            </div>
                        </div>
                    ) : (
                        <Empty description="请选择左侧文档"/>
                    )}
                </Card>
            </div>
        </div>
    )
}

export default Document
