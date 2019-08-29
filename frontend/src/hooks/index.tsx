import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import marked from 'marked';
import { getUser } from '../selectors';

import { Tooltip } from 'antd';

import api from '../api';
import { getRelativeTime, newArrayWithItems } from '../utils';

import { IUser, IPost, IRepost, ICategory, INotFound, Param } from '../types';
import { CardItem } from '../components/SideBar';


const useUser = (): IUser => {
    return useSelector(getUser);
};

const usePosts = (num: number): [
    Array<IPost>, number, boolean, (param: Param) => void
] => {
    const [posts, setPosts] =
        useState(newArrayWithItems<IPost>(num, new IPost()));
    const [postNum, setPostNum] = useState(num);
    const [loading, setLoading] = useState(true);

    const getPosts = (params: Param): void => {
        setLoading(true);

        api.post.list(params).then((response) => {
            const data: Array<IPost> = response.data;
            setPosts(data);
            setPostNum(data[0].posting_num);
            setLoading(false);
        }).catch((err) => console.log(err));
    }

    return [
        posts, postNum, loading, getPosts
    ];
};

type RepostItems = Array<IRepost>;

const useReposts = (num: number): [
    Array<IRepost>, number, boolean, boolean, (params: Param) => void
] => {
    const [reposts, setReposts] =
        useState(newArrayWithItems<IRepost>(num, new IRepost()));
    const [repostNum, setRepostNum] = useState(num);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const getReposts = (params: Param): void => {
        setLoading(true);

        api.repost.list(params).then((response) => {
            const data: RepostItems | boolean = response.data;

            if (data as boolean === false) {
                setNotFound(true);
            } else {
                const repostsData = data as RepostItems;
                setReposts(repostsData);
                setRepostNum(repostsData.length === 0
                    ? 0 : repostsData[0].reposting_num);
                setLoading(false);
            }
        }).catch(err => console.log(err));
    };

    return [
        reposts, repostNum, loading, notFound, getReposts
    ];
};

const useCategorySide = (num: number): [
    Array<CardItem>, boolean, (category: string) => void
] => {
    const [sideItem, setSideItem] =
        useState(newArrayWithItems<CardItem>(num, new CardItem()));
    const [loading, setLoading] = useState(true);

    const getSide = (category: string): void => {
        setLoading(true);

        api.category.retreive(category).then((response) => {
            const data: ICategory = response.data;

            let admins: string = '';
            data.manager.forEach((admin) => admins = admins + admin.nickname + ' ');

            const info: CardItem = {
                title: '本版信息',
                contents: [{
                    key: <span style={{color: 'rgba(0, 0, 0, .5)' }}>今日主题帖</span>,
                    value:
                        <span style={{ float: 'right' }}>
                            {data.posting_num.toString()}
                        </span>,
                }, {
                    key: <span style={{color: 'rgba(0, 0, 0, .5)' }}>今日回帖</span>,
                    value:
                        <span style={{ float: 'right' }}>
                            {data.reposting_num.toString()}
                        </span>,
                }, {
                    key: <span style={{color: 'rgba(0, 0, 0, .5)' }}>最新回复时间</span>,
                    value:
                        <span style={{ float: 'right' }}>
                            <Tooltip title={data.formated_new_reply_time}>
                                {getRelativeTime(data.formated_new_reply_time)}
                            </Tooltip>
                        </span>,
                }, {
                    key: <span style={{color: 'rgba(0, 0, 0, .5)' }}>管理员</span>,
                    value:
                        <span style={{ float: 'right' }}>
                            {admins}
                        </span>,
                }],
            };

            const rule: CardItem = {
                title: '本版规则',
                contents: [{
                    value:
                        <div
                            dangerouslySetInnerHTML={{
                                __html: marked(data.category_content)
                            }}
                        />
                }]
            };

            setSideItem([info, rule]);
            setLoading(false);
        }).catch((err) => console.log(err));
    };

    return [
        sideItem, loading, getSide
    ];
};

const useDetailPost = (sideNum: number): [
    IPost, boolean, boolean, Array<CardItem>, boolean,
    (postId: string, category: string) => void
] => {
    const [post, setPost] = useState(new IPost());
    const [postLoading, setPostLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const [sideItems, setSideItems] =
        useState(newArrayWithItems<CardItem>(sideNum, new CardItem()));
    const [sideLoading, setSideLoading] = useState(true);

    const getPost = (postId: string, category: string): void => {
        setPostLoading(true);
        setSideLoading(true);

        api.post.retreive(postId, { category_id: category}).then((response) => {
            const data: IPost | INotFound | boolean = response.data;

            if ((data as boolean) === false
                || (data as INotFound).detail === 'Not found') {
                setNotFound(true);
            } else {
                const postData = data as IPost;
                setPost(postData);
                setPostLoading(false);

                api.category.retreive(category).then((response) => {
                    const categoryData: ICategory = response.data;

                    const info: CardItem = {
                        title: '本帖信息',
                        contents: [{
                            key:
                                <span style={{color: 'rgba(0, 0, 0, .5)' }}>发帖人</span>,
                            value:
                                <span style={{ float: 'right' }}>
                                    {postData.user_nickname}
                                </span>,
                        }, {
                            key: <span style={{color: 'rgba(0, 0, 0, .5)' }}>本帖回复数</span>,
                            value:
                                <span style={{ float: 'right' }}>
                                    {postData.reply_num}
                                </span>,
                        }, {
                            key: <span style={{color: 'rgba(0, 0, 0, .5)' }}>最后回复时间</span>,
                            value:
                                <span style={{ float: 'right' }}>
                                    <Tooltip title={postData.formated_reply_time}>
                                        {getRelativeTime(postData.formated_reply_time)}
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
    };

    return [
        post, postLoading, notFound, sideItems, sideLoading, getPost
    ];
};

export {
    useUser,
    usePosts,
    useReposts,
    useCategorySide,
    useDetailPost
};
