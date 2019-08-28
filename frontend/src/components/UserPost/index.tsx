import React from 'react';
import marked from 'marked';
import cx from 'classnames';

import { Card, Avatar, Skeleton, Tooltip } from 'antd';

import { IPost } from '../../types';

import './UserPost.css';

const { Meta } = Card;


export interface PostProps {
    post: IPost;
    loading: boolean;
    detail: boolean;
};

export default (props: PostProps) => (
    <Card className={cx('user-post', props.detail && 'post-detail')}>
        <Skeleton
            loading={props.loading}
            active
        >
            <Meta
                title={props.post.theme}
            />
            <span className='user-nickname'>
                {props.post.user_nickname}
            </span>
            <Tooltip className='post-created-time' title={props.post.formated_posting_time}>
                {props.post.relative_posting_time}
            </Tooltip>
        </Skeleton>
    </Card>
);
