import React from 'react';

import { Modal, Input, Icon } from 'antd';

import Editor from '../Editor'

import './PostCreator.css';

export interface PostCreaterProps {
    type: string;
    withTitle: number;
    visible: boolean;
    setVisible: (visible: boolean) => void;
};

export default (props: PostCreaterProps) => {
    return (
        <div>
            <Modal
                title={props.type}
                width="90%"
                centered
                visible={props.visible}
                onOk={() => props.setVisible(false)}
                onCancel={() => props.setVisible(false)}
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
        </div>
    );
};
