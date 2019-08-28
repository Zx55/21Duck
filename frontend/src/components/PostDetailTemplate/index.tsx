import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';

import api from '../../api';
import MainFrame from './MainFrame';
import NotFound from '../NotFound';

import { RouteComponentProps } from 'react-router-dom';
import { IPost, IRepost, INotFound, Param } from '../../types';

import './Template.css';


export interface PageDetailTemplate extends RouteComponentProps {
    name: string;
    category: string;
}

type RepostItems = Array<IRepost>;

const isNumber = (s: string): boolean => /^\d+$/.test(s);

export default withRouter((props: PageDetailTemplate) => {
    let initReposts = new Array<IRepost>();
    for (let i = 0; i < 15; ++i) {
        initReposts.push(new IRepost());
    }

    const postId = (props.match.params as { postId: string }).postId;
    const [post, setPost] = useState(new IPost());
    const [postLoading, setPostLoading] = useState(true);
    const [reposts, setReposts] = useState(initReposts);
    const [repostsLoading, setRepostsLoading] = useState(true);
    const [repostNum, setRepostNum] = useState(0);
    const [sideLoading, setSideLoading] = useState(true);
    const [page404, setPage404] = useState(false);

    const getPost = (): void => {
        setPostLoading(true);

        const param: Param = {
            category_id: props.category,
        };

        api.post.retreive(postId, param).then((response) => {
            const post: IPost | INotFound | boolean = response.data;

            if ((post as boolean) === false
                || (post as INotFound).detail === 'Not found') {
                setPage404(true);
            } else {
                setPost(post as IPost);
                setPostLoading(false);
            }
        }).catch((err) => console.log(err));
    };

    const getReposts = (page: string): void => {
        setRepostsLoading(true);

        const params: Param = {
            page: page,
            posting_id: postId,
            category_id: props.category,
        };

        api.repost.list(params).then((response) => {
            const reposts: RepostItems | boolean = response.data;

            if (reposts as boolean === false) {
                setPage404(true);
            } else {
                setRepostNum((reposts as RepostItems).length === 0
                    ? 0 : (reposts as RepostItems)[0].reposting_num);
                setReposts(reposts as RepostItems);
                setRepostsLoading(false);
            }
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getPost();
        getReposts('0');
    }, []);

    return (
        <div className={`${props.name}-detail-root`}>
            {(!isNumber(postId) || page404)
                ? <NotFound
                    prefix='返回上一页'
                    onClick={() => props.history.goBack()}
                />
                : <MainFrame
                    name={props.name}
                    post={post}
                    reposts={reposts}
                    repostNum={repostNum}
                    getReposts={getReposts}
                    postLoading={postLoading}
                    repostsLoading={repostsLoading}
                    sideLoading={sideLoading}
                />
            }
        </div>
    );
});
