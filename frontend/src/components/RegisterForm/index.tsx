import React, { useState, FormEvent, FocusEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { Form, Input, Icon, Button } from 'antd';

import { registerAsync } from '../../actions';

import { RouteComponentProps } from 'react-router-dom';
import { WrappedFormUtils } from 'antd/lib/form/Form';

import './RegisterForm.css';

export interface RegisterFormProps extends RouteComponentProps {
    form: WrappedFormUtils;
};

export interface RegisterValue {
    username: string;
    nickname: string;
    password: string;
    confirm: string;
}

const RegisterForm = (props: RegisterFormProps) => {
    const [confirmDirty, setConfirmDirty] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err: any, values: RegisterValue) => {
            if (!err) {
                dispatch(registerAsync(
                    values.username,
                    values.nickname,
                    values.password,
                    props.history,
                ));
            }
        });
    };

    const { getFieldDecorator } = props.form;

    const validateToNextPassword = (rule: any, value: any, callback: () => void) => {
        const form = props.form;
        if (value && confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    const compareToFirstPassword = (rule: any, value: any, callback: { (arg0: string): void; (): void; }) => {
        const form = props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致!');
        } else {
            callback();
        }
    };

    const handleConfirmBlur = (e: FocusEvent<HTMLInputElement>) => {
        const value = e.target;
        setConfirmDirty(confirmDirty || !!value);
    };

    return (
        <Form onSubmit={handleSubmit} className='register-form'>
            <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入手机号!', whitespace: true }],
                })(
                    <Input
                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="手机号"
                    />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('nickname', {
                    rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
                })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="昵称"
                    />
                )}
            </Form.Item>
            <Form.Item hasFeedback>
                {getFieldDecorator('password', {
                    rules: [{
                            required: true,
                            message: '请输入密码!',
                        }, {
                            validator: validateToNextPassword,
                        },
                    ],
                })(
                    <Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="密码"
                    />
                )}
            </Form.Item>
            <Form.Item hasFeedback>
                {getFieldDecorator('confirm', {
                    rules: [{
                            required: true,
                            message: '请确认密码!',
                        }, {
                            validator: compareToFirstPassword,
                        },
                    ],
                })(
                    <Input.Password
                        onBlur={handleConfirmBlur}
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="确认密码"
                    />
                )}
            </Form.Item>
            <Form.Item>
                <Button className="register-button" type="primary" htmlType="submit">
                    注册
                </Button>
                <span className='register-button'>
                    已有账号？
                    <Link to='/login'>登录</Link>
                </span>
            </Form.Item>
        </Form>
    )
}

export default Form.create({ name: 'register' })(
    withRouter(RegisterForm)
);
