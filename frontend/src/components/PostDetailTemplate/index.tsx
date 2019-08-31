import React, { useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';

import { useReposts, useDetailPost, useUser } from '../../hooks';
import MainFrame from './MainFrame';
import NotFound from '../NotFound';

import { RouteComponentProps } from 'react-router-dom';

import './Template.css';


export interface PageDetailTemplate extends RouteComponentProps {
    category: string;
}

const isNumber = (s: string): boolean => /^\d+$/.test(s);

export default withRouter((props: PageDetailTemplate) => {
    const postId = (props.match.params as { postId: string }).postId;

    const [reposts, repostNum, thumbs, repostsLoading, repostsNotFound, getReposts] =
        useReposts(15);
    const [post, postLoading, postNotFound, side, sideLoading, thumb, getPost] =
        useDetailPost(3);

    const user = useUser();

    let judge = 0;

    useEffect(() => {
        if(user.identity == 0 || user.identity == 3) judge = 1;
        getPost(postId, props.category, user.userId);
        getReposts({
            page: '0',
            posting_id: postId,
            category_id: props.category,
            user_id: judge == 1 ? '0': user.userId,
        });
    }, []);

    return (
        <div className={`detail-page-root`}>
            {(!isNumber(postId) || postNotFound || repostsNotFound)
                ? <NotFound
                    prefix='返回上一页'
                    onClick={() => props.history.goBack()}
                />
                : <MainFrame
                    post={post}
                    reposts={reposts}
                    repostNum={repostNum}
                    getReposts={
                        (page: string) => getReposts({
                            page: page,
                            posting_id: postId,
                            category_id: props.category,
                            user_id: judge == 1 ? '0': user.userId,
                        })
                    }
                    postLoading={postLoading}
                    repostsLoading={repostsLoading}
                    sideLoading={sideLoading}
                    sideItems={side}
                    thumbs={thumbs}
                    thumb={thumb}
                />
            }
        </div>
    );
})