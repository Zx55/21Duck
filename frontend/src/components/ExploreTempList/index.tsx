import React, { useState, useEffect } from 'react';

import { List } from 'antd';
import api from '../../api';
import ExploreCard  from '../ExploreTemp';

import { IPost, Param, IResponsePost } from '../../types';

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
    const [postsLoading, setPostsLoading] = useState(true);

    const getPosts = (page: string): void => {
        setPostsLoading(true);

        const params: Param = {
            page: page,
            category_id: props.category,
            user_id: '123456',
        };

        api.post.list(params).then((response) => {
            const data: IResponsePost = response.data;

            setPosts(data.postings.slice(0,4));
            setPostsLoading(false);

        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getPosts('0');
    }, []);

    return (
        <List
            className='post-list'
            itemLayout='vertical'
            dataSource={posts}
            
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
