import React, { useState, useEffect } from 'react';
import marked from 'marked';

import { Card, Skeleton, Comment, Tooltip, Icon, Avatar, Mentions } from 'antd';

import { getRelativeTime } from '../../utils';

import { IRepost } from '../../types';

import './Repost.css';

import api from '../../api';


export interface PostProps {
    repost: IRepost;
    loading: boolean;
    thumb: boolean;
    setReplyRepostId: (id: number) => void;
    setVisible: (visible: boolean) => void;
};

export default (props: PostProps) => {
    const [liked, setLiked] = useState(props.thumb);
    const [likeNum, setLikeNum] = useState(props.repost.reposting_thumb_num);

    useEffect(()=>{
        setLikeNum(props.repost.reposting_thumb_num);
        setLiked(props.thumb);
    },[props.thumb])

    const like = () => {
        if (liked) {
            const newRepost = {
                reposting_user: props.repost.reposting_user,
                main_posting: props.repost.main_posting,
                reposting_content: props.repost.reposting_content,
                reposting_thumb_num: likeNum-1,
                reply_id : props.repost.reply_posting === null ? -1:Number.parseInt(props.repost.reply_posting[2])
            };
            api.repost.update(props.repost.reposting_id.toString(),newRepost).then((response)=>{
                console.log(response);
                setLikeNum(likeNum - 1);
                setLiked(!liked);
            });
        } else {
            const newRepost = {
                reposting_user: props.repost.reposting_user,
                main_posting: props.repost.main_posting,
                reposting_content: props.repost.reposting_content,
                reposting_thumb_num: likeNum+1,
                reply_id : props.repost.reply_posting === null ? -1:Number.parseInt(props.repost.reply_posting[2])
            };
            api.repost.update(props.repost.reposting_id.toString(),newRepost).then((response)=>{
                console.log(response);
                setLikeNum(likeNum + 1);
                setLiked(!liked);
            });
        }
    };

    const report = () => {
        console.log('report');
    };

    const replyToRepost = () => {
        props.setReplyRepostId(props.repost.reposting_id);
        props.setVisible(true);
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
        <span
            key='repost-reply'
            onClick={replyToRepost}
        >
            <Icon
                className='repost-reply-button'
                type='message'
            />
            <span className='repost-action-text'>回复</span>
        </span>
    ];

    return (
        <Card className='repost' hoverable>
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
                            <span>
                                {getRelativeTime(props.repost.formated_reposting_time)}
                            </span>
                        </Tooltip>
                    }
                />
            </Skeleton>
        </Card>
    );
};
