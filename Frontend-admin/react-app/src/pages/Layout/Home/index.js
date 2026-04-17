/**
 * Home Dashboard Component
 * @description Modern dashboard with statistics and charts
 * @author 犀焰澄泓团队
 * @version 2.0.0
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
    Tooltip,
    Button,
    Skeleton
} from 'antd';
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    DownloadOutlined,
    FileTextOutlined,
    EyeOutlined,
    UserAddOutlined,
    TrophyOutlined,
    ShoppingOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import RadarChart from './components/RadarChart';
import './index.scss';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

dayjs.locale('zh-cn');

// Stat Card Component
const StatCard = ({ icon, title, value, suffix, trend, trendValue, color, loading }) => {
    const trendUp = trend === 'up';

    return (
        <Card className="stat-card" bordered={false}>
            <Skeleton loading={loading} active paragraph={{ rows: 2 }}>
                <div className="stat-card-header">
                    <div className={`stat-icon ${color}`}>
                        {icon}
                    </div>
                    <Tooltip title="导出数据">
                        <Button type="text" size="small" icon={<DownloadOutlined />} className="export-btn" />
                    </Tooltip>
                </div>
                <div className="stat-card-body">
                    <Text type="secondary" className="stat-title">{title}</Text>
                    <div className="stat-value-wrapper">
                        <Statistic
                            value={value}
                            suffix={suffix}
                            className="stat-value"
                        />
                        {trend && (
                            <Tag
                                className={`trend-tag ${trendUp ? 'up' : 'down'}`}
                                icon={trendUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                            >
                                {trendValue}
                            </Tag>
                        )}
                    </div>
                </div>
            </Skeleton>
        </Card>
    );
};

// Chart Card Component
const ChartCard = ({ title, subTitle, extra, children, loading = false }) => (
    <Card className="chart-card" bordered={false} loading={loading}>
        <div className="chart-card-header">
            <div>
                <Title level={5} className="chart-title">{title}</Title>
                {subTitle && <Text type="secondary" className="chart-subtitle">{subTitle}</Text>}
            </div>
            {extra && <div className="chart-extra">{extra}</div>}
        </div>
        <div className="chart-card-body">
            {children}
        </div>
    </Card>
);

// Main Home Component
const Home = () => {
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState([dayjs().subtract(30, 'day'), dayjs()]);

    // Simulate loading data
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Sample data for ranking table
    const articleRankingData = [
        { key: '1', username: '小曾', number: 128, trend: '+12%' },
        { key: '2', username: '小杨', number: 96, trend: '+8%' },
        { key: '3', username: '小贾', number: 84, trend: '-3%' },
        { key: '4', username: '小明', number: 72, trend: '+15%' },
        { key: '5', username: '小红', number: 64, trend: '+5%' },
    ];

    // Category data
    const categoryData = [
        { type: '科技', value: 666, percent: 52.3, color: '#667eea' },
        { type: '娱乐', value: 234, percent: 18.4, color: '#52c41a' },
        { type: '体育', value: 156, percent: 12.2, color: '#faad14' },
        { type: '军事', value: 120, percent: 9.4, color: '#ff4d4f' },
        { type: '推荐', value: 98, percent: 7.7, color: '#13c2c2' },
    ];

    const handleDateChange = (dates) => {
        setDateRange(dates);
    };

    return (
        <div className="home-dashboard">
            {/* Page Header */}
            <div className="dashboard-header">
                <div className="header-left">
                    <Title level={3} className="page-title">仪表盘</Title>
                    <Text type="secondary" className="page-subtitle">实时监控文章数据与趋势分析</Text>
                </div>
                <div className="header-right">
                    <Space>
                        <Text type="secondary">时间范围：</Text>
                        <RangePicker
                            locale={locale}
                            value={dateRange}
                            onChange={handleDateChange}
                            allowClear={false}
                            className="date-picker"
                        />
                    </Space>
                </div>
            </div>

            {/* Statistics Cards */}
            <Row gutter={[24, 24]} className="stats-row">
                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        icon={<FileTextOutlined />}
                        title="总文章数"
                        value={1265}
                        trend="up"
                        trendValue="12%"
                        color="blue"
                        loading={loading}
                    />
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        icon={<EyeOutlined />}
                        title="总阅读量"
                        value={8846}
                        suffix="次"
                        trend="up"
                        trendValue="8.5%"
                        color="green"
                        loading={loading}
                    />
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        icon={<UserAddOutlined />}
                        title="新增用户"
                        value={256}
                        trend="up"
                        trendValue="15%"
                        color="orange"
                        loading={loading}
                    />
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <StatCard
                        icon={<TrophyOutlined />}
                        title="活跃作者"
                        value={42}
                        trend="down"
                        trendValue="2%"
                        color="purple"
                        loading={loading}
                    />
                </Col>
            </Row>

            {/* Charts Row 1 - Main Charts */}
            <Row gutter={[24, 24]} className="charts-row">
                <Col xs={24} lg={16}>
                    <ChartCard
                        title="文章阅读量趋势"
                        subTitle="近30天各分类文章阅读量统计"
                        extra={
                            <Space>
                                <Tag color="blue">科技</Tag>
                                <Tag color="green">娱乐</Tag>
                                <Tag color="orange">体育</Tag>
                            </Space>
                        }
                        loading={loading}
                    >
                        <LineChart height={350} />
                    </ChartCard>
                </Col>
                <Col xs={24} lg={8}>
                    <ChartCard
                        title="访客洞察"
                        subTitle="新老访客占比分析"
                        loading={loading}
                    >
                        <div className="visitor-stats">
                            <div className="visitor-item">
                                <div className="visitor-icon new">
                                    <UserAddOutlined />
                                </div>
                                <div className="visitor-info">
                                    <Text type="secondary">新访客</Text>
                                    <div className="visitor-value">
                                        <Statistic value={68} suffix="%" />
                                    </div>
                                </div>
                            </div>
                            <div className="visitor-item">
                                <div className="visitor-icon returning">
                                    <ShoppingOutlined />
                                </div>
                                <div className="visitor-info">
                                    <Text type="secondary">老访客</Text>
                                    <div className="visitor-value">
                                        <Statistic value={32} suffix="%" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pie-chart-wrapper">
                            <PieChart height={220} />
                        </div>
                    </ChartCard>
                </Col>
            </Row>

            {/* Charts Row 2 - Secondary Charts */}
            <Row gutter={[24, 24]} className="charts-row">
                <Col xs={24} md={12} lg={8}>
                    <ChartCard
                        title="分类阅读量"
                        subTitle="各分类文章阅读统计"
                        loading={loading}
                    >
                        <div className="bar-chart-wrapper">
                            <BarChart height={280} />
                        </div>
                    </ChartCard>
                </Col>
                <Col xs={24} md={12} lg={8}>
                    <ChartCard
                        title="用户满意度"
                        subTitle="基于用户反馈评分"
                        loading={loading}
                    >
                        <div className="satisfaction-section">
                            <div className="satisfaction-score">
                                <Statistic value={4.8} suffix="/5" />
                                <div className="satisfaction-stars">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <span key={star} className={`star ${star <= 4.8 ? 'active' : ''}`}>★</span>
                                    ))}
                                </div>
                            </div>
                            <div className="radar-chart-wrapper">
                                <RadarChart height={200} />
                            </div>
                        </div>
                    </ChartCard>
                </Col>
                <Col xs={24} lg={8}>
                    <ChartCard
                        title="目标与实际"
                        subTitle="月度目标完成情况"
                        loading={loading}
                    >
                        <div className="goal-stats">
                            <div className="goal-item">
                                <div className="goal-header">
                                    <Text type="secondary">实际发布</Text>
                                    <Text strong className="goal-value">1,234</Text>
                                </div>
                                <Progress percent={78} strokeColor="#667eea" size="small" />
                            </div>
                            <div className="goal-item">
                                <div className="goal-header">
                                    <Text type="secondary">目标发布</Text>
                                    <Text strong className="goal-value">1,600</Text>
                                </div>
                                <Progress percent={100} status="success" size="small" />
                            </div>
                            <div className="goal-item">
                                <div className="goal-header">
                                    <Text type="secondary">阅读量目标</Text>
                                    <Text strong className="goal-value">8,234 / 10,000</Text>
                                </div>
                                <Progress percent={82} strokeColor="#52c41a" size="small" />
                            </div>
                        </div>
                    </ChartCard>
                </Col>
            </Row>

            {/* Bottom Section - Ranking & Categories */}
            <Row gutter={[24, 24]} className="bottom-row">
                {/* Article Ranking Table */}
                <Col xs={24} lg={12}>
                    <Card
                        className="ranking-card"
                        bordered={false}
                        title={
                            <div className="card-title-with-icon">
                                <TrophyOutlined className="title-icon" />
                                <span>作者文章数排名</span>
                            </div>
                        }
                        loading={loading}
                    >
                        <Table
                            dataSource={articleRankingData}
                            pagination={false}
                            size="small"
                            className="ranking-table"
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
                                title="作者名称"
                                dataIndex="username"
                                key="username"
                            />
                            <Table.Column
                                title="文章数"
                                dataIndex="number"
                                key="number"
                                align="right"
                                render={(value) => (
                                    <Text strong>{value}</Text>
                                )}
                            />
                            <Table.Column
                                title="趋势"
                                dataIndex="trend"
                                key="trend"
                                align="right"
                                render={(value) => {
                                    const isUp = value.startsWith('+');
                                    return (
                                        <Tag
                                            className={isUp ? 'trend-up' : 'trend-down'}
                                            icon={isUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                        >
                                            {value}
                                        </Tag>
                                    );
                                }}
                            />
                        </Table>
                    </Card>
                </Col>

                {/* Category Distribution */}
                <Col xs={24} lg={12}>
                    <Card
                        className="category-card"
                        bordered={false}
                        title={
                            <div className="card-title-with-icon">
                                <FileTextOutlined className="title-icon" />
                                <span>文章分类占比</span>
                            </div>
                        }
                        loading={loading}
                    >
                        <div className="category-list">
                            {categoryData.map((item, index) => (
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
                        <div className="category-summary">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <div className="summary-item">
                                        <Text type="secondary">文章总数</Text>
                                        <Statistic value={1274} />
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="summary-item">
                                        <Text type="secondary">平均阅读</Text>
                                        <Statistic value={325} suffix="次" />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
