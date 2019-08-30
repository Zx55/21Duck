import React, { useState, FormEvent, FocusEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Form, Input, Icon, Button, message } from 'antd';

import { registerAsync } from '../../actions';

import { RouteComponentProps } from 'react-router-dom';
import { WrappedFormUtils } from 'antd/lib/form/Form';

import Vcode from '../VerifyCode'

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
    const [verifycodevalue, setverifycodeValue] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = props.form;
        const code: string = form.getFieldValue('verifycode');
        if(code !== verifycodevalue){
            message.config({top: 75});
            message.error('验证码错误');
            return;
        }
        e.preventDefault();
        props.form.validateFieldsAndScroll((err: any, values: RegisterValue) => {
            if (!err) {
                dispatch(registerAsync(
                    values.username,
                    values.nickname,
                    values.password,
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


    const compareToVerifyCode = (rule: any, value: any, callback: { (arg0: string): void; (): void; }) => {
        const form = props.form;
        const code: string = form.getFieldValue('verifycode');
        if (code.length === 4 && verifycodevalue !== code){
            callback('验证码错误!');
        } else {
            callback();
        }
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
            <div  className='ducklogo' >
                <img
                    src='https://dpsv7g.ch.files.1drv.com/y4mKc5CDaj_ClT3q8_-pb-VeDLGL36szTIUX4X0rrtX3VdCyy-91B2kI3yVYewGR5k_Aehp8si78fLnxd-ieMVR3yzrcusYyNdFD-gOBASqIJSYB6OhWkZc_isaJAXLQFwOHNMRd6_00iUmL-QuCxg2HuQszC9wXjdoCmazs-zRO_YMrBzwVTNWD8FPxgc2PHLPaU17sn0RV6Y0-0GWzQth0w?width=660&height=248&cropmode=none'
                    width='165'
                    height='62'
                    alt=''
                />
            </div>
            <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{
                        required: true, message: '请输入正确手机号!', whitespace: true,
                        pattern: new RegExp('^(1[3-9])\\d{9}$')
                    }],
                })(
                    <Input
                        prefix={<Icon type='phone' style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder='手机号'
                    />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('nickname', {
                    rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
                })(
                    <Input
                        prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder='昵称'
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
                        prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type='password'
                        placeholder='密码'
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
                        prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type='password'
                        placeholder='确认密码'
                    />
                )}
            </Form.Item>
            <div id='verify-form'>
                <div id='verify-text'>
                    <Form.Item>
                        {getFieldDecorator('verifycode', {
                            rules: [{ required: true, message: '请输入验证码' },
                            {
                                validator: compareToVerifyCode,
                            },],
                        })(
                            <Input
                                prefix={<Icon type='check-circle' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder='验证码'
                            />,
                        )}
                    </Form.Item>
                </div>
                <div id='verify-vcode'>
                    <Vcode
                        width={115}
                        height={32}
                        onChange={(v: any) => setverifycodeValue(v)}
                    />
                </div>
            </div>
            <Form.Item>
                <Button className='register-button' type='primary' htmlType='submit'>
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

export default Form.create({ name: 'register' })(RegisterForm);
