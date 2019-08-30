import React from 'react';
import moment from 'moment';
import cx from 'classnames';

import { Card, Skeleton, Tooltip } from 'antd';

import { IPost } from '../../types';


import './ExploreTemp.css';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const categoryMap={
    1:"xhat",
    2:"problems",
    3:"courses",
    4:"campus"
}
export interface PostProps {
    category:String;
    post: IPost;
    loading: boolean;
    detail: boolean;
};

export default (props: PostProps) => (
    
    <Link to={`/problems/${props.post.posting_id}`}>
    <Card
        className={cx('cardgroup')}
        hoverable
        size="small"
        title={props.post.theme}
        
    >
        <Skeleton
            loading={props.loading}
            active
        >
                <span className='user-nickname'>
                    {props.post.user_nickname}
                </span>
                <span>
                <Tooltip className='post-created-time' title={props.post.formated_posting_time}>
                    <p>
                        {moment(props.post.formated_posting_time,
                            'YYYY-MM-DD HH:mm:ss').fromNow()}
                    </p>
                </Tooltip>
                </span>
            
        </Skeleton>
    </Card>
    </Link>
);
