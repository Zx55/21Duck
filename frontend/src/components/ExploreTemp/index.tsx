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
            cover={<img src="https://dpsv7g.ch.files.1drv.com/y4mKc5CDaj_ClT3q8_-pb-VeDLGL36szTIUX4X0rrtX3VdCyy-91B2kI3yVYewGR5k_Aehp8si78fLnxd-ieMVR3yzrcusYyNdFD-gOBASqIJSYB6OhWkZc_isaJAXLQFwOHNMRd6_00iUmL-QuCxg2HuQszC9wXjdoCmazs-zRO_YMrBzwVTNWD8FPxgc2PHLPaU17sn0RV6Y0-0GWzQth0w?width=1247&height=468&cropmode=none"></img>}

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
