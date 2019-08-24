import React, { useState, useEffect } from 'react';

import api from '../../api';
import PostList from '../../components/PostList';

import { PostItem } from '../../types';
import { ParamList } from '../../types';

import './Problems.css';


export default () => {
    const [posts, setPosts] = useState(new Array<PostItem>());

    const getPosts = (page: string): void => {
        const params: ParamList = [{
            key: 'page',
            value: page,
        }, {
            key: 'category',
            value: '2',
        }];

        api.post.list(params).then((response) => {
            const posts: Array<PostItem> = response.data;
            setPosts(posts);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getPosts('1');
    }, []);

    return (
        <div className='problems-root'>
            <div>Problems</div>
            <PostList posts={posts} />
        </div>
    );
}
