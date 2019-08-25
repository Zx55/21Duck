import React from 'react';

import { Button } from 'antd';

import PostList from '../PostList';

import { PostItem } from '../../types';

import PostCreator from '../../components/PostCreator';


export interface MainFrameProps {
    posts: Array<PostItem>;
}

export default (props: MainFrameProps) => (
    <div className='template-main-frame'>
        <PostList posts={props.posts} />
        <PostCreator />
        <Button className='go-to-top-button' icon='vertical-align-top' shape='round' size='large'>
            回到顶部
        </Button>
    </div>
);
