import {useState, useEffect} from 'react'
import {
    Card,
    Form,
    Input,
    InputNumber,
    Select,
    Button,
    Space,
    Typography,
    Breadcrumb,
    Divider,
    Switch,
    message,
    Radio,
    TreeSelect
} from 'antd'
import {
    SaveOutlined,
    ArrowLeftOutlined,
    BarsOutlined,
    FolderOutlined,
    MenuOutlined,
    SettingOutlined,
    UserOutlined,
    FileOutlined
} from '@ant-design/icons'
import {Link, useNavigate} from 'react-router-dom'
import './index.scss'

const {Title, Text} = Typography
const {Option} = Select
const {TextArea} = Input

/**
 * 模拟菜单数据（用于父级选择）
 */
const mockMenuTree = [
    {
        value: '1',
        title: '仪表盘',
        children: [
            {value: '11', title: '首页'},
            {value: '12', title: '用户中心'}
        ]
    },
    {
        value: '2',
        title: '文章管理',
        children: [
            {value: '21', title: '文章列表'},
            {value: '22', title: '创建文章'},
            {value: '23', title: '主页轮播图'}
        ]
    },
    {
        value: '3',
        title: '用户管理',
        children: [
            {value: '31', title: '用户列表'},
            {value: '32', title: '创建用户'}
        ]
    },
    {
        value: '4',
        title: '系统管理',
        children: [
            {value: '41', title: '系统设置'},
            {value: '42', title: '角色管理'}
        ]
    },
    {
        value: '5',
        title: '菜单管理',
        children: [
            {value: '51', title: '菜单列表'},
            {value: '52', title: '创建菜单'}
        ]
    },
    {
        value: '6',
        title: '运维管理',
        children: [
            {value: '61', title: '日志管理'},
            {value: '62', title: '定时任务'}
        ]
    }
]

/** 菜单类型 */
const menuTypes = [
    {value: 'directory', label: '目录', icon: <FolderOutlined/>, desc: '用于分组菜单，不直接绑定路由'},
    {value: 'menu', label: '菜单', icon: <MenuOutlined/>, desc: '标准菜单项，绑定具体路由'},
    {value: 'button', label: '按钮', icon: <BarsOutlined/>, desc: '页面内功能按钮，用于权限控制'}
]

/** 图标选项 */
const iconOptions = [
    {value: 'PieChartOutlined', label: 'PieChartOutlined'},
    {value: 'HomeOutlined', label: 'HomeOutlined'},
    {value: 'IdcardOutlined', label: 'IdcardOutlined'},
    {value: 'FileOutlined', label: 'FileOutlined'},
    {value: 'DiffOutlined', label: 'DiffOutlined'},
    {value: 'EditOutlined', label: 'EditOutlined'},
    {value: 'UserOutlined', label: 'UserOutlined'},
    {value: 'UserAddOutlined', label: 'UserAddOutlined'},
    {value: 'SolutionOutlined', label: 'SolutionOutlined'},
    {value: 'TeamOutlined', label: 'TeamOutlined'},
    {value: 'SettingOutlined', label: 'SettingOutlined'},
    {value: 'BarsOutlined', label: 'BarsOutlined'},
    {value: 'BugOutlined', label: 'BugOutlined'},
    {value: 'FileTextOutlined', label: 'FileTextOutlined'},
    {value: 'UnorderedListOutlined', label: 'UnorderedListOutlined'},
    {value: 'PlusOutlined', label: 'PlusOutlined'},
    {value: 'SearchOutlined', label: 'SearchOutlined'},
    {value: 'DeleteOutlined', label: 'DeleteOutlined'},
    {value: 'ReloadOutlined', label: 'ReloadOutlined'},
    {value: 'MenuOutlined', label: 'MenuOutlined'},
    {value: 'FolderOutlined', label: 'FolderOutlined'},
    {value: 'FolderOpenOutlined', label: 'FolderOpenOutlined'},
    {value: 'WindowsOutlined', label: 'WindowsOutlined'},
    {value: 'AppstoreOutlined', label: 'AppstoreOutlined'}
]

const CreateMenu = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [menuType, setMenuType] = useState('menu')

    // 监听菜单类型变化
    useEffect(() => {
        form.setFieldsValue({menuType})
    }, [menuType, form])

    /**
     * 处理表单提交
     */
    const handleSubmit = async (values) => {
        setLoading(true)
        // 模拟API调用
        setTimeout(() => {
            console.log('提交的菜单数据:', {
                ...values,
                parentId: values.parentId || 0
            })
            message.success('菜单创建成功')
            setLoading(false)
            navigate('/menuList')
        }, 1000)
    }

    /**
     * 处理取消
     */
    const handleCancel = () => {
        navigate('/menuList')
    }

    /**
     * 父级菜单选择变化
     */
    const handleParentChange = (value) => {
        if (value) {
            // 如果选择了父级菜单，默认设为菜单类型
            form.setFieldsValue({menuType: 'menu'})
            setMenuType('menu')
        }
    }

    /**
     * 根据菜单类型动态渲染表单项
     */
    const renderFieldsByType = () => {
        if (menuType === 'button') {
            return (
                <>
                    <Form.Item
                        label="权限标识"
                        name="permission"
                        rules={[{required: true, message: '请输入权限标识'}]}
                        extra="用于按钮级权限控制，如：user:create"
                    >
                        <Input placeholder="如：user:create"/>
                    </Form.Item>
                </>
            )
        }

        if (menuType === 'directory') {
            return (
                <>
                    <Form.Item
                        label="图标"
                        name="icon"
                    >
                        <Select placeholder="请选择图标" allowClear>
                            {iconOptions.map(icon => (
                                <Option key={icon.value} value={icon.value}>
                                    {icon.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </>
            )
        }

        // menu类型
        return (
            <>
                <Form.Item
                    label="路由路径"
                    name="path"
                    rules={[{required: true, message: '请输入路由路径'}]}
                >
                    <Input placeholder="如：/systemSetting"/>
                </Form.Item>

                <Form.Item
                    label="组件路径"
                    name="component"
                    extra="对应前端页面组件路径"
                >
                    <Input placeholder="如：Layout/SystemSetting"/>
                </Form.Item>

                <Form.Item
                    label="图标"
                    name="icon"
                >
                    <Select placeholder="请选择图标" allowClear>
                        {iconOptions.map(icon => (
                            <Option key={icon.value} value={icon.value}>
                                {icon.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="权限标识"
                    name="permission"
                    extra="可选，用于页面级权限控制"
                >
                    <Input placeholder="如：system:setting:view"/>
                </Form.Item>
            </>
        )
    }

    return (
        <div className="create-menu-container">
            {/* 页面头部 */}
            <Card className="create-menu-card">
                <div className="card-header">
                    <Breadcrumb
                        items={[
                            {title: <Link to={'/menu'}><BarsOutlined/>菜单管理</Link>},
                            {title: '创建菜单'}
                        ]}
                    />
                    <Title level={4} style={{marginTop: 10, marginBottom: 0}}>创建菜单</Title>
                </div>
            </Card>

            {/* 表单区域 */}
            <Card className="form-card">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        parentId: undefined,
                        menuType: 'menu',
                        sortOrder: 0,
                        visible: true,
                        status: true
                    }}
                    className="create-menu-form"
                >
                    {/* 基本信息 */}
                    <div className="form-section">
                        <div className="section-title">
                            <SettingOutlined/>
                            <span>基本信息</span>
                        </div>

                        <Form.Item
                            label="父级菜单"
                            name="parentId"
                        >
                            <TreeSelect
                                placeholder="请选择父级菜单（留空为顶级菜单）"
                                allowClear
                                treeData={mockMenuTree}
                                onChange={handleParentChange}
                                treeDefaultExpandAll
                                style={{width: '100%'}}
                            />
                        </Form.Item>

                        <Form.Item
                            label="菜单类型"
                            name="menuType"
                            rules={[{required: true, message: '请选择菜单类型'}]}
                        >
                            <Radio.Group
                                onChange={(e) => setMenuType(e.target.value)}
                                value={menuType}
                                className="menu-type-group"
                            >
                                {menuTypes.map(type => (
                                    <Radio.Button key={type.value} value={type.value}>
                                        <Space>
                                            {type.icon}
                                            <span>{type.label}</span>
                                        </Space>
                                    </Radio.Button>
                                ))}
                            </Radio.Group>
                        </Form.Item>
                        <div className="menu-type-desc">
                            <Text type="secondary">
                                {menuTypes.find(t => t.value === menuType)?.desc}
                            </Text>
                        </div>

                        <Form.Item
                            label="菜单名称"
                            name="menuName"
                            rules={[
                                {required: true, message: '请输入菜单名称'},
                                {max: 20, message: '菜单名称最多20位'}
                            ]}
                        >
                            <Input placeholder="请输入菜单名称"/>
                        </Form.Item>

                        <Form.Item
                            label="菜单Key"
                            name="menuKey"
                            rules={[
                                {required: true, message: '请输入菜单Key'},
                                {max: 50, message: '菜单Key最多50位'},
                                {pattern: /^[a-zA-Z][a-zA-Z0-9_.]*$/, message: '只能包含字母、数字、下划线和点，以字母开头'}
                            ]}
                            extra="用于前端路由识别，必须唯一"
                        >
                            <Input placeholder="如：system.setting"/>
                        </Form.Item>

                        {renderFieldsByType()}
                    </div>

                    <Divider/>

                    {/* 显示设置 */}
                    <div className="form-section">
                        <div className="section-title">
                            <UserOutlined/>
                            <span>显示设置</span>
                        </div>

                        <Form.Item
                            label="排序"
                            name="sortOrder"
                            extra="数字越小越靠前"
                        >
                            <InputNumber style={{width: '100%'}} min={0} max={999} placeholder="0"/>
                        </Form.Item>

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
                    </div>

                    <Divider/>

                    {/* 操作按钮 */}
                    <div className="form-actions">
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SaveOutlined/>}
                                loading={loading}
                                className="submit-btn"
                            >
                                保存
                            </Button>
                            <Button
                                icon={<ArrowLeftOutlined/>}
                                onClick={handleCancel}
                                className="cancel-btn"
                            >
                                取消
                            </Button>
                        </Space>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default CreateMenu
