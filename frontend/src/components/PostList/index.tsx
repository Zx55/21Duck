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
