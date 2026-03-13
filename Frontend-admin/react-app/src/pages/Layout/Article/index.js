/**
 * Article Management Page
 * @description Modern article list management with filtering and pagination
 * @author 犀焰澄泓团队
 * @version 2.0.0
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    DatePicker,
    Select,
    Popconfirm,
    message,
    Spin,
    Empty,
    Space,
    Typography,
    Tooltip
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    SearchOutlined,
    FilterOutlined,
    FileTextOutlined,
    EyeOutlined,
    MessageOutlined,
    LikeOutlined,
    CalendarOutlined,
    ReloadOutlined,
    HomeOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import { Table, Tag } from 'antd';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/zh_CN';

import 'dayjs/locale/zh-cn';
import img404 from '@/assets/images/error.png';
import './index.scss';
import { useChannel } from '@/hooks/useChannel';
import { getArticleListAPI, deleteArticleAPI } from '@/apis/article';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text, Title } = Typography;
dayjs.locale('zh-cn');

// Status mapping with icons
const statusConfig = {
    0: { label: '待审核', color: 'warning', icon: <ClockCircleOutlined /> },
    1: { label: '审核通过', color: 'success', icon: <CheckCircleOutlined /> },
    2: { label: '草稿', color: 'default', icon: <EditOutlined /> }
};

const Article = () => {
    const navigate = useNavigate();
    const { channelList } = useChannel();

    // Table columns definition
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 140,
            render: (cover) => (
                <div className="cover-wrapper">
                    <img
                        className="cover-image"
                        src={cover?.image || img404}
                        alt="封面"
                    />
                </div>
            )
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 280,
            ellipsis: true,
            render: (title) => (
                <Tooltip title={title}>
                    <Text strong className="article-title">{title}</Text>
                </Tooltip>
            )
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            render: (status) => {
                const config = statusConfig[status];
                return (
                    <Tag
                        color={config.color}
                        className={`status-tag status-${status}`}
                        icon={config.icon}
                    >
                        {config.label}
                    </Tag>
                );
            }
        },
        {
            title: (
                <Space>
                    <CalendarOutlined />
                    <span>发布时间</span>
                </Space>
            ),
            dataIndex: 'pubDate',
            width: 160,
            render: (date) => (
                <Text type="secondary">{date || '-'}</Text>
            )
        },
        {
            title: (
                <Space>
                    <EyeOutlined />
                    <span>阅读</span>
                </Space>
            ),
            dataIndex: 'readCount',
            width: 80,
            align: 'center',
            render: (count) => (
                <span className="stat-count">{count || 0}</span>
            )
        },
        {
            title: (
                <Space>
                    <MessageOutlined />
                    <span>评论</span>
                </Space>
            ),
            dataIndex: 'commentCount',
            width: 80,
            align: 'center',
            render: (count) => (
                <span className="stat-count">{count || 0}</span>
            )
        },
        {
            title: (
                <Space>
                    <LikeOutlined />
                    <span>点赞</span>
                </Space>
            ),
            dataIndex: 'likeCount',
            width: 80,
            align: 'center',
            render: (count) => (
                <span className="stat-count">{count || 0}</span>
            )
        },
        {
            title: '操作',
            key: 'action',
            width: 120,
            fixed: 'right',
            render: (_, record) => (
                <Space size="small" className="operation-buttons">
                    <Tooltip title="编辑">
                        <Button
                            type="text"
                            shape="circle"
                            icon={<EditOutlined />}
                            className="edit-btn"
                            onClick={() => navigate(`/publish?id=${record.id}`)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="删除文章"
                        description="确定要删除这篇文章吗？"
                        onConfirm={() => onConfirm(record)}
                        okText="确定删除"
                        cancelText="取消"
                        okButtonProps={{ danger: true }}
                    >
                        <Tooltip title="删除">
                            <Button
                                type="text"
                                shape="circle"
                                icon={<DeleteOutlined />}
                                className="delete-btn"
                            />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    // Filter form state and pagination config
    const [reqData, setReqData] = useState({
        status: '',
        channelId: '',
        beginPubDate: '',
        endPubDate: '',
        page: 1,
        perPage: 4
    });

    const [list, setList] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    // Fetch article list
    useEffect(() => {
        async function getList() {
            setLoading(true);
            try {
                const res = await getArticleListAPI(reqData);
                setList(res.data?.data?.results || []);
                setCount(res.data?.data?.totalCount || 0);
            } catch (error) {
                console.error('获取文章列表时出错：', error);
                message.error('获取文章列表失败，请重试');
            } finally {
                setLoading(false);
            }
        }
        getList();
    }, [reqData]);

    // Handle filter form submit
    const onFinish = (formValue) => {
        const { channelId, status, date, perPage } = formValue;

        if (!channelId && (!date || date.length === 0) && !status) {
            message.warning('请至少选择一个筛选条件');
            return;
        }

        const newReqData = {
            ...reqData,
            channelId,
            status,
            beginPubDate: date?.[0]?.format('YYYY-MM-DD') || '',
            endPubDate: date?.[1]?.format('YYYY-MM-DD') || '',
            page: 1,
            perPage: perPage || 4
        };

        setReqData(newReqData);
    };

    // Handle reset
    const onReset = () => {
        form.resetFields();
        setReqData({
            status: '',
            channelId: '',
            beginPubDate: '',
            endPubDate: '',
            page: 1,
            perPage: 4
        });
    };

    // Handle page change
    const onPageChange = (page) => {
        setReqData({ ...reqData, page });
    };

    // Handle delete
    const onConfirm = async (data) => {
        try {
            await deleteArticleAPI(data.id);
            message.success('删除成功！');
            setReqData({ ...reqData });
        } catch (error) {
            console.error('删除文章失败：', error);
            message.error('删除失败，请重试！');
        }
    };

    // Handle page size change
    const onPageSizeChange = (value) => {
        setReqData({ ...reqData, perPage: value, page: 1 });
    };

    return (
        <div className="article-page">
            {/* Breadcrumb */}
            <div className="page-header">
                <Breadcrumb
                    items={[
                        { title: <Link to="/home"><HomeOutlined /> 首页</Link> },
                        { title: <><FileTextOutlined /> 文章管理</> },
                        { title: '文章列表' }
                    ]}
                />
                <Title level={3} className="page-title">文章管理</Title>
            </div>

            {/* Filter Card */}
            <Card className="filter-card" bordered={false}>
                <div className="filter-header">
                    <Space>
                        <FilterOutlined />
                        <Text strong>筛选条件</Text>
                    </Space>
                    <Button
                        type="link"
                        icon={<ReloadOutlined />}
                        onClick={onReset}
                    >
                        重置
                    </Button>
                </div>

                <Form
                    form={form}
                    layout="inline"
                    initialValues={{ status: '', perPage: reqData.perPage }}
                    onFinish={onFinish}
                    className="filter-form"
                >
                    <Form.Item label="状态" name="status" className="filter-item">
                        <Radio.Group className="status-radio-group">
                            <Radio.Button value="">全部</Radio.Button>
                            <Radio.Button value={0}>待审核</Radio.Button>
                            <Radio.Button value={1}>已发布</Radio.Button>
                            <Radio.Button value={2}>草稿</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channelId" className="filter-item">
                        <Select
                            placeholder="选择频道"
                            allowClear
                            style={{ width: 160 }}
                        >
                            {channelList.map(item => (
                                <Option key={item.id} value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date" className="filter-item">
                        <RangePicker locale={locale} />
                    </Form.Item>

                    <Form.Item label="每页" name="perPage" className="filter-item">
                        <Select
                            style={{ width: 90 }}
                            onChange={onPageSizeChange}
                        >
                            <Option value={4}>4条</Option>
                            <Option value={8}>8条</Option>
                            <Option value={16}>16条</Option>
                            <Option value={32}>32条</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item className="filter-actions">
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SearchOutlined />}
                                className="search-btn"
                            >
                                搜索
                            </Button>
                            <Button
                                icon={<PlusOutlined />}
                                onClick={() => navigate('/publish')}
                                className="add-btn"
                            >
                                新建文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>

            {/* Data Card */}
            <Card
                className="data-card"
                bordered={false}
                title={
                    <Space>
                        <FileTextOutlined />
                        <span>文章列表</span>
                        <Tag color="blue" className="count-tag">{count} 篇</Tag>
                    </Space>
                }
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate('/publish')}
                        className="add-btn"
                    >
                        新建文章
                    </Button>
                }
            >
                {loading ? (
                    <div className="loading-container">
                        <Spin size="large" />
                        <Text type="secondary" className="loading-tip">加载中...</Text>
                    </div>
                ) : list.length > 0 ? (
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={list}
                        scroll={{ x: 1200 }}
                        pagination={{
                            total: count,
                            pageSize: reqData.perPage,
                            current: reqData.page,
                            onChange: onPageChange,
                            showSizeChanger: false,
                            showQuickJumper: true,
                            showTotal: (total, range) => (
                                <Text type="secondary">
                                    第 {range[0]}-{range[1]} 条，共 {total} 条
                                </Text>
                            ),
                            pageSizeOptions: ['4', '8', '16', '32']
                        }}
                        className="article-table"
                    />
                ) : (
                    <div className="empty-container">
                        <Empty
                            description={
                                <Space direction="vertical" size={0}>
                                    <Text type="secondary">暂无文章数据</Text>
                                    <Button
                                        type="link"
                                        onClick={() => navigate('/publish')}
                                    >
                                        立即创建第一篇文章
                                    </Button>
                                </Space>
                            }
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Article;
