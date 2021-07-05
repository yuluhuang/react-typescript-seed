import React from 'react'
import { RouteComponentProps } from 'react-router';
// import {bindActionCreators} from "redux";
// @ts-ignore
import {createForm, formShape } from 'rc-form';
// import { Form } from 'antd';
import qs from 'qs';
import {List, InputItem, Toast, Flex, Button} from 'antd-mobile';
import {useSelector, useDispatch} from 'react-redux';

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

// interface LoginState {
//     readonly username: string,
//     readonly password: string,
//     readonly errorText: string,
// }

type LoginProps = ReduxState & ReduxActions & LoginPageProps & RouteComponentProps<{}>

const Login: React.FC<LoginProps> = (props) => {
    // const [form] = Form.useForm();
    const a = new createForm()
    console.log(a())

    const {getFieldProps, getFieldError} = a();
    debugger
    const query = qs.parse(window.location.search.substring(1));
    const initLoginName = query.loginName;
    console.log(initLoginName)
    const dispatch = useDispatch();
    const auth = useSelector((store: any) => store.auth);

    const handleClick = async () => {
        // const { loginName, password } = form.getFieldsValue();
        // console.log(loginName, password);
        console.log(auth.disabled);
        debugger
        if (auth.disabled) {
            Toast.fail('登录中');
            return;
        }
        // const data = await form.validateFields();
        const res = await dispatch(authAction.login({username: 1, password: 1}));
        console.log(res);
    }
    const register = async () => {

    }

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

            <div>
                <Flex style={{textAlign: 'center'}}>
                    <Flex.Item>
                        <Button type="primary" inline size={'small'} onClick={handleClick}>登录</Button>
                    </Flex.Item>
                    <Flex.Item>
                        <Button type="ghost" inline size={'small'} onClick={register}>注册</Button>
                    </Flex.Item>
                </Flex>
            </div>
        </form>
    )
}
export default Login

