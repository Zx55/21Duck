import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { Modal, Input, Icon, message, Upload, Button } from 'antd';

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
    uploadVisible: boolean
    setVisible: (visible: boolean) => void;
    setUploadVisible: (visible: boolean) => void;
    postId?: number;
    repostId?: number;
    categoryId?: number;
};

export default withRouter((props: PostCreaterProps) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');
    const [postId, setPostId] = useState('');
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
        } else if (content.length > 4000) {
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
                    console.log('response:',response);
                    if (response.status === 201) {
                        console.log(response);
                        setLoading(false);
                        setPostId(response.data.posting_id);
                        props.setVisible(false);
                        showSuccess('主题帖发布成功');
                        props.setUploadVisible(true);
                        //props.history.push(props.match.url + '/' + response.data.posting_id);
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

    const onUploadCancelClick = () => {
        props.setUploadVisible(false);
        setContent('');
    };

    const onUploadOkClick = () => {
        props.setUploadVisible(false);
        props.history.push(props.match.url + '/' + postId);
    }

    const [fileType, setFileType] = useState('');

    const beforeUpload = (file: { name: string; type: string; size: number; }) => {
        const index = file.name.lastIndexOf('.');
        setFileType(file.name.slice(index+1));
        console.log('ft:',fileType);
        return true;
    }

    const uploadProps = {
        name: 'avatar',
        action: '//114.115.204.217:8000/api/resource',
        data:{
            posting_id: postId,
            title:'test',
            file_type: fileType
        },
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info: any) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
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
                        <div>
                        <div className='title'>
                            <div className='title-word'>标题</div>
                            <Input
                                prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入标题"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        </div>
                    )}
                </div>
                <div className='editor'>
                    <Editor content={content} setContent={setContent} />
                </div>
            </Modal>
            <Modal
                title={props.header}
                width="90%"
                centered
                visible={props.uploadVisible}
                onOk={onUploadOkClick}
                onCancel={onUploadCancelClick}
                okText="发布"
                cancelText="取消"
                confirmLoading={loading}
            >
                {props.categoryId===5 && (<div className='upload'>
                    <div className='upload-word'>上传资源</div>
                    <Input
                        style={{marginBottom:5}}
                        prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入资源名称"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                    />
                    <Upload 
                    {...uploadProps}
                    beforeUpload={beforeUpload}
                    >
                        <Button>
                        <Icon type="upload" /> Click to Upload
                        </Button>
                    </Upload>
                </div>)}
            </Modal>
        </div>
    );
});
