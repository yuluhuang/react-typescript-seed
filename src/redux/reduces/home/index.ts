import {
    combineReducers
} from 'redux';
import indexAction from '../../actions/home';

const thunkTypes = indexAction.thunk;
const actionTypes = indexAction.action;

export interface Page {
    pageSize: number,
    currentPage: number
}

export interface IndexState {
    index: Page
}
const initData = {
    search: '',
    publishTimeSort: 'DESC',
    jobQuantitySort: 'DESC',
    disabled: false,
    disabled2: false,
    pickerValue: '',
    startDate: '',
    // endDate: '',
    province: '',
    city: '',
    county: '',
};

const index = (state = initData, action: any = {}) => {
    switch (action.type) {
        case actionTypes.CLEAR:
            return initData;
        case actionTypes.SET:
            return {...state, ...action.data};
        default:
            return state;
    }
};

const initialState = {
    list: [],
    count: 0,
    loading: false,
    hasMore: true,
    searchData: {
        currentPage: 1,
        pageSize: 10
    },
};
const list = (state = initialState, action: any = {}) => {
    switch (action.type) {
        case actionTypes.CLEAR_LIST:
            return initialState;
        case thunkTypes.get.GET:
            return state;
        case thunkTypes.get.GET_SUCCESS:
            return {
                ...state,
                ...action.data.result,
                now: action.data.result.now.split(' ')[0],
                startDate: action.data.result.startDate.split(' ')[0],
                // endDate: action.data.result.endDate.split(' ')[0],
                cutoffDate: action.data.result.cutoffDate.split(' ')[0]
            };
        case thunkTypes.get.GET_FAIL:
            return state;
        case thunkTypes.getList.GET_LIST:
            return {
                ...state,
                searchData: {
                    ...state.searchData,
                    ...action.data,
                },
                loading: true,
            };
        case thunkTypes.getList.GET_LIST_SUCCESS:
            // 前端保存后拉取会出现重复数据
            state.list.forEach((v: any, k) => {
                action.data.result.forEach((v1: any, k1: number) => {
                    if (v.id === v1.id) {
                        action.data.result.splice(k1, 1);
                    }
                });
            });
            // return {
            //   ...state,
            //   count: action.data.count,
            //   list: state.list.concat(action.data.result),
            //   currentPage: action.data.currentPage + 1,
            //   hasMore: action.data.count !== (state.list.length + action.data.result.length)
            // };
            return {
                ...state,
                list: state.list.concat(action.data.result),
                count: action.data.count,
                searchData: {
                    ...state.searchData,
                    currentPage: action.data.currentPage + 1,
                },
                hasMore: action.data.count !== (state.list.length + action.data.result.length),
                loading: false
            };
        case thunkTypes.getList.GET_LIST_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default combineReducers({
    index,
    list
});
