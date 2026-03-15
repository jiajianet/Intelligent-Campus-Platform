import {useState, useEffect} from 'react'
import {
    Card,
    Table,
    Button,
    Space,
    Input,
    Tag,
    Modal,
    Form,
    Input as InputAntd,
    Tree,
    Popconfirm,
    message,
    Typography,
    Breadcrumb,
    Tooltip,
    Badge,
    Drawer,
    Checkbox,
    Row,
    Col
} from 'antd'
import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SettingOutlined,
    UserOutlined,
    ReloadOutlined,
    KeyOutlined,
    CheckSquareOutlined,
    CloseSquareOutlined
} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import './index.scss'

const {Title, Text} = Typography

/**
 * @typedef {Object} Role
 * @property {number} id
 * @property {string} roleName
 * @property {string} roleKey
 * @property {string} description
 * @property {string[]} permissions
 * @property {string} createTime
 * @property {number} userCount
 * @property {number} status
 */

/** 模拟角色数据 */
const mockRoles = [
    {
        id: 1,
        roleName: '超级管理员',
        roleKey: 'admin',
        description: '拥有系统所有权限，可管理所有功能',
        permissions: ['dashboard', 'dashboard.home', 'dashboard.userCenter', 'articles', 'articles.list', 'articles.create', 'articles.carousel', 'users', 'users.list', 'users.create', 'system', 'system.setting', 'system.role', 'menu', 'menu.list', 'menu.create', 'operation', 'operation.log', 'operation.task', 'help', 'help.doc', 'help.question', 'update'],
        createTime: '2024-01-15 10:30:00',
        userCount: 2,
        status: 1
    },
    {
        id: 2,
        roleName: '教师',
        roleKey: 'teacher',
        description: '可管理教学内容，查看学生信息',
        permissions: ['dashboard', 'dashboard.home', 'dashboard.userCenter', 'articles', 'articles.list', 'articles.create'],
        createTime: '2024-01-20 14:20:00',
        userCount: 15,
        status: 1
    },
    {
        id: 3,
        roleName: '内容编辑',
        roleKey: 'editor',
        description: '可编辑和发布文章内容',
        permissions: ['dashboard', 'dashboard.home', 'articles', 'articles.list', 'articles.create'],
        createTime: '2024-02-01 09:00:00',
        userCount: 8,
        status: 1
    },
    {
        id: 4,
        roleName: '学生',
        roleKey: 'student',
        description: '可浏览学习内容，查看个人中心',
        permissions: ['dashboard', 'dashboard.home', 'dashboard.userCenter'],
        createTime: '2024-02-10 15:30:00',
        userCount: 156,
        status: 1
    },
    {
        id: 5,
        roleName: '访客',
        roleKey: 'guest',
        description: '只读访问权限，无法进行任何操作',
        permissions: ['dashboard', 'dashboard.home'],
        createTime: '2024-02-15 11:00:00',
        userCount: 23,
        status: 0
    }
]

/** 权限树结构 */
const permissionTree = [
    {
        key: 'dashboard',
        title: '仪表盘',
        children: [
            { key: 'dashboard.home', title: '首页' },
            { key: 'dashboard.userCenter', title: '用户中心' }
        ]
    },
    {
        key: 'articles',
        title: '文章管理',
        children: [
            { key: 'articles.list', title: '文章列表' },
            { key: 'articles.create', title: '创建文章' },
            { key: 'articles.carousel', title: '主页轮播图' }
        ]
    },
    {
        key: 'users',
        title: '用户管理',
        children: [
            { key: 'users.list', title: '用户列表' },
            { key: 'users.create', title: '创建用户' }
        ]
    },
    {
        key: 'system',
        title: '系统管理',
        children: [
            { key: 'system.setting', title: '系统设置' },
            { key: 'system.role', title: '角色管理' }
        ]
    },
    {
        key: 'menu',
        title: '菜单管理',
        children: [
            { key: 'menu.list', title: '菜单列表' },
            { key: 'menu.create', title: '创建菜单' }
        ]
    },
    {
        key: 'operation',
        title: '运维管理',
        children: [
            { key: 'operation.log', title: '日志管理' },
            { key: 'operation.task', title: '定时任务' }
        ]
    },
    {
        key: 'help',
        title: '帮助中心',
        children: [
            { key: 'help.doc', title: '使用文档' },
            { key: 'help.question', title: '常见问题' }
        ]
    },
    {
        key: 'update',
        title: '更新日志'
    }
]

/**
 * 将权限数组转换为树形选择
 */
const convertPermissionsToTree = (permissions) => {
    const selectedKeys = []
    const halfCheckedKeys = []

    permissionTree.forEach(parent => {
        const parentSelected = parent.children?.every(child => permissions.includes(child.key)) ?? false
        const parentPartial = parent.children?.some(child => permissions.includes(child.key)) ?? false

        if (parentSelected) {
            selectedKeys.push(parent.key)
        } else if (parentPartial) {
            halfCheckedKeys.push(parent.key)
        }

        parent.children?.forEach(child => {
            if (permissions.includes(child.key)) {
                selectedKeys.push(child.key)
            }
        })
    })

    return { selectedKeys, halfCheckedKeys }
}

/**
 * 将树形选择转换为权限数组
 */
const convertTreeToPermissions = (checkedKeys, halfCheckedKeys) => {
    const allKeys = [...checkedKeys, ...halfCheckedKeys]
    const result = []

    permissionTree.forEach(parent => {
        const isParentSelected = allKeys.includes(parent.key)
        const childSelectedCount = parent.children?.filter(child => allKeys.includes(child.key)).length ?? 0

        if (isParentSelected && parent.children) {
            // 如果父节点被选中，则选中所有子节点
            parent.children.forEach(child => {
                if (!result.includes(child.key)) {
                    result.push(child.key)
                }
            })
        } else if (childSelectedCount > 0) {
            // 否则只添加被选中的子节点
            parent.children?.forEach(child => {
                if (allKeys.includes(child.key) && !result.includes(child.key)) {
                    result.push(child.key)
                }
            })
        }
    })

    return result
}

const Role = () => {
    const [loading, setLoading] = useState(false)
    const [roles, setRoles] = useState([])
    const [searchKeyword, setSearchKeyword] = useState('')

    // Modal状态
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('创建角色')
    const [editingRole, setEditingRole] = useState(null)

    // Drawer状态
    const [isDrawerVisible, setIsDrawerVisible] = useState(false)
    const [currentRolePermissions, setCurrentRolePermissions] = useState([])
    const [currentRoleName, setCurrentRoleName] = useState('')

    // 表单
    const [form] = Form.useForm()

    // 加载角色数据
    useEffect(() => {
        fetchRoles()
    }, [])

    /**
     * 获取角色列表
     */
    const fetchRoles = () => {
        setLoading(true)
        setTimeout(() => {
            let filteredData = [...mockRoles]

            if (searchKeyword) {
                filteredData = filteredData.filter(role =>
                    role.roleName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    role.roleKey.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    role.description.toLowerCase().includes(searchKeyword.toLowerCase())
                )
            }

            setRoles(filteredData)
            setLoading(false)
        }, 500)
    }

    /**
     * 处理搜索
     */
    const handleSearch = (value) => {
        setSearchKeyword(value)
        fetchRoles()
    }

    /**
     * 处理创建角色
     */
    const handleCreate = () => {
        setModalTitle('创建角色')
        setEditingRole(null)
        form.resetFields()
        setIsModalVisible(true)
    }

    /**
     * 处理编辑角色
     */
    const handleEdit = (record) => {
        setModalTitle('编辑角色')
        setEditingRole(record)
        form.setFieldsValue({
            roleName: record.roleName,
            roleKey: record.roleKey,
            description: record.description
        })
        setIsModalVisible(true)
    }

    /**
     * 处理删除角色
     */
    const handleDelete = (record) => {
        if (record.userCount > 0) {
            message.warning(`该角色下还有 ${record.userCount} 个用户，无法删除`)
            return
        }
        const newRoles = roles.filter(role => role.id !== record.id)
        setRoles(newRoles)
        message.success(`已删除角色: ${record.roleName}`)
    }

    /**
     * 处理权限配置
     */
    const handlePermission = (record) => {
        setCurrentRoleName(record.roleName)
        setCurrentRolePermissions(record.permissions)
        setIsDrawerVisible(true)
    }

    /**
     * 处理Modal提交
     */
    const handleModalOk = async () => {
        try {
            const values = await form.validateFields()

            if (editingRole) {
                // 编辑角色
                const newRoles = roles.map(role => {
                    if (role.id === editingRole.id) {
                        return {...role, ...values}
                    }
                    return role
                })
                setRoles(newRoles)
                message.success(`角色 ${values.roleName} 更新成功`)
            } else {
                // 创建角色
                const newRole = {
                    id: Date.now(),
                    ...values,
                    permissions: [],
                    createTime: new Date().toLocaleString(),
                    userCount: 0,
                    status: 1
                }
                setRoles([...roles, newRole])
                message.success(`角色 ${values.roleName} 创建成功`)
            }

            setIsModalVisible(false)
            form.resetFields()
        } catch (error) {
            console.error('表单验证失败:', error)
        }
    }

    /**
     * 处理权限Drawer提交
     */
    const handleDrawerOk = () => {
        const newRoles = roles.map(role => {
            if (role.roleName === currentRoleName) {
                return {...role, permissions: currentRolePermissions}
            }
            return role
        })
        setRoles(newRoles)
        message.success(`角色 ${currentRoleName} 权限更新成功`)
        setIsDrawerVisible(false)
    }

    /**
     * 处理Tree选择变化
     */
    const handleTreeCheck = (checkedKeys, { halfCheckedKeys }) => {
        const allChecked = [...checkedKeys, ...halfCheckedKeys]
        setCurrentRolePermissions(convertTreeToPermissions(checkedKeys, halfCheckedKeys))
    }

    /**
     * 处理刷新
     */
    const handleRefresh = () => {
        fetchRoles()
        message.success('刷新成功')
    }

    // 表格列配置
    const columns = [
        {
            title: '角色ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            align: 'center'
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName',
            width: 150,
            render: (name, record) => (
                <div className="role-name-cell">
                    <KeyOutlined className="role-icon" />
                    <Text strong>{name}</Text>
                </div>
            )
        },
        {
            title: '角色标识',
            dataIndex: 'roleKey',
            key: 'roleKey',
            width: 120,
            render: (key) => <Tag color="blue">{key}</Tag>
        },
        {
            title: '角色描述',
            dataIndex: 'description',
            key: 'description',
            width: 250
        },
        {
            title: '用户数',
            dataIndex: 'userCount',
            key: 'userCount',
            width: 80,
            align: 'center',
            render: (count) => <Text type="secondary">{count}</Text>
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 80,
            align: 'center',
            render: (status) => (
                status === 1 ?
                    <Badge status="success" text="启用" /> :
                    <Badge status="default" text="禁用" />
            )
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 180
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
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(record)}
                            className="action-btn edit-btn"
                        />
                    </Tooltip>
                    <Tooltip title="权限配置">
                        <Button
                            type="text"
                            icon={<SettingOutlined />}
                            onClick={() => handlePermission(record)}
                            className="action-btn permission-btn"
                        />
                    </Tooltip>
                    <Popconfirm
                        title="确认删除"
                        description={record.userCount > 0
                            ? `该角色下还有 ${record.userCount} 个用户，无法删除`
                            : `确定要删除角色 "${record.roleName}" 吗？`
                        }
                        onConfirm={() => handleDelete(record)}
                        okText="删除"
                        cancelText="取消"
                        okButtonProps={{danger: true, disabled: record.userCount > 0}}
                        disabled={record.userCount > 0}
                    >
                        <Tooltip title={record.userCount > 0 ? '该角色下有用户，无法删除' : '删除'}>
                            <Button
                                type="text"
                                icon={<DeleteOutlined />}
                                className="action-btn delete-btn"
                                disabled={record.userCount > 0}
                            />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    // 表格选择配置
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('选中角色:', selectedRows)
        }
    }

    return (
        <div className="role-container">
            {/* 页面头部 */}
            <Card className="role-card">
                <div className="card-header">
                    <Breadcrumb
                        items={[
                            { title: <Link to={'/system'}><SettingOutlined />系统管理</Link> },
                            { title: '角色管理' }
                        ]}
                    />
                    <Title level={4} style={{ marginTop: 10, marginBottom: 0 }}>角色管理</Title>
                </div>
            </Card>

            {/* 筛选区域 */}
            <Card className="filter-card">
                <div className="filter-content">
                    <div className="filter-left">
                        <Input.Search
                            placeholder="搜索角色名称/标识/描述"
                            allowClear
                            enterButton={<SearchOutlined />}
                            onSearch={handleSearch}
                            style={{ width: 300 }}
                            className="search-input"
                        />
                    </div>
                    <div className="filter-right">
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={handleRefresh}
                            className="refresh-btn"
                        >
                            刷新
                        </Button>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleCreate}
                            className="create-btn"
                        >
                            创建角色
                        </Button>
                    </div>
                </div>
            </Card>

            {/* 角色表格 */}
            <Card className="table-card">
                <Table
                    columns={columns}
                    dataSource={roles}
                    rowKey="id"
                    loading={loading}
                    pagination={false}
                    scroll={{ x: 1000 }}
                    className="role-table"
                    rowSelection={rowSelection}
                />
            </Card>

            {/* 创建/编辑角色Modal */}
            <Modal
                title={modalTitle}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => {
                    setIsModalVisible(false)
                    form.resetFields()
                }}
                width={600}
                className="role-modal"
                okText="保存"
                cancelText="取消"
            >
                <Form
                    form={form}
                    layout="vertical"
                    className="role-form"
                >
                    <Form.Item
                        label="角色名称"
                        name="roleName"
                        rules={[
                            { required: true, message: '请输入角色名称' },
                            { max: 20, message: '角色名称最多20位' }
                        ]}
                    >
                        <InputAntd placeholder="请输入角色名称" />
                    </Form.Item>

                    <Form.Item
                        label="角色标识"
                        name="roleKey"
                        rules={[
                            { required: true, message: '请输入角色标识' },
                            { pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/, message: '只能包含字母、数字和下划线，以字母开头' }
                        ]}
                    >
                        <InputAntd placeholder="如：admin, teacher" disabled={!!editingRole} />
                    </Form.Item>

                    <Form.Item
                        label="角色描述"
                        name="description"
                        rules={[{ max: 200, message: '描述最多200位' }]}
                    >
                        <InputAntd.TextArea
                            placeholder="请输入角色描述"
                            rows={3}
                            maxLength={200}
                            showCount
                        />
                    </Form.Item>
                </Form>
            </Modal>

            {/* 权限配置Drawer */}
            <Drawer
                title={`权限配置 - ${currentRoleName}`}
                placement="right"
                width={500}
                open={isDrawerVisible}
                onClose={() => setIsDrawerVisible(false)}
                className="permission-drawer"
                extra={
                    <Space>
                        <Button onClick={() => setIsDrawerVisible(false)}>取消</Button>
                        <Button type="primary" onClick={handleDrawerOk}>保存</Button>
                    </Space>
                }
            >
                <div className="permission-content">
                    <div className="permission-tip">
                        <Text type="secondary">勾选角色可访问的菜单和功能权限</Text>
                    </div>
                    <Tree
                        checkable
                        defaultExpandAll
                        onCheck={handleTreeCheck}
                        treeData={permissionTree}
                        checkedKeys={{
                            checked: convertPermissionsToTree(currentRolePermissions).selectedKeys,
                            halfChecked: convertPermissionsToTree(currentRolePermissions).halfCheckedKeys
                        }}
                        className="permission-tree"
                    />
                </div>
            </Drawer>
        </div>
    )
}

export default Role
