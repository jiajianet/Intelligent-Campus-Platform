import {useState, useEffect} from 'react'
import {
    Card,
    Input,
    Select,
    Button,
    Space,
    Typography,
    Breadcrumb,
    Tag,
    Collapse,
    Empty,
    Modal,
    Form,
    Input as InputAntd,
    message,
    Avatar,
    List,
    Pagination,
    Tooltip,
    Divider,
    Rate
} from 'antd'
import {
    QuestionCircleOutlined,
    SearchOutlined,
    PlusOutlined,
    LikeOutlined,
    LikeFilled,
    EyeOutlined,
    ClockCircleOutlined,
    UserOutlined,
    TagOutlined,
    BookOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import './index.scss'

const {Title, Text, Paragraph} = Typography
const {Option} = Select
const {Panel} = Collapse
const {TextArea} = InputAntd

/**
 * @typedef {Object} Question
 * @property {number} id
 * @property {string} question
 * @property {string} answer
 * @property {string} category
 * @property {string[]} tags
 * @property {number} viewCount
 * @property {number} likeCount
 * @property {number} status
 * @property {string} createTime
 * @property {string} updateTime
 */

/** 模拟问题分类数据 */
const mockCategories = [
    {value: 'all', label: '全部分类', count: 0},
    {value: 'account', label: '账号问题', count: 0},
    {value: 'system', label: '系统使用', count: 0},
    {value: 'data', label: '数据管理', count: 0},
    {value: 'other', label: '其他问题', count: 0}
]

/** 模拟问题数据 */
const mockQuestions = [
    {
        id: 1,
        question: '忘记密码怎么办？',
        answer: '如果您忘记了密码，可以联系系统管理员重置密码。管理员可以在用户管理中找到对应用户，点击"重置密码"按钮进行重置。重置后，系统会生成一个新的临时密码，您可以使用该密码登录后自行修改。',
        category: 'account',
        categoryName: '账号问题',
        tags: ['密码', '重置', '忘记'],
        viewCount: 2560,
        likeCount: 185,
        status: 1,
        createTime: '2024-01-10 09:00:00',
        updateTime: '2024-02-15 14:30:00'
    },
    {
        id: 2,
        question: '如何修改个人头像？',
        answer: '修改个人头像的步骤如下：\n1. 点击页面右上角的用户头像\n2. 在下拉菜单中选择"个人中心"\n3. 点击头像区域，弹出上传对话框\n4. 选择本地图片文件（支持jpg、png格式，不超过2MB）\n5. 点击"保存"按钮即可完成修改',
        category: 'account',
        categoryName: '账号问题',
        tags: ['头像', '修改', '上传'],
        viewCount: 1890,
        likeCount: 120,
        status: 1,
        createTime: '2024-01-12 10:30:00',
        updateTime: '2024-02-20 11:00:00'
    },
    {
        id: 3,
        question: '账号被锁定如何解决？',
        answer: '账号被锁定通常是因为连续输入错误密码超过5次。解决方法：\n\n1. **自动解锁**：等待30分钟后，系统会自动解锁账号\n2. **联系管理员**：联系系统管理员手动解锁\n3. **找回密码**：通过"忘记密码"功能重置密码后自动解锁\n\n为保护账号安全，建议设置强密码并妥善保管。',
        category: 'account',
        categoryName: '账号问题',
        tags: ['锁定', '账号', '解锁'],
        viewCount: 1520,
        likeCount: 98,
        status: 1,
        createTime: '2024-01-15 14:00:00',
        updateTime: '2024-03-01 09:20:00'
    },
    {
        id: 4,
        question: '支持哪些浏览器？',
        answer: '智慧校园平台支持以下浏览器：\n\n| 浏览器 | 最低版本 | 推荐版本 |\n|--------|----------|----------|\n| Chrome | 80+ | 最新版 |\n| Firefox | 75+ | 最新版 |\n| Edge | 80+ | 最新版 |\n| Safari | 13+ | 最新版 |\n\n**注意**：为了获得最佳体验，建议使用Chrome或Edge浏览器。不支持IE11及以下版本。',
        category: 'system',
        categoryName: '系统使用',
        tags: ['浏览器', '兼容性', 'Chrome'],
        viewCount: 3210,
        likeCount: 245,
        status: 1,
        createTime: '2024-01-18 08:00:00',
        updateTime: '2024-03-05 16:00:00'
    },
    {
        id: 5,
        question: '上传文件大小有限制吗？',
        answer: '系统对上传文件有以下限制：\n\n**文件大小**：单个文件最大10MB\n\n**文件类型**：\n- 图片：jpg, jpeg, png, gif\n- 文档：pdf, doc, docx, xls, xlsx, ppt, pptx\n- 压缩包：zip, rar\n\n如需上传更大文件，建议压缩后上传或联系管理员调整配置。',
        category: 'system',
        categoryName: '系统使用',
        tags: ['上传', '文件', '大小限制'],
        viewCount: 2150,
        likeCount: 156,
        status: 1,
        createTime: '2024-01-20 11:30:00',
        updateTime: '2024-02-28 10:15:00'
    },
    {
        id: 6,
        question: '如何搜索文章？',
        answer: '搜索文章的几种方式：\n\n1. **全局搜索**：点击页面顶部搜索框，输入关键词（标题、内容、作者）\n2. **分类筛选**：在文章列表页面，选择分类进行筛选\n3. **标签筛选**：点击文章标签，快速查看相同标签的文章\n4. **高级搜索**：支持按日期范围、作者、状态等条件组合搜索',
        category: 'system',
        categoryName: '系统使用',
        tags: ['搜索', '文章', '筛选'],
        viewCount: 980,
        likeCount: 67,
        status: 1,
        createTime: '2024-01-22 15:00:00',
        updateTime: '2024-02-10 08:45:00'
    },
    {
        id: 7,
        question: '如何批量导入用户？',
        answer: '批量导入用户的步骤：\n\n1. 准备Excel文件，模板包含：用户名、姓名、手机号、邮箱、角色\n2. 进入"用户管理" → "用户列表"\n3. 点击"批量导入"按钮\n4. 选择准备好的Excel文件\n5. 系统会预览数据，确认无误后点击"确认导入"\n6. 导入完成后，系统会显示成功/失败记录\n\n**注意事项**：\n- 用户名必须唯一\n- 手机号和邮箱格式需正确',
        category: 'data',
        categoryName: '数据管理',
        tags: ['导入', '用户', '批量'],
        viewCount: 1780,
        likeCount: 134,
        status: 1,
        createTime: '2024-01-25 09:30:00',
        updateTime: '2024-03-08 14:00:00'
    },
    {
        id: 8,
        question: '如何导出数据？',
        answer: '系统支持导出以下数据：\n\n**导出方式**：\n1. 在列表页面，点击右上角"导出"按钮\n2. 选择导出格式（Excel/CSV）\n3. 选择需要导出的字段\n4. 点击"确认导出"\n\n**可导出数据**：\n- 用户列表\n- 文章列表\n- 操作日志\n- 统计数据报表\n\n导出文件将保存在浏览器下载目录。',
        category: 'data',
        categoryName: '数据管理',
        tags: ['导出', 'Excel', '数据'],
        viewCount: 1450,
        likeCount: 89,
        status: 1,
        createTime: '2024-01-28 13:00:00',
        updateTime: '2024-02-25 17:30:00'
    },
    {
        id: 9,
        question: '如何反馈问题或建议？',
        answer: '您可以通过以下方式反馈问题或建议：\n\n1. **在线反馈**：在本页面点击"提交反馈"按钮\n2. **联系管理员**：通过系统内置消息联系管理员\n3. **发送邮件**：发送邮件至 support@school.edu.cn\n\n我们重视每一位用户的反馈，会认真处理并回复。',
        category: 'other',
        categoryName: '其他问题',
        tags: ['反馈', '建议', '联系'],
        viewCount: 650,
        likeCount: 42,
        status: 1,
        createTime: '2024-02-01 10:00:00',
        updateTime: '2024-02-15 11:20:00'
    },
    {
        id: 10,
        question: '系统维护通知在哪里查看？',
        answer: '系统维护通知查看方式：\n\n1. **首页公告**：登录后首页会显示最新公告\n2. **消息中心**：点击铃铛图标查看系统消息\n3. **通知中心**：在个人中心设置中订阅通知\n\n系统维护通常会提前24小时通知，如遇紧急维护会给您带来不便敬请谅解。',
        category: 'other',
        categoryName: '其他问题',
        tags: ['通知', '维护', '公告'],
        viewCount: 520,
        likeCount: 35,
        status: 1,
        createTime: '2024-02-05 16:30:00',
        updateTime: '2024-03-10 09:00:00'
    }
]

const Question = () => {
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState([])
    const [searchKeyword, setSearchKeyword] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [activeKeys, setActiveKeys] = useState([])
    const [likedQuestions, setLikedQuestions] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [form] = Form.useForm()

    // 更新分类计数
    const categoriesWithCount = mockCategories.map(cat => {
        if (cat.value === 'all') {
            return {...cat, count: mockQuestions.length}
        }
        return {
            ...cat,
            count: mockQuestions.filter(q => q.category === cat.value).length
        }
    })

    // 加载问题数据
    useEffect(() => {
        fetchQuestions()
    }, [])

    /**
     * 获取问题列表
     */
    const fetchQuestions = () => {
        setLoading(true)
        setTimeout(() => {
            setQuestions(mockQuestions)
            setLoading(false)
        }, 300)
    }

    /**
     * 处理搜索
     */
    const handleSearch = (value) => {
        setSearchKeyword(value)
        filterQuestions(value, categoryFilter)
    }

    /**
     * 处理分类切换
     */
    const handleCategoryChange = (value) => {
        setCategoryFilter(value)
        filterQuestions(searchKeyword, value)
    }

    /**
     * 筛选问题
     */
    const filterQuestions = (keyword, category) => {
        let filtered = [...mockQuestions]

        // 分类筛选
        if (category !== 'all') {
            filtered = filtered.filter(q => q.category === category)
        }

        // 关键词筛选
        if (keyword) {
            filtered = filtered.filter(q =>
                q.question.toLowerCase().includes(keyword.toLowerCase()) ||
                q.answer.toLowerCase().includes(keyword.toLowerCase()) ||
                q.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
            )
        }

        setQuestions(filtered)
    }

    /**
     * 处理点赞
     */
    const handleLike = (questionId) => {
        if (likedQuestions.includes(questionId)) {
            // 取消点赞
            setLikedQuestions(likedQuestions.filter(id => id !== questionId))
            setQuestions(questions.map(q => {
                if (q.id === questionId) {
                    return {...q, likeCount: q.likeCount - 1}
                }
                return q
            }))
            message.success('已取消点赞')
        } else {
            // 点赞
            setLikedQuestions([...likedQuestions, questionId])
            setQuestions(questions.map(q => {
                if (q.id === questionId) {
                    return {...q, likeCount: q.likeCount + 1}
                }
                return q
            }))
            message.success('点赞成功')
        }
    }

    /**
     * 处理折叠面板变化
     */
    const handleCollapseChange = (keys) => {
        setActiveKeys(keys)
    }

    /**
     * 打开反馈弹窗
     */
    const handleOpenModal = () => {
        setIsModalVisible(true)
    }

    /**
     * 提交反馈
     */
    const handleSubmitFeedback = async () => {
        try {
            const values = await form.validateFields()
            setSubmitLoading(true)

            // 模拟提交
            setTimeout(() => {
                message.success('反馈提交成功，我们会尽快处理！')
                setSubmitLoading(false)
                setIsModalVisible(false)
                form.resetFields()
            }, 1000)
        } catch (error) {
            console.error('表单验证失败:', error)
        }
    }

    /**
     * 渲染问题分类标签
     */
    const getCategoryTag = (category) => {
        const colorMap = {
            account: 'blue',
            system: 'green',
            data: 'orange',
            other: 'default'
        }
        return <Tag color={colorMap[category]}>{category}</Tag>
    }

    return (
        <div className="question-container">
            {/* 页面头部 */}
            <Card className="question-card">
                <div className="card-header">
                    <Breadcrumb
                        items={[
                            {title: <Link to={'/help'}><BookOutlined/>帮助中心</Link>},
                            {title: '常见问题'}
                        ]}
                    />
                    <Title level={4} style={{marginTop: 10, marginBottom: 0}}>常见问题</Title>
                </div>
            </Card>

            {/* 筛选区域 */}
            <Card className="filter-card">
                <div className="filter-content">
                    <div className="filter-left">
                        <Input.Search
                            placeholder="搜索问题/答案/标签"
                            allowClear
                            enterButton={<SearchOutlined/>}
                            onSearch={handleSearch}
                            style={{width: 300}}
                            className="search-input"
                        />
                        <Select
                            placeholder="选择分类"
                            style={{width: 160}}
                            value={categoryFilter}
                            onChange={handleCategoryChange}
                            className="category-select"
                        >
                            {categoriesWithCount.map(cat => (
                                <Option key={cat.value} value={cat.value}>
                                    {cat.label} ({cat.count})
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="filter-right">
                        <Button
                            type="primary"
                            icon={<PlusOutlined/>}
                            onClick={handleOpenModal}
                        >
                            提交反馈
                        </Button>
                    </div>
                </div>
            </Card>

            {/* 统计信息 */}
            <Card className="stats-card">
                <div className="stats-content">
                    <div className="stat-item">
                        <QuestionCircleOutlined className="stat-icon"/>
                        <div className="stat-info">
                            <Text strong>{questions.length}</Text>
                            <Text type="secondary">个问题</Text>
                        </div>
                    </div>
                    <div className="stat-divider"/>
                    <div className="stat-item">
                        <EyeOutlined className="stat-icon"/>
                        <div className="stat-info">
                            <Text strong>{questions.reduce((sum, q) => sum + q.viewCount, 0)}</Text>
                            <Text type="secondary">总浏览</Text>
                        </div>
                    </div>
                    <div className="stat-divider"/>
                    <div className="stat-item">
                        <LikeOutlined className="stat-icon"/>
                        <div className="stat-info">
                            <Text strong>{questions.reduce((sum, q) => sum + q.likeCount, 0)}</Text>
                            <Text type="secondary">总点赞</Text>
                        </div>
                    </div>
                </div>
            </Card>

            {/* 问题列表 */}
            <Card className="list-card">
                {questions.length > 0 ? (
                    <Collapse
                        activeKey={activeKeys}
                        onChange={handleCollapseChange}
                        accordion
                        className="question-collapse"
                    >
                        {questions.map((q, index) => (
                            <Panel
                                key={q.id}
                                header={
                                    <div className="question-header">
                                        <div className="question-title">
                                            <QuestionCircleOutlined className="question-icon"/>
                                            <span className="question-text">{q.question}</span>
                                        </div>
                                        <div className="question-meta">
                                            {getCategoryTag(q.category)}
                                            <Text type="secondary" className="view-count">
                                                <EyeOutlined/> {q.viewCount}
                                            </Text>
                                        </div>
                                    </div>
                                }
                                extra={
                                    <div className="panel-extra">
                                        <Tooltip title={likedQuestions.includes(q.id) ? '取消点赞' : '有帮助'}>
                                            <Button
                                                type="text"
                                                icon={likedQuestions.includes(q.id) ? <LikeFilled/> : <LikeOutlined/>}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleLike(q.id)
                                                }}
                                                className={`like-btn ${likedQuestions.includes(q.id) ? 'liked' : ''}`}
                                            >
                                                {q.likeCount}
                                            </Button>
                                        </Tooltip>
                                    </div>
                                }
                            >
                                <div className="question-answer">
                                    <Paragraph>
                                        {q.answer.split('\n').map((line, idx) => {
                                            if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
                                                return <div key={idx} style={{marginLeft: 20, marginBottom: 8}}>{line}</div>
                                            } else if (line.startsWith('- ') || line.startsWith('* ')) {
                                                return <div key={idx} style={{marginLeft: 20, marginBottom: 8}}>• {line.replace(/^[*-] /, '')}</div>
                                            } else if (line.startsWith('|')) {
                                                return <div key={idx} style={{fontFamily: 'monospace', fontSize: 12, margin: '8px 0'}}>{line}</div>
                                            } else if (line.startsWith('**') && line.endsWith('**')) {
                                                return <Text strong key={idx}>{line.replace(/\*\*/g, '')}</Text>
                                            } else if (line.trim() === '') {
                                                return <br key={idx}/>
                                            } else {
                                                return <span key={idx}>{line}</span>
                                            }
                                        })}
                                    </Paragraph>
                                    <Divider style={{margin: '12px 0'}}/>
                                    <div className="answer-footer">
                                        <Space>
                                            <Tag icon={<TagOutlined/>}>
                                                {q.tags.join(', ')}
                                            </Tag>
                                            <Text type="secondary">
                                                <ClockCircleOutlined/> 更新于 {q.updateTime}
                                            </Text>
                                        </Space>
                                        <Rate disabled defaultValue={q.likeCount > 100 ? 5 : q.likeCount > 50 ? 4 : 3} style={{fontSize: 14}}/>
                                    </div>
                                </div>
                            </Panel>
                        ))}
                    </Collapse>
                ) : (
                    <Empty description="暂无问题，请尝试其他搜索条件"/>
                )}
            </Card>

            {/* 反馈弹窗 */}
            <Modal
                title={
                    <Space>
                        <ExclamationCircleOutlined/>
                        <span>提交反馈</span>
                    </Space>
                }
                open={isModalVisible}
                onOk={handleSubmitFeedback}
                onCancel={() => {
                    setIsModalVisible(false)
                    form.resetFields()
                }}
                okText="提交"
                cancelText="取消"
                confirmLoading={submitLoading}
                className="feedback-modal"
            >
                <Form
                    form={form}
                    layout="vertical"
                    className="feedback-form"
                >
                    <Form.Item
                        label="问题类型"
                        name="category"
                        rules={[{required: true, message: '请选择问题类型'}]}
                    >
                        <Select placeholder="请选择问题类型">
                            <Option value="account">账号问题</Option>
                            <Option value="system">系统使用</Option>
                            <Option value="data">数据管理</Option>
                            <Option value="other">其他</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="问题描述"
                        name="question"
                        rules={[
                            {required: true, message: '请输入问题描述'},
                            {min: 10, message: '问题描述至少10个字符'}
                        ]}
                    >
                        <TextArea
                            placeholder="请详细描述您遇到的问题..."
                            rows={4}
                            maxLength={500}
                            showCount
                        />
                    </Form.Item>

                    <Form.Item
                        label="期望结果"
                        name="expected"
                    >
                        <TextArea
                            placeholder="请描述您期望的结果..."
                            rows={2}
                            maxLength={300}
                            showCount
                        />
                    </Form.Item>

                    <Form.Item
                        label="联系方式"
                        name="contact"
                    >
                        <InputAntd placeholder="请留下您的联系方式（可选）"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Question
