import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import PostList from '../PostList';
import PostCreator from '../PostCreator';
import SideBar from '../SideBar';
import SideButtons from './SideButtons';

import { IPost } from '../../types';


export interface MainFrameProps {
    name: string;
    posts: Array<IPost>;
    postNum: number;
    postsLoading: boolean;
    sideLoading: boolean;
    getPosts: (page: string) => void;
};

export default (props: MainFrameProps) => {
    const [visible, setVisible] = useState(false);
    const [redirect, setRedirect] = useState(false);

    return (
        <div className='list-template-main-frame'>
            <PostList
                posts={props.posts}
                loading={props.postsLoading}
                postNum={props.postNum}
                getPosts={props.getPosts}
            />
            <PostCreator
                header="????"
                title={true}
                visible={visible}
                setVisible={setVisible}
            />
            {redirect && <Redirect to='/login' />}
            <SideButtons
                setVisible={setVisible}
                setRedirect={setRedirect}
            />
            <SideBar loading={props.sideLoading} />

        </div>
    );
};
