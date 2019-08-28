import React, { useState } from 'react';
import marked from 'marked';

import { Card, Skeleton, Comment, Tooltip, Icon, Avatar, Mentions } from 'antd';

import { IRepost } from '../../types';

import './Repost.css';


export interface PostProps {
    repost: IRepost;
    loading: boolean;
};

export default (props: PostProps) => {
    const [liked, setLiked] = useState(false);
    const [likeNum, setLikeNum] = useState(props.repost.reposting_thumb_num);

    const like = () => {
        if (liked) {
            setLikeNum(likeNum - 1);
        } else {
            setLikeNum(likeNum + 1);
        }
        setLiked(!liked);
        console.log('like');
    };

    const report = () => {
        console.log('report');
    };

    const replyToRepost = () => {
        console.log('reply1');
    };

    const actions = [
        <span key='repost-like' className='repost-like'>
            <Tooltip title='点赞'>
                <Icon
                    className='repost-like-button'
                    type='like'
                    theme={liked ? 'filled' : 'outlined'}
                    onClick={like}
                />
            </Tooltip>
            <span className='repost-action-text'>{likeNum}</span>
        </span>,
        <span
            key='repost-report'
            className='repost-report'
            onClick={report}
        >
            <Icon
                className='repost-report-button'
                type='exclamation-circle'
            />
            <span className='repost-action-text'>举报</span>
        </span>,
        <span key='repost-reply' onClick={replyToRepost}>
            <Icon
                className='repost-reply-button'
                type='message'
            />
            <span className='repost-action-text'>回复</span>
        </span>
    ];

    return (
        <Card className='repost'>
            <Skeleton
                loading={props.loading}
                active
                avatar
            >
                <Comment
                    actions={actions}
                    author={props.repost.user_nickname}
                    avatar={
                        <Avatar src={props.repost.user_head} alt=''/>
                    }
                    content={
                        <div>
                            {props.repost.reply_posting === null ? null :
                                <Mentions
                                    readOnly
                                    placeholder={`引用 @${props.repost.reply_posting[0]} 的回复: ${props.repost.reply_posting[1]}`}
                                />}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: marked(props.repost.reposting_content)
                                }}
                            />
                        </div>
                    }
                    datetime={
                        <Tooltip title={props.repost.formated_reposting_time}>
                            <span>{props.repost.relative_reposting_time}</span>
                        </Tooltip>
                    }
                />
            </Skeleton>
        </Card>
    );
};
