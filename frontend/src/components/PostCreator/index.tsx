import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { Modal, Input, Icon, message } from 'antd';

import Editor from '../Editor';
import api from '../../api';
import { useUser } from '../../hooks';

import { RouteComponentProps } from 'react-router-dom';
import { IRequestPost, IRequestRepost } from '../../types';

import './PostCreator.css';

export interface PostCreaterProps extends RouteComponentProps {
    header: string;
    title: boolean;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    postId?: number;
    repostId?: number;
    categoryId?: number;
};

export default withRouter((props: PostCreaterProps) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useUser();

    const showErr = (msg: string) => {
        message.config({ top: 75 });
        message.error(msg);
    };

    const showSuccess = (msg: string) => {
        message.config({ top: 75 });
        message.success(msg);
    }

    const onOkClick = () => {
        if (props.title && title === '') {
            showErr('标题不能为空');
        } else if (content === '') {
            showErr('内容不能为空');
        } else if (content.length > 1000) {
            showErr('发布内容太长');
        } else {
            setLoading(true);

            if (props.categoryId) {
                const data: IRequestPost = {
                    posting_user: user.userId,
                    theme: title,
                    posting_content: content,
                    category_id: props.categoryId,
                };

                api.post.create(data).then((response) => {
                    if (response.status === 201) {
                        console.log(response);
                        setLoading(false);
                        props.setVisible(false);
                        showSuccess('主题帖发布成功');
                        props.history.push(props.match.url + '/' + response.data.posting_id);
                    }
                }).catch((err) => {
                    setLoading(false);
                    props.setVisible(false);
                    showErr('发帖失败');
                    console.log(err);
                })
            } else if (props.postId) {
                const data: IRequestRepost = props.repostId ? {
                    reposting_user: user.userId,
                    main_posting: props.postId,
                    reposting_content: content,
                    reply_id: props.repostId,
                } : {
                    reposting_user: user.userId,
                    main_posting: props.postId,
                    reposting_content: content,
                };

                api.repost.create(data).then((response) => {
                    if (response.status === 201) {
                        console.log(response);
                        setLoading(false);
                        props.setVisible(false);
                        showSuccess('回复成功');
                        props.history.push('/loading');
                        props.history.replace(props.match.url);
                    }
                }).catch((err) => {
                    setLoading(false);
                    props.setVisible(false);
                    showErr('回复失败');
                })
            } else {
                setLoading(false);
                props.setVisible(false);
                showErr('系统错误');
            }
        }
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
                confirmLoading={loading}
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
});
