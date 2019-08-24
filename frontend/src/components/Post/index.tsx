import React from 'react';

import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';

import { PostItem } from '../../types';

import './Post.css';


export interface PostProps {
    post: PostItem;
};

export default (props: PostProps) => (
    <div className='post'>
        <PostHeader
            userHead={props.post.user_head}
            userNickName={props.post.user_nickname}
            postTitle={props.post.theme}
            postCreatedTime={props.post.related_posting_time}
        />
        <PostContent content={props.post.posting_content} />
        <PostFooter like={props.post.posting_thumb_num} />
    </div>
);
