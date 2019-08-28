import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Modal, Button, Input, Icon, message } from 'antd';

import { useUser } from '../../hooks';
import Editor from '../Editor'

import './PostCreator.css';

export interface PostCreaterProps {
    type: string,
    withTitle: number
};


export default (props: PostCreaterProps) => {
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
                title={props.type}
                width="90%"
                centered
                visible={creatorVisible}
                onOk={() => setCreatorVisible(false)}
                onCancel={() => setCreatorVisible(false)}
            >
                <div className='box'>
                    {props.withTitle === 1 ? (
                        <div className='title'>
                            <div className='title-word'>标题</div>
                            <Input
                                prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入标题"
                            />
                        </div>
                    ) : null }
                    </div>
                    <div className='editor'>
                        <Editor />
                    </div>
            </Modal>
            {redirect ? <Redirect to='/login' /> : null}
        </div>
    );
};
