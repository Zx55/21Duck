import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CopyToClipboard from "react-copy-to-clipboard";

import { message } from 'antd';

import MiniButton from './MiniButton';
import host from '../../api/host';

import { RouteComponentProps } from 'react-router-dom';
import api from '../../api';
import { useUser } from '../../hooks';
import { IPost } from '../../types';


export interface PostFooterProps extends RouteComponentProps {
    post: IPost;
    detail: boolean;
    thumb: boolean;
};

export default withRouter((props: PostFooterProps) => {
    const [liked, setLiked] = useState(props.thumb);
    const [likeNum, setLikeNum] = useState(props.post.posting_thumb_num);
    const user = useUser();

    console.log("post thumb:",props.thumb);

    console.log('b4:',likeNum,liked);

    useEffect(()=>{
        setLiked(props.thumb);
    },[props.thumb])
    

    const onLikeClick = () => {
        console.log('in:',liked,likeNum);
        if (liked) {
            const newThumb = {
                posting_id: props.post.posting_id.toString(),
                user_id: user.userId
            };
            api.post.thumbDown(newThumb);
            setLikeNum(likeNum - 1);
            setLiked(!liked);
        } else {
            const newThumb = {
                posting_id: props.post.posting_id.toString(),
                user_id: user.userId
            };
            api.post.thumbUp(newThumb);
            setLikeNum(likeNum + 1);
            setLiked(!liked);
        }
        console.log('out:',liked,likeNum);
    
    };

    const onShareClick = () => {
        message.config({ top: 75 });
        message.success('链接复制成功');
    };

    const onCollectClick = () => {
        console.log('collect');
    };

    const onReportClick = () => {
        console.log('report');
    };

    return (
        <div className='post-footer'>
            <span className='interaction-bar'>
                <MiniButton
                    name='like'
                    icon='like'
                    filled={liked ? true : false}
                    text={likeNum.toString()}
                    onClick={onLikeClick}
                />
                <CopyToClipboard
                    text={host + props.match.url}
                    onCopy={onShareClick}>
                    <MiniButton
                        name='share'
                        icon='export'
                        text='分享'
                        onClick={() => 0}
                    />
                </CopyToClipboard>
                <MiniButton
                    name='favorite'
                    icon='star'
                    text='收藏'
                    onClick={onCollectClick}
                />
                <MiniButton
                    name='report'
                    icon='exclamation-circle'
                    text='举报'
                    onClick={onReportClick}
                />
            </span>
            {props.detail ? null :
                <span className='read-more-bar'>
                    <MiniButton
                        name='read-more'
                        icon='select'
                        text='更多'
                        onClick={() => props.history.push(`${props.match.path}/${props.post.posting_id}`)}
                    />
                </span>
            }
            <span className='post-reply-num'>{props.post.reply_num} 条回复</span>
        </div>
    );
});
