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
    Select,
    Switch,
    Divider
} from 'antd'
import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    FolderOutlined,
    FolderOpenOutlined,
    MenuOutlined,
    BarsOutlined,
    ReloadOutlined,
    DownOutlined,
    RightOutlined,
    UnorderedListOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    PieChartOutlined,
    HomeOutlined,
    IdcardOutlined,
    FileOutlined,
    DiffOutlined,
    UserOutlined,
    UserAddOutlined,
    SolutionOutlined,
    TeamOutlined,
    SettingOutlined,
    BugOutlined,
    FileTextOutlined,
    PictureOutlined,
    WindowsOutlined,
    ClockCircleOutlined,
    RobotOutlined
} from '@ant-design/icons'
import {Link, useNavigate} from 'react-router-dom'
import './index.scss'

// TODO: 后端API未实现
// 菜单管理功能需要实现以下后端API:
// - GET /api/menu/tree - 获取菜单树
// - GET /api/menu/list - 获取菜单列表
// - POST /api/menu - 创建菜单
// - PUT /api/menu/{id} - 更新菜单
// - DELETE /api/menu/{id} - 删除菜单（需处理子菜单）
// - PUT /api/menu/sort - 排序菜单

const {Title, Text} = Typography
const {Option} = Select

/**
 * @typedef {Object} Menu
 * @property {number} id
 * @property {number} parentId
 * @property {string} menuName
 * @property {string} menuKey
 * @property {string} icon
 * @property {string} path
 * @property {string} component
 * @property {number} sortOrder
 * @property {number} visible
 * @property {number} status
 * @property {string} permission
 * @property {Menu[]} children
 */

/** 模拟菜单数据 */
const mockMenus = [
    {
        id: 1,
        parentId: 0,
        menuName: '仪表盘',
        menuKey: 'dashboard',
        icon: 'PieChartOutlined',
        path: '/dashboard',
        component: 'Layout',
        sortOrder: 1,
        visible: 1,
        status: 1,
        permission: 'dashboard:view',
        children: [
            {
                id: 11,
                parentId: 1,
                menuName: '首页',
                menuKey: 'dashboard.home',
                icon: 'HomeOutlined',
                path: '/',
                component: 'Layout/Home',
                sortOrder: 1,
                visible: 1,
                status: 1,
                permission: 'dashboard:home:view',
                children: []
            },
            {
                id: 12,
                parentId: 1,
                menuName: '用户中心',
                menuKey: 'dashboard.userCenter',
                icon: 'IdcardOutlined',
                path: '/userCenter',
                component: 'Layout/UserCenter',
                sortOrder: 2,
                visible: 1,
                status: 1,
                permission: 'dashboard:userCenter:view',
                children: []
            }
        ]
    },
    {
        id: 2,
        parentId: 0,
        menuName: '文章管理',
        menuKey: 'articles',
        icon: 'FileOutlined',
        path: '/articles',
        component: 'Layout/Article',
        sortOrder: 2,
        visible: 1,
        status: 1,
        permission: 'articles:view',
        children: [
            {
                id: 21,
                parentId: 2,
                menuName: '文章列表',
                menuKey: 'articles.list',
                icon: 'DiffOutlined',
                path: '/article',
                component: 'Layout/Article/List',
                sortOrder: 1,
                visible: 1,
                status: 1,
                permission: 'articles:list:view',
                children: []
            },
            {
                id: 22,
                parentId: 2,
                menuName: '创建文章',
                menuKey: 'articles.create',
                icon: 'EditOutlined',
                path: '/publish',
                component: 'Layout/Publish',
                sortOrder: 2,
                visible: 1,
                status: 1,
                permission: 'articles:create',
                children: []
            },
            {
                id: 23,
                parentId: 2,
                menuName: '主页轮播图',
                menuKey: 'articles.carousel',
                icon: 'PictureOutlined',
                path: '/homePageCarousel',
                component: 'Layout/HomePageCarousel',
                sortOrder: 3,
                visible: 1,
                status: 1,
                permission: 'articles:carousel:view',
                children: []
            },
            {
                id: 24,
                parentId: 2,
                menuName: 'AI 助手',
                menuKey: 'articles.aiAssistant',
                icon: 'RobotOutlined',
                path: '/aiAssistant',
                component: 'Layout/AiAssistant',
                sortOrder: 4,
                visible: 1,
                status: 1,
                permission: 'articles:aiAssistant:view',
                children: []
            }
        ]
    },
    {
        id: 3,
        parentId: 0,
        menuName: '用户管理',
        menuKey: 'users',
        icon: 'UserOutlined',
        path: '/users',
        component: 'Layout/Users',
        sortOrder: 3,
        visible: 1,
        status: 1,
        permission: 'users:view',
        children: [
            {
                id: 31,
                parentId: 3,
                menuName: '用户列表',
                menuKey: 'users.list',
                icon: 'SolutionOutlined',
                path: '/userList',
                component: 'Layout/UserList',
                sortOrder: 1,
                visible: 1,
                status: 1,
                permission: 'users:list:view',
                children: []
            },
            {
                id: 32,
                parentId: 3,
                menuName: '创建用户',
                menuKey: 'users.create',
                icon: 'UserAddOutlined',
                path: '/createUser',
                component: 'Layout/CreateUser',
                sortOrder: 2,
                visible: 1,
                status: 1,
                permission: 'users:create',
                children: []
            }
        ]
    },
    {
        id: 4,
        parentId: 0,
        menuName: '系统管理',
        menuKey: 'system',
        icon: 'WindowsOutlined',
        path: '/system',
        component: 'Layout/System',
        sortOrder: 4,
        visible: 1,
        status: 1,
        permission: 'system:view',
        children: [
            {
                id: 41,
                parentId: 4,
                menuName: '系统设置',
                menuKey: 'system.setting',
                icon: 'SettingOutlined',
                path: '/systemSetting',
                component: 'Layout/SystemSetting',
                sortOrder: 1,
                visible: 1,
                status: 1,
                permission: 'system:setting:view',
                children: []
            },
            {
                id: 42,
                parentId: 4,
                menuName: '角色管理',
                menuKey: 'system.role',
                icon: 'TeamOutlined',
                path: '/role',
                component: 'Layout/Role',
                sortOrder: 2,
                visible: 1,
                status: 1,
                permission: 'system:role:view',
                children: []
            }
        ]
    },
    {
        id: 5,
        parentId: 0,
        menuName: '菜单管理',
        menuKey: 'menu',
        icon: 'BarsOutlined',
        path: '/menu',
        component: 'Layout/Menu',
        sortOrder: 5,
        visible: 1,
        status: 1,
        permission: 'menu:view',
        children: [
            {
                id: 51,
                parentId: 5,
                menuName: '菜单列表',
                menuKey: 'menu.list',
                icon: 'UnorderedListOutlined',
                path: '/menuList',
                component: 'Layout/MenuList',
                sortOrder: 1,
                visible: 1,
                status: 1,
                permission: 'menu:list:view',
                children: []
            },
            {
                id: 52,
                parentId: 5,
                menuName: '创建菜单',
                menuKey: 'menu.create',
                icon: 'PlusOutlined',
                path: '/createMenu',
                component: 'Layout/CreateMenu',
                sortOrder: 2,
                visible: 1,
                status: 1,
                permission: 'menu:create',
                children: []
            }
        ]
    },
    {
        id: 6,
        parentId: 0,
        menuName: '运维管理',
        menuKey: 'operation',
        icon: 'BugOutlined',
        path: '/operation',
        component: 'Layout/Operation',
        sortOrder: 6,
        visible: 1,
        status: 0,
        permission: 'operation:view',
        children: [
            {
                id: 61,
                parentId: 6,
                menuName: '日志管理',
                menuKey: 'operation.log',
                icon: 'FileTextOutlined',
                path: '/log',
                component: 'Layout/Log',
                sortOrder: 1,
                visible: 1,
                status: 0,
                permission: 'operation:log:view',
                children: []
            },
            {
                id: 62,
                parentId: 6,
                menuName: '定时任务',
                menuKey: 'operation.task',
                icon: 'ClockCircleOutlined',
                path: '/task',
                component: 'Layout/Task',
                sortOrder: 2,
                visible: 1,
                status: 0,
                permission: 'operation:task:view',
                children: []
            }
        ]
    }
]

/** 菜单类型选项 */
const menuTypeOptions = [
    {value: 'directory', label: '目录', icon: <FolderOutlined/>},
    {value: 'menu', label: '菜单', icon: <MenuOutlined/>},
    {value: 'button', label: '按钮', icon: <BarsOutlined/>}
]

/** 图标选项 */
const iconOptions = [
    'PieChartOutlined', 'HomeOutlined', 'IdcardOutlined', 'FileOutlined',
    'DiffOutlined', 'EditOutlined', 'UserOutlined', 'UserAddOutlined',
    'SolutionOutlined', 'TeamOutlined', 'SettingOutlined', 'BarsOutlined',
    'BugOutlined', 'FileTextOutlined', 'UnorderedListOutlined', 'PlusOutlined',
    'SearchOutlined', 'DeleteOutlined', 'ReloadOutlined', 'MenuOutlined', 'RobotOutlined'
]

const MenuList = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [menus, setMenus] = useState([])
    const [searchKeyword, setSearchKeyword] = useState('')
    const [expandedKeys, setExpandedKeys] = useState([])

    // Modal状态
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('创建菜单')
    const [editingMenu, setEditingMenu] = useState(null)
    const [isEditMode, setIsEditMode] = useState(false)

    // 表单
    const [form] = Form.useForm()

    // 加载菜单数据
    useEffect(() => {
        fetchMenus()
    }, [])

    /**
     * 获取菜单列表
     */
    const fetchMenus = () => {
        setLoading(true)
        setTimeout(() => {
            setMenus(mockMenus)
            // 默认展开所有顶级菜单
            setExpandedKeys(mockMenus.map(m => m.id))
            setLoading(false)
        }, 500)
    }

    /**
     * 递归处理搜索
     */
    const filterMenus = (menuList, keyword) => {
        if (!keyword) return menuList

        return menuList.filter(menu => {
            const match = menu.menuName.toLowerCase().includes(keyword.toLowerCase()) ||
                menu.menuKey.toLowerCase().includes(keyword.toLowerCase()) ||
                menu.path.toLowerCase().includes(keyword.toLowerCase())

            const filteredChildren = filterMenus(menu.children || [], keyword)

            return match || (filteredChildren && filteredChildren.length > 0)
        }).map(menu => ({
            ...menu,
            children: filterMenus(menu.children || [], keyword)
        }))
    }

    /**
     * 处理搜索
     */
    const handleSearch = (value) => {
        setSearchKeyword(value)
    }

    /**
     * 展开/折叠处理
     */
    const handleExpand = (keys) => {
        setExpandedKeys(keys)
    }

    /**
     * 处理新增菜单
     */
    const handleCreate = (parentId = 0) => {
        setModalTitle('创建菜单')
        setEditingMenu({parentId})
        setIsEditMode(false)
        form.resetFields()
        form.setFieldsValue({
            parentId: parentId || undefined,
            menuType: 'menu',
            sortOrder: 0,
            visible: 1,
            status: 1
        })
        setIsModalVisible(true)
    }

    /**
     * 处理编辑菜单
     */
    const handleEdit = (record) => {
        setModalTitle('编辑菜单')
        setEditingMenu(record)
        setIsEditMode(true)
        form.setFieldsValue({
            parentId: record.parentId === 0 ? undefined : record.parentId,
            menuName: record.menuName,
            menuKey: record.menuKey,
            icon: record.icon,
            path: record.path,
            component: record.component,
            sortOrder: record.sortOrder,
            visible: record.visible,
            status: record.status,
            permission: record.permission
        })
        setIsModalVisible(true)
    }

    /**
     * 处理删除菜单
     */
    const handleDelete = (record) => {
        const deleteFromTree = (menuList, id) => {
            return menuList.filter(menu => menu.id !== id).map(menu => ({
                ...menu,
                children: deleteFromTree(menu.children || [], id)
            }))
        }

        const hasChildren = record.children && record.children.length > 0
        if (hasChildren) {
            message.warning(`菜单 "${record.menuName}" 包含子菜单，请先删除子菜单`)
            return
        }

        const newMenus = deleteFromTree(menus, record.id)
        setMenus(newMenus)
        message.success(`已删除菜单: ${record.menuName}`)
    }

    /**
     * 处理切换状态
     */
    const handleToggleStatus = (record) => {
        const updateInTree = (menuList, id, updates) => {
            return menuList.map(menu => {
                if (menu.id === id) {
                    return {...menu, ...updates}
                }
                if (menu.children) {
                    return {...menu, children: updateInTree(menu.children, id, updates)}
                }
                return menu
            })
        }

        const newMenus = updateInTree(menus, record.id, {
            status: record.status === 1 ? 0 : 1
        })
        setMenus(newMenus)
        message.success(`菜单 "${record.menuName}" 已${record.status === 1 ? '禁用' : '启用'}`)
    }

    /**
     * 处理Modal提交
     */
    const handleModalOk = async () => {
        try {
            const values = await form.validateFields()

            if (isEditMode) {
                // 编辑菜单
                const updateInTree = (menuList, id, updates) => {
                    return menuList.map(menu => {
                        if (menu.id === editingMenu.id) {
                            return {...menu, ...values, parentId: values.parentId || 0}
                        }
                        if (menu.children) {
                            return {...menu, children: updateInTree(menu.children, id, updates)}
                        }
                        return menu
                    })
                }
                const newMenus = updateInTree(menus, editingMenu.id, values)
                setMenus(newMenus)
                message.success(`菜单 "${values.menuName}" 更新成功`)
            } else {
                // 创建菜单
                const newMenu = {
                    id: Date.now(),
                    ...values,
                    parentId: values.parentId || 0,
                    children: []
                }

                const addToTree = (menuList, parentId, newMenu) => {
                    if (parentId === 0) {
                        return [...menuList, newMenu]
                    }
                    return menuList.map(menu => {
                        if (menu.id === parentId) {
                            return {
                                ...menu,
                                children: [...(menu.children || []), newMenu]
                            }
                        }
                        if (menu.children) {
                            return {...menu, children: addToTree(menu.children, parentId, newMenu)}
                        }
                        return menu
                    })
                }

                const newMenus = addToTree(menus, editingMenu.parentId, newMenu)
                setMenus(newMenus)
                message.success(`菜单 "${values.menuName}" 创建成功`)
            }

            setIsModalVisible(false)
            form.resetFields()
        } catch (error) {
            console.error('表单验证失败:', error)
        }
    }

    /**
     * 获取所有菜单选项（用于父级选择）
     */
    const getMenuOptions = () => {
        const options = [{value: 0, label: '顶级菜单'}]

        const addOptions = (menuList, level = 0) => {
            menuList.forEach(menu => {
                options.push({
                    value: menu.id,
                    label: `${'　'.repeat(level)}${menu.menuName}`
                })
                if (menu.children && menu.children.length > 0) {
                    addOptions(menu.children, level + 1)
                }
            })
        }

        addOptions(menus)
        return options
    }

    /**
     * 渲染菜单图标
     */
    const renderIcon = (iconName) => {
        const iconMap = {
            'PieChartOutlined': <PieChartOutlined/>,
            'HomeOutlined': <HomeOutlined/>,
            'IdcardOutlined': <IdcardOutlined/>,
            'FileOutlined': <FileOutlined/>,
            'DiffOutlined': <DiffOutlined/>,
            'EditOutlined': <EditOutlined/>,
            'UserOutlined': <UserOutlined/>,
            'UserAddOutlined': <UserAddOutlined/>,
            'SolutionOutlined': <SolutionOutlined/>,
            'TeamOutlined': <TeamOutlined/>,
            'WindowsOutlined': <WindowsOutlined/>,
            'SettingOutlined': <SettingOutlined/>,
            'BarsOutlined': <BarsOutlined/>,
            'BugOutlined': <BugOutlined/>,
            'ClockCircleOutlined': <ClockCircleOutlined/>,
            'FileTextOutlined': <FileTextOutlined/>,
            'PictureOutlined': <PictureOutlined/>,
            'UnorderedListOutlined': <UnorderedListOutlined/>,
            'PlusOutlined': <PlusOutlined/>,
            'RobotOutlined': <RobotOutlined/>
        }
        return iconMap[iconName] || <MenuOutlined/>
    }

    /**
     * 将树形数据转换为表格数据
     */
    const convertTreeToTable = (menuList, level = 0) => {
        let result = []

        menuList.forEach(menu => {
            result.push({...menu, level})

            if (menu.children && menu.children.length > 0) {
                result = result.concat(convertTreeToTable(menu.children, level + 1))
            }
        })

        return result
    }

    const displayMenus = filterMenus(menus, searchKeyword)
    const tableData = convertTreeToTable(displayMenus)

    // 表格列配置
    const columns = [
        {
            title: '菜单名称',
            dataIndex: 'menuName',
            key: 'menuName',
            width: 200,
            render: (name, record) => (
                <div className="menu-name-cell" style={{paddingLeft: record.level * 24}}>
                    {record.children && record.children.length > 0 ? (
                        <FolderOutlined style={{color: '#faad14', marginRight: 8}}/>
                    ) : (
                        <MenuOutlined style={{color: '#1890ff', marginRight: 8}}/>
                    )}
                    <Text strong>{name}</Text>
                </div>
            )
        },
        {
            title: '菜单Key',
            dataIndex: 'menuKey',
            key: 'menuKey',
            width: 180,
            render: (key) => <Tag color="purple">{key}</Tag>
        },
        {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon',
            width: 80,
            align: 'center',
            render: (icon) => renderIcon(icon)
        },
        {
            title: '路由路径',
            dataIndex: 'path',
            key: 'path',
            width: 150,
            render: (path) => <Text type="secondary">{path}</Text>
        },
        {
            title: '组件',
            dataIndex: 'component',
            key: 'component',
            width: 180,
            render: (comp) => <Text code>{comp}</Text>
        },
        {
            title: '排序',
            dataIndex: 'sortOrder',
            key: 'sortOrder',
            width: 60,
            align: 'center'
        },
        {
            title: '可见',
            dataIndex: 'visible',
            key: 'visible',
            width: 70,
            align: 'center',
            render: (visible) => visible === 1 ?
                <EyeOutlined style={{color: '#52c41a'}}/> :
                <EyeInvisibleOutlined style={{color: '#ff4d4f'}}/>
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 70,
            align: 'center',
            render: (status) => (
                status === 1 ?
                    <Badge status="success" text="启用"/> :
                    <Badge status="error" text="禁用"/>
            )
        },
        {
            title: '操作',
            key: 'action',
            width: 180,
            fixed: 'right',
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="新增子菜单">
                        <Button
                            type="text"
                            icon={<PlusOutlined/>}
                            onClick={() => handleCreate(record.id)}
                            className="action-btn add-btn"
                        />
                    </Tooltip>
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
                            icon={record.status === 1 ? <EyeInvisibleOutlined/> : <EyeOutlined/>}
                            onClick={() => handleToggleStatus(record)}
                            className={`action-btn ${record.status === 1 ? 'disable-btn' : 'enable-btn'}`}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="确认删除"
                        description={record.children && record.children.length > 0
                            ? `该菜单包含 ${record.children.length} 个子菜单，请先删除子菜单`
                            : `确定要删除菜单 "${record.menuName}" 吗？`
                        }
                        onConfirm={() => handleDelete(record)}
                        okText="删除"
                        cancelText="取消"
                        okButtonProps={{danger: true, disabled: !!(record.children && record.children.length > 0)}}
                        disabled={!!(record.children && record.children.length > 0)}
                    >
                        <Tooltip title={record.children && record.children.length > 0 ? '请先删除子菜单' : '删除'}>
                            <Button
                                type="text"
                                icon={<DeleteOutlined/>}
                                className="action-btn delete-btn"
                                disabled={!!(record.children && record.children.length > 0)}
                            />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <div className="menu-list-container">
            {/* 页面头部 */}
            <Card className="menu-list-card">
                <div className="card-header">
                    <Breadcrumb
                        items={[
                            {title: <Link to={'/menu'}><BarsOutlined/>菜单管理</Link>},
                            {title: '菜单列表'}
                        ]}
                    />
                    <Title level={4} style={{marginTop: 10, marginBottom: 0}}>菜单列表</Title>
                </div>
            </Card>

            {/* 筛选区域 */}
            <Card className="filter-card">
                <div className="filter-content">
                    <div className="filter-left">
                        <Input.Search
                            placeholder="搜索菜单名称/Key/路径"
                            allowClear
                            enterButton={<SearchOutlined/>}
                            onSearch={handleSearch}
                            style={{width: 300}}
                            className="search-input"
                        />
                    </div>
                    <div className="filter-right">
                        <Button
                            icon={<ReloadOutlined/>}
                            onClick={fetchMenus}
                            className="refresh-btn"
                        >
                            刷新
                        </Button>
                        <Button
                            type="primary"
                            icon={<PlusOutlined/>}
                            onClick={() => handleCreate(0)}
                            className="create-btn"
                        >
                            新增菜单
                        </Button>
                    </div>
                </div>
            </Card>

            {/* 菜单表格 */}
            <Card className="table-card">
                <Table
                    columns={columns}
                    dataSource={tableData}
                    rowKey="id"
                    loading={loading}
                    pagination={false}
                    scroll={{x: 1200}}
                    className="menu-table"
                />
            </Card>

            {/* 创建/编辑菜单Modal */}
            <Modal
                title={modalTitle}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => {
                    setIsModalVisible(false)
                    form.resetFields()
                }}
                width={700}
                className="menu-modal"
                okText="保存"
                cancelText="取消"
            >
                <Form
                    form={form}
                    layout="vertical"
                    className="menu-form"
                >
                    <Form.Item
                        label="父级菜单"
                        name="parentId"
                    >
                        <Select placeholder="请选择父级菜单" allowClear>
                            {getMenuOptions().map(option => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="菜单名称"
                        name="menuName"
                        rules={[
                            {required: true, message: '请输入菜单名称'},
                            {max: 20, message: '菜单名称最多20位'}
                        ]}
                    >
                        <InputAntd placeholder="请输入菜单名称"/>
                    </Form.Item>

                    <Form.Item
                        label="菜单Key"
                        name="menuKey"
                        rules={[
                            {required: true, message: '请输入菜单Key'},
                            {pattern: /^[a-zA-Z][a-zA-Z0-9_.]*$/, message: '只能包含字母、数字、下划线和点'}
                        ]}
                    >
                        <InputAntd placeholder="如：system.setting" disabled={isEditMode}/>
                    </Form.Item>

                    <Form.Item
                        label="路由路径"
                        name="path"
                        rules={[{required: true, message: '请输入路由路径'}]}
                    >
                        <InputAntd placeholder="如：/systemSetting"/>
                    </Form.Item>

                    <Form.Item
                        label="组件路径"
                        name="component"
                    >
                        <InputAntd placeholder="如：Layout/SystemSetting"/>
                    </Form.Item>

                    <Form.Item
                        label="图标"
                        name="icon"
                    >
                        <Select placeholder="请选择图标" allowClear>
                            {iconOptions.map(icon => (
                                <Option key={icon} value={icon}>
                                    {icon}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="权限标识"
                        name="permission"
                    >
                        <InputAntd placeholder="如：system:setting:view"/>
                    </Form.Item>

                    <Form.Item
                        label="排序"
                        name="sortOrder"
                    >
                        <InputAntd type="number" placeholder="0" min={0}/>
                    </Form.Item>

                    <Divider style={{margin: '16px 0'}}>显示设置</Divider>

                    <Form.Item
                        label="是否可见"
                        name="visible"
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="显示" unCheckedChildren="隐藏"/>
                    </Form.Item>

                    <Form.Item
                        label="状态"
                        name="status"
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="启用" unCheckedChildren="禁用"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default MenuList
