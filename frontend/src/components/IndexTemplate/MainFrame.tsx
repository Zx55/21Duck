import React from 'react';

import { Button } from 'antd';

import PostList from '../PostList';
import PostCreator from '../../components/PostCreator';

import { PostItem } from '../../types';


export interface MainFrameProps {
    posts: Array<PostItem>;
}

export default (props: MainFrameProps) => {
    const handleBackToTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className='template-main-frame'>
            <PostList posts={props.posts} />
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
