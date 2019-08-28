import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import Post from '../Post';
import RepostList from '../RepostList';
import PostCreator from '../PostCreator';
import SideBar from '../SideBar';
import SideButtons from './SideButtons';

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
    const [visible, setVisible] = useState(false);
    const [redirect, setRedirect] = useState(false);

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
            <PostCreator
                type="回复主帖"
                withTitle={0}
                visible={visible}
                setVisible={setVisible}
            />
            {redirect && <Redirect to='/login' />}
            <SideBar />
            <SideButtons
                setVisible={setVisible}
                setRedirect={setRedirect}
                onReturnClick={() =>
                    props.history.replace(props.match.path.replace('/:postId', ''))
                }
            />
        </div>
    );
});
