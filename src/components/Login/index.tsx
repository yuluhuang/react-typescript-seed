import React from 'react'
import PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router';
// import {bindActionCreators} from "redux";
// @ts-ignore
// import {createForm, formShape} from 'rc-form';
// import qs from 'qs';
// import {List, InputItem, Toast, Flex, Button} from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
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
        // form: formShape,
    };
    // static contextTypes = {
    //     store: PropTypes.object.isRequired,
    //     router: PropTypes.object.isRequired
    // };

    codeLogin = (e: any) => {
        // this.context.router.history.push(PathLink.codeLogin);
    }
    register = (e: any) => {
        // Toast.loading('注册中...', 30);
        // this.context.router.history.push(PathLink.codeLogin);
    }
    handleClick = (e: any) => {
        e.preventDefault();
        // Toast.loading('登录中...', 30);
        // const {login} = this.props;
        // if (this.props.auth.disabled) {
        //     Toast.fail('登录中');
        //     return;
        // }
        // const validateArr = ['loginName', 'password'];
        // this.props.form.validateFields(validateArr, async (err: any, values: any) => {
        //     if (err) {
        //         return Toast.hide();
        //     }
        //     const _loginName = values.loginName.split(' ').join('');
        //     const res = await login(_loginName, values.password.trim());
        //     console.log(res);
        //     Toast.hide();
        //     // if (!res.err) {
        //     //     Toast.info('登录成功', 2);
        //     //     // util.token(res.data.result.sessionID);
        //     //     // util.phone(_loginName);
        //     //     this.context.router.history.replace('/mine');
        //     // }
        //     this.props.history.replace('/index');
        // });
    }
    onFinish = (values: any) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        // const {getFieldProps, getFieldError} = this.props.form;
        // const query = qs.parse(this.props.location.search.substring(1));
        // const initLoginName = query.loginName;

        return (
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

const mapStateToProps = (state: any, ownProps: LoginPageProps): ReduxState => {
    return {auth: state.auth}

}

const mapDispatchToProps = (dispatch: redux.Dispatch) => ({
    login: (username: string, password: string) => dispatch(authAction.login({username, password})),
})
export default connect(mapStateToProps,mapDispatchToProps)(Login)

