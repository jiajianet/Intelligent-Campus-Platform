import { Breadcrumb, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { FileTextOutlined, HomeOutlined, RobotOutlined } from '@ant-design/icons';
import AiAssistant from '@/components/AiAssistant';
import './index.scss';

const { Title, Paragraph } = Typography;

const AiAssistantPage = () => {
    return (
        <div className="ai-assistant-page">
            <div className="page-header">
                <Breadcrumb
                    items={[
                        { title: <Link to="/"><HomeOutlined /> 首页</Link> },
                        { title: <><FileTextOutlined /> 文章管理</> },
                        { title: <><RobotOutlined /> AI 助手</> }
                    ]}
                />
                <Space direction="vertical" size={6}>
                    <Title level={3} className="page-title">AI 助手</Title>
                    <Paragraph className="page-subtitle">
                        独立模块承载智能问答能力，方便后续扩展成更多业务场景。
                    </Paragraph>
                </Space>
            </div>

            <AiAssistant
                mode="page"
                title="智能问答助手"
                pageContext={{ page: 'article' }}
            />
        </div>
    );
};

export default AiAssistantPage;
