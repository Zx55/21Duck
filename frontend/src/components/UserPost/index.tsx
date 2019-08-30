import React from 'react';
import moment from 'moment';
import cx from 'classnames';

import { Card, Skeleton, Tooltip } from 'antd';

import { IPost } from '../../types';


import './UserPost.css';
import { Link } from 'react-router-dom';


export interface PostProps {
    post: IPost;
    loading: boolean;
    detail: boolean;
};

export default (props: PostProps) => (
    <Card
        className={cx('user-post', props.detail && 'post-detail')}
        hoverable
        bordered={false}
        bodyStyle={{padding:"10px 20px"}}
        >
        <Skeleton
            loading={props.loading}
            active
        >
            <Link to={`/problems/${props.post.posting_id}`}>
                {props.post.theme}
            </Link>
            <span style={{ float: "right" }}>
                <Tooltip className='post-created-time' title={props.post.formated_posting_time}>
                    <span>
                        {moment(props.post.formated_posting_time,
                            'YYYY-MM-DD HH:mm:ss').fromNow()}
                    </span>
                </Tooltip>
            </span>
        </Skeleton>
    </Card>
);
