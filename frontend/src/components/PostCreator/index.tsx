import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Modal, Button, Form, Input, Icon, message } from 'antd';

import { useUser } from '../../hooks';

import './PostCreator.css';

const { TextArea } = Input;


export default () => {
    const [creatorVisible, setCreatorVisible] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const user = useUser();

    const warning = () => {
        message.config({ top: 75 });
        message.warning("游客请先登录或注册");
    };


    const handleClick = () => {
        if (user.identity === 0) {
            warning();
            setRedirect(true);
        } else {
            setCreatorVisible(true);
        }
    }

    return (
        <div>
            <Button
                className='post-button'
                type='primary'
                icon='plus'
                shape='round'
                size='large'
                onClick={() => handleClick()}
            >
                发布新帖
            </Button>
            <Modal
                title="发布新帖"
                centered
                visible={creatorVisible}
                onOk={() => setCreatorVisible(false)}
                onCancel={() => setCreatorVisible(false)}
            >
                <Form className='box'>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入标题"
                        />
                    </Form.Item>
                    <Form.Item>
                        <TextArea rows={4} placeholder="请输入正文" />
                    </Form.Item>
                </Form>
            </Modal>
            {redirect ? <Redirect to='/login' /> : null}
        </div>
    );
};
