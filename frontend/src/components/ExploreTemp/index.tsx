import React from 'react';
import moment from 'moment';
import cx from 'classnames';

import { Card, Skeleton, Tooltip } from 'antd';

import { IPost } from '../../types';


import './ExploreTemp.css';
import { Link } from 'react-router-dom';

const { Meta } = Card;


export interface PostProps {
    post: IPost;
    loading: boolean;
    detail: boolean;
};

export default (props: PostProps) => (
    <Card
        className={cx('cardgroup')}
        hoverable
        title={props.post.theme}
        
    >
        <Skeleton
            loading={props.loading}
            active
        >
            <Link to={`/problems/${props.post.posting_id}`}>
                {props.post.theme}
            </Link>
            
                <p className='user-nickname'>
                    {props.post.user_nickname}
                </p>
                <Tooltip className='post-created-time' title={props.post.formated_posting_time}>
                    <p>
                        {moment(props.post.formated_posting_time,
                            'YYYY-MM-DD HH:mm:ss').fromNow()}
                    </p>
                </Tooltip>
            
        </Skeleton>
    </Card>
);
