import React, { useState } from 'react';

import { Pagination, BackTop } from 'antd';

import PostList from '../PostList';
import PostCreator from '../PostCreator';

import { PostItem } from '../../types';


export interface MainFrameProps {
    name: string;
    posts: Array<PostItem>;
    postNum: number;
    loading: boolean;
    getPosts: (page: string) => void;
};

export default (props: MainFrameProps) => {
    const [current, setCurrent] = useState(1);

    const handlePageChange = (page: number): void => {
        setCurrent(page);
        props.getPosts((page - 1).toString());
    }

    return (
        <div className='template-main-frame'>
            <PostList posts={props.posts} loading={props.loading} />
            <Pagination
                className={`${props.name}-pagination`}
                current={current}
                defaultPageSize={15}
                size='small'
                hideOnSinglePage
                total={props.postNum}
                showQuickJumper
                onChange={(page: number) => handlePageChange(page)}
            />
            <PostCreator />
            <BackTop className='go-to-top-button' />
        </div>
    );
};
