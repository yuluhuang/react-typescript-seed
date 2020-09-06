import axios from 'axios';
import qs from 'qs';
// import {Modal, Toast} from 'antd';
import util from '../utils/utils';
import config from './config';

// const {alert} = Modal;

const instance = axios.create({
    baseURL: config.root,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});
// 查看评论中的问题 https://www.jianshu.com/p/4445595488e2
const pending:any = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const {CancelToken} = axios;
const removePending = (httpConfig: any) => {
    const flagUrl = `${httpConfig.method}&${httpConfig.url}&${httpConfig.data}`;
    for (const p in pending) {
        if (pending[p].u === flagUrl) { //当当前请求在数组中存在时执行函数体
            pending[p].f(); //执行取消操作
            pending.splice(p, 1); //把这条记录从数组中移除
        }
    }
};

const showAlert = (err: any) => {
    // Toast.hide();
    // const alertInstance = alert(err, '', [
    //     {text: '取消', onPress: () => console.log('cancel'), style: 'default'},
    //     {text: '确定', onPress: () => console.log('ok')},
    // ]);
    // setTimeout(() => {
    //     // 可以调用close方法以在外部close
    //     console.log('auto close');
    //     alertInstance.close();
    // }, 50000);
};
instance.interceptors.request.use(
    httpConfig => {
        removePending(httpConfig); //在一个ajax发送前执行一下取消操作
        httpConfig.headers.common.Authorization = util.token();
        httpConfig.cancelToken = new CancelToken((c) => {
            pending.push({u: `${httpConfig.method}&${httpConfig.url}&${httpConfig.data}`, f: c});
        });
        return httpConfig;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

// TODO  成功(2xx) 和 err 的判别
instance.interceptors.response.use(
    res => {
        removePending(res.config); // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
        // 后端成功返回(成功或失败)，200
        if (!res.data.success) {
            switch (res.data.errCode) {
                case '401':
                    showAlert(res.data.info);
                    // history.replace('/login'); // 只改变 url
                    util.logout();
                    window.location.replace(`${config.website}login`);
                    // window.location.reload();
                    break;
                default:
                    showAlert(res.data.info);
            }
        }
        return res;
    },
    err => {
        // 请求异常（后端未捕获异常 或者 其他异常，如超时）
        const {status, statusText} = (err || {}).response;
        showAlert(statusText);
        // Toast.offline(statusText);
        if (err.response.status === 401) {
            // showAlert('您的登录已过期，请重新登录');
            setTimeout(() => {
                // history.replace('/login');
                localStorage.removeItem('token');
                window.location.replace(`${config.website}login`);
                // window.location.reload();
            }, 600);
        }
        return {status, statusText};
    }
);

const fileUpload = axios.create({
    baseURL: config.root,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
fileUpload.interceptors.request.use(
    httpConfig => {
        httpConfig.headers.common.Authorization = util.token();
        return httpConfig;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);
fileUpload.interceptors.response.use(
    res => {
        // 后端成功返回(成功或失败)，200
        if (!res.data.success) {
            showAlert(res.data.info);
        }
        return res;
    },
    err => {
        // 请求异常（后端未捕获异常 或者 其他异常，如超时）
        const {status, statusText} = (err || {}).response;
        showAlert(statusText);
        return {status, statusText};
    }
);
export default {
    base: {
        post(url: string, data: any) {
            return instance.post(url, qs.stringify(data));
        },
        get(url: string, data: any) {
            return instance.get(url, data);
        }
    },
    fileUpload: {
        post(url: string, data: any) {
            return fileUpload.post(url, data);
        },
    }
};
