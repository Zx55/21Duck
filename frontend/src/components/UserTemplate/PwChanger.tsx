import React, { useState, FormEvent, FocusEvent } from 'react';
import Vcode from '../VerifyCode';

import { Form, Input, Icon, Button, message, Card } from 'antd';

import api from '../../api';
import { useUser } from '../../hooks';
import Loading from '../Loading';

import { RouteComponentProps } from 'react-router-dom';
import { WrappedFormUtils } from 'antd/lib/form/Form';


export interface PwChangerProps extends RouteComponentProps {
    form: WrappedFormUtils;
};

export interface PwChangerValue {
    oldPassword: string;
    password: string;
    confirm: string;
}

const PwChanger = (props: PwChangerProps) => {
    const [confirmDirty, setConfirmDirty] = useState(false);
    const [verifycodevalue, setverifycodeValue] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useUser();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = props.form;
        const code: string = form.getFieldValue('verifycode');
        if (code !== verifycodevalue) {
            message.config({ top: 75 });
            message.error('验证码错误');
            return;
        }

        props.form.validateFieldsAndScroll((err: any, values: PwChangerValue) => {
            if (!err) {
                const param = {
                    username: user.userId,
                    old_password: values.oldPassword,
                    new_password: values.password,
                };

                setLoading(true);
                api.password(param).then((response) => {
                    setLoading(false);
                    message.config({ top: 75 });
                    if (response.data.success) {
                        message.success('更改密码成功');
                    } else {
                        message.success('更改密码错误');
                    }
                });
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

    const renderForm = () => (
        <Form onSubmit={handleSubmit} className='user-data-form'>
            <Form.Item
                label="旧密码"
                hasFeedback
            >
                {getFieldDecorator('oldPassword', {
                    rules: [{
                        required: true,
                        message: '请输入旧密码!',
                    }, {
                        validator: validateToNextPassword,
                    },
                    ],
                })(
                    <Input.Password
                        prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type='password'
                        placeholder='旧密码'
                    />
                )}
            </Form.Item>
            <Form.Item
                label="新密码"
                hasFeedback
            >
                {getFieldDecorator('password', {
                    rules: [{
                        required: true,
                        message: '请输入新密码!',
                    }, {
                        validator: validateToNextPassword,
                    },
                    ],
                })(
                    <Input.Password
                        prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type='password'
                        placeholder='新密码'
                    />
                )}
            </Form.Item>
            <Form.Item
                label="确认新密码"
                hasFeedback
            >
                {getFieldDecorator('confirm', {
                    rules: [{
                        required: true,
                        message: '请确认新密码!',
                    }, {
                        validator: compareToFirstPassword,
                    }],
                })(
                    <Input.Password
                        onBlur={handleConfirmBlur}
                        prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type='password'
                        placeholder='确认新密码'
                    />
                )}
            </Form.Item>
            <div id="change-password-verify-form">
                <div id="change-password-verify-text">
                    <Form.Item label="验证码">
                        {getFieldDecorator('verifycode', {
                            rules: [{ required: false, message: '请输入验证码' },
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
                <div id="change-password-verify-vcode">
                    <Vcode width={115} height={32} onChange={(v: any) => {
                        setverifycodeValue(v);
                    }}></Vcode>
                </div>
            </div>
            <Form.Item className="change-password-button-wrapper">
                <Button className="change-password-button" type="primary" htmlType="submit">
                    修改
                </Button>
            </Form.Item>
        </Form>
    );

    return (
        <Card>
            {loading ? <Loading /> : renderForm()}
        </Card>
    )
}

export default Form.create({ name: 'change-password' })(PwChanger);
