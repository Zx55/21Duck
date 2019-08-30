import React from 'react';

import { Carousel, Card } from 'antd';

import Banner from '../../components/ExploreBanner'
import ExploreCardList from  '../../components/ExploreTempList'
import './Explore.css';

export interface BannerProps {
    className: string;
}

export default () => (
    <div>
        <div className='banner'>
            <Banner className='switch-banner' />
        </div>
        <div className='side-banner'>
            <Carousel
                autoplay
                style={{
                    textAlign: "center",
                    height: "450px",
                    lineHeight: "460px",
                    background: "#3399ff",
                    overflow: "hidden",
                }}
            >
                <div color="#FFFFFF">
                    1
                </div>
                <div>
                    2
                </div>
                <div>
                    3
                </div>
                <div>
                    4
                </div>
            </Carousel>
        </div>
        <div>
            <div className="container">
                <div className="subtitle">闲聊栈</div>
                <ExploreCardList  name="problem" category='1'/>
                <div className="subtitle">AK我的oj题</div>
                <ExploreCardList  name="problem" category='2'/>
                <div className="subtitle">课程资源</div>
                <ExploreCardList  name="problem" category='3'/>
                <div className="subtitle">校园周边</div>
                <ExploreCardList  name="problem" category='4'/>
            </div>
            
        </div>
    </div >
);
