import React from 'react';
import ReactDOM from 'react-dom';

import {App2} from '../src/router/router';
import Hello from 'app/containers/Hello/Hello';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import {App} from './app';
import {createBrowserHistory} from 'history';
import {configureStore} from 'app/store';


import './index.css';


// prepare store
const history = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App2></App2>
        <Hello></Hello>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
