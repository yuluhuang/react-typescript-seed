import { combineReducers } from 'redux';
import { RootState } from './state';
import { todoReducer } from './todos';
import { enthusiasm } from './hello';
// @ts-ignore
export { RootState };

export const rootReducer = combineReducers({
    todos: todoReducer,
    enthusiasm
});
