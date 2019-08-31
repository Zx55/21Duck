import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom'

import { Card, Skeleton, Tooltip } from 'antd';

import MiniButton from '../Post/MiniButton';

import './UserPost.css';

export class PostProps {
    formatedTime: string = '';
    content: string = '';
    route: string = '';
    loading: boolean = true;
    onClick: () => void = () => 1;
};

export default (props: PostProps) => {

    return (
        <Card
            className='user-post'
            hoverable
            bordered={false}
            bodyStyle={{ padding: "10px 20px" }}
            >
            <Skeleton
                loading={props.loading}
                active
            >
                <Link to={props.route}>
                    {props.content}
                </Link>
                <span style={{ float: "right" }}>
                    <Tooltip className='post-created-time' title={props.formatedTime}>
                        <span>
                            {moment(props.formatedTime,
                                'YYYY-MM-DD HH:mm:ss').fromNow()}
                        </span>
                    </Tooltip>
                    <Tooltip className='post-delete' title='删除'>
                        <span style={{marginLeft: 15}}>
                            <MiniButton
                                name='delete'
                                icon='delete'
                                text=''
                                onClick={props.onClick}
                            />
                        </span>
                    </Tooltip>
                </span>
            </Skeleton>
        </Card>
    );
};
