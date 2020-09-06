import {Store, createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import {RootState, rootReducer} from 'app/reducers';
import {thunk} from 'app/middleware';

export function configureStore(initialState?: RootState): Store<RootState> {
    const middleware: any = [thunk];
    if (process.env.NODE_ENV !== 'production') {
        // 调用日志打印方法 collapsed是让action折叠
        const loggerMiddleware = createLogger({collapsed: false});
        middleware.push(loggerMiddleware)
    }

    const enhancer = compose(composeWithDevTools(applyMiddleware(...middleware)));

    const store = createStore(rootReducer as any, initialState as any, enhancer) as Store<RootState>;

    if (module.hot) {
        module.hot.accept('app/reducers', () => {
            const nextReducer = require('app/reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
