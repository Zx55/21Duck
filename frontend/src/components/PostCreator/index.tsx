import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { Modal, Button, Form, Input, Icon } from 'antd';

import './PostCreator.css';

export default () => {
    const [creatorVisible, setCreatorVisible] = useState(false);

    const { TextArea } = Input;

    return (
        <div>
            <Button className='post-button' type='primary' icon='plus' shape='round' size='large' onClick={() => setCreatorVisible(true)}>
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
        </div>
    )
}