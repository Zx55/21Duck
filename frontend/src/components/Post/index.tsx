import React from 'react';

import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';

import './Post.css';


export interface PostProps {
    userHead: string;
    userNickName: string;
    postTitle: string;
    postCreatedTime: string;
    content: string;
    like: number;
};

export default (props: PostProps) => (
    <div className='post'>
        <PostHeader
            userHead={props.userHead}
            userNickName={props.userNickName}
            postTitle={props.postTitle}
            postCreatedTime={props.postCreatedTime}
        />
        <PostContent content={props.content} />
        <PostFooter like={props.like} />
    </div>
);
