import React, { useEffect} from 'react';
import { withRouter } from 'react-router-dom';

import { useReposts, useDetailPost } from '../../hooks';
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
    const [post, postLoading, postNotFound, side, sideLoading, getPost] =
        useDetailPost(3);

    useEffect(() => {
        getPost(postId, props.category);
        getReposts({
            page: '0',
            posting_id: postId,
            category_id: props.category,
            user_id: '123456',
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
                            user_id: '123456',
                        })
                    }
                    postLoading={postLoading}
                    repostsLoading={repostsLoading}
                    sideLoading={sideLoading}
                    sideItems={side}
                    thumbs={thumbs}
                />
            }
        </div>
    );
})