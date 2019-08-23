import React from 'react';


export interface PostHeaderProps {
    userHead: string;
    userNickName: string;
    postCreatedTime: string;
};

export default (props: PostHeaderProps) => (
    <div className='post-header'>
        <div className='user-info'>
            <img
                className='user-head'
                src={props.userHead}
                alt=''
            />
            <div className='user-nickname'>{props.userNickName}</div>
        </div>
        <div className='post-created-time'>
            {props.postCreatedTime}
        </div>
    </div>
)
