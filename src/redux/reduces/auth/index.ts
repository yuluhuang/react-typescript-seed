// import {Map} from 'immutable';
// import {AuthServices} from '../../../assets/service/RestServices';
//
// const AUTH = 'auth/AUTH';
// const SET = 'auth/SET';
// const LOGIN = 'auth/LOGIN';
// const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
// const LOGIN_FAIL = 'auth/LOGIN_FAIL';
//
// const CODE_LOGIN = 'auth/CODE_LOGIN';
// const CODE_LOGIN_SUCCESS = 'auth/CODE_LOGIN_SUCCESS';
// const CODE_LOGIN_FAIL = 'auth/CODE_LOGIN_FAIL';
//
// const REGISTER = 'auth/REGISTER';
// const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
// const REGISTER_FAIL = 'auth/REGISTER_FAIL';
//
// const LOGOUT = 'auth/LOGOUT';
// const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
//
// const PASSWORD_RESET = 'auth/PASSWORD_RESET';
// const PASSWORD_RESET_SUCCESS = 'auth/PASSWORD_RESET_SUCCESS';
// const PASSWORD_RESET_FAIL = 'auth/PASSWORD_RESET_FAIL';
import authAction from '../../actions/auth';

const thunkTypes = authAction.thunk;
const actionTypes = authAction.action;

const initialState = {
    disabled: false,
    current: '获取验证码',
    sending: false
};

export default (state = initialState, action:any = {}) => {
    switch (action.type) {
        case actionTypes.SET:
            return {
                ...state,
                ...action.data
            };
        case actionTypes.AUTH:
            debugger;
            return {
                ...state,
                auth: action.data
            };
        case thunkTypes.login.LOGIN:
            debugger
            return {
                ...state,
                loading: true
            };
        case thunkTypes.login.LOGIN_SUCCESS:
            debugger
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case thunkTypes.login.LOGIN_FAIL:
            debugger
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case thunkTypes.codeLogin.CODE_LOGIN:
            return {
                ...state,
            };
        case thunkTypes.codeLogin.CODE_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.data.result
            };
        case thunkTypes.codeLogin.CODE_LOGIN_FAIL:
            return {
                ...state,
                loginError: action.error
            };
        case thunkTypes.register.REGISTER:
            return {
                ...state,
                disabled: true
            };
        case thunkTypes.register.REGISTER_SUCCESS:
            return {
                ...state,
                disabled: false
            };
        case thunkTypes.register.REGISTER_FAIL:
            return {
                ...state,
                disabled: false
            };
        case thunkTypes.passwordReset.PASSWORD_RESET:
            return {
                ...state,
                disabled: true
            };
        case thunkTypes.passwordReset.PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                disabled: false
            };
        case thunkTypes.passwordReset.PASSWORD_RESET_FAIL:
            return {
                ...state,
                disabled: false
            };
        case thunkTypes.logout.LOGOUT:
            return {
                ...state,
                loggingOut: false,
                user: null
            };
        case thunkTypes.logout.LOGOUT_SUCCESS:
            return {
                ...state,
                loggingOut: false,
                user: null
            };
        default:
            return state;
    }
};
//
// export function setAuth(data) {
//   return {
//     type: SET,
//     data
//   };
// }
//
// export function authed() {
//   return function (dispatch, getState) {
//     AuthServices.login({})
//       .then((response) => {
//         dispatch({
//           type: AUTH,
//           data: response.data
//         });
//       })
//       .catch(error => {
//         dispatch({
//           type: LOGIN_FAIL,
//           payload: error
//         });
//       });
//   };
// }
//
// export function login(loginName, password) {
//   return {
//     types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
//     promise: AuthServices.login({
//       loginName,
//       password
//     })
//   };
// }
//
// export function codeLogin(loginName, captcha) {
//   return {
//     types: [CODE_LOGIN, CODE_LOGIN_SUCCESS, CODE_LOGIN_FAIL],
//     promise: AuthServices.doPhoneLogin({
//       loginName,
//       captcha
//     })
//   };
// }
//
// export function register(data) {
//   return {
//     types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
//     promise: AuthServices.register(data)
//   };
// }
//
// export function passwordReset(data) {
//   return {
//     types: [PASSWORD_RESET, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAIL],
//     promise: AuthServices.passwordReset(data)
//   };
// }
//
// export function logout() {
//   return {
//     types: [LOGOUT, LOGOUT_SUCCESS],
//     promise: AuthServices.logout()
//   };
// }

