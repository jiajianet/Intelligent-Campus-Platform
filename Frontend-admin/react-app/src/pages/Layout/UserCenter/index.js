/**
 * User Center Component
 * @description User dashboard with statistics and account settings
 * @author 犀焰澄泓团队
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import {
    Card,
    Row,
    Col,
    Table,
    DatePicker,
    Tag,
    Statistic,
    Progress,
    Space,
    Typography,
    Tabs,
    Form,
    Input,
    Button,
    Avatar,
    Upload,
    Modal,
    message,
    Divider,
    List,
    Switch,
    Select
} from 'antd';
import './index.scss';
import {
    ArrowUpOutlined,
    UserOutlined,
    CameraOutlined,
    LockOutlined,
    MailOutlined,
    PhoneOutlined,
    SafetyOutlined,
    SettingOutlined,
    BellOutlined,
    EditOutlined,
    SaveOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import LineChart from '../Home/components/LineChart';
import PieChart from '../Home/components/PieChart';
import './index.scss';

const { RangePicker } = DatePicker;
const { Title, Text, Paragraph } = Typography;
const { confirm } = Modal;

dayjs.locale('zh-cn');

// Sample user data
const mockUserInfo = {
    id: 1,
    username: 'admin',
    realName: '系统管理员',
    email: 'admin@campus.edu.cn',
    phone: '138****8888',
    role: '超级管理员',
    avatar: null,
    createTime: '2024-01-01',
    lastLoginTime: '2024-03-15 10:30:00'
};

// Statistics Data
const articleNumberData = [
    { key: '1', username: '小曾', number: 128, trend: '+12%' },
    { key: '2', username: '小杨', number: 96, trend: '+8%' },
    { key: '3', username: '小贾', number: 84, trend: '-3%' },
    { key: '4', username: '小明', number: 72, trend: '+15%' },
    { key: '5', username: '小红', number: 64, trend: '+5%' },
];

const salesCategoryData = [
    { type: '科技', value: 666, percent: 52.3, color: '#667eea' },
    { type: '娱乐', value: 234, percent: 18.4, color: '#52c41a' },
    { type: '体育', value: 156, percent: 12.2, color: '#faad14' },
    { type: '军事', value: 120, percent: 9.4, color: '#ff4d4f' },
    { type: '推荐', value: 98, percent: 7.7, color: '#13c2c2' },
];

// User Info Card Component
const UserInfoCard = ({ userInfo, onEditAvatar, onEditInfo }) => {
    return (
        <Card className="user-info-card" bordered={false}>
            <div className="user-header">
                <div className="avatar-wrapper">
                    <Avatar
                        size={100}
                        src={userInfo.avatar}
                        icon={!userInfo.avatar && <UserOutlined />}
                        className="user-avatar"
                    />
                    <div className="avatar-upload-mask" onClick={onEditAvatar}>
                        <CameraOutlined />
                    </div>
                </div>
                <div className="user-basic-info">
                    <Title level={4} className="user-name">{userInfo.realName}</Title>
                    <Tag color="gold">{userInfo.role}</Tag>
                    <div className="user-meta">
                        <Text type="secondary">用户名：{userInfo.username}</Text>
                    </div>
                </div>
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={onEditInfo}
                    className="edit-btn"
                >
                    编辑资料
                </Button>
            </div>

            <Divider style={{ margin: '16px 0' }} />

            <div className="user-detail-info">
                <List>
                    <List.Item>
                        <List.Item.Meta
                            avatar={<MailOutlined className="info-icon" />}
                            title="邮箱"
                            description={userInfo.email}
                        />
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            avatar={<PhoneOutlined className="info-icon" />}
                            title="手机号"
                            description={userInfo.phone}
                        />
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            avatar={<SafetyOutlined className="info-icon" />}
                            title="创建时间"
                            description={userInfo.createTime}
                        />
                    </List.Item>
                    <List.Item>
                        <List.Item.Meta
                            avatar={<UserOutlined className="info-icon" />}
                            title="最后登录"
                            description={userInfo.lastLoginTime}
                        />
                    </List.Item>
                </List>
            </div>
        </Card>
    );
};

// Account Settings Component
const AccountSettings = ({ userInfo }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [passwordForm] = Form.useForm();
    const [securityForm] = Form.useForm();

    const handleSaveProfile = async (values) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            message.success('个人信息更新成功');
        }, 1000);
    };

    const handleChangePassword = async (values) => {
        if (values.newPassword !== values.confirmPassword) {
            message.error('两次输入的密码不一致');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            message.success('密码修改成功，请重新登录');
            passwordForm.resetFields();
        }, 1000);
    };

    const handleSaveSecurity = async (values) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            message.success('安全设置已更新');
        }, 1000);
    };

    const handleDeleteAccount = () => {
        confirm({
            title: '确定要注销账号吗？',
            icon: <ExclamationCircleOutlined />,
            content: '此操作将永久删除您的账号数据，且无法恢复。请谨慎操作！',
            okText: '确认注销',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                message.success('账号注销功能开发中');
            },
        });
    };

    const tabItems = [
        {
            key: 'profile',
            label: (
                <span>
                    <UserOutlined />
                    基本资料
                </span>
            ),
            children: (
                <Card className="settings-card">
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={userInfo}
                        onFinish={handleSaveProfile}
                    >
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label="真实姓名"
                                    name="realName"
                                    rules={[{ required: true, message: '请输入真实姓名' }]}
                                >
                                    <Input placeholder="请输入真实姓名" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="用户名"
                                    name="username"
                                >
                                    <Input disabled placeholder="用户名不可修改" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    label="邮箱"
                                    name="email"
                                    rules={[
                                        { required: true, message: '请输入邮箱' },
                                        { type: 'email', message: '请输入有效的邮箱地址' }
                                    ]}
                                >
                                    <Input placeholder="请输入邮箱" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="手机号"
                                    name="phone"
                                    rules={[{ required: true, message: '请输入手机号' }]}
                                >
                                    <Input placeholder="请输入手机号" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                                保存修改
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            ),
        },
        {
            key: 'password',
            label: (
                <span>
                    <LockOutlined />
                    修改密码
                </span>
            ),
            children: (
                <Card className="settings-card">
                    <Form
                        form={passwordForm}
                        layout="vertical"
                        onFinish={handleChangePassword}
                    >
                        <Form.Item
                            label="当前密码"
                            name="currentPassword"
                            rules={[{ required: true, message: '请输入当前密码' }]}
                        >
                            <Input.Password placeholder="请输入当前密码" />
                        </Form.Item>
                        <Form.Item
                            label="新密码"
                            name="newPassword"
                            rules={[
                                { required: true, message: '请输入新密码' },
                                { min: 6, message: '密码长度至少6位' }
                            ]}
                        >
                            <Input.Password placeholder="请输入新密码" />
                        </Form.Item>
                        <Form.Item
                            label="确认新密码"
                            name="confirmPassword"
                            rules={[{ required: true, message: '请确认新密码' }]}
                        >
                            <Input.Password placeholder="请再次输入新密码" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} icon={<LockOutlined />}>
                                修改密码
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            ),
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
                <Card className="settings-card">
                    <Form
                        form={securityForm}
                        layout="vertical"
                        initialValues={{
                            loginNotify: true,
                            riskNotify: true,
                            twoFactor: false,
                            sessionTimeout: 30
                        }}
                        onFinish={handleSaveSecurity}
                    >
                        <div className="setting-section">
                            <Title level={5}>登录通知</Title>
                            <Form.Item
                                label="登录成功通知"
                                name="loginNotify"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>
                            <Form.Item
                                label="异常登录提醒"
                                name="riskNotify"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>
                        </div>

                        <Divider />

                        <div className="setting-section">
                            <Title level={5}>身份验证</Title>
                            <Form.Item
                                label="两步验证"
                                name="twoFactor"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>
                            <Form.Item
                                label="会话超时时间（分钟）"
                                name="sessionTimeout"
                            >
                                <Select style={{ width: 200 }}>
                                    <Select.Option value={15}>15分钟</Select.Option>
                                    <Select.Option value={30}>30分钟</Select.Option>
                                    <Select.Option value={60}>1小时</Select.Option>
                                    <Select.Option value={120}>2小时</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>

                        <Divider />

                        <div className="setting-section danger-zone">
                            <Title level={5} style={{ color: '#ff4d4f' }}>危险操作</Title>
                            <Paragraph type="secondary">
                                账号注销后，所有数据将被永久删除且无法恢复。请谨慎操作。
                            </Paragraph>
                            <Button danger icon={<DeleteOutlined />} onClick={handleDeleteAccount}>
                                注销账号
                            </Button>
                        </div>

                        <Form.Item style={{ marginTop: 24 }}>
                            <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                                保存设置
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            ),
        },
    ];

    return (
        <div className="account-settings">
            <Tabs items={tabItems} />
        </div>
    );
};

// Statistics Tab Content
const StatisticsContent = ({ loading, dateRange, onDateChange }) => {
    return (
        <div className="statistics-content">
            {/* Header with Date Picker */}
            <div className="content-header">
                <div className="header-left">
                    <Title level={4} className="section-title">数据统计</Title>
                    <Text type="secondary">查看您的文章数据与分析</Text>
                </div>
                <div className="header-right">
                    <Space>
                        <Text type="secondary">时间范围：</Text>
                        <RangePicker
                            locale={locale}
                            value={dateRange}
                            onChange={onDateChange}
                            allowClear={false}
                            className="date-picker"
                        />
                    </Space>
                </div>
            </div>

            {/* Statistics Cards */}
            <Row gutter={[16, 16]} className="stats-row">
                <Col xs={24} sm={12} lg={6}>
                    <Card className="stat-card">
                        <Statistic
                            title="总文章数"
                            value={1265}
                            suffix={
                                <Tag icon={<ArrowUpOutlined />} color="green">
                                    12%
                                </Tag>
                            }
                        />
                        <div className="stat-footer">8,846 访问量</div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="stat-card">
                        <Statistic title="实际增数" value={656} />
                        <Progress percent={78} size="small" status="active" />
                        <div className="stat-tags">
                            <Tag color="green">+12%</Tag>
                            <Tag color="red">-11%</Tag>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="stat-card">
                        <Statistic title="日文章数" value={12} />
                        <div className="stat-tags">
                            <Tag color="green">转化率 60%</Tag>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="stat-card">
                        <Statistic title="目标购置" value={1234} />
                        <Progress percent={60} size="small" status="exception" />
                        <div className="stat-tags">
                            <Tag color="blue">政府地址 4,544</Tag>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Charts Row */}
            <Row gutter={[16, 16]} className="charts-row">
                <Col xs={24} lg={16}>
                    <Card className="chart-card" bordered={false} title="文章阅读量趋势">
                        <LineChart height={300} />
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card className="chart-card" bordered={false} title="文章分类占比">
                        <div className="pie-chart-container">
                            <PieChart height={250} />
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Data Tables Row */}
            <Row gutter={[16, 16]} className="tables-row">
                <Col xs={24} lg={12}>
                    <Card
                        className="table-card"
                        bordered={false}
                        title={
                            <div className="card-title">
                                <UserOutlined />
                                文章数排名
                            </div>
                        }
                    >
                        <Table
                            dataSource={articleNumberData}
                            pagination={false}
                            size="small"
                        >
                            <Table.Column
                                title="排名"
                                key="rank"
                                width={60}
                                render={(_, __, index) => (
                                    <span className={`rank-badge rank-${index + 1}`}>
                                        {index + 1}
                                    </span>
                                )}
                            />
                            <Table.Column
                                title="作者"
                                dataIndex="username"
                                key="username"
                            />
                            <Table.Column
                                title="文章数"
                                dataIndex="number"
                                key="number"
                                align="right"
                            />
                            <Table.Column
                                title="趋势"
                                dataIndex="trend"
                                key="trend"
                                align="right"
                                render={(value) => {
                                    const isUp = value.startsWith('+');
                                    return (
                                        <Tag color={isUp ? 'green' : 'red'}>
                                            {value}
                                        </Tag>
                                    );
                                }}
                            />
                        </Table>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card
                        className="table-card"
                        bordered={false}
                        title={
                            <div className="card-title">
                                <SettingOutlined />
                                分类详情
                            </div>
                        }
                    >
                        <div className="category-list">
                            {salesCategoryData.map((item) => (
                                <div key={item.type} className="category-item">
                                    <div className="category-header">
                                        <div className="category-info">
                                            <span
                                                className="category-dot"
                                                style={{ backgroundColor: item.color }}
                                            />
                                            <Text>{item.type}</Text>
                                        </div>
                                        <div className="category-values">
                                            <Text strong>{item.value}</Text>
                                            <Text type="secondary" className="percent">{item.percent}%</Text>
                                        </div>
                                    </div>
                                    <Progress
                                        percent={item.percent}
                                        size="small"
                                        strokeColor={item.color}
                                        showInfo={false}
                                    />
                                </div>
                            ))}
                        </div>
                        <Row gutter={16} className="category-summary">
                            <Col span={12}>
                                <Statistic title="文章总数" value={1274} />
                            </Col>
                            <Col span={12}>
                                <Statistic title="平均阅读" value={325} suffix="次" />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

            {/* Bottom Tags */}
            <Card className="tags-card" bordered={false}>
                <div className="tags-header">
                    <BellOutlined />
                    <Text strong>线上热门搜索</Text>
                </div>
                <div className="tags-content">
                    <Tag color="processing">总数产值 1,231</Tag>
                    <Tag color="processing">政府地址 4,544</Tag>
                    <Tag color="success">科技动态 3,212</Tag>
                    <Tag color="warning">校园新闻 2,890</Tag>
                    <Tag color="error">学术成果 1,567</Tag>
                </div>
            </Card>
        </div>
    );
};

// Main UserCenter Component
const UserCenter = () => {
    const [loading, setLoading] = useState(true);
    const [userInfo] = useState(mockUserInfo);
    const [dateRange, setDateRange] = useState([dayjs().subtract(30, 'day'), dayjs()]);
    const [activeTab, setActiveTab] = useState('statistics');
    const [editModalVisible, setEditModalVisible] = useState(false);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleDateChange = (dates) => {
        setDateRange(dates);
    };

    const handleEditAvatar = () => {
        message.info('头像上传功能开发中');
    };

    const handleEditInfo = () => {
        setEditModalVisible(true);
    };

    const handleModalOk = () => {
        setEditModalVisible(false);
        message.success('资料更新成功');
    };

    return (
        <div className="user-center">
            <Row gutter={24}>
                {/* Left Sidebar - User Info */}
                <Col xs={24} lg={6}>
                    <div className="user-sidebar">
                        <UserInfoCard
                            userInfo={userInfo}
                            onEditAvatar={handleEditAvatar}
                            onEditInfo={handleEditInfo}
                        />

                        {/* Quick Actions */}
                        <Card className="quick-actions-card" bordered={false}>
                            <Title level={5}>快捷操作</Title>
                            <div className="action-list">
                                <Button block icon={<EditOutlined />}>
                                    写文章
                                </Button>
                                <Button block icon={<UserOutlined />}>
                                    用户管理
                                </Button>
                                <Button block icon={<SettingOutlined />}>
                                    系统设置
                                </Button>
                            </div>
                        </Card>
                    </div>
                </Col>

                {/* Right Content - Tabs */}
                <Col xs={24} lg={18}>
                    <Card className="content-card" bordered={false}>
                        <Tabs
                            activeKey={activeTab}
                            onChange={setActiveTab}
                            items={[
                                {
                                    key: 'statistics',
                                    label: (
                                        <span>
                                            <SettingOutlined />
                                            数据统计
                                        </span>
                                    ),
                                    children: (
                                        <StatisticsContent
                                            loading={loading}
                                            dateRange={dateRange}
                                            onDateChange={handleDateChange}
                                        />
                                    ),
                                },
                                {
                                    key: 'settings',
                                    label: (
                                        <span>
                                            <SafetyOutlined />
                                            账号设置
                                        </span>
                                    ),
                                    children: (
                                        <AccountSettings userInfo={userInfo} />
                                    ),
                                },
                            ]}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Edit Info Modal */}
            <Modal
                title="编辑个人资料"
                open={editModalVisible}
                onOk={handleModalOk}
                onCancel={() => setEditModalVisible(false)}
                okText="保存"
                cancelText="取消"
            >
                <Form layout="vertical" initialValues={userInfo}>
                    <Form.Item label="真实姓名" name="realName">
                        <Input />
                    </Form.Item>
                    <Form.Item label="邮箱" name="email">
                        <Input />
                    </Form.Item>
                    <Form.Item label="手机号" name="phone">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserCenter;
