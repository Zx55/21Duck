import React from 'react';

import Button from '../Button';


export interface PostFooterProps {
    like: number;
};

export default (props: PostFooterProps) => (
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
                onClick={(e) => console.log('more')}
            />
        </span>
    </div>
)