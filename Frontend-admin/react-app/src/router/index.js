import {createBrowserRouter} from 'react-router-dom'

import Login from '@/pages/Login'
import Layout from '@/pages/Layout'

import AuthRoute from '@/components/AuthRoute'
import {lazy, Suspense} from 'react'
import {Spin} from 'antd'
//懒加载
const Home = lazy(() => import('@/pages/Layout/Home'))// import Home from '@/pages/Layout/Home'
const Article = lazy(() => import('@/pages/Layout/Article'))// import Article from '@/pages/Layout/Article'
const Publish = lazy(() => import('@/pages/Layout/Publish'))// import Publish from '@/pages/Layout/Publish'
const UserList = lazy(() => import('@/pages/Layout/UserList'));
const CreateUser = lazy(() => import('@/pages/Layout/CreateUser'));
const SystemSetting = lazy(() => import('@/pages/Layout/SystemSetting'));
const Role = lazy(() => import('@/pages/Layout/Role'));
const MenuList = lazy(() => import('@/pages/Layout/MenuList'));
const CreateMenu = lazy(() => import('@/pages/Layout/CreateMenu'));
const Log = lazy(() => import('@/pages/Layout/Log'));
const Task = lazy(() => import('@/pages/Layout/Task'));
const Document = lazy(() => import('@/pages/Layout/Document'));
const Question = lazy(() => import('@/pages/Layout/Question'));
const Update = lazy(() => import('@/pages/Layout/Update'));
const UserCenter = lazy(() => import('src/pages/Layout/UserCenter'));
const HomePageCarousel = lazy(() => import('@/pages/Layout/HomePageCarousel'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout/></AuthRoute>,
        children: [
            {
                index: true,
                element: <Suspense fallback={<div>加载中...<Spin/></div>}><Home/></Suspense>
            },
            {
                path: 'article',
                element: <Suspense fallback={<div>加载中...<Spin/></div>}><Article/></Suspense>
            },
            {
                path: 'publish',
                element: <Suspense fallback={<div>加载中...<Spin/></div>}><Publish/></Suspense>
            },
            {
                path: 'homePageCarousel',
                element: <Suspense fallback={<div>加载中...<Spin/></div>}><HomePageCarousel/></Suspense>
            },
            {
                path: 'userCenter',
                element: <Suspense fallback={<div>加载中...<Spin/></div>}><UserCenter/></Suspense>
            },
            {
                path: 'userList',
                element: <Suspense fallback={<div>加载中...<Spin/></div>}><UserList/></Suspense>
            },
            {
                path: 'createUser',
                element: <Suspense fallback={<div>加载中...<Spin/></div>}><CreateUser/></Suspense>
            },
            {
                path: 'systemSetting',
                element: <Suspense fallback={<div>加载中...<Spin/></div>}><SystemSetting/></Suspense>
            },
            {
                path: 'role',
                element: <Suspense fallback={<div>加载中...<Spin/></div>}><Role/></Suspense>
            },
            {
                path: 'menuList',
                element: <Suspense fallback={<div>加载中...<Spin/></div>}><MenuList/></Suspense>
            },
            {
                path: 'createMenu',
                element: <Suspense fallback={<div>加载中...<Spin/></div>}><CreateMenu/></Suspense>
            },
            {
                path: 'log',
                element: <Suspense fallback={<div>加载中...<Spin/></div>}><Log/></Suspense>
            },
            {
                path: 'task',
                element: <Suspense fallback={<div>加载中...<Spin/></div>}><Task/></Suspense>
            },
            {
                path: 'document',
                element: <Suspense fallback={<div>加载中...<Spin/></div>}><Document/></Suspense>
            },
            {
                path: 'question',
                element: <Suspense fallback={<div>加载中...<Spin/></div>}><Question/></Suspense>
            },
            {
                path: 'update',
                element: <Suspense fallback={<div>加载中...<Spin/></div>}><Update/></Suspense>
            },

        ]
    },
    {
        path: '/login', element: <Login/>,
    },
])

export default router