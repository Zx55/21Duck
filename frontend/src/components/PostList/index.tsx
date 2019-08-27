import React from 'react';

import { List } from 'antd';

import Post from '../Post';

import { IPost } from '../../types';

import './PostList.css';


export interface PostListProps {
    posts: Array<IPost>;
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
                    <Post
                        post={post}
                        loading={props.loading}
                        detail={false}
                    />
                </li>
            )}
        />
    );
};
