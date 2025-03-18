import { useState, useEffect } from 'react';
import { Layout, Menu, Popconfirm, Button } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    AreaChartOutlined,
    FormOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { clearUserInfo, fetchUserInfo } from '@/store/modules/user'
import { useDispatch, useSelector } from 'react-redux'

const { Header, Sider, Content } = Layout

const items = [
    {
        label: '仪表盘',
        key: '/dashboard',
        icon: <PieChartOutlined/>,
        children: [
            {
                label: '首页',
                key: '/',
                icon: <HomeOutlined/>,
            },
        ]
    },
    {
        label: '文章管理',
        key: '/',
        icon: <HomeOutlined/>,
        children: [
            {
                label: '文章管理',
                key: '/article',
                icon: <DiffOutlined/>,
            },
            {
                label: '创建文章',
                key: '/publish',
                icon: <EditOutlined/>,
            },
            {
                label: '主页轮廓图',
                key: '/homePage',
                icon: <FormOutlined/>
            },
        ]
    },
    {
        label: '用户管理',
        key: '/user',
        icon: <HomeOutlined/>,
        children: [
            {
                label: '用户列表',
                key: '/userList',
                icon: <DiffOutlined/>,
            },
            {
                label: '创建用户',
                key: '/createUser',
                icon: <EditOutlined/>,
            },
        ]
    },
    {
        label: '系统管理',
        key: '/system',
        icon: <HomeOutlined/>,
        children: [
            {
                label: '系统设置',
                key: '/systemSetting',
                icon: <DiffOutlined/>,
            },
            {
                label: '角色管理',
                key: '/role',
                icon: <EditOutlined/>,
            },
        ]
    },
    {
        label: '菜单管理',
        key: '/menu',
        icon: <MenuFoldOutlined/>,
        children: [
            {
                label: '菜单列表',
                key: '/menuList',
                icon: <MenuUnfoldOutlined/>,
            },
            {
                label: '创建菜单',
                key: '/createMenu',
                icon: <MenuUnfoldOutlined/>,
            },
        ]
    },
    {
        label: '运维管理',
        key: '/operation',
        icon: <MenuFoldOutlined/>,
        children: [
            {
                label: '日志管理',
                key: '/log',
                icon: <MenuUnfoldOutlined/>,
            },
            {
                label: '定时任务',
                key: '/task',
                icon: <MenuUnfoldOutlined/>,
            },
        ]
    },
    {
        label: '帮助中心',
        key: '/help',
        icon: <MenuFoldOutlined/>,
        children: [
            {
                label: '使用文档',
                key: '/document',
                icon: <MenuUnfoldOutlined/>,
            },
            {
                label: '常见问题',
                key: '/question',
                icon: <MenuUnfoldOutlined/>,
            },
        ]
    },
    {
        label: '更新日志',
        key: '/update',
        icon: <AreaChartOutlined />
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