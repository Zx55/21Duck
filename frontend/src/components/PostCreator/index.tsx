import React, { useState } from 'react';

import { Modal, Input, Icon } from 'antd';

import Editor from '../Editor'

import './PostCreator.css';

export interface PostCreaterProps {
    header: string;
    title: boolean;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    repostId?: number;
};

export default (props: PostCreaterProps) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const onOkClick = () => {
        props.setVisible(false);
    };

    const onCancelClick = () => {
        props.setVisible(false);
        setContent('');
    };

    return (
        <div>
            <Modal
                title={props.header}
                width="90%"
                centered
                visible={props.visible}
                onOk={onOkClick}
                onCancel={onCancelClick}
                okText="发布"
                cancelText="取消"
            >
                <div className='box'>
                    {props.title && (
                        <div className='title'>
                            <div className='title-word'>标题</div>
                            <Input
                                prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入标题"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    )}
                </div>
                <div className='editor'>
                    <Editor content={content} setContent={setContent} />
                </div>
            </Modal>
        </div>
    );
};
