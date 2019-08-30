import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import Post from '../Post';
import RepostList from '../RepostList';
import PostCreator from '../PostCreator';
import SideBar, { CardItem } from '../SideBar';
import SideButtons from './SideButtons';

import { RouteComponentProps } from 'react-router-dom';
import { IPost, IRepost } from '../../types';


export interface MainFrameProps extends RouteComponentProps {
    post: IPost;
    reposts: Array<IRepost>;
    repostNum: number;
    postLoading: boolean;
    repostsLoading: boolean;
    sideLoading: boolean;
    sideItems: Array<CardItem>;
    getReposts: (page: string) => void;
    thumbs: Array<boolean>;
};

export default withRouter((props: MainFrameProps) => {
    const [visible, setVisible] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [replyRepostId, setId] = useState(-1);

    return (
        <div className='detail-template-main-frame'>
            <div className='detail-post-wrapper'>
                <Post
                    post={props.post}
                    loading={props.postLoading}
                    detail={true}
                    thumb={false}
                />
            </div>
            <div className='detail-repost-wrapper'>
                <RepostList
                    reposts={props.reposts}
                    loading={props.repostsLoading}
                    repostNum={props.repostNum}
                    getReposts={props.getReposts}
                    setReplyRepostId={setId}
                    setVisible={setVisible}
                    thumbs={props.thumbs}
                />
            </div>
            <PostCreator
                header={"回帖"}
                title={false}
                visible={visible}
                setVisible={setVisible}
                repostId={replyRepostId}
                postId={props.post.posting_id}
            />
            {redirect && <Redirect to='/login' />}
            <SideBar
                loading={props.sideLoading}
                userCenter={false}
                offsetTop={65}
                items={props.sideItems}
            />
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
