/**
 * 结合 redux-thunk 和 实际项目需求
 * @param extraArgument
 * @example
 *    同步
 *    export function logout() {
        return {
          type: LOGOUT
        };
      }
 异步
 export function login(user, pass) {
      return {
        types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
        promise: axios.post('/api/login', {user, pass}),
        params: {user, pass},
      };
    }

 * @returns {function(*=): function(*): Function}
 */
function createreduxOrderMiddleware(extraArgument:any) {
    return function (reduxAction:any) {
        return function (next:any) {
            return function (action:any) {
                const {dispatch, getState} = reduxAction;
                if (typeof action === 'function') {
                    return action(dispatch, getState, extraArgument);
                }
                const types = (action || {}).types || [];
                const promise = (action || {}).promise || null;
                const REQUEST = types[0];
                const SUCCESS = types[1];
                const FAIL = types[2];

                function orderAction(type:any, resultType:any, result:any) {
                    debugger
                    const state = {type};
                    state[resultType] = result;
                    for (const item in action) {
                        // {}.hasOwnProperty.call
                        if (Object.prototype.hasOwnProperty.call(action, item)) {
                            if (item !== 'types' && item !== 'promise' && item !== 'type') {
                                state[item] = action[item];
                            }
                        }
                    }
                    return state;
                }
                if (!promise) {
                    return next(action);
                }
                debugger
                dispatch(orderAction(REQUEST, 'data', action.params));
                return action.promise.then((res:any) => {
                    debugger
                    if (!SUCCESS) return;
                    if (res.data.success) {
                        // 未知，
                        // 如果使用 orderAction(SUCCESS, 'res', res.data),
                        // 回调中 (res) => {} 变成 res.res. 所以改成 data
                        // 列表查询count在 data层, 正常插入id返回在result层, 在action处理
                        return dispatch(orderAction(SUCCESS, 'data', {...action.params, ...res.data}));
                    }
                    if (!FAIL) return;
                    return dispatch(orderAction(FAIL, 'err', res.data));
                }, (err:any) => {
                    // debugger;
                    if (!FAIL) return;
                    return dispatch(orderAction(FAIL, 'err', err));
                });
            };
        };
    };
}

// @ts-ignore
const reduxOrder = createreduxOrderMiddleware();
// @ts-ignore
reduxOrder.withExtraArgument = createreduxOrderMiddleware;

export default reduxOrder;

