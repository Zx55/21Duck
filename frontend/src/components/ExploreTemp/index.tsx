import React from 'react';
import moment from 'moment';
import cx from 'classnames';

import { Card, Skeleton, Tooltip } from 'antd';

import { IPost } from '../../types';


import './ExploreTemp.css';
import { Link } from 'react-router-dom';

const { Meta } = Card;

var m = new Map([['1', "chat"], [ '2', "problems"],[ '3', "courses"],['4', "campus"]]);
console.log(m.get('Michael')); 
export interface PostProps {
    category: string;
    post: IPost;
    loading: boolean;
    detail: boolean;
};

export default (props: PostProps) => (

    <Link to={`/${m.get(props.category)}/${props.post.posting_id}`}>
        <Card
            className={'cardgroup'}
            hoverable
            size="small"
            title={props.post.theme}
            cover={<img src="http://img.zhisheji.com/bbs/forum/201706/15/232723ednmw29jnnrznh4d.jpg"></img>}

        >
            <Skeleton
                loading={props.loading}
                active
            >
                <span className='user-nickname'>
                    {props.post.user_nickname}
                </span>
                <span>
                    <Tooltip className='post-created-time-explore' title={props.post.formated_posting_time}>
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
