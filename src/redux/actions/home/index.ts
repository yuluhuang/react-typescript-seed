import AuthServices from '../../../service/AuthServices'


const THISACTION = 'INDEX_';

const thunk = {
    getList: {
        GET_LIST: THISACTION + 'GET_LIST',
        GET_LIST_SUCCESS: THISACTION + 'GET_LIST_SUCCESS',
        GET_LIST_FAIL: THISACTION + 'GET_LIST_FAIL'
    },
    get: {
        GET: THISACTION + 'GET',
        GET_SUCCESS: THISACTION + 'GET_SUCCESS',
        GET_FAIL: THISACTION + 'GET_FAIL'
    },
    update: {
        UPDATE: THISACTION + 'UPDATE',
        UPDATE_SUCCESS: THISACTION + 'UPDATE_SUCCESS',
        UPDATE_FAIL: THISACTION + 'UPDATE_FAIL'
    },
    delete: {
        DELETE: THISACTION + 'DELETE',
        DELETE_SUCCESS: THISACTION + 'DELETE_SUCCESS',
        DELETE_FAIL: THISACTION + 'DELETE_FAIL'
    }
};

const login = (data: any) => {
    console.log(data);
    return {
        types: Object.values(thunk.getList),
        params: data,
        promise: AuthServices.login(data)
    };
};


const action = {
    SET: THISACTION + 'SET',
    CLEAR: THISACTION + 'CLEAR',
    CLEAR_LIST: THISACTION + 'CLEAR_LIST',
};

const clear = () => ({
    type: action.CLEAR
});
const setIndex = (data: any) => ({
    type: action.SET,
    data
});

export default {
    thunk, // 以下为接口调用
    login,
    action, // 以下为修改数据
    clear,
    setIndex
};
