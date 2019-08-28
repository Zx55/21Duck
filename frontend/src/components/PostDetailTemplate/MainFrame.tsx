import React from 'react';
import { withRouter } from 'react-router-dom';

import { Button, BackTop } from 'antd';

import Post from '../Post';
import RepostList from '../RepostList';
import PostCreator from '../PostCreator';

import { RouteComponentProps } from 'react-router-dom';
import { IPost, IRepost } from '../../types';


export interface MainFrameProps extends RouteComponentProps {
    name: string;
    post: IPost;
    reposts: Array<IRepost>;
    repostNum: number;
    postLoading: boolean;
    repostsLoading: boolean;
    getReposts: (page: string) => void;
};

export default withRouter((props: MainFrameProps) => {
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
                    repostNum={props.repostNum}
                    getReposts={props.getReposts}
                />
            </div>
            <PostCreator type="发布回帖" withTitle={0}/>
            <Button
                className='return-button'
                icon='arrow-left'
                shape='circle'
                size='large'
                onClick={() =>
                    props.history.replace(props.match.path.replace('/:postId', ''))
                }
            />
            <BackTop className='go-to-top-button' />
        </div>
    );
});
