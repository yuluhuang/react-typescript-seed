import React from 'react';
import ReactDOM from 'react-dom';
import VConsole from 'vconsole';
import {App2} from '../src/router/router';
// import Hello from 'app/containers/Hello/Hello';
import {Provider} from 'react-redux';
// import {Router} from 'react-router';
// import {App} from './app';
// import {createBrowserHistory} from 'history';
import {configureStore} from '../src/redux/store';
import appConfig, { DefaultConfig } from './appConfig';
import 'antd/dist/antd.css';
// import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import './index.css';

const { enableVConsole }: DefaultConfig = appConfig;
if (enableVConsole) {
    console.log('vConsole init success');
    new VConsole();
}
// prepare store
// const history = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App2></App2>
        <div>
            {/*<Hello></Hello>*/}
            {/*<Router history={history}>*/}
            {/*    <App />*/}
            {/*</Router>*/}
        </div>

    </Provider>,
    document.getElementById('root')
);
