import {useState, useEffect} from 'react'
import {
    Card,
    Timeline,
    Input,
    Select,
    Button,
    Space,
    Typography,
    Breadcrumb,
    Tag,
    Modal,
    Form,
    Input as InputAntd,
    DatePicker,
    message,
    Empty,
    Divider,
    Badge,
    List,
    Segmented,
    Tooltip
} from 'antd'
import {
    SearchOutlined,
    PlusOutlined,
    ClockCircleOutlined,
    UserOutlined,
    TagOutlined,
    RocketOutlined,
    BugOutlined,
    EditOutlined,
    CheckCircleOutlined,
    SyncOutlined,
    CalendarOutlined,
    InfoCircleOutlined,
    StarFilled
} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import './index.scss'

const {Title, Text, Paragraph} = Typography
const {Option} = Select
const {TextArea} = InputAntd

/**
 * @typedef {Object} UpdateLog
 * @property {number} id
 * @property {string} version
 * @property {string} title
 * @property {string} type
 * @property {string} content
 * @property {string} author
 * @property {string} releaseDate
 * @property {string} createTime
 * @property {boolean} isHighlight
 */

/** 模拟更新日志数据 */
const mockUpdateLogs = [
    {
        id: 1,
        version: 'v1.3.0',
        title: 'AI 助手智能问答功能上线',
        type: 'feature',
        content: `# 智慧校园平台管理系统 v1.3.0 版本发布

## 🎉 新增功能

### AI 助手
- 实现前端文章管理 AI 助手功能
- 支持 Markdown 格式渲染，输出更美观
- 添加语音输入和朗读功能
- 提供快捷问题快速提问
- 支持 Function Calling，调用后端工具查询文章数据

### 文章管理优化
- 优化文章列表页的 UI 和交互体验
- 重构文章列表页 UI 与样式，优化筛选交互与视觉体验

## 🐛 问题修复

- 修复了文件删除逻辑并添加按 UID 查询功能
- 修复了文件名 UTF-8 编码问题
- 修复了文件大小字段并优化预览样式

## 🎨 UI/样式优化

- 统一页面头部样式并添加面包屑导航
- 调整轮播组件样式尺寸和间距以提升视觉一致性
- 调整轮播按钮样式，提升视觉体验

## 🚀 性能优化

- 减少了不必要的 API 请求
- 优化了组件渲染逻辑`,
        author: '管理员',
        releaseDate: '2024-04-16',
        createTime: '2024-04-16 10:00:00',
        isHighlight: true
    },
    {
        id: 2,
        version: 'v1.2.0',
        title: '文档管理与日志管理功能上线',
        type: 'feature',
        content: `# 智慧校园平台管理系统 v1.2.0 版本发布

## 🎉 新增功能

### 文档管理
- 实现文档管理页面功能及样式
- 左侧目录导航，右侧内容展示

### 日志管理
- 实现日志管理页面功能及样式
- 支持登录日志、操作日志筛选

### 菜单管理
- 实现菜单管理创建与列表功能
- 支持目录/菜单/按钮三种类型

### 系统设置
- 添加系统设置下前端设计

## 🐛 问题修复

- 修复了用户登录超时问题
- 修复了文件上传大小限制问题

## 🚀 性能优化

- 优化了图片加载速度
- 减少了首屏加载时间`,
        author: '管理员',
        releaseDate: '2024-03-15',
        createTime: '2024-03-15 10:00:00',
        isHighlight: false
    },
    {
        id: 3,
        version: 'v1.1.0',
        title: '用户管理与用户中心优化',
        type: 'feature',
        content: `# 智慧校园平台管理系统 v1.1.0 版本发布

## 🎉 新增功能

### 用户管理
- 完善用户列表和创建用户功能及样式
- 用户状态启用/禁用

### 用户中心
- 重构用户中心统计模块
- 重构用户中心和雷达图组件

### 仪表盘
- 重构首页仪表盘组件样式和交互

### 菜单管理
- 实现菜单管理创建与列表功能

## 🐛 问题修复

- 修复了部分页面样式问题
- 优化了列表加载性能`,
        author: '管理员',
        releaseDate: '2024-02-28',
        createTime: '2024-02-28 14:30:00',
        isHighlight: false
    },
    {
        id: 4,
        version: 'v1.0.1',
        title: '发布页优化与样式调整',
        type: 'fix',
        content: `# v1.0.1 版本更新

## 🎨 UI/样式优化

- 统一页面头部样式并添加面包屑导航
- 重构文章发布页 UI 并增强用户体验
- 优化发布页布局和样式，增强用户体验
- 删除前端没用到的已引用组件

## 🐛 问题修复

- 修复了登录页面样式问题
- 修复了菜单折叠时图标显示异常
- 修复了表格排序失效问题

## 🚀 性能优化

- 优化了侧边栏折叠动画
- 减少了内存占用`,
        author: '管理员',
        releaseDate: '2024-02-15',
        createTime: '2024-02-15 09:00:00',
        isHighlight: false
    },
    {
        id: 5,
        version: 'v1.0.0',
        title: '智慧校园平台管理系统正式发布',
        type: 'feature',
        content: `# 🎉 智慧校园平台管理系统 v1.0.0 正式发布！

## 平台介绍

智慧校园服务一体化平台是一个面向学校的综合性管理系统，旨在为学校管理员和教师提供便捷的教学管理、内容发布和数据分析功能。

## 🏗️ 系统架构

- **前端框架**: React 18.3.1 + Ant Design 5.23.4
- **后端框架**: Spring Boot 3.3.4
- **数据库**: MySQL 8.0 + Redis 7.0

## 📦 初始功能

### 仪表盘
- 首页数据统计
- 用户中心

### 文章管理
- 文章列表
- 创建文章
- 主页轮播图

### 用户管理
- 用户列表
- 创建用户

### 系统管理
- 系统设置
- 角色管理

## ✅ 测试情况

- 已完成单元测试
- 已完成集成测试
- 已通过安全扫描

## 📝 后续规划

- 更多业务功能开发
- 性能持续优化
- 用户体验提升

感谢您的关注与支持！`,
        author: '管理员',
        releaseDate: '2024-01-15',
        createTime: '2024-01-15 08:00:00',
        isHighlight: false
    }
]

/** 版本类型配置 */
const typeConfig = {
    feature: {color: 'green', label: '新功能', icon: <RocketOutlined/>},
    fix: {color: 'red', label: '问题修复', icon: <BugOutlined/>},
    optimize: {color: 'blue', label: '性能优化', icon: <SyncOutlined/>},
    other: {color: 'default', label: '其他', icon: <InfoCircleOutlined/>}
}

const Update = () => {
    const [loading, setLoading] = useState(false)
    const [updateLogs, setUpdateLogs] = useState([])
    const [searchKeyword, setSearchKeyword] = useState('')
    const [typeFilter, setTypeFilter] = useState('all')
    const [viewMode, setViewMode] = useState('timeline')
    const [selectedLog, setSelectedLog] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [form] = Form.useForm()

    // 加载更新日志数据
    useEffect(() => {
        fetchUpdateLogs()
    }, [])

    /**
     * 获取更新日志列表
     */
    const fetchUpdateLogs = () => {
        setLoading(true)
        setTimeout(() => {
            setUpdateLogs(mockUpdateLogs)
            setLoading(false)
        }, 300)
    }

    /**
     * 处理搜索
     */
    const handleSearch = (value) => {
        setSearchKeyword(value)
        filterUpdateLogs(value, typeFilter)
    }

    /**
     * 处理类型筛选
     */
    const handleTypeChange = (value) => {
        setTypeFilter(value)
        filterUpdateLogs(searchKeyword, value)
    }

    /**
     * 筛选更新日志
     */
    const filterUpdateLogs = (keyword, type) => {
        let filtered = [...mockUpdateLogs]

        // 类型筛选
        if (type !== 'all') {
            filtered = filtered.filter(log => log.type === type)
        }

        // 关键词筛选
        if (keyword) {
            filtered = filtered.filter(log =>
                log.version.toLowerCase().includes(keyword.toLowerCase()) ||
                log.title.toLowerCase().includes(keyword.toLowerCase()) ||
                log.content.toLowerCase().includes(keyword.toLowerCase())
            )
        }

        setUpdateLogs(filtered)
    }

    /**
     * 处理查看详情
     */
    const handleViewDetail = (log) => {
        setSelectedLog(log)
        setIsModalVisible(true)
    }

    /**
     * 处理发布新版本
     */
    const handlePublish = () => {
        message.info('发布功能开发中...')
    }

    /**
     * 渲染版本类型标签
     */
    const getTypeTag = (type) => {
        const config = typeConfig[type] || typeConfig.other
        return <Tag color={config.color} icon={config.icon}>{config.label}</Tag>
    }

    /**
     * 渲染内容（简化版Markdown）
     */
    const renderContent = (content) => {
        return content.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
                return <Title key={index} level={2}>{line.replace('# ', '')}</Title>
            } else if (line.startsWith('## ')) {
                return <Title key={index} level={3} style={{marginTop: 16}}>{line.replace('## ', '')}</Title>
            } else if (line.startsWith('### ')) {
                return <Title key={index} level={4} style={{marginTop: 12}}>{line.replace('### ', '')}</Title>
            } else if (line.startsWith('- ') || line.startsWith('* ')) {
                return <Paragraph key={index} style={{marginLeft: 20, marginBottom: 4}}>• {line.replace(/^[*-] /, '')}</Paragraph>
            } else if (line.startsWith('**') && line.endsWith('**')) {
                return <Text strong key={index}>{line.replace(/\*\*/g, '')}</Text>
            } else if (line.trim() === '') {
                return <br key={index}/>
            } else {
                return <Paragraph key={index}>{line}</Paragraph>
            }
        })
    }

    /**
     * 时间线视图渲染
     */
    const renderTimelineView = () => (
        <Timeline
            mode="left"
            items={updateLogs.map(log => ({
                label: (
                    <div className="timeline-date">
                        <CalendarOutlined/> {log.releaseDate}
                    </div>
                ),
                color: log.type === 'feature' ? 'green' : log.type === 'fix' ? 'red' : 'blue',
                children: (
                    <div className="timeline-item" onClick={() => handleViewDetail(log)}>
                        <div className="timeline-header">
                            <Space>
                                <Text strong className="version-text">{log.version}</Text>
                                {getTypeTag(log.type)}
                                {log.isHighlight && <Tag color="gold" icon={<StarFilled/>}>最新</Tag>}
                            </Space>
                        </div>
                        <div className="timeline-title">
                            <Text strong>{log.title}</Text>
                        </div>
                        <div className="timeline-meta">
                            <Text type="secondary">
                                <UserOutlined/> {log.author}
                            </Text>
                        </div>
                    </div>
                )
            }))}
        />
    )

    /**
     * 列表视图渲染
     */
    const renderListView = () => (
        <List
            itemLayout="vertical"
            dataSource={updateLogs}
            renderItem={log => (
                <List.Item
                    key={log.id}
                    className="update-list-item"
                    onClick={() => handleViewDetail(log)}
                    actions={[
                        <Text key="type" type="secondary">{getTypeTag(log.type)}</Text>,
                        <Text key="date" type="secondary"><CalendarOutlined/> {log.releaseDate}</Text>,
                        <Text key="author" type="secondary"><UserOutlined/> {log.author}</Text>
                    ]}
                >
                    <List.Item.Meta
                        title={
                            <Space>
                                <Text strong className="version-text">{log.version}</Text>
                                {log.isHighlight && <Tag color="gold" icon={<StarFilled/>}>最新</Tag>}
                            </Space>
                        }
                        description={
                            <Text strong>{log.title}</Text>
                        }
                    />
                    <Paragraph
                        ellipsis={{rows: 3}}
                        className="update-summary"
                    >
                        {log.content.replace(/[#*`\n]/g, ' ').substring(0, 200)}...
                    </Paragraph>
                </List.Item>
            )}
        />
    )

    return (
        <div className="update-container">
            {/* 页面头部 */}
            <Card className="update-card">
                <div className="card-header">
                    <Breadcrumb
                        items={[
                            {title: <Link to={'/'}><RocketOutlined/>仪表盘</Link>},
                            {title: '更新日志'}
                        ]}
                    />
                    <Title level={4} style={{marginTop: 10, marginBottom: 0}}>更新日志</Title>
                </div>
            </Card>

            {/* 筛选区域 */}
            <Card className="filter-card">
                <div className="filter-content">
                    <div className="filter-left">
                        <Input.Search
                            placeholder="搜索版本号/标题/内容"
                            allowClear
                            enterButton={<SearchOutlined/>}
                            onSearch={handleSearch}
                            style={{width: 280}}
                            className="search-input"
                        />
                        <Select
                            placeholder="选择类型"
                            style={{width: 140}}
                            value={typeFilter}
                            onChange={handleTypeChange}
                            className="type-select"
                        >
                            <Option value="all">全部类型</Option>
                            <Option value="feature">新功能</Option>
                            <Option value="fix">问题修复</Option>
                            <Option value="optimize">性能优化</Option>
                            <Option value="other">其他</Option>
                        </Select>
                    </div>
                    <div className="filter-right">
                        <Segmented
                            value={viewMode}
                            onChange={setViewMode}
                            options={[
                                {value: 'timeline', icon: <ClockCircleOutlined/>, label: '时间线'},
                                {value: 'list', icon: <BugOutlined/>, label: '列表'}
                            ]}
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined/>}
                            onClick={handlePublish}
                            className="publish-btn"
                        >
                            发布新版本
                        </Button>
                    </div>
                </div>
            </Card>

            {/* 统计信息 */}
            <Card className="stats-card">
                <div className="stats-content">
                    <div className="stat-item">
                        <Badge count={updateLogs.length} style={{backgroundColor: '#1890ff'}}>
                            <RocketOutlined className="stat-icon"/>
                        </Badge>
                        <Text>总版本数</Text>
                    </div>
                    <div className="stat-item">
                        <Badge count={updateLogs.filter(l => l.type === 'feature').length} style={{backgroundColor: '#52c41a'}}>
                            <BugOutlined className="stat-icon"/>
                        </Badge>
                        <Text>新功能</Text>
                    </div>
                    <div className="stat-item">
                        <Badge count={updateLogs.filter(l => l.type === 'fix').length} style={{backgroundColor: '#ff4d4f'}}>
                            <EditOutlined className="stat-icon"/>
                        </Badge>
                        <Text>问题修复</Text>
                    </div>
                    <div className="stat-item">
                        <Badge count={updateLogs.filter(l => l.type === 'optimize').length} style={{backgroundColor: '#722ed1'}}>
                            <SyncOutlined className="stat-icon"/>
                        </Badge>
                        <Text>性能优化</Text>
                    </div>
                </div>
            </Card>

            {/* 更新日志内容 */}
            <Card className="content-card">
                {updateLogs.length > 0 ? (
                    viewMode === 'timeline' ? renderTimelineView() : renderListView()
                ) : (
                    <Empty description="暂无更新日志"/>
                )}
            </Card>

            {/* 详情弹窗 */}
            <Modal
                title={
                    <Space>
                        <RocketOutlined/>
                        <span>版本详情 - {selectedLog?.version}</span>
                    </Space>
                }
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setIsModalVisible(false)}>
                        关闭
                    </Button>
                ]}
                width={800}
                className="detail-modal"
            >
                {selectedLog && (
                    <div className="detail-content">
                        <div className="detail-header">
                            <Space>
                                <Title level={4} style={{margin: 0}}>{selectedLog.version}</Title>
                                {getTypeTag(selectedLog.type)}
                                {selectedLog.isHighlight && <Tag color="gold" icon={<StarFilled/>}>最新版本</Tag>}
                            </Space>
                        </div>
                        <div className="detail-meta">
                            <Space>
                                <Text><UserOutlined/> {selectedLog.author}</Text>
                                <Text><CalendarOutlined/> {selectedLog.releaseDate}</Text>
                            </Space>
                        </div>
                        <Divider/>
                        <div className="detail-body">
                            {renderContent(selectedLog.content)}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default Update
