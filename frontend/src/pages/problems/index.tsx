import React from 'react';

import Post from '../../components/Post';

import './Problems.css';


const markdown: string = '# This is a header\n\nAnd this is a paragraph'

export default () => (
    <div>
        Problems
        <Post
            userHead='https://c-ssl.duitang.com/uploads/item/201711/10/20171110225150_ym2jw.jpeg'
            userNickName='zx5'
            postCreatedTime='1天前'
            content={markdown}
            like={53}
        />
    </div>
);
