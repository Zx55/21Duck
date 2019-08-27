import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Modal, Button, Input, Icon, message } from 'antd';

import { useUser } from '../../hooks';

import './PostCreator.css';

import Editor from '../Editor'


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
                shape='circle'
                size='large'
                onClick={() => handleClick()}
            />
            <Modal
                title="发布新帖"
                width="80%"
                centered
                visible={creatorVisible}
                onOk={() => setCreatorVisible(false)}
                onCancel={() => setCreatorVisible(false)}
            >
                <div className='box'>
                    <div className='title'>
                        <div className='title-word'>标题</div>
                        <Input
                            prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入标题"
                        />
                    </div>
                    <div className='editor'>
                        <Editor></Editor>
                    </div>
                </div>
            </Modal>
            {redirect ? <Redirect to='/login' /> : null}
        </div>
    );
};
