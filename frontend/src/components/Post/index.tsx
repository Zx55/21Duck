import React from 'react';
import marked from 'marked';

import { Card, Avatar, Skeleton } from 'antd';

import PostFooter from './PostFooter';

import { IPost } from '../../types';

import './Post.css';

const { Meta } = Card;


export interface PostProps {
    post: IPost;
    loading: boolean;
    detail: boolean;
};

export default (props: PostProps) => (
    <Card className='post'>
        <Skeleton
            loading={props.loading}
            active
            avatar
        >
            <Meta
                avatar={<Avatar src={props.post.user_head} />}
                title={props.post.theme}
            />
            <span className='user-nickname'>
                {props.post.user_nickname}
            </span>
            <span className='post-created-time'>
                {props.post.relative_posting_time}
            </span>
            <div
                className='post-content'
                dangerouslySetInnerHTML={{
                    __html: marked(props.post.posting_content)
                }}
            />
            <PostFooter
                postId={props.post.posting_id}
                like={props.post.posting_thumb_num}
                detail={props.detail}
            />
        </Skeleton>
    </Card>
);
