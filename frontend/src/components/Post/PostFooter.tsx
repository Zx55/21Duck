import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../Button';

import { RouteComponentProps } from 'react-router-dom';


export interface PostFooterProps extends RouteComponentProps {
    postId: number;
    like: number;
};

export default withRouter((props: PostFooterProps) => (
    <div className='post-footer'>
        <span className='interaction-bar'>
            <Button
                name='like'
                icon='like'
                text={props.like.toString()}
                onClick={(e) => console.log('like')}
            />
            <Button
                name='share'
                icon='export'
                text='分享'
                onClick={(e) => console.log('share')}
            />
            <Button
                name='favorite'
                icon='star'
                text='收藏'
                onClick={(e) => console.log('favorite')}
            />
            <Button
                name='report'
                icon='exclamation-circle'
                text='举报'
                onClick={(e) => console.log('report')}
            />
        </span>
        <span className='read-more-bar'>
            <Button
                name='read-more'
                icon='select'
                text='更多'
                onClick={(e) => props.history.push(`${props.match.path}/${props.postId}`)}
            />
        </span>
    </div>
));
