import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import CopyToClipboard from "react-copy-to-clipboard";

import { message } from 'antd';

import Button from '../Button';
import host from '../../api/host';

import { RouteComponentProps } from 'react-router-dom';


export interface PostFooterProps extends RouteComponentProps {
    postId: number;
    like: number;
    replyNum: number;
    detail: boolean;
};

export default withRouter((props: PostFooterProps) => {
    const [liked, setLiked] = useState(false);
    const [likeNum, setLikeNum] = useState(props.like);

    const onLikeClick = () => {
        if (liked) {
            setLikeNum(num => num - 1);
        } else {
            setLikeNum(num => num + 1);
        }
        setLiked(liked => !liked);
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
                <Button
                    name='like'
                    icon='like'
                    filled={liked ? true : false}
                    text={likeNum.toString()}
                    onClick={onLikeClick}
                />
                <CopyToClipboard
                    text={host + props.match.url}
                    onCopy={onShareClick}>
                    <Button
                        name='share'
                        icon='export'
                        text='分享'
                        onClick={() => 1}
                    />
                </CopyToClipboard>
                <Button
                    name='favorite'
                    icon='star'
                    text='收藏'
                    onClick={onCollectClick}
                />
                <Button
                    name='report'
                    icon='exclamation-circle'
                    text='举报'
                onClick={(e) => console.log('report')}
                />
            </span>
            {props.detail ? null :
                <span className='read-more-bar'>
                    <Button
                        name='read-more'
                        icon='select'
                        text='更多'
                        onClick={(e) => props.history.push(`${props.match.path}/${props.postId}`)}
                    />
                </span>
            }
            <span className='post-reply-num'>{props.replyNum} 条回复</span>
        </div>
    );
});
