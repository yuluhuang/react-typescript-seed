import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
// import { RouteComponentProps } from "react-router"
import {hot} from 'react-hot-loader';
// import ScrollToTop from '../components/common/RouteHandler';
// import PathLink from '../assets/PathLink';
// import MineTabBar from '../components/common/MineTabBar';
import util from '../utils/utils';
import RouterConfig from './config';

interface RouteProps {
    readonly component: any,
    readonly children?: any,
    readonly path: string,
    readonly unAuth: any,
    readonly exact: any,
    readonly title: any
}

const Router = ({component: Component, children, ...rest} : RouteProps) => (
    <Route
        {...rest}
        render={props => {
            // rest.title && util.changeTitle(rest.title);
            if (rest.unAuth || util.token()) {
                return (
                    <div>
                        <Component {...props} ><Switch>{children}</Switch></Component>
                    </div>
                );
            }
            return (<Redirect to={{
                pathname: 'login',
                state: {from: props.location}
            }} />);
        }}
    />
);

const Root = () => (
    <BrowserRouter basename="/">
        <div className="router-content">
            <Switch>
                {
                    RouterConfig.map((v, k) => <Router key={k} exact={v.exact} children={v.children} path={v.path} component={v.component} unAuth={v.unAuth} title={v.title} />)
                }
                {/*<Redirect to={PathLink.index} />*/}
            </Switch>
        </div>
    </BrowserRouter>
);

export const App2 = hot(module)(Root);


