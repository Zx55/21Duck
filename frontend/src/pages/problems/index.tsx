import React from 'react';

import Post from '../../components/Post';

import './Problems.css';


const markdown: string = 'This is the content.'

export default () => (
    <div>
        Problems
        <Post
            userHead='https://c-ssl.duitang.com/uploads/item/201401/26/20140126183917_VsRdZ.jpeg'
            userNickName='zx5'
            postTitle='This is a header'
            postCreatedTime='1天前'
            content={markdown}
            like={53}
        />
    </div>
);
