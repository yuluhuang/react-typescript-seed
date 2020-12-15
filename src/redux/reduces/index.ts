import {combineReducers} from "redux";

import index from './home/index';
import auth from './auth/index';
import demo1 from './demo1/reducer';

// 合并多个reduce
export const rootReducer = combineReducers({
    index,
    auth,
    demo1
});
