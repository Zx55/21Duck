import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import PostList from '../PostList';
import PostCreator from '../PostCreator';
import SideBar, { CardItem } from '../SideBar';
import SideButtons from './SideButtons';

import { IPost } from '../../types';


export interface MainFrameProps {
    posts: Array<IPost>;
    postNum: number;
    postsLoading: boolean;
    side: Array<CardItem>;
    sideLoading: boolean;
    getPosts: (page: string) => void;
    category: string;
};

export default (props: MainFrameProps) => {
    const [visible, setVisible] = useState(false);
    const [redirect, setRedirect] = useState(false);

    return (
        <div className='list-template-main-frame'>
            <div className='post-list-wrapper'>
                <PostList
                    posts={props.posts}
                    loading={props.postsLoading}
                    postNum={props.postNum}
                    getPosts={props.getPosts}
                />
            </div>
            <PostCreator
                header="发布主题帖"
                title={true}
                visible={visible}
                setVisible={setVisible}
                categoryId={Number.parseInt(props.category)}
            />
            {redirect && <Redirect to='/login' />}
            <SideButtons
                setVisible={setVisible}
                setRedirect={setRedirect}
            />
            <SideBar
                loading={props.sideLoading}
                userCenter={false}
                offsetTop={65}
                items={props.side}
            />
        </div>
    );
};
