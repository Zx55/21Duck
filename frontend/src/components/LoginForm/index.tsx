import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { Form, Icon, Input, Button, Checkbox } from 'antd';

import { WrappedFormUtils } from 'antd/lib/form/Form';

import './LoginForm.css';


export interface LoginFormProps {
    form: WrappedFormUtils;
}

export interface LoginValue {
    username: string;
    password: string;
    remember: boolean;
};

const LoginForm = (props: LoginFormProps) => {
    //这里可以放验证码
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        props.form.validateFields((err: any, values: LoginValue) => {
            if (!err) {
                // TODO: communicate with server
            }
        });
    }

    const { getFieldDecorator } = props.form;

    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入用户名' }],
                })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="用户名"
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

export default Form.create({ name: 'normal_login' })(LoginForm);
