import React from 'react';
import { withRouter } from 'react-router-dom';


import Button from '../Button';

import { RouteComponentProps } from 'react-router-dom';


export interface PostFooterProps extends RouteComponentProps {
    postId: number;
    like: number;
    replyNum: number;
    detail: boolean;
};

export default withRouter((props: PostFooterProps) => {
    const onLikeClick = () => {
        console.log('like');
    };

    const onShareClick = () => {
        console.log('share');
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
                    text={props.like.toString()}
                    onClick={onLikeClick}
                />
                <Button
                    name='share'
                    icon='export'
                    text='分享'
                    onClick={onShareClick}
                />
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
