import React from 'react'
import PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router';
// import {connect} from "react-redux";
// import {bindActionCreators} from "redux";
// @ts-ignore
import {createForm, formShape} from 'rc-form';
import qs from 'qs';
import {List, InputItem, Toast, Flex, Button} from 'antd-mobile';
import {connect} from "react-redux";
import redux from "redux";

var authAction = require('../../redux/actions/auth').default
interface ReduxState {
    readonly auth: any
}

interface ReduxActions {
    readonly login: (username: string, password: string) => void
    readonly receiveError: (errorText: string) => void
    readonly clearError: () => void
}

interface LoginPageProps extends RouteComponentProps<{}> {
    form: any,
}

interface LoginState {
    readonly username: string,
    readonly password: string,
    readonly errorText: string,
}

// interface InputEvent {
//     readonly target: {
//         readonly name: string,
//         readonly value: string,
//     }
// }

type LoginProps = ReduxState & ReduxActions & LoginPageProps & RouteComponentProps<{}>
// export namespace Login {
//     export interface Props extends RouteComponentProps<void> {
//         readonly login: (username: string, password: string) => void
//     }
// }

class Login extends React.Component<LoginProps, LoginState>{
    constructor(props:  ReduxState & ReduxActions & LoginPageProps) {
        super(props)
        this.state = {
            username: "",
            password: "",
            errorText: "",
        }
    }

    static propTypes = {
        auth: PropTypes.object,
        form: formShape,
    };
    // static contextTypes = {
    //     store: PropTypes.object.isRequired,
    //     router: PropTypes.object.isRequired
    // };

    codeLogin = (e: any) => {
        // this.context.router.history.push(PathLink.codeLogin);
    }
    register = (e: any) => {
        Toast.loading('注册中...', 30);
        // this.context.router.history.push(PathLink.codeLogin);
    }
    handleClick = (e: any) => {
        e.preventDefault();
        Toast.loading('登录中...', 30);
        const {login} = this.props;
        if (this.props.auth.disabled) {
            Toast.fail('登录中');
            return;
        }
        const validateArr = ['loginName', 'password'];
        this.props.form.validateFields(validateArr, async (err: any, values: any) => {
            if (err) {
                return Toast.hide();
            }
            const _loginName = values.loginName.split(' ').join('');
            const res = await login(_loginName, values.password.trim());
            debugger
            console.log(res);
                // .then((res: any) => {
                //     if (!res.err) {
                //         Toast.info('登录成功', 2);
                //         // util.token(res.data.result.sessionID);
                //         // util.phone(_loginName);
                //         this.context.router.history.replace('/mine');
                //     }
                // });
        });
    }

    render() {
        const {getFieldProps, getFieldError} = this.props.form;
        const query = qs.parse(this.props.location.search.substring(1));
        const initLoginName = query.loginName;

        return (
            <form className="login">
                <List
                    renderHeader={() => ''}
                    renderFooter={() => {
                        console.log();
                        return (
                            <div className="error-tip">
                                {
                                    getFieldError('loginName') && getFieldError('loginName').join(',') ||
                                    getFieldError('password') && getFieldError('password').join(',')
                                }
                            </div>
                        );
                    }}>
                    <InputItem
                        {...getFieldProps('loginName', {
                            initialValue: initLoginName,
                            onChange() {
                            }, // have to write original onChange here if you need
                            rules: [{required: true, message: '请输入您的账号'}],
                        })}
                        labelNumber={2}
                        type="phone"
                        clear
                        placeholder="账号"
                    >
                        <div>
                            <i className="iconfont icon-mobilephone" style={{color: 'rgba(0,0,0,.25)'}} /></div>
                    </InputItem>
                    <InputItem
                        {...getFieldProps('password', {
                            onChange() {
                            }, // have to write original onChange here if you need
                            rules: [
                                {required: true, message: '请输入您的密码'}
                            ],
                        })}
                        clear
                        labelNumber={2}
                        type="password"
                        placeholder="密码"
                    >
                        <div>
                            <i className="iconfont icon-password" style={{color: 'rgba(0,0,0,.25)'}} /></div>
                    </InputItem>
                </List>


                {/*<div className="media" style={{padding: 15}}>*/}
                {/*<div className="media-body">*/}
                {/*<a style={{marginLeft: 20, fontSize: 16}} onClick={this.passwordReset}>忘记密码？</a></div>*/}
                {/*<div className="media-body text-right">*/}
                {/*<a style={{margin: '0px 20px 0 0', fontSize: 16}} onClick={this.register}>注册</a></div>*/}
                {/*</div>*/}

                <div>
                    <Flex style={{textAlign: 'center'}}>
                        <Flex.Item>
                            <Button type="primary" inline size={'small'} onClick={this.handleClick}>登录</Button>
                        </Flex.Item>
                        <Flex.Item>
                            <Button type="ghost" inline size={'small'} onClick={this.register}>注册</Button>
                        </Flex.Item>
                    </Flex>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state: any, ownProps: LoginPageProps): ReduxState => {
    return {auth: state.auth}

}

const mapDispatchToProps = (dispatch: redux.Dispatch) => ({
    login: (username: string, password: string) => dispatch(authAction.login({username, password})),
})
export default connect(mapStateToProps,mapDispatchToProps)(createForm()(Login))

