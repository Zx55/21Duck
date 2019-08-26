import React from 'react';

import { List } from 'antd';

import Post from '../Post';

import { PostItem } from '../../types';

import './PostList.css';


export interface PostListProps {
    posts: Array<PostItem>;
    loading: boolean;
};

export default (props: PostListProps) => {
    return (
        <List
            className='post-list'
            itemLayout='horizontal'
            dataSource={props.posts}
            renderItem={(post) => (
                <li>
                    <Post post={post} loading={props.loading} />
                </li>
            )}
        />
    );
};


/**
 *
 * <RcQueueAnim
            className='post-list'
            type={['right', 'alpha']}
            ease={['easeOutQuart', 'easeInOutQuart']}
            component='ul'
            leaveReverse
        >
            {props.posts && props.posts.length ? props.posts.map((post: PostItem) =>
                <li key={`post-${post.posting_id}`}>
                    <Post post={post} loading={false} />
                </li>
            ) : <Loading />}
        </RcQueueAnim>
    );
 */