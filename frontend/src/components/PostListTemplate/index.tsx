import React, { useEffect } from 'react';

import { Carousel } from 'antd';

import { usePosts, useCategorySide, useUser } from '../../hooks';
import MainFrame from './MainFrame';

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
    const user = useUser();
    const [posts, postNum, postsLoading, getPosts] = usePosts(15);
    const [side, sideLoading, getSide] = useCategorySide(3);

    useEffect(() => {
        getPosts({
            page: '0',
            category_id: props.category,
            user_id: '123456',
        });
        getSide(props.category);
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
                getPosts={
                    (page: string) => getPosts({
                        page: page,
                        category_id: props.category,
                        user_id: '123456',
                    })
                }
                postsLoading={postsLoading}
                sideLoading={sideLoading}
                side={side}
            />
        </div>
    );
};
