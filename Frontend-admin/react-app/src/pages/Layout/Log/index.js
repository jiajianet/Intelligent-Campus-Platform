import {useState, useEffect} from 'react'
import {
    Card,
    Table,
    Button,
    Space,
    Input,
    Select,
    DatePicker,
    Tag,
    Modal,
    Descriptions,
    message,
    Typography,
    Breadcrumb,
    Tooltip,
    Badge,
    Radio,
    Tabs
} from 'antd'
import {
    SearchOutlined,
    ReloadOutlined,
    EyeOutlined,
    ExportOutlined,
    DeleteOutlined,
    LoginOutlined,
    ToolOutlined,
    BugOutlined,
    FileTextOutlined,
    ClockCircleOutlined
} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import './index.scss'

const {Title, Text} = Typography
const {Option} = Select
const {RangePicker} = DatePicker
const {TextArea} = Input

/**
 * @typedef {Object} LogEntry
 * @property {number} id
 * @property {number} userId
 * @property {string} username
 * @property {string} operation
 * @property {string} method
 * @property {string} params
 * @property {string} result
 * @property {string} ip
 * @property {number} duration
 * @property {string} createTime
 * @property {string} logType
 */

/** 模拟日志数据 */
const mockLogs = [
    {
        id: 1,
        userId: 1,
        username: 'admin',
        operation: '用户登录',
        method: 'POST',
        params: '{"username": "admin", "password": "***"}',
        result: '{"code": 200, "message": "登录成功"}',
        ip: '192.168.1.100',
        duration: 125,
        createTime: '2024-03-14 10:30:00',
        logType: 'login'
    },
    {
        id: 2,
        userId: 2,
        username: 'teacher_zhang',
        operation: '创建文章',
        method: 'POST',
        params: '{"title": "智慧校园介绍", "content": "..."}',
        result: '{"code": 200, "id": 1001}',
        ip: '192.168.1.105',
        duration: 320,
        createTime: '2024-03-14 10:35:22',
        logType: 'operation'
    },
    {
        id: 3,
        userId: 1,
        username: 'admin',
        operation: '修改系统设置',
        method: 'PUT',
        params: '{"theme": "dark", "language": "zh-CN"}',
        result: '{"code": 200}',
        ip: '192.168.1.100',
        duration: 85,
        createTime: '2024-03-14 10:40:15',
        logType: 'operation'
    },
    {
        id: 4,
        userId: 3,
        username: 'student_wang',
        operation: '用户登出',
        method: 'POST',
        params: '{}',
        result: '{"code": 200}',
        ip: '192.168.1.110',
        duration: 45,
        createTime: '2024-03-14 10:45:30',
        logType: 'login'
    },
    {
        id: 5,
        userId: 2,
        username: 'teacher_zhang',
        operation: '查询用户列表',
        method: 'GET',
        params: '{"page": 1, "pageSize": 10}',
        result: '{"code": 200, "total": 50}',
        ip: '192.168.1.105',
        duration: 156,
        createTime: '2024-03-14 10:50:18',
        logType: 'operation'
    },
    {
        id: 6,
        userId: 1,
        username: 'admin',
        operation: '删除用户',
        method: 'DELETE',
        params: '{"id": 10}',
        result: '{"code": 200}',
        ip: '192.168.1.100',
        duration: 210,
        createTime: '2024-03-14 11:00:05',
        logType: 'operation'
    },
    {
        id: 7,
        userId: 4,
        username: 'editor_chen',
        operation: '用户登录',
        method: 'POST',
        params: '{"username": "editor_chen", "password": "***"}',
        result: '{"code": 200, "message": "登录成功"}',
        ip: '192.168.1.120',
        duration: 98,
        createTime: '2024-03-14 11:15:42',
        logType: 'login'
    },
    {
        id: 8,
        userId: 2,
        username: 'teacher_zhang',
        operation: '更新文章',
        method: 'PUT',
        params: '{"id": 1001, "title": "智慧校园介绍(更新)"}',
        result: '{"code": 200}',
        ip: '192.168.1.105',
        duration: 180,
        createTime: '2024-03-14 11:30:20',
        logType: 'operation'
    }
]

/** 操作类型选项 */
const operationOptions = [
    {value: 'all', label: '全部操作'},
    {value: '用户登录', label: '用户登录'},
    {value: '用户登出', label: '用户登出'},
    {value: '创建文章', label: '创建文章'},
    {value: '更新文章', label: '更新文章'},
    {value: '删除文章', label: '删除文章'},
    {value: '查询用户列表', label: '查询用户列表'},
    {value: '创建用户', label: '创建用户'},
    {value: '修改系统设置', label: '修改系统设置'}
]

/** 日志类型选项 */
const logTypeOptions = [
    {value: 'all', label: '全部'},
    {value: 'login', label: '登录日志'},
    {value: 'operation', label: '操作日志'}
]

const Log = () => {
    const [loading, setLoading] = useState(false)
    const [logs, setLogs] = useState([])
    const [total, setTotal] = useState(0)

    // 筛选条件
    const [searchKeyword, setSearchKeyword] = useState('')
    const [logType, setLogType] = useState('all')
    const [operation, setOperation] = useState('all')
    const [dateRange, setDateRange] = useState([])

    // 分页
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    })

    // Modal状态
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [currentLog, setCurrentLog] = useState(null)

    // Tab状态
    const [activeTab, setActiveTab] = useState('all')

    // 加载日志数据
    useEffect(() => {
        fetchLogs()
    }, [pagination.current, pagination.pageSize, logType, operation])

    // 筛选时重置分页
    useEffect(() => {
        setPagination(prev => ({...prev, current: 1}))
        fetchLogs()
    }, [searchKeyword, dateRange])

    /**
     * 获取日志列表
     */
    const fetchLogs = () => {
        setLoading(true)
        setTimeout(() => {
            let filteredData = [...mockLogs]

            // 日志类型筛选
            if (logType !== 'all') {
                filteredData = filteredData.filter(log => log.logType === logType)
            }

            // 操作类型筛选
            if (operation !== 'all') {
                filteredData = filteredData.filter(log => log.operation === operation)
            }

            // 关键词筛选
            if (searchKeyword) {
                filteredData = filteredData.filter(log =>
                    log.username.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    log.operation.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    log.ip.toLowerCase().includes(searchKeyword.toLowerCase())
                )
            }

            // 日期范围筛选
            if (dateRange && dateRange.length === 2) {
                const startDate = dateRange[0].format('YYYY-MM-DD')
                const endDate = dateRange[1].format('YYYY-MM-DD')
                filteredData = filteredData.filter(log => {
                    const logDate = log.createTime.split(' ')[0]
                    return logDate >= startDate && logDate <= endDate
                })
            }

            setLogs(filteredData)
            setTotal(filteredData.length)
            setLoading(false)
        }, 500)
    }

    /**
     * 处理搜索
     */
    const handleSearch = (value) => {
        setSearchKeyword(value)
    }

    /**
     * 处理日志类型切换
     */
    const handleLogTypeChange = (value) => {
        setLogType(value)
    }

    /**
     * 处理操作类型切换
     */
    const handleOperationChange = (value) => {
        setOperation(value)
    }

    /**
     * 处理日期范围变化
     */
    const handleDateRangeChange = (dates) => {
        setDateRange(dates || [])
    }

    /**
     * 处理查看详情
     */
    const handleViewDetail = (record) => {
        setCurrentLog(record)
        setIsModalVisible(true)
    }

    /**
     * 处理导出
     */
    const handleExport = () => {
        message.success('日志导出功能开发中...')
    }

    /**
     * 处理刷新
     */
    const handleRefresh = () => {
        fetchLogs()
        message.success('刷新成功')
    }

    /**
     * 处理Tab切换
     */
    const handleTabChange = (key) => {
        setLogType(key)
        setActiveTab(key)
    }

    /**
     * 分页变化
     */
    const handleTableChange = (newPagination) => {
        setPagination({
            current: newPagination.current,
            pageSize: newPagination.pageSize
        })
    }

    /**
     * 获取日志类型图标
     */
    const getLogTypeIcon = (type) => {
        switch (type) {
            case 'login':
                return <LoginOutlined style={{color: '#52c41a'}}/>
            case 'operation':
                return <ToolOutlined style={{color: '#1890ff'}}/>
            default:
                return <FileTextOutlined/>
        }
    }

    /**
     * 获取日志类型标签
     */
    const getLogTypeTag = (type) => {
        switch (type) {
            case 'login':
                return <Tag icon={<LoginOutlined/>} color="success">登录</Tag>
            case 'operation':
                return <Tag icon={<ToolOutlined/>} color="processing">操作</Tag>
            default:
                return <Tag>未知</Tag>
        }
    }

    // 表格列配置
    const columns = [
        {
            title: '日志ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            align: 'center'
        },
        {
            title: '日志类型',
            dataIndex: 'logType',
            key: 'logType',
            width: 100,
            align: 'center',
            render: (type) => getLogTypeTag(type)
        },
        {
            title: '操作用户',
            dataIndex: 'username',
            key: 'username',
            width: 140,
            render: (username) => <Text strong>{username}</Text>
        },
        {
            title: '操作描述',
            dataIndex: 'operation',
            key: 'operation',
            width: 180
        },
        {
            title: '请求方法',
            dataIndex: 'method',
            key: 'method',
            width: 80,
            align: 'center',
            render: (method) => {
                const colorMap = {
                    'GET': 'green',
                    'POST': 'blue',
                    'PUT': 'orange',
                    'DELETE': 'red'
                }
                return <Tag color={colorMap[method]}>{method}</Tag>
            }
        },
        {
            title: 'IP地址',
            dataIndex: 'ip',
            key: 'ip',
            width: 130,
            render: (ip) => <Text type="secondary">{ip}</Text>
        },
        {
            title: '耗时',
            dataIndex: 'duration',
            key: 'duration',
            width: 80,
            align: 'center',
            render: (duration) => (
                <span style={{color: duration > 200 ? '#ff4d4f' : '#52c41a'}}>
                    {duration}ms
                </span>
            )
        },
        {
            title: '操作时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 170
        },
        {
            title: '操作',
            key: 'action',
            width: 80,
            fixed: 'right',
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="查看详情">
                        <Button
                            type="text"
                            icon={<EyeOutlined/>}
                            onClick={() => handleViewDetail(record)}
                            className="action-btn view-btn"
                        />
                    </Tooltip>
                </Space>
            )
        }
    ]

    // Tab配置
    const tabItems = [
        {key: 'all', label: '全部日志'},
        {key: 'login', label: '登录日志'},
        {key: 'operation', label: '操作日志'}
    ]

    return (
        <div className="log-container">
            {/* 页面头部 */}
            <Card className="log-card">
                <div className="card-header">
                    <Breadcrumb
                        items={[
                            {title: <Link to={'/operation'}><BugOutlined/>运维管理</Link>},
                            {title: '日志管理'}
                        ]}
                    />
                    <Title level={4} style={{marginTop: 10, marginBottom: 0}}>日志管理</Title>
                </div>
            </Card>

            {/* 筛选区域 */}
            <Card className="filter-card">
                <div className="filter-content">
                    <div className="filter-left">
                        <Input.Search
                            placeholder="搜索用户名/操作/IP"
                            allowClear
                            enterButton={<SearchOutlined/>}
                            onSearch={handleSearch}
                            style={{width: 260}}
                            className="search-input"
                        />
                        <Select
                            placeholder="操作类型"
                            style={{width: 160}}
                            value={operation}
                            onChange={handleOperationChange}
                            className="operation-select"
                        >
                            {operationOptions.map(option => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                        <RangePicker
                            onChange={handleDateRangeChange}
                            style={{width: 260}}
                            className="date-picker"
                        />
                    </div>
                    <div className="filter-right">
                        <Button
                            icon={<ReloadOutlined/>}
                            onClick={handleRefresh}
                            className="refresh-btn"
                        >
                            刷新
                        </Button>
                        <Button
                            icon={<ExportOutlined/>}
                            onClick={handleExport}
                            className="export-btn"
                        >
                            导出
                        </Button>
                    </div>
                </div>
            </Card>

            {/* 日志表格 */}
            <Card className="table-card">
                <Tabs
                    activeKey={activeTab}
                    onChange={handleTabChange}
                    items={tabItems}
                    className="log-tabs"
                />
                <Table
                    columns={columns}
                    dataSource={logs}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: total,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total) => `共 ${total} 条记录`
                    }}
                    onChange={handleTableChange}
                    scroll={{x: 1200}}
                    className="log-table"
                />
            </Card>

            {/* 日志详情Modal */}
            <Modal
                title={
                    <Space>
                        <FileTextOutlined/>
                        <span>日志详情</span>
                    </Space>
                }
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setIsModalVisible(false)}>
                        关闭
                    </Button>
                ]}
                width={700}
                className="log-detail-modal"
            >
                {currentLog && (
                    <Descriptions column={2} bordered size="small">
                        <Descriptions.Item label="日志ID" span={1}>
                            {currentLog.id}
                        </Descriptions.Item>
                        <Descriptions.Item label="日志类型" span={1}>
                            {getLogTypeTag(currentLog.logType)}
                        </Descriptions.Item>
                        <Descriptions.Item label="操作用户" span={1}>
                            {currentLog.username}
                        </Descriptions.Item>
                        <Descriptions.Item label="IP地址" span={1}>
                            {currentLog.ip}
                        </Descriptions.Item>
                        <Descriptions.Item label="操作描述" span={2}>
                            {currentLog.operation}
                        </Descriptions.Item>
                        <Descriptions.Item label="请求方法" span={1}>
                            <Tag color={currentLog.method === 'GET' ? 'green' : currentLog.method === 'POST' ? 'blue' : currentLog.method === 'PUT' ? 'orange' : 'red'}>
                                {currentLog.method}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="请求耗时" span={1}>
                            <Text style={{color: currentLog.duration > 200 ? '#ff4d4f' : '#52c41a'}}>
                                {currentLog.duration}ms
                            </Text>
                        </Descriptions.Item>
                        <Descriptions.Item label="请求参数" span={2}>
                            <pre className="json-content">{currentLog.params}</pre>
                        </Descriptions.Item>
                        <Descriptions.Item label="返回结果" span={2}>
                            <pre className="json-content">{currentLog.result}</pre>
                        </Descriptions.Item>
                        <Descriptions.Item label="操作时间" span={2}>
                            {currentLog.createTime}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    )
}

export default Log
