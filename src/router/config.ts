import Loadable from 'react-loadable';

import {MyLoading} from '../components/MyLoading';
import NotFound from '../components/NotFound';

const Index = Loadable({
    loader: () => import('../components/Index'),
    loading: MyLoading,
    delay: 300
});


const Login = Loadable({
    loader: () => import('../components/Login'),
    loading: MyLoading,
    delay: 300
});

const RouterConfig = [
    {
        exact: true,
        path: '/login',
        component: Login,
        unAuth: true,
        title: '登录',
        children: []
    },
    {
        exact: true,
        path: '/index',
        component: Index,
        unAuth: true,
        title: '首页',
        children: []
    },
    {
        exact: true,
        path: '',
        component: Index,
        unAuth: true,
        title: '首页',
        children: []
    },
    {
        exact: true,
        path: '*',
        component: NotFound,
        unAuth: true,
        title: '404',
        children: []
    }
];

export default RouterConfig;
