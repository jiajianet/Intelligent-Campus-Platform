/**
 * User Center Component
 * @description User dashboard with independent statistics and account settings
 * @author 犀焰澄泓团队
 * @version 1.0.0
 */

import React, { useState, useEffect, useRef } from 'react';
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
    Modal,
    message,
    Divider,
    List,
    Switch,
    Select,
    Timeline,
    Empty,
    Tooltip
} from 'antd';
import * as echarts from 'echarts';
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    UserOutlined,
    CameraOutlined,
    LockOutlined,
    MailOutlined,
    PhoneOutlined,
    SafetyOutlined,
    SettingOutlined,
    EditOutlined,
    SaveOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    FileTextOutlined,
    EyeOutlined,
    HeartOutlined,
    ShareAltOutlined,
    StarOutlined,
    ClockCircleOutlined,
    RiseOutlined,
    FallOutlined,
    TrophyOutlined,
    FireOutlined
} from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
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

// User's personal statistics data
const personalStatsData = {
    totalArticles: 186,
    totalViews: 24580,
    totalLikes: 1236,
    totalShares: 456,
    avgReadTime: '5:32',
    completionRate: 78,
    weeklyGrowth: 12.5,
    rank: 3
};

// Activity timeline data
const activityData = [
    { time: '2024-03-15 14:30', action: '发布新文章', title: '智慧校园平台新功能上线', type: 'publish' },
    { time: '2024-03-15 10:15', action: '文章审核通过', title: '如何提升教学质量', type: 'approve' },
    { time: '2024-03-14 16:45', action: '收到用户反馈', title: '关于文章分类的建议', type: 'feedback' },
    { time: '2024-03-14 09:20', action: '编辑文章', title: '校园安全管理制度', type: 'edit' },
    { time: '2024-03-13 11:00', action: '发布新文章', title: '本周学术活动预告', type: 'publish' },
];

// Article category distribution
const categoryData = [
    { name: '校园新闻', value: 45, color: '#1890ff' },
    { name: '学术动态', value: 32, color: '#52c41a' },
    { name: '通知公告', value: 28, color: '#faad14' },
    { name: '活动赛事', value: 18, color: '#722ed1' },
    { name: '其他', value: 12, color: '#8c8c8c' },
];

// Monthly article data
const monthlyData = [
    { month: '1月', articles: 12, views: 1800 },
    { month: '2月', articles: 18, views: 2400 },
    { month: '3月', articles: 15, views: 2100 },
    { month: '4月', articles: 22, views: 3200 },
    { month: '5月', articles: 28, views: 3800 },
    { month: '6月', articles: 25, views: 3500 },
    { month: '7月', articles: 20, views: 2800 },
    { month: '8月', articles: 16, views: 2200 },
    { month: '9月', articles: 24, views: 3400 },
    { month: '10月', articles: 30, views: 4200 },
    { month: '11月', articles: 18, views: 2600 },
    { month: '12月', articles: 22, views: 3100 },
];

// Top articles data
const topArticlesData = [
    { key: '1', title: '智慧校园平台新功能上线公告', views: 3256, likes: 186, date: '2024-03-15' },
    { key: '2', title: '2024年春季学期教学安排通知', views: 2890, likes: 142, date: '2024-03-10' },
    { key: '3', title: '校园网络安全管理制度', views: 2456, likes: 128, date: '2024-03-08' },
    { key: '4', title: '学术论文撰写指南', views: 2134, likes: 98, date: '2024-03-05' },
    { key: '5', title: '图书馆开放时间调整', views: 1890, likes: 76, date: '2024-03-01' },
];

// ECharts component for bar chart
const BarChartECharts = ({ data, height = 300 }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            chartInstance.current = echarts.init(chartRef.current);
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: data.map(item => item.month),
                    axisLine: { lineStyle: { color: '#e2e8f0' } },
                    axisLabel: { color: '#64748b', fontSize: 11 }
                },
                yAxis: {
                    type: 'value',
                    axisLine: { show: false },
                    splitLine: { lineStyle: { color: '#f1f5f9' } },
                    axisLabel: { color: '#64748b' }
                },
                series: [{
                    name: '文章数',
                    type: 'bar',
                    barWidth: '40%',
                    data: data.map(item => item.articles),
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#667eea' },
                            { offset: 1, color: '#764ba2' }
                        ]),
                        borderRadius: [4, 4, 0, 0]
                    },
                    emphasis: {
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: '#764ba2' },
                                { offset: 1, color: '#667eea' }
                            ])
                        }
                    }
                }]
            };
            chartInstance.current.setOption(option);
        }
        return () => {
            chartInstance.current?.dispose();
        };
    }, [data]);

    return <div ref={chartRef} style={{ width: '100%', height }} />;
};

// ECharts component for pie chart
const PieChartECharts = ({ data, height = 250 }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            chartInstance.current = echarts.init(chartRef.current);
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    right: 10,
                    top: 'center',
                    textStyle: { color: '#64748b', fontSize: 12 }
                },
                series: [{
                    name: '分类',
                    type: 'pie',
                    radius: ['45%', '70%'],
                    center: ['35%', '50%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 8,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: { show: false },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 14,
                            fontWeight: 'bold'
                        }
                    },
                    data: data.map(item => ({
                        value: item.value,
                        name: item.name,
                        itemStyle: { color: item.color }
                    }))
                }]
            };
            chartInstance.current.setOption(option);
        }
        return () => {
            chartInstance.current?.dispose();
        };
    }, [data]);

    return <div ref={chartRef} style={{ width: '100%', height }} />;
};

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

// Statistics Content - Independent Design
const StatisticsContent = ({ dateRange, onDateChange }) => {
    // Personal stat cards data
    const statCardsData = [
        {
            title: '总文章数',
            value: personalStatsData.totalArticles,
            suffix: '篇',
            trend: 'up',
            trendValue: '+12.5%',
            icon: <FileTextOutlined />,
            color: '#667eea',
            bgColor: 'rgba(102, 126, 234, 0.1)'
        },
        {
            title: '总阅读量',
            value: personalStatsData.totalViews,
            suffix: '次',
            trend: 'up',
            trendValue: '+8.3%',
            icon: <EyeOutlined />,
            color: '#52c41a',
            bgColor: 'rgba(82, 196, 26, 0.1)'
        },
        {
            title: '总点赞数',
            value: personalStatsData.totalLikes,
            suffix: '',
            trend: 'up',
            trendValue: '+15.2%',
            icon: <HeartOutlined />,
            color: '#ff4d4f',
            bgColor: 'rgba(255, 77, 79, 0.1)'
        },
        {
            title: '总分享数',
            value: personalStatsData.totalShares,
            suffix: '',
            trend: 'down',
            trendValue: '-3.1%',
            icon: <ShareAltOutlined />,
            color: '#faad14',
            bgColor: 'rgba(250, 173, 20, 0.1)'
        }
    ];

    // Get action type color
    const getActionColor = (type) => {
        const colors = {
            publish: 'green',
            approve: 'blue',
            feedback: 'orange',
            edit: 'purple'
        };
        return colors[type] || 'default';
    };

    return (
        <div className="my-statistics-content">
            {/* Header */}
            <div className="stats-header">
                <div className="header-info">
                    <Title level={4} className="header-title">我的数据</Title>
                    <Text type="secondary">记录您在平台的点点滴滴</Text>
                </div>
                <div className="header-actions">
                    <RangePicker
                        locale={locale}
                        value={dateRange}
                        onChange={onDateChange}
                        allowClear={false}
                    />
                </div>
            </div>

            {/* Stat Cards Row */}
            <Row gutter={[16, 16]} className="stat-cards-row">
                {statCardsData.map((item, index) => (
                    <Col xs={12} sm={12} lg={6} key={index}>
                        <Card className="stat-card-item" bordered={false}>
                            <div className="stat-card-content">
                                <div className="stat-icon" style={{ background: item.bgColor, color: item.color }}>
                                    {item.icon}
                                </div>
                                <div className="stat-info">
                                    <Text type="secondary" className="stat-label">{item.title}</Text>
                                    <div className="stat-value-row">
                                        <Statistic
                                            value={item.value}
                                            suffix={item.suffix}
                                            valueStyle={{ fontSize: 24, fontWeight: 600 }}
                                        />
                                        <Tag
                                            color={item.trend === 'up' ? 'success' : 'error'}
                                            icon={item.trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                            className="trend-tag"
                                        >
                                            {item.trendValue}
                                        </Tag>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Rank and Progress Row */}
            <Row gutter={[16, 16]} className="rank-progress-row">
                <Col xs={24} md={8}>
                    <Card className="rank-card" bordered={false}>
                        <div className="rank-content">
                            <TrophyOutlined className="rank-icon" />
                            <div className="rank-info">
                                <Text type="secondary">作者排名</Text>
                                <div className="rank-value">
                                    <span className="current-rank">第 {personalStatsData.rank} 名</span>
                                    <Tag color="gold">TOP 5</Tag>
                                </div>
                            </div>
                        </div>
                        <Progress
                            percent={60}
                            strokeColor="#667eea"
                            trailColor="#f0f0f0"
                            showInfo={false}
                        />
                        <Text type="secondary" className="rank-hint">还需 28 篇文章超越上一名</Text>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card className="completion-card" bordered={false}>
                        <div className="completion-content">
                            <div className="completion-header">
                                <Text type="secondary">目标完成率</Text>
                                <Text strong className="completion-percent">{personalStatsData.completionRate}%</Text>
                            </div>
                            <Progress
                                percent={personalStatsData.completionRate}
                                strokeColor={{
                                    '0%': '#667eea',
                                    '100%': '#52c41a'
                                }}
                                trailColor="#f0f0f0"
                            />
                            <Text type="secondary">本月已发布 18 篇，还差 5 篇达成目标</Text>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card className="readtime-card" bordered={false}>
                        <div className="readtime-content">
                            <ClockCircleOutlined className="readtime-icon" />
                            <div className="readtime-info">
                                <Text type="secondary">平均阅读时长</Text>
                                <Statistic
                                    value={personalStatsData.avgReadTime}
                                    valueStyle={{ fontSize: 28, fontWeight: 600, color: '#667eea' }}
                                />
                            </div>
                        </div>
                        <div className="readtime-trend">
                            <FireOutlined style={{ color: '#ff4d4f' }} />
                            <Text type="secondary">用户平均停留 5 分钟</Text>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Charts Row */}
            <Row gutter={[16, 16]} className="charts-section">
                <Col xs={24} lg={14}>
                    <Card className="chart-card-item" bordered={false} title="月度发布统计">
                        <BarChartECharts data={monthlyData} height={280} />
                    </Card>
                </Col>
                <Col xs={24} lg={10}>
                    <Card className="chart-card-item" bordered={false} title="文章分类分布">
                        <PieChartECharts data={categoryData} height={280} />
                    </Card>
                </Col>
            </Row>

            {/* Activity Timeline and Top Articles */}
            <Row gutter={[16, 16]} className="bottom-section">
                <Col xs={24} lg={12}>
                    <Card className="timeline-card" bordered={false} title="最近活动">
                        <Timeline
                            items={activityData.map(item => ({
                                color: getActionColor(item.type),
                                children: (
                                    <div className="timeline-item">
                                        <div className="timeline-time">{item.time}</div>
                                        <div className="timeline-action">
                                            <Tag color={getActionColor(item.type)}>{item.action}</Tag>
                                            <Text>{item.title}</Text>
                                        </div>
                                    </div>
                                )
                            }))}
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card className="articles-card" bordered={false} title="热门文章">
                        <Table
                            dataSource={topArticlesData}
                            pagination={false}
                            size="small"
                            columns={[
                                {
                                    title: '排名',
                                    key: 'rank',
                                    width: 50,
                                    render: (_, __, index) => (
                                        <span className={`article-rank rank-${index + 1}`}>
                                            {index + 1}
                                        </span>
                                    )
                                },
                                {
                                    title: '文章标题',
                                    dataIndex: 'title',
                                    key: 'title',
                                    render: (text) => (
                                        <Tooltip title={text}>
                                            <Text ellipsis style={{ maxWidth: 180 }}>{text}</Text>
                                        </Tooltip>
                                    )
                                },
                                {
                                    title: '阅读',
                                    dataIndex: 'views',
                                    key: 'views',
                                    width: 70,
                                    render: (val) => (
                                        <span><EyeOutlined /> {val}</span>
                                    )
                                },
                                {
                                    title: '点赞',
                                    dataIndex: 'likes',
                                    key: 'likes',
                                    width: 70,
                                    render: (val) => (
                                        <span><HeartOutlined /> {val}</span>
                                    )
                                }
                            ]}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Summary Tags */}
            <Card className="summary-card" bordered={false}>
                <div className="summary-content">
                    <Text type="secondary">数据概览：</Text>
                    <Tag color="blue">本年发布 {personalStatsData.totalArticles} 篇</Tag>
                    <Tag color="green">较去年同期 +{personalStatsData.weeklyGrowth}%</Tag>
                    <Tag color="purple">累计阅读 {personalStatsData.totalViews} 次</Tag>
                    <Tag color="red">获得 {personalStatsData.totalLikes} 次点赞</Tag>
                </div>
            </Card>
        </div>
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
                                            我的数据
                                        </span>
                                    ),
                                    children: (
                                        <StatisticsContent
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
