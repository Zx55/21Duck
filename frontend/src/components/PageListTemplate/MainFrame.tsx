import React from 'react';

import { BackTop } from 'antd';

import PostList from '../PostList';
import PostCreator from '../PostCreator';
import SideBar from '../SideBar';

import { IPost } from '../../types';


export interface MainFrameProps {
    name: string;
    posts: Array<IPost>;
    postNum: number;
    loading: boolean;
    getPosts: (page: string) => void;
};

export default (props: MainFrameProps) => {
    return (
        <div className='list-template-main-frame'>
            <PostList
                posts={props.posts}
                loading={props.loading}
                postNum={props.postNum}
                getPosts={props.getPosts}
            />
            <PostCreator type="发布新帖" withTitle={1}/>
            <SideBar />
            <BackTop className='go-to-top-button' />
        </div>
    );
};
