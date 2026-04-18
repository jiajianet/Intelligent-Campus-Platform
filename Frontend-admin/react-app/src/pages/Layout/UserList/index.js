import {useState, useEffect} from 'react'
import {
    Card,
    Table,
    Button,
    Space,
    Input,
    Select,
    Tag,
    Avatar,
    Popconfirm,
    message,
    Typography,
    Breadcrumb,
    Tooltip,
    Badge
} from 'antd'
import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UserOutlined,
    ReloadOutlined,
    StopOutlined,
    CheckCircleOutlined
} from '@ant-design/icons'
import {Link, useNavigate} from 'react-router-dom'
import './index.scss'

// TODO: 后端API未实现
// 用户列表功能需要实现以下后端API:
// - GET /api/user/list - 获取用户列表（支持分页、筛选）
// - GET /api/user/{id} - 获取用户详情
// - POST /api/user - 创建用户
// - PUT /api/user/{id} - 更新用户信息
// - DELETE /api/user/{id} - 删除用户
// - PUT /api/user/{id}/status - 启用/禁用用户

const {Title, Text} = Typography
const {Option} = Select

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} username
 * @property {string} realName
 * @property {string} avatar
 * @property {string} role
 * @property {number} status
 * @property {string} createTime
 * @property {string} lastLoginTime
 */

/** 模拟用户数据 */
const mockUsers = [
    {
        id: 1,
        username: 'admin',
        realName: '系统管理员',
        avatar: '',
        role: '超级管理员',
        status: 1,
        createTime: '2024-01-15 10:30:00',
        lastLoginTime: '2024-03-14 09:15:22'
    },
    {
        id: 2,
        username: 'teacher_zhang',
        realName: '张老师',
        avatar: '',
        role: '教师',
        status: 1,
        createTime: '2024-01-20 14:20:00',
        lastLoginTime: '2024-03-13 16:45:10'
    },
    {
        id: 3,
        username: 'teacher_li',
        realName: '李老师',
        avatar: '',
        role: '教师',
        status: 1,
        createTime: '2024-02-01 09:00:00',
        lastLoginTime: '2024-03-12 11:20:30'
    },
    {
        id: 4,
        username: 'student_wang',
        realName: '王小明',
        avatar: '',
        role: '学生',
        status: 1,
        createTime: '2024-02-10 15:30:00',
        lastLoginTime: '2024-03-14 08:00:00'
    },
    {
        id: 5,
        username: 'editor_chen',
        realName: '陈编辑',
        avatar: '',
        role: '内容编辑',
        status: 0,
        createTime: '2024-02-15 11:00:00',
        lastLoginTime: '2024-02-28 14:30:00'
    },
    {
        id: 6,
        username: 'viewer_zhao',
        realName: '赵viewer',
        avatar: '',
        role: '访客',
        status: 1,
        createTime: '2024-02-20 16:45:00',
        lastLoginTime: '2024-03-10 10:15:00'
    }
]

/** 角色选项 */
const roleOptions = [
    {value: 'all', label: '全部角色'},
    {value: '超级管理员', label: '超级管理员'},
    {value: '教师', label: '教师'},
    {value: '学生', label: '学生'},
    {value: '内容编辑', label: '内容编辑'},
    {value: '访客', label: '访客'}
]

/** 用户状态选项 */
const statusOptions = [
    {value: 'all', label: '全部状态'},
    {value: 1, label: '启用'},
    {value: 0, label: '禁用'}
]

const UserList = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    // 筛选条件
    const [searchKeyword, setSearchKeyword] = useState('')
    const [roleFilter, setRoleFilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')

    // 分页
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    })

    // 加载用户数据
    useEffect(() => {
        fetchUsers()
    }, [pagination.current, pagination.pageSize, roleFilter, statusFilter])

    // 筛选时重置分页
    useEffect(() => {
        setPagination(prev => ({...prev, current: 1}))
        fetchUsers()
    }, [searchKeyword])

    /**
     * 获取用户列表
     */
    const fetchUsers = () => {
        setLoading(true)
        // 模拟API调用
        setTimeout(() => {
            let filteredData = [...mockUsers]

            // 关键词筛选
            if (searchKeyword) {
                filteredData = filteredData.filter(user =>
                    user.username.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    user.realName.toLowerCase().includes(searchKeyword.toLowerCase())
                )
            }

            // 角色筛选
            if (roleFilter !== 'all') {
                filteredData = filteredData.filter(user => user.role === roleFilter)
            }

            // 状态筛选
            if (statusFilter !== 'all') {
                filteredData = filteredData.filter(user => user.status === statusFilter)
            }

            setUsers(filteredData)
            setPagination(prev => ({
                ...prev,
                total: filteredData.length
            }))
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
     * 处理角色筛选
     */
    const handleRoleChange = (value) => {
        setRoleFilter(value)
    }

    /**
     * 处理状态筛选
     */
    const handleStatusChange = (value) => {
        setStatusFilter(value)
    }

    /**
     * 处理编辑用户
     */
    const handleEdit = (record) => {
        message.info(`编辑用户: ${record.realName}`)
        // 实际项目中应该跳转到编辑页面
        // navigate(`/editUser/${record.id}`)
    }

    /**
     * 处理删除用户
     */
    const handleDelete = (record) => {
        const newUsers = users.filter(user => user.id !== record.id)
        setUsers(newUsers)
        message.success(`已删除用户: ${record.realName}`)
    }

    /**
     * 批量删除用户
     */
    const handleBatchDelete = () => {
        if (selectedRowKeys.length === 0) {
            message.warning('请选择要删除的用户')
            return
        }
        const newUsers = users.filter(user => !selectedRowKeys.includes(user.id))
        setUsers(newUsers)
        setSelectedRowKeys([])
        message.success(`已删除 ${selectedRowKeys.length} 个用户`)
    }

    /**
     * 处理启用/禁用用户
     */
    const handleToggleStatus = (record) => {
        const newUsers = users.map(user => {
            if (user.id === record.id) {
                return {...user, status: user.status === 1 ? 0 : 1}
            }
            return user
        })
        setUsers(newUsers)
        message.success(`用户 ${record.realName} 已${record.status === 1 ? '禁用' : '启用'}`)
    }

    /**
     * 处理刷新
     */
    const handleRefresh = () => {
        fetchUsers()
        message.success('刷新成功')
    }

    /**
     * 行选择配置
     */
    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys)
        }
    }

    /**
     * 表格列配置
     */
    const columns = [
        {
            title: '用户ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            align: 'center'
        },
        {
            title: '用户信息',
            key: 'userInfo',
            width: 200,
            render: (_, record) => (
                <div className="user-info-cell">
                    <Avatar
                        size={40}
                        src={record.avatar}
                        icon={!record.avatar && <UserOutlined/>}
                        style={{backgroundColor: record.avatar ? 'transparent' : '#87d068'}}
                    />
                    <div className="user-info-text">
                        <Text strong>{record.realName}</Text>
                        <Text type="secondary" className="username-text">@{record.username}</Text>
                    </div>
                </div>
            )
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
            width: 120,
            render: (role) => {
                const colorMap = {
                    '超级管理员': 'red',
                    '教师': 'blue',
                    '学生': 'green',
                    '内容编辑': 'orange',
                    '访客': 'default'
                }
                return <Tag color={colorMap[role] || 'default'}>{role}</Tag>
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            align: 'center',
            render: (status) => (
                status === 1 ?
                    <Badge status="success" text="启用" /> :
                    <Badge status="error" text="禁用" />
            )
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 180
        },
        {
            title: '最后登录',
            dataIndex: 'lastLoginTime',
            key: 'lastLoginTime',
            width: 180,
            render: (time) => time || '-'
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            fixed: 'right',
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="编辑">
                        <Button
                            type="text"
                            icon={<EditOutlined/>}
                            onClick={() => handleEdit(record)}
                            className="action-btn edit-btn"
                        />
                    </Tooltip>
                    <Tooltip title={record.status === 1 ? '禁用' : '启用'}>
                        <Button
                            type="text"
                            icon={record.status === 1 ? <StopOutlined/> : <CheckCircleOutlined/>}
                            onClick={() => handleToggleStatus(record)}
                            className={`action-btn ${record.status === 1 ? 'disable-btn' : 'enable-btn'}`}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="确认删除"
                        description={`确定要删除用户 "${record.realName}" 吗？`}
                        onConfirm={() => handleDelete(record)}
                        okText="删除"
                        cancelText="取消"
                        okButtonProps={{danger: true}}
                    >
                        <Tooltip title="删除">
                            <Button
                                type="text"
                                icon={<DeleteOutlined/>}
                                className="action-btn delete-btn"
                            />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    /**
     * 分页配置变化
     */
    const handleTableChange = (newPagination) => {
        setPagination({
            ...pagination,
            current: newPagination.current,
            pageSize: newPagination.pageSize
        })
    }

    return (
        <div className="user-list-container">
            {/* 页面头部 */}
            <Card className="user-list-card">
                <div className="card-header">
                    <Breadcrumb
                        items={[
                            {title: <Link to={'/users'}><UserOutlined/>用户管理</Link>},
                            {title: '用户列表'}
                        ]}
                    />
                    <Title level={4} style={{marginTop: 10, marginBottom: 0}}>用户列表</Title>
                </div>
            </Card>

            {/* 筛选区域 */}
            <Card className="filter-card">
                <div className="filter-content">
                    <div className="filter-left">
                        <Input.Search
                            placeholder="搜索用户名/姓名"
                            allowClear
                            enterButton={<SearchOutlined/>}
                            onSearch={handleSearch}
                            style={{width: 280}}
                            className="search-input"
                        />
                        <Select
                            placeholder="选择角色"
                            style={{width: 140}}
                            value={roleFilter}
                            onChange={handleRoleChange}
                            className="role-select"
                        >
                            {roleOptions.map(option => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                        <Select
                            placeholder="选择状态"
                            style={{width: 120}}
                            value={statusFilter}
                            onChange={handleStatusChange}
                            className="status-select"
                        >
                            {statusOptions.map(option => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
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
                            type="primary"
                            icon={<PlusOutlined/>}
                            onClick={() => navigate('/createUser')}
                            className="create-btn"
                        >
                            创建用户
                        </Button>
                    </div>
                </div>
            </Card>

            {/* 用户表格 */}
            <Card className="table-card">
                <div className="table-header">
                    {selectedRowKeys.length > 0 && (
                        <div className="selected-info">
                            <Text type="secondary">已选择 {selectedRowKeys.length} 项</Text>
                            <Popconfirm
                                title="确认批量删除"
                                description={`确定要删除选中的 ${selectedRowKeys.length} 个用户吗？`}
                                onConfirm={handleBatchDelete}
                                okText="删除"
                                cancelText="取消"
                                okButtonProps={{danger: true}}
                            >
                                <Button type="text" danger icon={<DeleteOutlined/>}>
                                    批量删除
                                </Button>
                            </Popconfirm>
                        </div>
                    )}
                </div>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={users}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        ...pagination,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => `共 ${total} 条记录，第 ${range[0]}-${range[1]} 条`
                    }}
                    onChange={handleTableChange}
                    scroll={{x: 1000}}
                    className="user-table"
                />
            </Card>
        </div>
    )
}

export default UserList
