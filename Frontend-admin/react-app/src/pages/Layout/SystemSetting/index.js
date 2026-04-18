import {useState} from 'react'
import {
    Card,
    Form,
    Input,
    InputNumber,
    Select,
    Switch,
    Button,
    Tabs,
    Typography,
    Breadcrumb,
    Upload,
    Avatar,
    Space,
    Divider,
    message,
    Row,
    Col
} from 'antd'
import {
    SettingOutlined,
    SaveOutlined,
    GlobalOutlined,
    MailOutlined,
    UploadOutlined,
    SafetyOutlined,
    BgColorsOutlined,
    ClusterOutlined,
    UserOutlined,
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import './index.scss'

// TODO: 后端API未实现
// 系统设置功能需要实现以下后端API:
// - GET /api/config - 获取系统配置
// - PUT /api/config - 更新系统配置
// - PUT /api/config/email - 更新邮件配置（需加密存储密码）
// - PUT /api/config/upload - 更新上传配置
// - PUT /api/config/security - 更新安全设置
// - PUT /api/config/theme - 更新主题配置
// - PUT /api/config/cache - 更新缓存配置（Redis）
// - POST /api/upload/logo - 上传系统Logo

const {Title, Text} = Typography
const {Option} = Select
const {TextArea} = Input
const {TabPane} = Tabs

/**
 * 系统设置页面
 * 包含：基本信息、邮件配置、上传配置、安全设置、主题配置、缓存配置
 */
const SystemSetting = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('basic')

    // 模拟配置数据
    const [systemConfig] = useState({
        system: {
            name: '智慧校园平台',
            logo: '',
            copyright: '© 2024 智慧校园平台 版权所有',
            version: '1.0.0'
        },
        email: {
            host: 'smtp.example.com',
            port: 465,
            username: 'noreply@school.edu',
            password: '',
            from: '智慧校园平台 <noreply@school.edu>',
            secure: true
        },
        upload: {
            maxSize: 10,
            allowedTypes: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'],
            storagePath: '/uploads'
        },
        security: {
            minPasswordLength: 8,
            passwordRegex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$',
            maxLoginAttempts: 5,
            sessionTimeout: 30,
            allowRegister: false
        },
        theme: {
            primaryColor: '#1890ff',
            sidebarStyle: 'light',
            compactMode: false
        },
        cache: {
            host: 'localhost',
            port: 6379,
            password: '',
            db: 0,
            ttl: 3600
        }
    })

    /**
     * 处理表单提交
     */
    const handleSubmit = async (values) => {
        setLoading(true)
        // 模拟API调用
        setTimeout(() => {
            console.log('提交的设置数据:', values)
            message.success('设置保存成功')
            setLoading(false)
        }, 1000)
    }

    /**
     * 处理头像上传
     */
    const handleLogoUpload = (info) => {
        if (info.file.status === 'done') {
            message.success('Logo上传成功')
        } else if (info.file.status === 'error') {
            message.error('Logo上传失败')
        }
    }

    const uploadProps = {
        name: 'logo',
        action: '/api/upload/logo',
        accept: 'image/*',
        showUploadList: false,
        beforeUpload: (file) => {
            const isImage = file.type.startsWith('image/')
            if (!isImage) {
                message.error('只能上传图片文件')
                return false
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                message.error('图片大小不能超过 2MB')
                return false
            }
            return false
        },
        onChange: handleLogoUpload
    }

    // Tab配置
    const tabItems = [
        {
            key: 'basic',
            label: (
                <span>
                    <GlobalOutlined />
                    基本信息
                </span>
            ),
            children: (
                <div className="tab-content">
                    <div className="section-title">
                        <GlobalOutlined />
                        <span>系统基本信息</span>
                    </div>
                    <Form.Item
                        label="系统名称"
                        name={['system', 'name']}
                        rules={[{ required: true, message: '请输入系统名称' }]}
                    >
                        <Input placeholder="请输入系统名称" />
                    </Form.Item>

                    <Form.Item
                        label="系统Logo"
                        name={['system', 'logo']}
                        valuePropName="fileList"
                        getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                    >
                        <Upload {...uploadProps} maxCount={1}>
                            <Button icon={<UploadOutlined />}>上传Logo</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="版权信息"
                        name={['system', 'copyright']}
                    >
                        <TextArea
                            placeholder="请输入版权信息"
                            rows={2}
                            maxLength={100}
                            showCount
                        />
                    </Form.Item>

                    <Form.Item
                        label="系统版本"
                        name={['system', 'version']}
                    >
                        <Input placeholder="如：1.0.0" disabled />
                    </Form.Item>
                </div>
            )
        },
        {
            key: 'email',
            label: (
                <span>
                    <MailOutlined />
                    邮件配置
                </span>
            ),
            children: (
                <div className="tab-content">
                    <div className="section-title">
                        <MailOutlined />
                        <span>SMTP邮件服务器配置</span>
                    </div>
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="SMTP服务器"
                                name={['email', 'host']}
                                rules={[{ required: true, message: '请输入SMTP服务器地址' }]}
                            >
                                <Input placeholder="smtp.example.com" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="端口"
                                name={['email', 'port']}
                                rules={[{ required: true, message: '请输入端口号' }]}
                            >
                                <InputNumber style={{ width: '100%' }} placeholder="465" min={1} max={65535} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="用户名"
                                name={['email', 'username']}
                                rules={[{ required: true, message: '请输入用户名' }]}
                            >
                                <Input placeholder="请输入SMTP用户名" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="密码"
                                name={['email', 'password']}
                            >
                                <Input.Password placeholder="请输入SMTP密码" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="发件人"
                        name={['email', 'from']}
                        rules={[{ required: true, message: '请输入发件人地址' }]}
                    >
                        <Input placeholder="智慧校园平台 <noreply@school.edu>" />
                    </Form.Item>

                    <Form.Item
                        label="使用SSL"
                        name={['email', 'secure']}
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                    </Form.Item>
                </div>
            )
        },
        {
            key: 'upload',
            label: (
                <span>
                    <UploadOutlined />
                    上传配置
                </span>
            ),
            children: (
                <div className="tab-content">
                    <div className="section-title">
                        <UploadOutlined />
                        <span>文件上传配置</span>
                    </div>
                    <Form.Item
                        label="最大文件大小(MB)"
                        name={['upload', 'maxSize']}
                        rules={[{ required: true, message: '请输入最大文件大小' }]}
                    >
                        <InputNumber style={{ width: '100%' }} min={1} max={100} placeholder="10" />
                    </Form.Item>

                    <Form.Item
                        label="允许的文件类型"
                        name={['upload', 'allowedTypes']}
                        rules={[{ required: true, message: '请选择允许的文件类型' }]}
                    >
                        <Select mode="multiple" placeholder="请选择允许的文件类型">
                            <Option value="jpg">JPG</Option>
                            <Option value="jpeg">JPEG</Option>
                            <Option value="png">PNG</Option>
                            <Option value="gif">GIF</Option>
                            <Option value="pdf">PDF</Option>
                            <Option value="doc">DOC</Option>
                            <Option value="docx">DOCX</Option>
                            <Option value="xls">XLS</Option>
                            <Option value="xlsx">XLSX</Option>
                            <Option value="zip">ZIP</Option>
                            <Option value="rar">RAR</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="存储路径"
                        name={['upload', 'storagePath']}
                        rules={[{ required: true, message: '请输入存储路径' }]}
                    >
                        <Input placeholder="/uploads" />
                    </Form.Item>
                </div>
            )
        },
        {
            key: 'security',
            label: (
                <span>
                    <SafetyOutlined />
                    安全设置
                </span>
            ),
            children: (
                <div className="tab-content">
                    <div className="section-title">
                        <SafetyOutlined />
                        <span>安全策略配置</span>
                    </div>
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="最小密码长度"
                                name={['security', 'minPasswordLength']}
                                rules={[{ required: true, message: '请输入最小密码长度' }]}
                            >
                                <InputNumber style={{ width: '100%' }} min={6} max={32} placeholder="8" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="密码正则表达式"
                                name={['security', 'passwordRegex']}
                            >
                                <Input placeholder="密码复杂度正则" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="最大登录尝试次数"
                                name={['security', 'maxLoginAttempts']}
                                rules={[{ required: true, message: '请输入最大登录尝试次数' }]}
                            >
                                <InputNumber style={{ width: '100%' }} min={3} max={10} placeholder="5" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="会话超时(分钟)"
                                name={['security', 'sessionTimeout']}
                                rules={[{ required: true, message: '请输入会话超时时间' }]}
                            >
                                <InputNumber style={{ width: '100%' }} min={5} max={1440} placeholder="30" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider />

                    <Form.Item
                        label="允许新用户注册"
                        name={['security', 'allowRegister']}
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                    </Form.Item>
                </div>
            )
        },
        {
            key: 'theme',
            label: (
                <span>
                    <BgColorsOutlined />
                    主题配置
                </span>
            ),
            children: (
                <div className="tab-content">
                    <div className="section-title">
                        <BgColorsOutlined />
                        <span>界面主题配置</span>
                    </div>
                    <Form.Item
                        label="主题色"
                        name={['theme', 'primaryColor']}
                    >
                        <Input type="color" style={{ width: '100px', height: '32px' }} />
                    </Form.Item>

                    <Form.Item
                        label="侧边栏样式"
                        name={['theme', 'sidebarStyle']}
                    >
                        <Select placeholder="请选择侧边栏样式">
                            <Option value="light">浅色</Option>
                            <Option value="dark">深色</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="紧凑模式"
                        name={['theme', 'compactMode']}
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                    </Form.Item>
                </div>
            )
        },
        {
            key: 'cache',
            label: (
                <span>
                    <ClusterOutlined />
                    缓存配置
                </span>
            ),
            children: (
                <div className="tab-content">
                    <div className="section-title">
                        <ClusterOutlined />
                        <span>Redis缓存配置</span>
                    </div>
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="Redis主机"
                                name={['cache', 'host']}
                                rules={[{ required: true, message: '请输入Redis主机' }]}
                            >
                                <Input placeholder="localhost" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="端口"
                                name={['cache', 'port']}
                                rules={[{ required: true, message: '请输入端口号' }]}
                            >
                                <InputNumber style={{ width: '100%' }} placeholder="6379" min={1} max={65535} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="密码"
                                name={['cache', 'password']}
                            >
                                <Input.Password placeholder="请输入Redis密码（可选）" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label="数据库编号"
                                name={['cache', 'db']}
                            >
                                <InputNumber style={{ width: '100%' }} min={0} max={15} placeholder="0" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="默认TTL(秒)"
                        name={['cache', 'ttl']}
                    >
                        <InputNumber style={{ width: '100%' }} min={60} max={86400} placeholder="3600" />
                    </Form.Item>
                </div>
            )
        }
    ]

    return (
        <div className="system-setting-container">
            {/* 页面头部 */}
            <Card className="system-setting-card">
                <div className="card-header">
                    <Breadcrumb
                        items={[
                            { title: <Link to={'/system'}><SettingOutlined />系统管理</Link> },
                            { title: '系统设置' }
                        ]}
                    />
                    <Title level={4} style={{ marginTop: 10, marginBottom: 0 }}>系统设置</Title>
                </div>
            </Card>

            {/* 设置内容区域 */}
            <Card className="setting-content-card">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={systemConfig}
                    className="system-setting-form"
                >
                    <Tabs
                        activeKey={activeTab}
                        onChange={setActiveTab}
                        tabPosition="left"
                        className="setting-tabs"
                        items={tabItems}
                    />

                    <div className="form-actions">
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SaveOutlined />}
                                loading={loading}
                                className="submit-btn"
                            >
                                保存设置
                            </Button>
                            <Button
                                onClick={() => form.resetFields()}
                                className="reset-btn"
                            >
                                重置
                            </Button>
                        </Space>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default SystemSetting
