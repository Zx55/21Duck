import React from 'react';
import moment from 'moment';
import cx from 'classnames';

import { Card, Skeleton, Tooltip } from 'antd';

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
                <span>
                    {moment(props.post.formated_posting_time,
                        'YYYY-MM-DD HH:mm:ss').fromNow()}
                </span>
            </Tooltip>
        </Skeleton>
    </Card>
);
