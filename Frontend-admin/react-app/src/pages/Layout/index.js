import {useState, useEffect} from 'react';
import {Layout, Menu, Popconfirm, Button, Breadcrumb, Avatar} from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    AreaChartOutlined,
    FormOutlined,
    UserOutlined,
    UserAddOutlined,
    SolutionOutlined,
    BugOutlined,
    BulbOutlined,
    BarsOutlined,
    FileOutlined,
    IdcardOutlined,
    WindowsOutlined,
    AppstoreOutlined,
    FileTextOutlined,
    QuestionOutlined
} from '@ant-design/icons'
import './index.scss'
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
import {clearUserInfo, fetchUserInfo} from '@/store/modules/user'
import {useDispatch, useSelector} from 'react-redux'
//TODO <CommentOutlined /> 加侧边弹窗添加大模型<MessageOutlined /> <QuestionCircleOutlined />
const {Header, Sider, Content} = Layout

/**
 * @typedef {Object} MenuItem
 * @property {string} label - 菜单项显示的文本
 * @property {string} key - 菜单项的唯一标识
 * @property {React.ReactNode} [icon] - 菜单项的图标（可选）
 * @property {MenuItem[]} [children] - 子菜单项（可选）
 */

/**
 * @type {MenuItem[]}
 */

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
            {
                label: '用户中心',
                key: '/userCenter',
                icon: <IdcardOutlined/>,
            }
        ]
    },
    {
        label: '文章管理',
        key: '/articles',
        icon: <FileOutlined/>,
        children: [
            {
                label: '文章列表',
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
                key: '/homePageCarousel',
                icon: <FormOutlined/>
            },
        ]
    },
    {
        label: '用户管理',
        key: '/users',
        icon: <UserOutlined/>,
        children: [
            {
                label: '用户列表',
                key: '/userList',
                icon: <SolutionOutlined/>,
            },
            {
                label: '创建用户',
                key: '/createUser',
                icon: <UserAddOutlined/>,
            },
        ]
    },
    {
        label: '系统管理',
        key: '/system',
        icon: <WindowsOutlined/>,
        children: [
            {
                label: '系统设置',
                key: '/systemSetting',
                icon: <AppstoreOutlined/>,
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
        icon: <BarsOutlined/>,
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
        icon: <BugOutlined/>,
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
        icon: <BulbOutlined/>,
        children: [
            {
                label: '使用文档',
                key: '/document',
                icon: <FileTextOutlined/>,
            },
            {
                label: '常见问题',
                key: '/question',
                icon: <QuestionOutlined/>,
            },
        ]
    },
    {
        label: '更新日志',
        key: '/update',
        icon: <AreaChartOutlined/>,
        // children: [],
    }
]


const XychLayout = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [openKeys, setOpenKeys] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const name = useSelector(state => state.user.userInfo.uname)
    const url = useSelector(state => state.user.userInfo.avatarBase64) || '';
    // const avatarUrl = url.startsWith('data:image') ? url : `data:image/png;base64,${url}`;

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

    // 处理菜单展开/折叠
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (latestOpenKey) {
            setOpenKeys([latestOpenKey]); // 只展开最新的菜单项
        } else {
            setOpenKeys([]); // 如果没有新的菜单项展开，则折叠所有
        }
    }

    // 递归查找菜单项的 label
    const findLabelByKey = (items, key) => {
        for (const item of items) {
            if (item.key === key) {
                return item.label; // 找到匹配的 key，返回 label
            }
            if (item.children) {
                const result = findLabelByKey(item.children, key); // 递归查找子菜单
                if (result) {
                    return result;
                }
            }
        }
        return null; // 未找到匹配的 key
    }

    // 递归查找父级 label
    const findParentLabelByKey = (items, key) => {
        for (const item of items) {
            if (item.children) {
                const child = item.children.find((child) => child.key === key);
                if (child) {
                    return item.label; // 找到匹配的子菜单，返回父级 label
                }
                const result = findParentLabelByKey(item.children, key); // 递归查找子菜单
                if (result) {
                    return result;
                }
            }
        }
        return null; // 未找到匹配的父级
    };

    // 根据当前路由动态生成面包屑
    const getBreadcrumbItems = () => {
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const breadcrumbItems = pathSnippets.map((snippet, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            const label = findLabelByKey(items, url); // 从菜单项中查找 label
            return {
                key: url,
                title: <Link to={url}>{label || snippet}</Link>,
            };
        });

        // 查找当前路由的父级 label
        const parentLabel = findParentLabelByKey(items, location.pathname);
        if (parentLabel) {
            // 添加父级 label 到面包屑
            breadcrumbItems.unshift({
                key: `parent-${parentLabel}`, // 唯一化 key
                title: parentLabel,
            });
        }

        return breadcrumbItems;
    };

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={200}
                className="site-layout-background"
                theme="light"
            >
                <div className="logo"/>
                <Menu
                    mode="inline"
                    // theme="dark"
                    selectedKeys={[location.pathname]}
                    openKeys={openKeys}
                    onClick={onMenuClick}
                    onOpenChange={onOpenChange}
                    items={items}
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
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                    {/* 面包屑 */}
                    <Breadcrumb items={getBreadcrumbItems()}
                                style={{
                                    flex: 1,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                }}
                    />

                    <div className="user-info">
                        <span className="user-name">{name}</span>
                        <Avatar className="avatar"
                                src={url || "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"}
                                onError={() => {
                                    // 如果图片加载失败，可以在这里处理
                                    console.log("头像加载失败");
                                }}
                                draggable="false"
                        />
                        <span className="user-logout">
                            <Popconfirm
                                title="是否确认退出？"
                                okText="退出"
                                cancelText="取消"
                                onConfirm={onConfirm}
                            >
                                <LogoutOutlined/> 退出
                            </Popconfirm>
                        </span>
                    </div>
                </Header>
                <Content
                    className="layout-content"
                >
                    {/* 二级路由出口 */}
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    )
}

export default XychLayout