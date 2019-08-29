import React, { useState, useEffect } from 'react';
import marked from 'marked';

import { Carousel, Tooltip } from 'antd';

import { getRelativeTime, newArrayWithItems } from '../../utils';
import api from '../../api';
import MainFrame from './MainFrame';

import { IPost, Param, ICategory } from '../../types';
import { CardItem } from '../SideBar';

import './Template.css';


export interface BannerItem {
    img: string,
    title: string,
    text: string;
};

const items: BannerItem[] = [{
    img: 'https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg',
    title: '揭秘学院路3公寓114寝室',
    text: '每次我过去玩都飘来一股茶香，然后我就被麻晕了什么都不记得了'
}, {
    img: 'https://zos.alipayobjects.com/rmsportal/gGlUMYGEIvjDOOw.jpg',
    title: '早知道编辑器也会。。。',
    text: '调了两天的编辑器终于能高亮了结果和我说用现成的？？？'
}];

export interface PageListTemplateProps {
    category: string;
};

export default (props: PageListTemplateProps) => {
    const [posts, setPosts] = useState(newArrayWithItems<IPost>(15, new IPost()));
    const [postNum, setPostNum] = useState(0);
    const [postsLoading, setPostsLoading] = useState(true);
    const [categoryInfo, setCategoryInfo] =
        useState(newArrayWithItems<CardItem>(3, new CardItem()));
    const [sideLoading, setSideLoading] = useState(true);

    const getPosts = (page: string): void => {
        setPostsLoading(true);

        const params: Param = {
            page: page,
            category_id: props.category,
        };

        api.post.list(params).then((response) => {
            const posts: Array<IPost> = response.data;
            setPostNum(posts[0].posting_num);
            setPosts(posts);
            setPostsLoading(false);
        }).catch(err => console.log(err));
    };

    const getSide = (): void => {
        setSideLoading(true);
        console.log(sideLoading);

        api.category.retreive(props.category).then((response) => {
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

            setCategoryInfo([info, rule]);
            setSideLoading(false);
            console.log(sideLoading);
            console.log('hello');
        }).catch((err) => console.log(err));
    };

    useEffect(() => {
        getPosts('0');
        getSide();
    }, []);

    const renderBanner = (item: BannerItem) => (
        <div onClick={() => console.log(item.title)}>
            <img src={item.img} alt='' />
            <h3>{item.title}</h3>
            <span>{item.text}</span>
        </div>
    );

    return (
        <div className='list-page-root'>
            <Carousel
                autoplay
                effect='fade'
            >
                {items.map((item: BannerItem) => renderBanner(item))}
            </Carousel>
            <MainFrame
                category={props.category}
                posts={posts}
                postNum={postNum}
                getPosts={getPosts}
                postsLoading={postsLoading}
                sideLoading={sideLoading}
                side={categoryInfo}
            />
        </div>
    );
};
