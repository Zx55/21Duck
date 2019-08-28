import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

import { loginAsync } from '../../actions';

import { RouteComponentProps } from 'react-router-dom';
import { WrappedFormUtils } from 'antd/lib/form/Form';

import './LoginForm.css';
import Vcode from '../VerifyCode'

export interface LoginFormProps extends RouteComponentProps {
    form: WrappedFormUtils;
}

export interface LoginValue {
    username: string;
    password: string;
    verifycode: string;
};

const LoginForm = (props: LoginFormProps) => {
    const dispatch = useDispatch();
    const [verifycodevalue, setverifycodeValue] = useState('');

    const compareToVerifyCode = (rule: any, value: any, callback: { (arg0: string): void; (): void; }) => {
        const form = props.form;
        const code: string = form.getFieldValue('verifycode');
        if (code.length === 4 && verifycodevalue !== code){
            callback('验证码错误!');
        } else {
            callback();
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = props.form;
        const code: string = form.getFieldValue('verifycode');
        if(code !== verifycodevalue){
            message.config({top: 75});
            message.error('验证码错误');
            return;
        }
        props.form.validateFields((err: any, values: LoginValue) => {
            if (!err) {
                dispatch(loginAsync(
                    values.username,
                    values.password,
                ));
            }
        });
    }

    const { getFieldDecorator } = props.form;

    return (
        
        
        <Form onSubmit={handleSubmit} className="login-form">
           
           <div  className="ducklogo" ><img   src="https://dpsv7g.ch.files.1drv.com/y4mKc5CDaj_ClT3q8_-pb-VeDLGL36szTIUX4X0rrtX3VdCyy-91B2kI3yVYewGR5k_Aehp8si78fLnxd-ieMVR3yzrcusYyNdFD-gOBASqIJSYB6OhWkZc_isaJAXLQFwOHNMRd6_00iUmL-QuCxg2HuQszC9wXjdoCmazs-zRO_YMrBzwVTNWD8FPxgc2PHLPaU17sn0RV6Y0-0GWzQth0w?width=660&height=248&cropmode=none" width="165" height="62" /></div>
            
           
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
            <div id="verify-form">
                <div id="verify-text">
                    <Form.Item>
                        {getFieldDecorator('verifycode', {
                            rules: [{ required: true, message: '请输入验证码' },
                            {
                                validator: compareToVerifyCode,
                            },],
                        })(
                            <Input
                                prefix={<Icon type="check-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="验证码"
                            />,
                        )}
                    </Form.Item>
                </div>
                <div id="verify-vcode">
                    <Vcode width={115} height={32} onChange={(v: any) => {
                        console.log('当前的验证码值：', v)
                        setverifycodeValue(v);
                    }}></Vcode>
                </div>
            </div>
            <div id="register-form-bottom">
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
            </div>
        </Form>
    
        
    );
}

export default Form.create({ name: 'normal_login' })(LoginForm);
