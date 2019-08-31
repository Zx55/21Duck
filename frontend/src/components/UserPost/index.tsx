import React from 'react';
import moment from 'moment';
import cx from 'classnames';
import {withRouter, RouteComponentProps} from 'react-router-dom'

import { Card, Skeleton, Tooltip, message } from 'antd';

import { IPost } from '../../types';


import './UserPost.css';
import { Link } from 'react-router-dom';
import MiniButton from '../Post/MiniButton';
import api from '../../api';


export interface PostProps extends RouteComponentProps {
    post: IPost;
    loading: boolean;
    detail: boolean;
    getPost: (page: string)=>void;
    page: string;
};

export default withRouter((props: PostProps) => {
    const getCategory = (categoryId: number) => {
        console.log(categoryId);
        switch (categoryId) {
            case 1:
                return 'chat';
            case 2:
                return 'problems';
            case 3:
                return 'courses';
            case 4:
                return 'campus';
            case 5:
                return 'resources';
            default:
                return '';
        }
    };

    return (
        <Card
            className={cx('user-post', props.detail && 'post-detail')}
            hoverable
            bordered={false}
            bodyStyle={{ padding: "10px 20px" }}
            >
            <Skeleton
                loading={props.loading}
                active
            >
                <Link to={`/${getCategory(props.post.category_id)}/${props.post.posting_id}`}>
                    {props.post.theme}
                </Link>
                <span style={{ float: "right" }}>
                    <Tooltip className='post-created-time' title={props.post.formated_posting_time}>
                        <span>
                            {moment(props.post.formated_posting_time,
                                'YYYY-MM-DD HH:mm:ss').fromNow()}
                        </span>
                    </Tooltip>
                    <Tooltip className='post-delete' title='删除'>
                        <span style={{marginLeft: 15}}>
                            <MiniButton
                                name='delete'
                                icon='delete'
                                text=''
                                onClick={
                                    ()=>{
                                        api.post.remove(props.post.posting_id.toString()).then((response) => {
                                            console.log('page:',props.page)
                                            message.success('删除成功!');
                                            //const url = props.match.url;
                                            props.getPost(props.page)
                                        }).catch(err => console.log(err));
                                    }
                                }
                            />
                        </span>
                    </Tooltip>
                </span>
            </Skeleton>
        </Card>
    );
});
