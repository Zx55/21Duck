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
    loading: boolean;
    getPosts: (page: string) => void;
};

export default (props: MainFrameProps) => {
    const [visible, setVisible] = useState(false);
    const [redirect, setRedirect] = useState(false);

    return (
        <div className='list-template-main-frame'>
            <PostList
                posts={props.posts}
                loading={props.loading}
                postNum={props.postNum}
                getPosts={props.getPosts}
            />
            <PostCreator
                type="????"
                withTitle={1}
                visible={visible}
                setVisible={setVisible}
            />
            {redirect && <Redirect to='/login' />}
            <SideButtons
                setVisible={setVisible}
                setRedirect={setRedirect}
            />
            <SideBar />

        </div>
    );
};
