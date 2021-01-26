import {Dispatch } from "redux";
import AuthServices from "../../../service/AuthServices";


const THISACTION = 'AUTH_';
const thunk = {
    login: {
        LOGIN: THISACTION + 'LOGIN',
        LOGIN_SUCCESS: THISACTION + 'LOGIN_SUCCESS',
        LOGIN_FAIL: THISACTION + 'LOGIN_FAIL'
    },
    codeLogin: {
        CODE_LOGIN: THISACTION + 'CODE_LOGIN',
        CODE_LOGIN_SUCCESS: THISACTION + 'CODE_LOGIN_SUCCESS',
        CODE_LOGIN_FAIL: THISACTION + 'CODE_LOGIN_FAIL'
    },
    register: {
        REGISTER: THISACTION + 'REGISTER',
        REGISTER_SUCCESS: THISACTION + 'REGISTER_SUCCESS',
        REGISTER_FAIL: THISACTION + 'REGISTER_FAIL'
    },
    logout: {
        LOGOUT: THISACTION + 'LOGOUT',
        LOGOUT_SUCCESS: THISACTION + 'LOGOUT_SUCCESS',
        LOGOUT_FAIL: THISACTION + 'LOGOUT_FAIL'
    },
    passwordReset: {
        PASSWORD_RESET: THISACTION + 'PASSWORD_RESET',
        PASSWORD_RESET_SUCCESS: THISACTION + 'PASSWORD_RESET_SUCCESS',
        PASSWORD_RESET_FAIL: THISACTION + 'PASSWORD_RESET_FAIL'
    }
};

// const login = (loginName: string, password: string) => ({
//     // types: Object.values(thunk.login),
//     // promise: AuthServices.login({
//     //     loginName,
//     //     password
//     // })
// });
const login = (data: any) => {
    try {
        return {
            // type: thunk.login.LOGIN_SUCCESS,
            // payload: AuthServices.login(data)
            types: Object.values(thunk.login),
            params: data,
            promise: AuthServices.login(data)
        };
    } catch (e) {
        debugger
        return {
            type: thunk.login.LOGIN_FAIL,
            payload: AuthServices.login(data)
        };
    }

};

const codeLogin = () => ({
    // types: Object.values(thunk.codeLogin),
    // promise: AuthServices.doPhoneLogin(data)
});

const register = () => ({
    // types: Object.values(thunk.register),
    // promise: AuthServices.register(data)
});

const passwordReset = () => ({
    // types: Object.values(thunk.passwordReset),
    // promise: AuthServices.passwordReset(data)
});

const logout = () => ({
    // types: Object.values(thunk.logout),
    // promise: AuthServices.logout()
});
const action = {
    SET: THISACTION + 'SET',
    AUTH: THISACTION + 'AUTH'
};


const setAuth = (data: any) => ({
    type: action.SET,
    data
});
const authed = () => (dispatch: Dispatch) => {
    // AuthServices.login({})
    //     .then((response) => {
    //         dispatch({
    //             type: action.AUTH,
    //             data: response.data
    //         });
    //     })
    //     .catch(error => {
    //         dispatch({
    //             type: thunk.login.LOGIN_FAIL,
    //             payload: error
    //         });
    //     });
};

export default {
    thunk, // 以下为接口调用
    authed,
    login,
    codeLogin,
    register,
    passwordReset,
    logout,
    action, // 以下为修改数据
    setAuth
};
