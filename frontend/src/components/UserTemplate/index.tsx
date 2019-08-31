import React, { useEffect } from 'react';

import { useUser, usePosts, useUserSide } from '../../hooks';
import MainFrame from './MainFrame';

import './Template.css';


export default () => {
    const user = useUser();
    const [posts, postNum, thumbs, postsLoading, getPosts] = usePosts(15);
    const [userInfo, side, sideLoading, getSide] = useUserSide(3);

    useEffect(() => {
        getPosts({ page: '0', user_id: user.userId });
    }, []);

    useEffect(()=>{
        getSide(user.userId);
    },[posts])

    return (
        <div className={`user-template-root`}>
            <MainFrame
                userInfo={userInfo}
                posts={posts}
                postNum={postNum}
                postsLoading={postsLoading}
                getPosts={
                    (page: string) => getPosts({
                        page: page,
                        user_id: user.userId,
                    })
                }
                side={side}
                sideLoading={sideLoading}
            />
        </div>
    );
};
