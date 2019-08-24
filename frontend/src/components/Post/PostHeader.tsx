import React from 'react';


export interface PostHeaderProps {
    postTitle: string;
    userHead: string;
    userNickName: string;
    postCreatedTime: string;
};

export default (props: PostHeaderProps) => (
    <div className='post-header'>
        <div className='post-title'>{props.postTitle}</div>
        <img
            className='user-head'
            src={props.userHead}
            alt=''
        />
        <span className='user-nickname'>{props.userNickName}</span>
        <span className='post-created-time'>
            {props.postCreatedTime}
        </span>
    </div>
)
