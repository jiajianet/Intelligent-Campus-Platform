import {useState} from 'react'
import {
    Card,
    Form,
    Input,
    Select,
    Button,
    Space,
    Upload,
    Avatar,
    message,
    Typography,
    Breadcrumb,
    Divider,
    Row,
    Col
} from 'antd'
import {
    UserOutlined,
    UploadOutlined,
    ArrowLeftOutlined,
    SaveOutlined,
    KeyOutlined,
    MailOutlined,
    PhoneOutlined,
    IdcardOutlined
} from '@ant-design/icons'
import {Link, useNavigate} from 'react-router-dom'
import './index.scss'

// TODO: 后端API未实现
// 创建用户功能需要实现以下后端API:
// - POST /api/user - 创建用户（需包含用户名唯一性校验）
// - POST /api/upload/avatar - 头像上传
// - GET /api/role/list - 获取角色列表（用于角色选择下拉）

const {Title, Text} = Typography
const {Option} = Select
const {TextArea} = Input

/**
 * 角色选项
 */
const roleOptions = [
    {value: 1, label: '超级管理员', description: '拥有所有系统权限'},
    {value: 2, label: '教师', description: '可以管理教学内容'},
    {value: 3, label: '学生', description: '可以浏览和学习'},
    {value: 4, label: '内容编辑', description: '可以编辑文章内容'},
    {value: 5, label: '访客', description: '只读访问权限'}
]

const CreateUser = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState('')

    /**
     * 处理头像上传
     */
    const handleAvatarChange = (info) => {
        if (info.file.status === 'done') {
            message.success('头像上传成功')
        } else if (info.file.status === 'error') {
            message.error('头像上传失败')
        }
    }

    /**
     * 自定义上传请求
     */
    const uploadProps = {
        name: 'avatar',
        action: '/api/upload/avatar',
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
            // 读取文件为Base64预览
            const reader = new FileReader()
            reader.onload = (e) => {
                setAvatarUrl(e.target.result)
            }
            reader.readAsDataURL(file)
            return false // 阻止默认上传
        },
        onChange: handleAvatarChange
    }

    /**
     * 表单提交
     */
    const handleSubmit = async (values) => {
        setLoading(true)
        // 模拟API调用
        setTimeout(() => {
            console.log('提交的用户数据:', {
                ...values,
                avatar: avatarUrl,
                status: 1
            })
            message.success('用户创建成功')
            setLoading(false)
            navigate('/userList')
        }, 1000)
    }

    /**
     * 处理取消
     */
    const handleCancel = () => {
        navigate('/userList')
    }

    /**
     * 表单验证规则
     */
    const validateRules = {
        username: {
            required: true,
            message: '请输入用户名'
        },
        password: {
            required: true,
            message: '请输入密码',
            min: 6,
            message: '密码至少6位'
        },
        realName: {
            required: true,
            message: '请输入真实姓名'
        },
        email: {
            required: true,
            message: '请输入邮箱'
        },
        phone: {
            required: false,
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入正确的手机号'
        },
        roleId: {
            required: true,
            message: '请选择用户角色'
        }
    }

    return (
        <div className="create-user-container">
            {/* 页面头部 */}
            <Card className="create-user-card">
                <div className="card-header">
                    <Breadcrumb
                        items={[
                            {title: <Link to={'/users'}><UserOutlined/>用户管理</Link>},
                            {title: '创建用户'}
                        ]}
                    />
                    <Title level={4} style={{marginTop: 10, marginBottom: 0}}>创建用户</Title>
                </div>
            </Card>

            {/* 表单区域 */}
            <Card className="form-card">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        status: 1,
                        roleId: undefined
                    }}
                    className="create-user-form"
                >
                    <Row gutter={24}>
                        {/* 左侧：头像上传 */}
                        <Col xs={24} md={6}>
                            <div className="avatar-section">
                                <div className="avatar-preview">
                                    <Upload {...uploadProps}>
                                        <div className="avatar-upload-wrapper">
                                            {avatarUrl ? (
                                                <Avatar
                                                    size={120}
                                                    src={avatarUrl}
                                                    className="avatar-image"
                                                />
                                            ) : (
                                                <Avatar
                                                    size={120}
                                                    icon={<UserOutlined/>}
                                                    className="avatar-placeholder"
                                                />
                                            )}
                                            <div className="avatar-mask">
                                                <UploadOutlined/>
                                                <span>更换头像</span>
                                            </div>
                                        </div>
                                    </Upload>
                                </div>
                                <Text type="secondary" className="avatar-hint">
                                    支持 jpg、png 格式，不超过 2MB
                                </Text>
                            </div>
                        </Col>

                        {/* 右侧：表单内容 */}
                        <Col xs={24} md={18}>
                            <div className="form-section">
                                <div className="section-title">
                                    <IdcardOutlined/>
                                    <span>基本信息</span>
                                </div>

                                <Row gutter={16}>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label="用户名"
                                            name="username"
                                            rules={[
                                                {required: true, message: '请输入用户名'},
                                                {min: 3, message: '用户名至少3位'},
                                                {max: 20, message: '用户名最多20位'},
                                                {
                                                    pattern: /^[a-zA-Z0-9_]+$/,
                                                    message: '只能包含字母、数字和下划线'
                                                }
                                            ]}
                                            hasFeedback
                                        >
                                            <Input
                                                prefix={<UserOutlined/>}
                                                placeholder="请输入用户名"
                                                maxLength={20}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label="密码"
                                            name="password"
                                            rules={[
                                                {required: true, message: '请输入密码'},
                                                {min: 6, message: '密码至少6位'},
                                                {max: 20, message: '密码最多20位'}
                                            ]}
                                            hasFeedback
                                        >
                                            <Input.Password
                                                prefix={<KeyOutlined/>}
                                                placeholder="请输入密码"
                                                maxLength={20}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label="真实姓名"
                                            name="realName"
                                            rules={[
                                                {required: true, message: '请输入真实姓名'},
                                                {max: 20, message: '姓名最多20位'}
                                            ]}
                                            hasFeedback
                                        >
                                            <Input
                                                placeholder="请输入真实姓名"
                                                maxLength={20}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label="角色"
                                            name="roleId"
                                            rules={[{required: true, message: '请选择用户角色'}]}
                                        >
                                            <Select placeholder="请选择用户角色">
                                                {roleOptions.map(option => (
                                                    <Option key={option.value} value={option.value}>
                                                        <div className="role-option">
                                                            <span>{option.label}</span>
                                                            <Text type="secondary" className="role-desc">
                                                                {option.description}
                                                            </Text>
                                                        </div>
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Divider/>

                                <div className="section-title">
                                    <MailOutlined/>
                                    <span>联系信息</span>
                                </div>

                                <Row gutter={16}>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label="邮箱"
                                            name="email"
                                            rules={[
                                                {required: true, message: '请输入邮箱'},
                                                {type: 'email', message: '请输入正确的邮箱格式'}
                                            ]}
                                            hasFeedback
                                        >
                                            <Input
                                                prefix={<MailOutlined/>}
                                                placeholder="请输入邮箱"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Form.Item
                                            label="手机号"
                                            name="phone"
                                            rules={[
                                                {pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号'}
                                            ]}
                                            hasFeedback
                                        >
                                            <Input
                                                prefix={<PhoneOutlined/>}
                                                placeholder="请输入手机号"
                                                maxLength={11}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col xs={24}>
                                        <Form.Item
                                            label="备注"
                                            name="remark"
                                        >
                                            <TextArea
                                                placeholder="请输入备注信息（选填）"
                                                rows={3}
                                                maxLength={200}
                                                showCount
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Divider/>

                                {/* 表单操作按钮 */}
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
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    )
}

export default CreateUser
