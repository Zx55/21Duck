import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { Form, Icon, Input, Button, Checkbox } from 'antd';

import { loginAsync } from '../../actions';

import { RouteComponentProps } from 'react-router-dom';
import { WrappedFormUtils } from 'antd/lib/form/Form';

import './LoginForm.css';


export interface LoginFormProps extends RouteComponentProps {
    form: WrappedFormUtils;
}

export interface LoginValue {
    username: string;
    password: string;
};

const LoginForm = (props: LoginFormProps) => {
    const dispatch = useDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        props.form.validateFields((err: any, values: LoginValue) => {
            if (!err) {
                dispatch(loginAsync(
                    values.username,
                    values.password,
                    props.history,
                ));
            }
        });
    }

    const { getFieldDecorator } = props.form;

    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入手机号' }],
                })(
                    <Input
                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="手机号"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                })(
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="密码"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: false,
                })(
                    <Checkbox>记住密码</Checkbox>)
                }
                <Link className="login-form-forgot" to='/forget'>
                    忘记密码
                </Link>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
                <span className='register-button'>
                    没有账号？
                    <Link to='/register'>注册</Link>
                </span>
            </Form.Item>
        </Form>
    );
}

export default Form.create({ name: 'normal_login' })(
    withRouter(LoginForm)
);
