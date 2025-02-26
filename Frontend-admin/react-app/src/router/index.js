import { createBrowserRouter } from 'react-router-dom'

import Login from '@/pages/Login'
import Layout from '@/pages/Layout'

import AuthRoute from '@/components/AuthRoute'
import { lazy, Suspense } from 'react'
import { Spin } from 'antd'
//懒加载
const Home = lazy(() => import('@/pages/Layout/Home'))// import Home from '@/pages/Layout/Home'
const Article = lazy(() => import('@/pages/Layout/Article'))// import Article from '@/pages/Layout/Article'
const Publish = lazy(() => import('@/pages/Layout/Publish'))// import Publish from '@/pages/Layout/Publish'

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                index: true,
                element: <Suspense fallback={<div>加载中...<Spin /></div>}><Home /></Suspense>
            },
            {
                path: 'article',
                element: <Suspense fallback={<div>加载中...<Spin /></div>}><Article /></Suspense>
            },
            {
                path: 'publish',
                element: <Suspense fallback={<div>加载中...<Spin /></div>}><Publish /></Suspense>
            },

        ]
    }, {
        path: '/login', element: <Login />,
    },])

export default router