import {Store, createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import {rootReducer} from '../../redux/reduces/index';
// import {thunk} from 'app/middleware';
import reduxOrder from '../../utils/reduxOrder'

export function configureStore(initialState?: any): Store<any> {
    const middleware: any = [reduxOrder];
    if (process.env.NODE_ENV !== 'production') {
        // 调用日志打印方法 collapsed是让action折叠
        const loggerMiddleware = createLogger({collapsed: false});
        middleware.push(loggerMiddleware)
    }

    const enhancer = compose(composeWithDevTools(applyMiddleware(...middleware)));

    const store = createStore(rootReducer as any, initialState as any, enhancer) as Store<any>;
    // const store: Store<ArticleState, ArticleAction> & {
    //     dispatch: DispatchType
    // } = createStore(rootReducer, initialState, enhancer)

    if (module.hot) {
        module.hot.accept('../reduces', () => {
            const nextReducer = require('../reduces');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
