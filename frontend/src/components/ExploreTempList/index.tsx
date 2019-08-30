import React, { useState, useEffect } from 'react';

import { List } from 'antd';
import api from '../../api';
import ExploreCard  from '../ExploreTemp';

import { IPost, Param } from '../../types';

import './ExploreTempList.css';
export interface UserTemplateProps {
    name: string;
    category: string;
};

export interface PostListProps {
    posts: Array<IPost>;
    loading: boolean;
    postNum: number;
    getPosts: (page: string) => void;
};

export default (props: UserTemplateProps ) => {
    let initPosts = new Array<IPost>();
    for (let i = 0; i < 4; ++i) {
        initPosts.push(new IPost());
    }

    const [posts, setPosts] = useState(initPosts);
    const [postNum, setPostNum] = useState(0);
    const [postsLoading, setPostsLoading] = useState(true);
    const [sideLoading, setSideLoading] = useState(true);

    const getPosts = (page: string): void => {
        setPostsLoading(true);

        const params: Param = {
            page: page,
            category_id: props.category,
            user_id: '123456',
        };

        api.post.list(params).then((response) => {
            const posts: Array<IPost> = response.data[0];
            setPostNum(response.data[1]);
            setPosts(posts.slice(0,4));
            setPostsLoading(false);

        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getPosts('0');
    }, []);
    const [current, setCurrent] = useState(1);



    return (
        <List
            className='post-list'
            itemLayout='vertical'
            dataSource={posts}
            grid={{gutter:16,column:4}}
            renderItem={(post) => (
                <li>
                    <ExploreCard
                        category={props.category}
                        post={post}
                        loading={postsLoading}
                        detail={false}
                    />
                </li>
            )}

        />
    );
};
