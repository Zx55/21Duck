import React from 'react';

import Template from '../PageListTemplate';
import './PostDetail.css';
import PostHeader from '../Post/PostHeader';
import PostContent from '../Post/PostContent';
import PostFooter from '../Post/PostFooter';

export default () => (
    <div>
        <div id='title'>
            <PostHeader
                userHead={'田所浩二'}
                userNickName={'雅久森派'}
                postTitle={'如果早知道'}
                postCreatedTime={'2019.8.10'}
            />
            <PostContent content={'いいよこいよ'} />
            <PostFooter like={114514} />
        </div>
        <Template name='problem' category='2' />
    </div >
);
