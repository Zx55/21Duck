import React from 'react';

import RcQueueAnim from 'rc-queue-anim';

import Post from '../Post';
import Loading from '../Loading';

import { PostItem } from '../../types';

import './PostList.css';


export interface PostListProps {
    posts: Array<PostItem>;
};

export default (props: PostListProps) => {
    return (
        <RcQueueAnim
            className='post-list'
            type={['right', 'alpha']}
            ease={['easeOutQuart', 'easeInOutQuart']}
            component='ul'
            leaveReverse
        >
            {props.posts && props.posts.length ? props.posts.map((post: PostItem) =>
                <li key={`post-${post.posting_id}`}>
                    <Post post={post} />
                </li>
            ) : <Loading />}
        </RcQueueAnim>
    );
};
