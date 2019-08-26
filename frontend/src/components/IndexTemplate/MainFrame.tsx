import React, { useState } from 'react';

import { Button, Pagination } from 'antd';

import PostList from '../PostList';
import PostCreator from '../../components/PostCreator';

import { PostItem } from '../../types';


export interface MainFrameProps {
    name: string;
    posts: Array<PostItem>;
    postNum: number;
    getPosts: (page: string) => void;
};

export default (props: MainFrameProps) => {
    const [current, setCurrent] = useState(1);

    const handleBackToTop = () => {
        window.scrollTo(0, 0);
    }

    const handlePageChange = (page: number): void => {
        setCurrent(page);
        props.getPosts((page - 1).toString());
    }

    return (
        <div className='template-main-frame'>
            <PostList posts={props.posts} />
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
            <Button
                className='go-to-top-button'
                icon='vertical-align-top'
                shape='round'
                size='large'
                onClick={handleBackToTop}
            >
                回到顶部
            </Button>
        </div>
    );
};
