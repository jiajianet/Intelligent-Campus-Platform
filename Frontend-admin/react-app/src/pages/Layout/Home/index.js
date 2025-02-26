import LineChart from "./components/LineChart";
import './index.scss'
import locale from 'antd/es/date-picker/locale/zh_CN'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import React from 'react';
import {Card, Row, Col, Table, DatePicker, Tag, Statistic, Progress} from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
dayjs.locale('zh-cn')

// 门店文章数据
const articleNumberData = [
    { key: '1', username: '小曾', number: '666' },
    { key: '2', username: '小杨', number: '666' },
    { key: '3', username: '小贾', number: '666' },
    // ...其他门店数据
];

// 文章占比数据
const salesCategoryData = [
    { type: '推荐', value: 121, percent: 17.1 },
    { type: '科技', value: 666, percent: 50.1 },
    { type: '娱乐', value: 121, percent: 17.1 },
];


const Home = () => {
    return (
        <div style={{ padding: 24, background: 'white' }}>
            {/* 头部标题 */}
            <div style={{ marginBottom: 24 }}>
                <h1>文章仪表盘</h1>
                <RangePicker
                    locale={locale}
                    style={{ width: 256 }}
                />
            </div>

            {/* 核心指标行 */}
            <Row gutter={16}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="总文章数"
                            value={1265}
                            // prefix="num"
                            suffix={
                                <Tag icon={<ArrowUpOutlined />} color="green">
                                    12%
                                </Tag>
                            }
                        />
                        <div style={{ marginTop: 8 }}>8,846 访问量</div>
                    </Card>
                </Col>

                <Col span={6}>
                    <Card>
                        <Statistic title="实际增数" value={656} />
                        <Progress percent={78} size="small" status="active" />
                        <div style={{ marginTop: 8 }}>
                            <Tag color="green">+12%</Tag>
                            <Tag color="red">-11%</Tag>
                        </div>
                    </Card>
                </Col>

                <Col span={6}>
                    <Card>
                        <Statistic title="日文章数" value={12} />  {/* prefix="￥"  */}
                        <div style={{ marginTop: 8 }}>
                            <Tag color="green">转化率 60%</Tag>
                        </div>
                    </Card>
                </Col>

                <Col span={6}>
                    <Card>
                        <Statistic title="目标购置" value={1234} />
                        <Progress percent={60} size="small" status="exception" />
                        <div style={{ marginTop: 8 }}>
                            <Tag color="blue">政府地址 4,544</Tag>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* 数据展示区 */}
            <Row gutter={16} style={{ marginTop: 24 }}>
                {/* 门店文章排名 */}
                <Col span={12}>
                    <Card
                        title="文章数排名"
                        // extra={<a href="#">更多</a>}
                        style={{ height: '100%' }}
                    >
                        <Table
                            dataSource={articleNumberData}
                            pagination={false}
                            size="small"
                        >
                            <Table.Column
                                title="用户名称"
                                dataIndex="username"
                                key="username"
                            />
                            <Table.Column
                                title="文章数"
                                dataIndex="number"
                                key="number"
                                align="right"
                            />
                        </Table>
                    </Card>
                </Col>

                {/* 文章分类占比 */}
                <Col span={12}>
                    <Card
                        title="文章数类别占比"
                        // extra={<a href="#">全部数量 1,231</a>}
                    >
                        {salesCategoryData.map(item => (
                            <div key={item.type} style={{ marginBottom: 16 }}>
                                <Row justify="space-between">
                                    <Col>
                                        <span>{item.type}</span>
                                        <Tag style={{ marginLeft: 8 }}>{item.value}</Tag>
                                    </Col>
                                    <Col>
                                        <span>{item.percent}%</span>
                                    </Col>
                                </Row>
                                <Progress
                                    percent={item.percent}
                                    size="small"
                                    status={item.type === '其他' ? 'exception' : 'normal'}
                                    strokeColor={item.type === '线上' ? '#1890ff' : '#52c41a'}
                                />
                            </div>
                        ))}

                        <Row style={{ marginTop: 24 }} gutter={16}>
                            <Col span={12}>
                                <Statistic title="搜索用户值" value={26.2} suffix="*" />
                            </Col>
                            <Col span={12}>
                                <Statistic title="人均搜索次数" value={2.7} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

            {/* 底部附加信息 */}
            <Card style={{ marginTop: 24 }}>
                <h4>线上热门搜索</h4>
                <Tag color="processing">总数产值 1,231</Tag>
                <Tag color="processing">政府地址 4,544</Tag>
            </Card>

            <Card
                title="文章各月份阅读量"
                style={{ marginTop: 24,height: '100%' }

            }>
                <LineChart />
            </Card>

        </div>
    );
};

export default Home;