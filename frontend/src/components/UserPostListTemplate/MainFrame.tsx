import React from 'react';

import { BackTop } from 'antd';

import UserPostList from '../UserPostList';
import SideBar from '../../components/SideBar';

import { IPost } from '../../types';

import './UserTemplate.css';


export interface MainFrameProps {
    name: string;
    posts: Array<IPost>;
    postNum: number;
    postsLoading: boolean;
    sideLoading: boolean;
    getPosts: (page: string) => void;
};

export default (props: MainFrameProps) => {
    return (
        <div className='list-template-main-frame'>
            <UserPostList
                posts={props.posts}
                loading={props.postsLoading}
                postNum={props.postNum}
                getPosts={props.getPosts}
            />
            <SideBar 
                loading={props.sideLoading}
                userCenter={true} />
            <BackTop className='go-to-top-button' />
        </div>
    );
};
