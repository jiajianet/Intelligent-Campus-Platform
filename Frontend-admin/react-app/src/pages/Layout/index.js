import { useState, useEffect } from 'react';
import { Layout, Menu, Popconfirm, Button } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { clearUserInfo, fetchUserInfo } from '@/store/modules/user'
import { useDispatch, useSelector } from 'react-redux'

const { Header, Sider, Content } = Layout

const items = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined />,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined />,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined />,
    }
]

const XychLayout = () => {
    const [collapsed, setCollapsed] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const name = useSelector(state => state.user.userInfo.uname)

    // 获取用户信息
    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch])

    // 菜单点击跳转
    const onMenuClick = (route) => {
        navigate(route.key)
    }

    // 退出登录
    const onConfirm = () => {
        dispatch(clearUserInfo())
        navigate('/login')
    }

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={200}
                className="site-layout-background"
            >
                <div className="logo" />
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[location.pathname]}
                    onClick={onMenuClick}
                    items={items}
                    style={{ height: '100%', borderRight: 0 }}
                />
            </Sider>
            <Layout>
                <Header
                    className="header"
                    style={{
                        padding: 0,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className="user-info">
                        <span className="user-name">{name}</span>
                        <span className="user-logout">
                            <Popconfirm
                                title="是否确认退出？"
                                okText="退出"
                                cancelText="取消"
                                onConfirm={onConfirm}
                            >
                                <LogoutOutlined /> 退出
                            </Popconfirm>
                        </span>
                    </div>
                </Header>
                <Content
                    className="layout-content"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {/* 二级路由出口 */}
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default XychLayout