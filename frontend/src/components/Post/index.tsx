import React from 'react';
import Markdown from 'react-markdown';

import { Card, Avatar, Skeleton } from 'antd';

import PostFooter from './PostFooter';

import { PostItem } from '../../types';

import './Post.css';

const { Meta } = Card;


export interface PostProps {
    post: PostItem;
    loading: boolean;
};

export default (props: PostProps) => {
    const avatar = props.post.user_head === '' ?
        <Avatar src={props.post.user_head} /> : <Avatar icon='user' />;

    return (
        <Card className='post'>
            <Skeleton
                loading={props.loading}
                active
                avatar
            >
                <Meta
                    avatar={avatar}
                    title={props.post.theme}
                />
                <span className='user-nickname'>
                    {props.post.user_nickname}
                </span>
                <span className='post-created-time'>
                    {props.post.relative_posting_time}
                </span>
                <Markdown className='post-content' source={props.post.posting_content} />
                <PostFooter like={props.post.posting_thumb_num} />
            </Skeleton>
        </Card>
    );
};
