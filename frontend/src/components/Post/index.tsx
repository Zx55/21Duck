import React from 'react';

import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';


export interface PostProps {
    userHead: string;
    userNickName: string;
    postCreatedTime: string;
    content: string;
    like: number;
};

export default (props: PostProps) => (
    <div className='post'>
        <PostHeader
            userHead={props.userHead}
            userNickName={props.userNickName}
            postCreatedTime={props.postCreatedTime}
        />
        <PostContent content={props.content} />
        <PostFooter like={props.like} />
    </div>
);
