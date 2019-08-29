import React, { useState, useEffect } from 'react';

import { useUser, usePosts } from '../../hooks';
import MainFrame from './MainFrame';

import './Template.css';


export default () => {
    const user = useUser();
    const [posts, postNum, postsLoading, getPosts] = usePosts(15);
    const [sideLoading, setSideLoading] = useState(true);

    useEffect(() => {
        getPosts({ page: '0', user_id: user.userId });
    }, []);

    return (
        <div className={`user-template-root`}>
            <MainFrame
                posts={posts}
                postNum={postNum}
                getPosts={
                    (page: string) => getPosts({
                        page: page,
                        user_id: user.userId,
                    })
                }
                postsLoading={postsLoading}
                sideLoading={sideLoading}
            />
        </div>
    );
};
