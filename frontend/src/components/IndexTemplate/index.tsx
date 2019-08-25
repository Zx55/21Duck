import React, { useState, useEffect } from 'react';

import api from '../../api';
import PostList from '../../components/PostList';
import Loading from '../../components/Loading';

import { Pagination } from 'antd';

import { PostItem } from '../../types';
import { Param } from '../../types';

import './Template.css';


export interface IndexTemplateProps {
    name: string;
    category: string;
};

export default (props: IndexTemplateProps) => {
    const [posts, setPosts] = useState(new Array<PostItem>());
    const [postNum, setPostNum] = useState(0);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);

    const getPosts = (page: string): void => {
        setLoading(true);

        const params: Param = {
            page: page,
            category: props.category,
        };

        api.post.list(params).then((response) => {
            const posts: Array<PostItem> = response.data;
            setPostNum(posts[0].posting_num);
            setPosts(posts);
            setLoading(false);
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getPosts('0');
    }, []);

    const handlePageChange = (page: number): void => {
        setCurrent(page);
        getPosts((page - 1).toString());
    }

    return (
        <div className={`${props.name}-root`}>
            <div>{props.name}</div>
            {loading ? <Loading /> : <PostList posts={posts} />}
            <Pagination
                className={`${props.name}-pagination`}
                current={current}
                defaultPageSize={15}
                size='small'
                hideOnSinglePage
                total={postNum}
                showQuickJumper
                onChange={(page: number) => handlePageChange(page)}
            />
        </div>
    );
};
