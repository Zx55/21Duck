import React, { useState, FormEvent, FocusEvent } from 'react';
import { useDispatch } from 'react-redux';
import Vcode from '../VerifyCode';

import { Form, Input, Icon, Button, message, Card, } from 'antd';

import { RouteComponentProps } from 'react-router-dom';
import { WrappedFormUtils } from 'antd/lib/form/Form';

import { updateProfileAsync } from '../../actions';
import AvatarUploader from './AvatarUploader';
import { useUser } from '../../hooks';


const { TextArea } = Input;
export interface UserProfileProps extends RouteComponentProps {
    form: WrappedFormUtils;
};

export interface UserProfileValue {
    nickname: string;
    age: string;
    school: string;
    profile: string;
};

const UserProfile = (props: UserProfileProps) => {
    const [confirmDirty, setConfirmDirty] = useState(false);
    const [verifycodevalue, setverifycodeValue] = useState('');
    const dispatch = useDispatch();
    const user = useUser();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        const form = props.form;
        const code: string = form.getFieldValue('verifycode');
        if (code !== verifycodevalue) {
            message.config({ top: 75 });
            message.error('验证码错误');
            return;
        }

        console.log('click');
        props.form.validateFieldsAndScroll((err: any, values: UserProfileValue) => {
            console.log('try dispatch');
            if (!err) {
                console.log('dispatch');
                dispatch(updateProfileAsync(
                    user.userId,
                    values.nickname,
                    values.age,
                    values.school,
                    values.profile,
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
            <Form onSubmit={handleSubmit} className='user-data-form'>
                <Form.Item className="user-avatar-wrapper">
                    <AvatarUploader />
                </Form.Item>
                <Form.Item label="昵称">
                    {getFieldDecorator('nickname', {
                        rules: [{ required: false, message: '请输入昵称!', whitespace: true }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="昵称"
                        />
                    )}
                </Form.Item>
                <Form.Item label="年龄">
                    {getFieldDecorator('age', {
                        rules: [{ required: false, message: '请输入年龄!', whitespace: true }],
                    })(
                        <Input
                            prefix={<Icon type="clock-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="年龄"
                        />
                    )}
                </Form.Item>
                <Form.Item label="学校">
                    {getFieldDecorator('school', {
                        rules: [{ required: false, message: '请输入学校!', whitespace: true }],
                    })(
                        <Input
                            prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="学校"
                        />
                    )}
                </Form.Item>
                <Form.Item label="个人简介">
                    {getFieldDecorator('profile', {
                        rules: [{ required: false, message: '请输入个人简介!', whitespace: true }],
                    })(
                        <TextArea placeholder="在此处输入个人简介" />
                    )}
                </Form.Item>
                <div id="user-data-verify-form">
                    <div id="user-data-verify-text">
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
                    <div id="user-data-verify-vcode">
                        <Vcode width={115} height={32} onChange={(v: any) => {
                            console.log('当前的验证码值：', v)
                            setverifycodeValue(v);
                        }}></Vcode>
                    </div>
                </div>
                <Form.Item className="user-data-button-wrapper">
                    <Button className="user-data-button" type="primary" htmlType="submit">
                        修改
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Form.create({ name: 'user-data' })(UserProfile);

