import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import marked from 'marked';
import { getUser } from '../selectors';

import { Tooltip } from 'antd';

import api from '../api';
import { getRelativeTime, newArrayWithItems } from '../utils';

import { IUser, IPost, IRepost, ICategory, INotFound, Param,
    IResponseUser, IResponsePost, IResponseRepost, IResponseDetailPost } from '../types';
import { CardItem } from '../components/SideBar';


const useUser = (): IUser => {
    return useSelector(getUser);
};

const usePosts = (num: number): [
    Array<IPost>, number, Array<boolean>, boolean, (param: Param) => void
] => {
    const [posts, setPosts] =
        useState(newArrayWithItems<IPost>(num, new IPost()));
    const [postNum, setPostNum] = useState(num);
    const [loading, setLoading] = useState(true);
    const [thumbs, setThumbs] = useState(new Array<boolean>());

    const getPosts = (params: Param): void => {
        setLoading(true);

        api.post.list(params).then((response) => {
            const data: IResponsePost = response.data;

            setPosts(data.postings);
            setPostNum(data.posting_num);
            setThumbs(data.thumbs);
            setLoading(false);
        }).catch((err) => console.log(err));
    }

    return [
        posts, postNum, thumbs, loading, getPosts
    ];
};

const useReposts = (num: number): [
    Array<IRepost>, number, Array<boolean>, boolean, boolean, (params: Param) => void
] => {
    const [reposts, setReposts] =
        useState(newArrayWithItems<IRepost>(num, new IRepost()));
    const [repostNum, setRepostNum] = useState(num);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [thumbs, setThumbs] = useState(new Array<boolean>());

    const getReposts = (params: Param): void => {
        setLoading(true);

        api.repost.list(params).then((response) => {
            const data: IResponseRepost | boolean = response.data;
            if (data as boolean === false) {
                setNotFound(true);
            } else {
                const responseRepost = data as IResponseRepost;
                setReposts(responseRepost.repostings);
                setRepostNum(responseRepost.reposting_num);
                setThumbs(responseRepost.thumbs);
                setLoading(false);
                //console.log("repost after setting:",thumbs);
            }
        }).catch(err => console.log(err));
    };

    return [
        reposts, repostNum, thumbs, loading, notFound, getReposts
    ];
};

const useCategorySide = (num: number): [
    Array<CardItem>, boolean, (category: string) => void
] => {
    const [sideItems, setSideItems] =
        useState(newArrayWithItems<CardItem>(num, new CardItem()));
    const [loading, setLoading] = useState(true);

    const getSide = (category: string): void => {
        setLoading(true);

        api.category.retreive(category).then((response) => {
            const data: ICategory = response.data;

            let admins: string = '';
            data.manager.forEach((admin) => admins = admins + admin.nickname + ' ');

            const keyStyle = { color: 'rgba(0, 0, 0, .5)' };
            const valueStyle: React.CSSProperties = { float: 'right' };

            const info: CardItem = {
                title: '本版信息',
                contents: [{
                    key: <span style={keyStyle}>今日主题帖</span>,
                    value:
                        <span style={valueStyle}>
                            {data.posting_num.toString()}
                        </span>,
                }, {
                    key: <span style={keyStyle}>今日回帖</span>,
                    value:
                        <span style={valueStyle}>
                            {data.reposting_num.toString()}
                        </span>,
                }, {
                    key: <span style={keyStyle}>最新回复时间</span>,
                    value:
                        <span style={valueStyle}>
                            <Tooltip title={data.formated_new_reply_time}>
                                {getRelativeTime(data.formated_new_reply_time)}
                            </Tooltip>
                        </span>,
                }, {
                    key: <span style={keyStyle}>管理员</span>,
                    value:
                        <span style={valueStyle}>
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

            setSideItems([info, rule]);
            setLoading(false);
        }).catch((err) => console.log(err));
    };

    return [
        sideItems, loading, getSide
    ];
};

const useDetailPost = (sideNum: number): [
    IPost, boolean, boolean, Array<CardItem>, boolean, boolean,
    (postId: string, category: string, userId: string) => void
] => {
    const [post, setPost] = useState(new IPost());
    const [postLoading, setPostLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [thumb,setThumb] = useState(false);

    const [sideItems, setSideItems] =
        useState(newArrayWithItems<CardItem>(sideNum, new CardItem()));
    const [sideLoading, setSideLoading] = useState(true);

    const getPost = (postId: string, category: string, userId: string): void => {
        setPostLoading(true);
        setSideLoading(true);

        api.post.retreive(postId, {
            user_id: userId,
            category_id: category}
        ).then((response) => {
            const data: IResponseDetailPost | INotFound | boolean = response.data;

            if ((data as boolean) === false
                || (data as INotFound).detail === 'Not found') {
                setNotFound(true);
            } else {
                const responseDetailPost = data as IResponseDetailPost;

                setPost(responseDetailPost.posting);
                setPostLoading(false);
                setThumb(responseDetailPost.thumb);

                //console.log(thumb);

                api.category.retreive(category).then((response) => {
                    const categoryData: ICategory = response.data;

                    const keyStyle = { color: 'rgba(0, 0, 0, .5)' };
                    const valueStyle: React.CSSProperties = { float: 'right' };

                    const info: CardItem = {
                        title: '本帖信息',
                        contents: [{
                            key:
                                <span style={keyStyle}>发帖人</span>,
                            value:
                                <span style={valueStyle}>
                                    {responseDetailPost.posting.user_nickname}
                                </span>,
                        }, {
                            key: <span style={keyStyle}>本帖回复数</span>,
                            value:
                                <span style={valueStyle}>
                                    {responseDetailPost.posting.reply_num}
                                </span>,
                        }, {
                            key: <span style={keyStyle}>最后回复时间</span>,
                            value:
                                <span style={valueStyle}>
                                    <Tooltip title={responseDetailPost.posting.formated_reply_time}>
                                        {getRelativeTime(responseDetailPost.posting.formated_reply_time)}
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
        post, postLoading, notFound, sideItems, sideLoading, thumb, getPost
    ];
};

const useUserSide = (num: number): [
    Array<CardItem>, boolean, (userId: string) => void
] => {
    const [sideItems, setSideItems] =
        useState(newArrayWithItems<CardItem>(num, new CardItem()));
    const [loading, setLoading] = useState(false);

    const getSide = (userId: string): void => {
        setLoading(true);

        api.user.retreive(userId).then((response) => {
            const data: IResponseUser = response.data;

            const keyStyle = { color: 'rgba(0, 0, 0, .5)' };
            const valueStyle: React.CSSProperties = { float: 'right' };

            const info: CardItem = {
                title: '个人信息',
                contents: [{
                    key: <span style={keyStyle}>昵称</span>,
                    value:
                        <span style={valueStyle}>
                            {data.nickname}
                        </span>,
                }, {
                    key: <span style={keyStyle}>年龄</span>,
                    value:
                        <span style={valueStyle}>
                            {data.age}
                        </span>,
                }, {
                    key: <span style={keyStyle}>学校</span>,
                    value:
                        <span style={valueStyle}>
                            {data.school}
                        </span>,
                }, {
                    key: <span style={keyStyle}>积分</span>,
                    value:
                        <span style={valueStyle}>
                            {data.scores}
                        </span>,
                }],
            };

            const rule: CardItem = {
                title: '个人简介',
                contents: [{
                    value:
                        <div
                            dangerouslySetInnerHTML={{
                                __html: marked(data.profile == undefined ? '暂无' : data.profile)
                            }}
                        />
                }]
            };

            setSideItems([info, rule]);
            setLoading(false);
        });
    };

    return [
        sideItems, loading, getSide
    ]
};

export {
    useUser,
    usePosts,
    useReposts,
    useCategorySide,
    useDetailPost,
    useUserSide,
};
