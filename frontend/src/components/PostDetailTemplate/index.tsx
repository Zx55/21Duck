import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import marked from 'marked';

import { Tooltip } from 'antd';

import { newArrayWithItems, getRelativeTime } from '../../utils';
import api from '../../api';
import MainFrame from './MainFrame';
import NotFound from '../NotFound';

import { RouteComponentProps } from 'react-router-dom';
import { IPost, IRepost, ICategory, INotFound, Param } from '../../types';
import { CardItem } from '../SideBar';

import './Template.css';


export interface PageDetailTemplate extends RouteComponentProps {
    category: string;
}

type RepostItems = Array<IRepost>;

const isNumber = (s: string): boolean => /^\d+$/.test(s);

export default withRouter((props: PageDetailTemplate) => {
    const postId = (props.match.params as { postId: string }).postId;
    const [post, setPost] = useState(new IPost());
    const [postLoading, setPostLoading] = useState(true);
    const [reposts, setReposts] =
        useState(newArrayWithItems<IRepost>(15, new IRepost()));
    const [repostsLoading, setRepostsLoading] = useState(true);
    const [repostNum, setRepostNum] = useState(0);
    const [sideItems, setSideItems] =
        useState(newArrayWithItems<CardItem>(3, new CardItem()));
    const [sideLoading, setSideLoading] = useState(true);
    const [page404, setPage404] = useState(false);

    const getPostAndSide = (): void => {
        setPostLoading(true);
        setSideLoading(true);

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

                api.category.retreive(props.category).then((response) => {
                    const categoryData: ICategory = response.data;
                    console.log(post);

                    const info: CardItem = {
                        title: '本帖信息',
                        contents: [{
                            key:
                                <span style={{color: 'rgba(0, 0, 0, .5)' }}>发帖人</span>,
                            value:
                                <span style={{ float: 'right' }}>
                                    {(post as IPost).user_nickname}
                                </span>,
                        }, {
                            key: <span style={{color: 'rgba(0, 0, 0, .5)' }}>本帖回复数</span>,
                            value:
                                <span style={{ float: 'right' }}>
                                    {(post as IPost).reply_num}
                                </span>,
                        }, {
                            key: <span style={{color: 'rgba(0, 0, 0, .5)' }}>最后回复时间</span>,
                            value:
                                <span style={{ float: 'right' }}>
                                    <Tooltip title={(post as IPost).formated_reply_time}>
                                        {getRelativeTime((post as IPost).formated_reply_time)}
                                    </Tooltip>
                                </span>,
                        }],
                    };

                    const rule: CardItem = {
                        title: '本版规则',
                        contents: [{
                            value:
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: marked(categoryData.category_content)
                                    }}
                                />
                        }]
                    };

                    setSideItems([info, rule]);
                    setSideLoading(false);
                });
            }
        }).catch((err) => console.log(err));
    }

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
        getPostAndSide();
        getReposts('0');
    }, []);

    return (
        <div className={`detail-page-root`}>
            {(!isNumber(postId) || page404)
                ? <NotFound
                    prefix='返回上一页'
                    onClick={() => props.history.goBack()}
                />
                : <MainFrame
                    post={post}
                    reposts={reposts}
                    repostNum={repostNum}
                    getReposts={getReposts}
                    postLoading={postLoading}
                    repostsLoading={repostsLoading}
                    sideLoading={sideLoading}
                    sideItems={sideItems}
                />
            }
        </div>
    );
});
