import { useEffect, useMemo, useRef, useState } from 'react';
import {
    Alert,
    Button,
    Card,
    Drawer,
    Empty,
    FloatButton,
    Input,
    List,
    Space,
    Spin,
    Tag,
    Typography,
    message
} from 'antd';
import {
    AudioOutlined,
    CustomerServiceOutlined,
    ReloadOutlined,
    RobotOutlined,
    SendOutlined,
    SoundOutlined,
    UserOutlined
} from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { chatWithAssistantAPI, getAssistantHistoryAPI } from '@/apis/assistant';
import './index.scss';

const { Paragraph, Text, Title } = Typography;
const QUICK_QUESTIONS = [
    '当前共有多少篇文章？',
    '最近 7 天发布了多少篇文章？',
    '待审核文章有哪些？',
    '帮我找标题包含“测试”的文章'
];

const createSessionId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return `assistant-${Date.now()}`;
};

const AiAssistant = ({ pageContext, mode = 'drawer', title = '文章管理 AI 助手' }) => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [sending, setSending] = useState(false);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [listening, setListening] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(false);
    const [speechError, setSpeechError] = useState('');
    const [sessionId] = useState(() => createSessionId());
    const recognitionRef = useRef(null);
    const autoSendModeRef = useRef('text');
    const messageEndRef = useRef(null);

    const mergedPageContext = useMemo(() => ({
        page: 'article',
        ...pageContext
    }), [pageContext]);

    useEffect(() => {
        const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!Recognition) {
            setSpeechSupported(false);
            return undefined;
        }

        const recognition = new Recognition();
        recognition.lang = 'zh-CN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0]?.transcript || '')
                .join('')
                .trim();
            if (!transcript) {
                return;
            }
            setInputValue(transcript);
            if (autoSendModeRef.current === 'voice') {
                sendMessage(transcript, 'voice');
            }
        };

        recognition.onerror = (event) => {
            setSpeechError(`语音识别失败：${event.error || 'unknown'}`);
            setListening(false);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognitionRef.current = recognition;
        setSpeechSupported(true);

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.onresult = null;
                recognitionRef.current.onerror = null;
                recognitionRef.current.onend = null;
                recognitionRef.current.stop();
            }
            recognitionRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (open && messages.length === 0) {
            loadHistory();
        }
    }, [open]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages, open]);

    const loadHistory = async () => {
        setLoadingHistory(true);
        try {
            const res = await getAssistantHistoryAPI(sessionId);
            const history = res.data?.data?.messages || [];
            if (!history.length) {
                return;
            }
            setMessages(history.map((item, index) => ({
                id: `history-${index}`,
                role: item.role,
                content: item.content,
                references: [],
                toolCalls: []
            })));
        } catch (error) {
            console.error('加载 AI 助手历史失败:', error);
        } finally {
            setLoadingHistory(false);
        }
    };

    const appendMessage = (payload) => {
        setMessages(prev => [...prev, { id: `${Date.now()}-${Math.random()}`, ...payload }]);
    };

    const sendMessage = async (contentArg, mode = 'text') => {
        const content = (contentArg ?? inputValue).trim();
        if (!content || sending) {
            return;
        }

        setInputValue('');

        appendMessage({ role: 'user', content, references: [], toolCalls: [] });
        setSending(true);
        setSpeechError('');

        try {
            const res = await chatWithAssistantAPI({
                sessionId,
                message: content,
                mode,
                pageContext: mergedPageContext
            });
            const data = res.data?.data || {};
            appendMessage({
                role: 'assistant',
                content: data.assistantMessage || '我暂时没有生成回答，请稍后再试。',
                references: data.references || [],
                toolCalls: data.toolCalls || []
            });
            if (mode === 'voice') {
                speakText(data.ttsText || data.assistantMessage || '');
            }
        } catch (error) {
            console.error('AI 助手请求失败:', error);
            message.error('AI 助手请求失败，请稍后重试');
            appendMessage({
                role: 'assistant',
                content: '请求失败，请检查后端服务、Ollama 或网络连接。',
                references: [],
                toolCalls: []
            });
        } finally {
            setSending(false);
        }
    };

    const handleQuickQuestion = (question) => {
        setInputValue(question);
        sendMessage(question, 'text');
    };

    const handleResetConversation = () => {
        setMessages([]);
        setInputValue('');
        setSpeechError('');
    };

    const toggleVoiceInput = () => {
        if (!speechSupported || !recognitionRef.current) {
            setSpeechError('当前浏览器不支持语音识别，请改用文字输入。');
            return;
        }
        setSpeechError('');
        if (listening) {
            recognitionRef.current.stop();
            setListening(false);
            return;
        }
        autoSendModeRef.current = 'voice';
        recognitionRef.current.start();
        setListening(true);
    };

    const speakText = (text) => {
        if (!text || !window.speechSynthesis) {
            return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        window.speechSynthesis.speak(utterance);
    };

    const assistantBody = (
        <div className={`ai-assistant-panel ${mode === 'page' ? 'page-mode' : ''}`}>
            <div className="assistant-summary">
                <Title level={5}>支持内容</Title>
                <Paragraph>
                    可查询文章数量、状态、时间范围、文章详情，以及后台帮助文档。首版只支持只读问答。
                </Paragraph>
            </div>

            <div className="assistant-quick-actions">
                {QUICK_QUESTIONS.map(question => (
                    <Tag key={question} className="quick-tag" onClick={() => handleQuickQuestion(question)}>
                        {question}
                    </Tag>
                ))}
            </div>

            {speechError ? (
                <Alert type="warning" showIcon message={speechError} className="assistant-alert" />
            ) : null}

            <div className="assistant-messages">
                {loadingHistory ? (
                    <div className="assistant-loading">
                        <Spin />
                    </div>
                ) : messages.length ? (
                    <List
                        dataSource={messages}
                        renderItem={(item) => (
                            <List.Item className={`message-row ${item.role === 'assistant' ? 'assistant' : 'user'}`}>
                                <div className={`message-bubble ${item.role === 'assistant' ? 'assistant' : 'user'}`}>
                                    <div className="message-meta">
                                        <Space>
                                            {item.role === 'assistant' ? <RobotOutlined /> : <UserOutlined />}
                                            <Text strong>{item.role === 'assistant' ? 'AI 助手' : '你'}</Text>
                                        </Space>
                                    </div>
                                    <div className="message-content">
                                        <ReactMarkdown remarkPlugins={[]}>{item.content}</ReactMarkdown>
                                    </div>
                                    {item.toolCalls?.length ? (
                                        <div className="message-tools">
                                            {item.toolCalls.map((tool) => (
                                                <Tag key={`${item.id}-${tool.name}-${tool.summary}`} color={tool.status === 'success' ? 'blue' : 'red'}>
                                                    {tool.name}: {tool.summary}
                                                </Tag>
                                            ))}
                                        </div>
                                    ) : null}
                                    {item.references?.length ? (
                                        <div className="message-references">
                                            <Text type="secondary">依据：</Text>
                                            {item.references.map((reference) => (
                                                <Tag key={`${item.id}-${reference.type}-${reference.id}`}>
                                                    {reference.title}
                                                </Tag>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            </List.Item>
                        )}
                    />
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="还没有对话，试试快捷提问" />
                )}
                <div ref={messageEndRef} />
            </div>

            <div className="assistant-input-area">
                <Input.TextArea
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    rows={3}
                    placeholder="输入你想查询的文章管理问题"
                    onPressEnter={(event) => {
                        if (!event.shiftKey) {
                            event.preventDefault();
                            sendMessage();
                        }
                    }}
                />
                <div className="assistant-input-actions">
                    <Button
                        icon={<AudioOutlined />}
                        onClick={toggleVoiceInput}
                        disabled={!speechSupported && !listening}
                        className={listening ? 'listening-btn' : ''}
                    >
                        {listening ? '停止录音' : '语音输入'}
                    </Button>
                    <Space>
                        <Button
                            icon={<SoundOutlined />}
                            onClick={() => speakText(messages[messages.length - 1]?.content || '')}
                            disabled={!messages.length}
                        >
                            朗读回复
                        </Button>
                        <Button
                            type="primary"
                            icon={<SendOutlined />}
                            loading={sending}
                            onClick={() => sendMessage()}
                        >
                            发送
                        </Button>
                    </Space>
                </div>
            </div>
        </div>
    );

    if (mode === 'page') {
        return (
            <Card
                className="ai-assistant-page-card"
                title={<Space><RobotOutlined /><span>{title}</span></Space>}
                extra={<Button icon={<ReloadOutlined />} onClick={handleResetConversation}>清空</Button>}
                bordered={false}
            >
                {assistantBody}
            </Card>
        );
    }

    return (
        <>
            <FloatButton
                icon={<CustomerServiceOutlined />}
                type="primary"
                tooltip="AI 助手"
                onClick={() => setOpen(true)}
            />
            <Drawer
                title={<Space><RobotOutlined /><span>{title}</span></Space>}
                placement="right"
                width={420}
                open={open}
                onClose={() => setOpen(false)}
                className="ai-assistant-drawer"
                extra={
                    <Space>
                        <Button icon={<ReloadOutlined />} onClick={handleResetConversation}>清空</Button>
                    </Space>
                }
            >
                {assistantBody}
            </Drawer>
        </>
    );
};

export default AiAssistant;
