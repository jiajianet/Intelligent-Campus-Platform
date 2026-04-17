import { Breadcrumb, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import './index.scss';

const { Title, Text } = Typography;

/**
 * 统一的页面头部组件
 * @param {Object} props
 * @param {Array} props.breadcrumbs - 面包屑配置 [{title, link?}]
 * @param {string|ReactNode} props.title - 页面标题
 * @param {string|ReactNode} props.subtitle - 页面副标题
 * @param {ReactNode} props.extra - 右侧额外内容
 * @param {ReactNode} props.icon - 标题图标
 */
const PageHeader = ({ 
    breadcrumbs = [], 
    title, 
    subtitle, 
    extra,
    icon 
}) => {
    const defaultBreadcrumbs = [
        { title: <Link to="/"><HomeOutlined /> 首页</Link> },
        ...breadcrumbs
    ];

    return (
        <div className="page-header">
            <Breadcrumb
                items={defaultBreadcrumbs}
                className="page-breadcrumb"
            />
            <div className="page-title-row">
                <Space align="center" size={8}>
                    {icon && <span className="page-icon">{icon}</span>}
                    <Title level={4} className="page-title">{title}</Title>
                </Space>
                {extra && <div className="page-extra">{extra}</div>}
            </div>
            {subtitle && <Text type="secondary" className="page-subtitle">{subtitle}</Text>}
        </div>
    );
};

export default PageHeader;
