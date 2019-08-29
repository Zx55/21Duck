import React, { useState, FormEvent, FocusEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Form, Input, Icon, Button, message, Card, Col, Avatar } from 'antd';

import { registerAsync } from '../../actions';

import { RouteComponentProps } from 'react-router-dom';
import { WrappedFormUtils } from 'antd/lib/form/Form';

import Vcode from '../VerifyCode'

import './UserDataForm.css';

export interface UserDataFormProps extends RouteComponentProps {
    form: WrappedFormUtils;
};

export interface UserDataValue {
    username: string;
    nickname: string;
    password: string;
    confirm: string;
}

const UserDataForm = (props: UserDataFormProps) => {
    const [confirmDirty, setConfirmDirty] = useState(false);
    const dispatch = useDispatch();
    const [verifycodevalue, setverifycodeValue] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = props.form;
        const code: string = form.getFieldValue('verifycode');
        if (code !== verifycodevalue) {
            message.config({ top: 75 });
            message.error('验证码错误');
            return;
        }
        e.preventDefault();
        props.form.validateFieldsAndScroll((err: any, values: UserDataValue) => {
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
        if (code.length === 4 && verifycodevalue !== code) {
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
        <Card>
            <Col span={18}>
                <Form onSubmit={handleSubmit} className='user-data-form'>
                    <Form.Item label="手机号">
                        <div>
                            {getFieldDecorator('username', {
                                rules: [{
                                    required: true, message: '请输入正确手机号!', whitespace: true,
                                    pattern: new RegExp("^(1[3-9])\\d{9}$")
                                }],
                            })(
                                <Input
                                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="手机号"
                                />
                            )}
                        </div>
                    </Form.Item>
                    <Form.Item label="昵称">
                        {getFieldDecorator('nickname', {
                            rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="昵称"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="密码" hasFeedback>
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
                    <Form.Item label="确认密码" hasFeedback>
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
                    <div id="user-data-verify-form">
                        <div id="user-data-verify-text">
                            <Form.Item label="验证码">
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
                        <div id="user-data-verify-vcode">
                            <Vcode width={115} height={32} onChange={(v: any) => {
                                console.log('当前的验证码值：', v)
                                setverifycodeValue(v);
                            }}></Vcode>
                        </div>
                    </div>
                    <Form.Item>
                        <Button className="user-data-button" type="primary" htmlType="submit">
                            修改
                </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={6}>
                <div>
                <Avatar 
                    src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                    size={150}
                    style={{
                        margin: "20px"
                    }} />
                <Button
                    style={{
                        width: "80%",
                        margin: "20px"
                    }}>
                    修改头像
                </Button>
                </div>
            </Col>
        </Card>
    )
}

export default Form.create({ name: 'user-data' })(UserDataForm);
