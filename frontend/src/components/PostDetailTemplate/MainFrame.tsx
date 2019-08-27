import React, { useState } from 'react';

import { Pagination, BackTop } from 'antd';

import Post from '../Post';
import RepostList from '../RepostList';
import PostCreator from '../PostCreator';

import { IPost, IRepost } from '../../types';


export interface MainFrameProps {
    name: string;
    post: IPost;
    reposts: Array<IRepost>;
    repostNum: number;
    postLoading: boolean;
    repostsLoading: boolean;
    getReposts: (page: string) => void;
};

export default (props: MainFrameProps) => {
    const [current, setCurrent] = useState(1);

    const handlePageChange = (page: number): void => {
        setCurrent(page);
        props.getReposts((page - 1).toString());
    }

    // Todo: 如果这边reposts返回false，渲染404页面
    return (
        <div className='detail-template-main-frame'>
            <div className='detail-post-wrapper'>
                <Post
                    post={props.post}
                    loading={props.postLoading}
                    detail={true}
                />
            </div>
            <div className='detail-repost-wrapper'>
                <RepostList
                    reposts={props.reposts}
                    loading={props.repostsLoading}
                />
                <Pagination
                    className={`${props.name}-pagination`}
                    current={current}
                    defaultPageSize={15}
                    size='small'
                    hideOnSinglePage
                    total={props.repostNum}
                    showQuickJumper
                    onChange={(page: number) => handlePageChange(page)}
                />
            </div>
            <PostCreator />
            <BackTop className='go-to-top-button' />
        </div>
    );
};
