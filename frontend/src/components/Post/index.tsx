import React from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom'
import marked from 'marked';
import cx from 'classnames';

import { Card, Avatar, Skeleton, Tooltip } from 'antd';

import { getRelativeTime } from '../../utils';
import PostFooter from './PostFooter';

import { IPost } from '../../types';

import './Post.css';

const { Meta } = Card;


export interface PostProps extends RouteComponentProps {
    post: IPost;
    loading: boolean;
    detail: boolean;
    thumb: boolean;
};

export default withRouter((props: PostProps) => {
    marked.setOptions({
        highlight: function(code) {
            return require('highlight.js').highlightAuto(code).value;
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
    });

    const handleTitleClick = () => {
        if (!props.detail) {
            props.history.push(`${props.match.path}/${props.post.posting_id}`);
        }
    }

    return (
        <Card
            className={cx('post', props.detail && 'post-detail')}
            hoverable
        >
            <Skeleton
                loading={props.loading}
                active
                avatar
            >
                <Meta
                    avatar={<Avatar src={props.post.user_head} />}
                    title={
                        <div
                            className={cx(!props.detail && 'list-post-title')}
                            onClick={handleTitleClick}
                        >
                            {props.post.theme}
                        </div>
                    }
                />
                <span className='user-nickname'>
                    {props.post.user_nickname}
                </span>
                <Tooltip className='post-created-time' title={props.post.formated_posting_time}>
                    <span>
                        {getRelativeTime(props.post.formated_posting_time)}
                    </span>
                </Tooltip>
                <div
                    className='post-content'
                    dangerouslySetInnerHTML={{
                        __html: marked(props.post.posting_content)
                    }}
                />
                <PostFooter
                    post={props.post}
                    detail={props.detail}
                    thumb={props.thumb}
                    history={props.history}
                    match={props.match}
                />
            </Skeleton>
        </Card>
    );
});
