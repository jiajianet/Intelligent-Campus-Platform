import {useState, useEffect} from 'react'
import {
    Card,
    Table,
    Button,
    Space,
    Input,
    Tag,
    Modal,
    Form,
    Input as InputAntd,
    Select,
    Popconfirm,
    message,
    Typography,
    Breadcrumb,
    Tooltip,
    Badge,
    Switch,
    Divider,
    Drawer,
    Timeline,
    Empty
} from 'antd'
import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ReloadOutlined,
    PlayCircleOutlined,
    PauseCircleOutlined,
    BugOutlined,
    HistoryOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import './index.scss'

const {Title, Text} = Typography
const {Option} = Select

/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} taskName
 * @property {string} taskKey
 * @property {string} cronExpression
 * @property {string} beanMethod
 * @property {string} params
 * @property {number} status
 * @property {string} remark
 * @property {string} createTime
 * @property {string} lastExecuteTime
 * @property {string} nextExecuteTime
 */

/** 模拟任务数据 */
const mockTasks = [
    {
        id: 1,
        taskName: '数据备份',
        taskKey: 'dataBackup',
        cronExpression: '0 0 2 * * ?',
        beanMethod: 'BackupService.backup',
        params: '{"type": "full"}',
        status: 1,
        remark: '每天凌晨2点执行全量数据备份',
        createTime: '2024-01-15 10:30:00',
        lastExecuteTime: '2024-03-14 02:00:00',
        nextExecuteTime: '2024-03-15 02:00:00'
    },
    {
        id: 2,
        taskName: '清理临时文件',
        taskKey: 'cleanTempFiles',
        cronExpression: '0 0/30 * * * ?',
        beanMethod: 'FileService.cleanTemp',
        params: '{"days": 7}',
        status: 1,
        remark: '每30分钟清理7天前的临时文件',
        createTime: '2024-01-20 14:20:00',
        lastExecuteTime: '2024-03-14 11:30:00',
        nextExecuteTime: '2024-03-14 12:00:00'
    },
    {
        id: 3,
        taskName: '同步用户数据',
        taskKey: 'syncUserData',
        cronExpression: '0 0 0/6 * * ?',
        beanMethod: 'UserService.syncData',
        params: '{}',
        status: 1,
        remark: '每6小时同步一次用户数据',
        createTime: '2024-02-01 09:00:00',
        lastExecuteTime: '2024-03-14 06:00:00',
        nextExecuteTime: '2024-03-14 12:00:00'
    },
    {
        id: 4,
        taskName: '生成日报',
        taskKey: 'generateDailyReport',
        cronExpression: '0 0 1 * * ?',
        beanMethod: 'ReportService.generateDaily',
        params: '{"format": "pdf"}',
        status: 0,
        remark: '每天凌晨1点生成日报（已暂停）',
        createTime: '2024-02-10 15:30:00',
        lastExecuteTime: '2024-03-13 01:00:00',
        nextExecuteTime: '-'
    },
    {
        id: 5,
        taskName: '发送邮件通知',
        taskKey: 'sendEmailNotification',
        cronExpression: '0 0 9 * * ?',
        beanMethod: 'EmailService.sendNotification',
        params: '{"template": "daily"}',
        status: 1,
        remark: '每天早上9点发送邮件通知',
        createTime: '2024-02-15 11:00:00',
        lastExecuteTime: '2024-03-14 09:00:00',
        nextExecuteTime: '2024-03-15 09:00:00'
    },
    {
        id: 6,
        taskName: '清理日志',
        taskKey: 'cleanLogs',
        cronExpression: '0 0 3 * * ?',
        beanMethod: 'LogService.cleanLogs',
        params: '{"days": 30}',
        status: 1,
        remark: '每天凌晨3点清理30天前的日志',
        createTime: '2024-02-20 16:45:00',
        lastExecuteTime: '2024-03-14 03:00:00',
        nextExecuteTime: '2024-03-15 03:00:00'
    }
]

/** 模拟执行日志 */
const mockExecuteLogs = [
    {id: 1, taskId: 1, status: 'success', executeTime: '2024-03-14 02:00:00', duration: 125, result: '备份完成，文件大小: 2.5GB'},
    {id: 2, taskId: 1, status: 'success', executeTime: '2024-03-13 02:00:00', duration: 118, result: '备份完成，文件大小: 2.4GB'},
    {id: 3, taskId: 1, status: 'error', executeTime: '2024-03-12 02:00:00', duration: 30, result: '备份失败: 磁盘空间不足'},
    {id: 4, taskId: 2, status: 'success', executeTime: '2024-03-14 11:30:00', duration: 5, result: '清理完成，删除文件: 128个'},
    {id: 5, taskId: 2, status: 'success', executeTime: '2024-03-14 11:00:00', duration: 4, result: '清理完成，删除文件: 95个'}
]

/** Cron表达式预设 */
const cronPresets = [
    {value: '0 0 * * * ?', label: '每小时'},
    {value: '0 0 0 * * ?', label: '每天凌晨'},
    {value: '0 0 2 * * ?', label: '每天2点'},
    {value: '0 0 3 * * ?', label: '每天3点'},
    {value: '0 0 9 * * ?', label: '每天9点'},
    {value: '0 0/30 * * * ?', label: '每30分钟'},
    {value: '0 0/15 * * * ?', label: '每15分钟'},
    {value: '0 0 0/6 * * ?', label: '每6小时'},
    {value: '0 0 0 * * ?', label: '每天午夜'},
    {value: '0 0 ? * MON-FRI', label: '工作日每天'}
]

const Task = () => {
    const [loading, setLoading] = useState(false)
    const [tasks, setTasks] = useState([])
    const [searchKeyword, setSearchKeyword] = useState('')

    // Modal状态
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('创建任务')
    const [editingTask, setEditingTask] = useState(null)

    // Drawer状态
    const [isDrawerVisible, setIsDrawerVisible] = useState(false)
    const [currentTaskLogs, setCurrentTaskLogs] = useState([])
    const [currentTaskName, setCurrentTaskName] = useState('')

    // 表单
    const [form] = Form.useForm()

    // 加载任务数据
    useEffect(() => {
        fetchTasks()
    }, [])

    /**
     * 获取任务列表
     */
    const fetchTasks = () => {
        setLoading(true)
        setTimeout(() => {
            let filteredData = [...mockTasks]

            if (searchKeyword) {
                filteredData = filteredData.filter(task =>
                    task.taskName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    task.taskKey.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    task.remark.toLowerCase().includes(searchKeyword.toLowerCase())
                )
            }

            setTasks(filteredData)
            setLoading(false)
        }, 500)
    }

    /**
     * 处理搜索
     */
    const handleSearch = (value) => {
        setSearchKeyword(value)
        fetchTasks()
    }

    /**
     * 处理创建任务
     */
    const handleCreate = () => {
        setModalTitle('创建任务')
        setEditingTask(null)
        form.resetFields()
        form.setFieldsValue({
            status: true,
            cronExpression: '0 0 2 * * ?'
        })
        setIsModalVisible(true)
    }

    /**
     * 处理编辑任务
     */
    const handleEdit = (record) => {
        setModalTitle('编辑任务')
        setEditingTask(record)
        form.setFieldsValue({
            taskName: record.taskName,
            taskKey: record.taskKey,
            cronExpression: record.cronExpression,
            beanMethod: record.beanMethod,
            params: record.params,
            remark: record.remark,
            status: record.status === 1
        })
        setIsModalVisible(true)
    }

    /**
     * 处理删除任务
     */
    const handleDelete = (record) => {
        const newTasks = tasks.filter(task => task.id !== record.id)
        setTasks(newTasks)
        message.success(`已删除任务: ${record.taskName}`)
    }

    /**
     * 处理切换状态
     */
    const handleToggleStatus = (record) => {
        const newTasks = tasks.map(task => {
            if (task.id === record.id) {
                return {
                    ...task,
                    status: task.status === 1 ? 0 : 1
                }
            }
            return task
        })
        setTasks(newTasks)
        message.success(`任务 "${record.taskName}" 已${record.status === 1 ? '暂停' : '启动'}`)
    }

    /**
     * 处理立即执行
     */
    const handleExecute = (record) => {
        message.loading(`正在执行任务: ${record.taskName}...`, 2)
        setTimeout(() => {
            message.success(`任务 "${record.taskName}" 执行成功`)
            // 更新最后执行时间
            const newTasks = tasks.map(task => {
                if (task.id === record.id) {
                    return {
                        ...task,
                        lastExecuteTime: new Date().toLocaleString()
                    }
                }
                return task
            })
            setTasks(newTasks)
        }, 2000)
    }

    /**
     * 处理查看执行日志
     */
    const handleViewLogs = (record) => {
        setCurrentTaskName(record.taskName)
        setCurrentTaskLogs(mockExecuteLogs.filter(log => log.taskId === record.id))
        setIsDrawerVisible(true)
    }

    /**
     * 处理Modal提交
     */
    const handleModalOk = async () => {
        try {
            const values = await form.validateFields()

            if (editingTask) {
                // 编辑任务
                const newTasks = tasks.map(task => {
                    if (task.id === editingTask.id) {
                        return {
                            ...task,
                            ...values,
                            status: values.status ? 1 : 0
                        }
                    }
                    return task
                })
                setTasks(newTasks)
                message.success(`任务 "${values.taskName}" 更新成功`)
            } else {
                // 创建任务
                const newTask = {
                    id: Date.now(),
                    ...values,
                    status: values.status ? 1 : 0,
                    createTime: new Date().toLocaleString(),
                    lastExecuteTime: '-',
                    nextExecuteTime: '未执行'
                }
                setTasks([...tasks, newTask])
                message.success(`任务 "${values.taskName}" 创建成功`)
            }

            setIsModalVisible(false)
            form.resetFields()
        } catch (error) {
            console.error('表单验证失败:', error)
        }
    }

    /**
     * 处理刷新
     */
    const handleRefresh = () => {
        fetchTasks()
        message.success('刷新成功')
    }

    // 表格列配置
    const columns = [
        {
            title: '任务ID',
            dataIndex: 'id',
            key: 'id',
            width: 70,
            align: 'center'
        },
        {
            title: '任务名称',
            dataIndex: 'taskName',
            key: 'taskName',
            width: 150,
            render: (name) => <Text strong>{name}</Text>
        },
        {
            title: '任务标识',
            dataIndex: 'taskKey',
            key: 'taskKey',
            width: 140,
            render: (key) => <Tag color="purple">{key}</Tag>
        },
        {
            title: 'Cron表达式',
            dataIndex: 'cronExpression',
            key: 'cronExpression',
            width: 140,
            render: (cron) => <Text code>{cron}</Text>
        },
        {
            title: '执行方法',
            dataIndex: 'beanMethod',
            key: 'beanMethod',
            width: 180,
            render: (method) => <Text type="secondary">{method}</Text>
        },
        {
            title: '上次执行',
            dataIndex: 'lastExecuteTime',
            key: 'lastExecuteTime',
            width: 160
        },
        {
            title: '下次执行',
            dataIndex: 'nextExecuteTime',
            key: 'nextExecuteTime',
            width: 160
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 80,
            align: 'center',
            render: (status) => (
                status === 1 ?
                    <Badge status="success" text="运行中"/> :
                    <Badge status="default" text="已暂停"/>
            )
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            fixed: 'right',
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="立即执行">
                        <Button
                            type="text"
                            icon={<PlayCircleOutlined/>}
                            onClick={() => handleExecute(record)}
                            className="action-btn execute-btn"
                            disabled={record.status === 0}
                        />
                    </Tooltip>
                    <Tooltip title={record.status === 1 ? '暂停' : '启动'}>
                        <Button
                            type="text"
                            icon={record.status === 1 ? <PauseCircleOutlined/> : <PlayCircleOutlined/>}
                            onClick={() => handleToggleStatus(record)}
                            className={`action-btn ${record.status === 1 ? 'pause-btn' : 'start-btn'}`}
                        />
                    </Tooltip>
                    <Tooltip title="执行日志">
                        <Button
                            type="text"
                            icon={<HistoryOutlined/>}
                            onClick={() => handleViewLogs(record)}
                            className="action-btn log-btn"
                        />
                    </Tooltip>
                    <Tooltip title="编辑">
                        <Button
                            type="text"
                            icon={<EditOutlined/>}
                            onClick={() => handleEdit(record)}
                            className="action-btn edit-btn"
                        />
                    </Tooltip>
                    <Popconfirm
                        title="确认删除"
                        description={`确定要删除任务 "${record.taskName}" 吗？`}
                        onConfirm={() => handleDelete(record)}
                        okText="删除"
                        cancelText="取消"
                        okButtonProps={{danger: true}}
                    >
                        <Tooltip title="删除">
                            <Button
                                type="text"
                                icon={<DeleteOutlined/>}
                                className="action-btn delete-btn"
                            />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    return (
        <div className="task-container">
            {/* 页面头部 */}
            <Card className="task-card">
                <div className="card-header">
                    <Breadcrumb
                        items={[
                            {title: <Link to={'/operation'}><BugOutlined/>运维管理</Link>},
                            {title: '定时任务'}
                        ]}
                    />
                    <Title level={4} style={{marginTop: 10, marginBottom: 0}}>定时任务</Title>
                </div>
            </Card>

            {/* 筛选区域 */}
            <Card className="filter-card">
                <div className="filter-content">
                    <div className="filter-left">
                        <Input.Search
                            placeholder="搜索任务名称/标识/备注"
                            allowClear
                            enterButton={<SearchOutlined/>}
                            onSearch={handleSearch}
                            style={{width: 300}}
                            className="search-input"
                        />
                    </div>
                    <div className="filter-right">
                        <Button
                            icon={<ReloadOutlined/>}
                            onClick={handleRefresh}
                            className="refresh-btn"
                        >
                            刷新
                        </Button>
                        <Button
                            type="primary"
                            icon={<PlusOutlined/>}
                            onClick={handleCreate}
                            className="create-btn"
                        >
                            创建任务
                        </Button>
                    </div>
                </div>
            </Card>

            {/* 任务表格 */}
            <Card className="table-card">
                <Table
                    columns={columns}
                    dataSource={tasks}
                    rowKey="id"
                    loading={loading}
                    pagination={false}
                    scroll={{x: 1400}}
                    className="task-table"
                />
            </Card>

            {/* 创建/编辑任务Modal */}
            <Modal
                title={modalTitle}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => {
                    setIsModalVisible(false)
                    form.resetFields()
                }}
                width={600}
                className="task-modal"
                okText="保存"
                cancelText="取消"
            >
                <Form
                    form={form}
                    layout="vertical"
                    className="task-form"
                >
                    <Form.Item
                        label="任务名称"
                        name="taskName"
                        rules={[
                            {required: true, message: '请输入任务名称'},
                            {max: 50, message: '任务名称最多50位'}
                        ]}
                    >
                        <InputAntd placeholder="请输入任务名称"/>
                    </Form.Item>

                    <Form.Item
                        label="任务标识"
                        name="taskKey"
                        rules={[
                            {required: true, message: '请输入任务标识'},
                            {pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/, message: '只能包含字母、数字和下划线'}
                        ]}
                    >
                        <InputAntd placeholder="如：dataBackup" disabled={!!editingTask}/>
                    </Form.Item>

                    <Form.Item
                        label="Cron表达式"
                        name="cronExpression"
                        rules={[{required: true, message: '请输入Cron表达式'}]}
                    >
                        <Select
                            placeholder="选择常用表达式"
                            allowClear
                            onChange={(value) => form.setFieldsValue({cronExpression: value})}
                        >
                            {cronPresets.map(preset => (
                                <Option key={preset.value} value={preset.value}>
                                    {preset.label} - {preset.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="执行方法"
                        name="beanMethod"
                        rules={[{required: true, message: '请输入执行方法'}]}
                        extra="格式：ServiceName.methodName"
                    >
                        <InputAntd placeholder="如：BackupService.backup"/>
                    </Form.Item>

                    <Form.Item
                        label="参数"
                        name="params"
                        extra="JSON格式参数（可选）"
                    >
                        <InputAntd.TextArea
                            placeholder='{"key": "value"}'
                            rows={2}
                        />
                    </Form.Item>

                    <Form.Item
                        label="备注"
                        name="remark"
                    >
                        <InputAntd.TextArea
                            placeholder="请输入任务描述"
                            rows={2}
                        />
                    </Form.Item>

                    <Divider style={{margin: '16px 0'}}/>

                    <Form.Item
                        label="初始状态"
                        name="status"
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="启用" unCheckedChildren="暂停"/>
                    </Form.Item>
                </Form>
            </Modal>

            {/* 执行日志Drawer */}
            <Drawer
                title={<Space><HistoryOutlined/><span>执行日志 - {currentTaskName}</span></Space>}
                placement="right"
                width={500}
                open={isDrawerVisible}
                onClose={() => setIsDrawerVisible(false)}
                className="log-drawer"
            >
                <div className="execute-logs">
                    {currentTaskLogs.length > 0 ? (
                        <Timeline
                            items={currentTaskLogs.map(log => ({
                                color: log.status === 'success' ? 'green' : 'red',
                                children: (
                                    <div className="log-item">
                                        <div className="log-header">
                                            <Tag color={log.status === 'success' ? 'success' : 'error'}>
                                                {log.status === 'success' ? <CheckCircleOutlined/> : <CloseCircleOutlined/>}
                                                {log.status === 'success' ? '成功' : '失败'}
                                            </Tag>
                                            <Text type="secondary">{log.executeTime}</Text>
                                        </div>
                                        <div className="log-detail">
                                            <Text>耗时: <span style={{color: log.duration > 100 ? '#ff4d4f' : '#52c41a'}}>{log.duration}ms</span></Text>
                                        </div>
                                        <div className="log-result">
                                            <Text type="secondary">{log.result}</Text>
                                        </div>
                                    </div>
                                )
                            }))}
                        />
                    ) : (
                        <Empty description="暂无执行日志"/>
                    )}
                </div>
            </Drawer>
        </div>
    )
}

export default Task
