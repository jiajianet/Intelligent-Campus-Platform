import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm, message, Spin, Empty } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';
// 导入资源
import { Table, Tag } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/images/error.png'
import './index.scss'
import { useChannel } from '@/hooks/useChannel'
import { useEffect, useState } from 'react'
import { getArticleListAPI, deleteArticleAPI } from '@/apis/article'

const { Option } = Select
const { RangePicker } = DatePicker
dayjs.locale('zh-cn')

const Article = () => {
    const navigate = useNavigate()
    const { channelList } = useChannel()

    // 文章状态的映射
    const status = {
        0: <Tag color="warning">待审核</Tag>,
        1: <Tag color="success">审核通过</Tag>,
        2: <Tag color="processing">草稿</Tag>,
    }

    // 表格列定义
    const columns = [{
        title: '封面', dataIndex: 'cover', width: 120, render: cover => {
            return <img className="cover-image" src={cover.image || img404} width={80} height={60} alt="" />
        }
    }, {
        title: '标题', dataIndex: 'title', width: 220,
        ellipsis: {
            showTooltip: true,
        }
    }, {
        title: '状态', dataIndex: 'status',
        render: data => status[data]
    }, {
        title: '发布时间', dataIndex: 'pubDate'
    }, {
        title: '阅读数', dataIndex: 'readCount'
    }, {
        title: '评论数', dataIndex: 'commentCount'
    }, {
        title: '点赞数', dataIndex: 'likeCount'
    }, {
        title: '操作', render: data => {
            return (
                <div className="operation-buttons">
                    <Button 
                        type="primary" 
                        shape="circle" 
                        icon={<EditOutlined />}
                        onClick={() => navigate((`/publish?id=${data.id}`))}
                    />
                    <Popconfirm
                        title="删除文章"
                        description="确认要删除当前文章吗?"
                        onConfirm={() => onConfirm(data)}
                        okText="是"
                        cancelText="否"
                    >
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                        />
                    </Popconfirm>
                </div>
            )
        }
    }]

    // 筛选功能的状态和分页配置
    const [reqData, setReqData] = useState({
        status: '', channelId: '', beginPubDate: '', endPubDate: '', page: 1, perPage: 4,
    })

    const [list, setList] = useState([])
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)

    // 获取文章列表
    useEffect(() => {
        async function getList() {
            setLoading(true)
            try {
                const res = await getArticleListAPI(reqData)
                setList(res.data?.data?.results || [])
                setCount(res.data?.data?.totalCount || 0)
            } catch (error) {
                console.error("获取文章列表时出错：", error)
                message.error('获取文章列表失败，请重试')
            } finally {
                setLoading(false)
            }
        }

        getList()
    }, [reqData])  // 每次reqData变化就会拉取新的数据

    // 获取表单数据
    const onFinish = (formValue) => {
        console.log(formValue)
        const { channelId, status, date, perPage } = formValue

        // 判断是否有选择频道或日期
        if (!channelId && (!date || date.length === 0)) {
            message.warning('请至少选择一个筛选条件');
            return;  // 如果没有选择条件，则不执行请求
        }

        if (date && date.length > 0) {
            setReqData({
                ...reqData,
                channelId,
                status,
                beginPubDate: date[0].format('YYYY-MM-DD'),
                endPubDate: date[1].format('YYYY-MM-DD'),
                page: 1, // 重置为第一页
                perPage: perPage || 4, // 默认每页条数
            })
        } else {
            setReqData({
                ...reqData,
                channelId,
                status,
                beginPubDate: '',
                endPubDate: '',
                page: 1, // 重置为第一页
                perPage: perPage || 4, // 默认每页条数
            })
        }
    }

    // 分页功能
    const onPageChange = (page) => {
        console.log("当前页码：", page)
        setReqData({ ...reqData, page })
    }

    // 删除文章
    const onConfirm = async (data) => {
        try {
            await deleteArticleAPI(data.id)
            message.success('删除成功！')
            setReqData({ ...reqData }) // 重新获取文章列表
        } catch (error) {
            console.error('删除文章失败：', error)
            message.error('删除失败，请重试！')
        }
    }

    // 每页条数的选择（可配置）
    const onPageSizeChange = (value) => {
        console.log("每页条数：", value)
        setReqData({ ...reqData, perPage: value, page: 1 }) // 重置为第一页
    }

    return (
        <div className="article-container fade-in">
            <div className="breadcrumb-container">
                <Breadcrumb items={[
                    { title: <Link to={'/'}>首页</Link> }, 
                    { title: '文章列表' },
                ]} />
            </div>

            <div className="filter-form">
                <Form 
                    layout="inline" 
                    initialValues={{ status: '', perPage: reqData.perPage }} 
                    onFinish={onFinish}
                >
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={0}>待审核</Radio>
                            <Radio value={1}>审核通过</Radio>
                            <Radio value={2}>草稿</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channelId">
                        <Select
                            placeholder="请选择频道"
                            style={{ width: 150 }}
                        >
                            {channelList.map(item => (
                                <Option key={item.id} value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        <RangePicker locale={locale} />
                    </Form.Item>

                    <Form.Item label="每页条数" name="perPage">
                        <Select
                            defaultValue={reqData.perPage}
                            style={{ width: 100 }}
                            onChange={onPageSizeChange}
                        >
                            <Option value={4}>4</Option>
                            <Option value={8}>8</Option>
                            <Option value={16}>16</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            {/* 表格 */}
            <Card 
                title={`根据筛选条件共查询到 ${count} 条结果：`}
                className="fade-in"
            >
                {loading ? (
                    <div className="loading-container">
                        <Spin size="large" tip="加载中..." />
                    </div>
                ) : list.length > 0 ? (
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={list}
                        pagination={{
                            total: count,
                            pageSize: reqData.perPage,
                            current: reqData.page,
                            onChange: onPageChange,
                            onShowSizeChange: (current, size) => onPageSizeChange(size),  // 确保分页条数更新
                            showSizeChanger: true,
                            showTotal: (total) => `共 ${total} 条数据`,
                        }}
                    />
                ) : (
                    <div className="empty-container">
                        <Empty 
                            description="暂无文章数据" 
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                    </div>
                )}
            </Card>
        </div>
    )
}

export default Article
