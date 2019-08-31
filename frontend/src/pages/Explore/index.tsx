import React from 'react';
import { Icon, Carousel, Card, Divider } from 'antd';
import { Link } from 'react-router-dom';
import Banner from '../../components/ExploreBanner'
import ExploreCardList from '../../components/ExploreTempList'
import './Explore.css';
import SideBar from '../../components/SideBar';

export interface BannerProps {
    className: string;
}
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
const renderBanner = (item: BannerItem) => (
    <div onClick={() => console.log(item.title)} className='sideexplore'>
        <img src={item.img} alt='' />
        <h3>{item.title}</h3>
        <span>{item.text}</span>
    </div>
);

export default () => (
    <div>
        <div className='banner'>
            <Banner className='switch-banner' />
        </div>
        <div className='side-banner'>
            <div className='bar-padding'>
                <Carousel
                    autoplay
                    style={{
                        textAlign: "left",
                        height: "222px",
                        lineHeight: "460px",
                        background: "#3399ff",
                        overflow: "hidden",

                    }}
                >
                    <div color="#FFFFFF">
                        {items.map((item: BannerItem) => renderBanner(item))}
                    </div>
                    <div>
                        2
                    </div>

                </Carousel>
            </div>
            <div className='bar-padding'>
                <Carousel
                    autoplay
                    style={{
                        textAlign: "center",
                        height: "222px",
                        lineHeight: "460px",
                        background: "#3399ff",
                        overflow: "hidden",


                    }}
                >
                    <div color="#FFFFFF">
                        <Link to='/problems/250'>
                            {items.map((item: BannerItem) => renderBanner(item))}

                        </Link>
                    </div>
                    <div>
                        <Link to='/problems/250'>
                            2
                        </Link>

                    </div>

                </Carousel>
            </div>
        </div>
       
        <div>


            <Divider />
            <div className="container">
                <div className="subtitlecon">
                    <span className="subtitle">闲聊栈</span>
                    <span className="toPage">
                        <Link to='/chat'>
                            <Icon type="export" />
                            更多
                    </Link>
                    </span>
                </div>

                <ExploreCardList name="problem" category='1' />
                <Divider />
                <div className="subtitlecon">
                    <span className="subtitle">AK我的oj题</span>
                    <span className="toPage">
                        <Link to='/problems'>
                            <Icon type="export" />
                            更多
                    </Link>
                    </span>
                </div>
                <ExploreCardList name="problem" category='2' />
                <Divider />
                <div className="subtitlecon">
                    <span className="subtitle">课程资源</span>
                    <span className="toPage">
                        <Link to='/courses'>
                            <Icon type="export" />
                            更多
                    </Link>
                    </span>
                </div>
                <ExploreCardList name="problem" category='3' />
                <Divider />
                <div className="subtitlecon">
                    <span className="subtitle">校园周边</span>
                    <span className="toPage">
                        <Link to='/campus'>
                            <Icon type="export" />
                            更多
                    </Link>
                    </span>
                </div>
                <ExploreCardList name="problem" category='4' />

            </div>

        </div>
    </div >
);
