import React from 'react';
import { Icon, Carousel, Card, Divider } from 'antd';
import { Link } from 'react-router-dom';
import Banner from '../../components/ExploreBanner'
import ExploreCardList from '../../components/ExploreTempList'
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
        <Divider/>
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
                <Divider/>
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
                <Divider/>
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
                <Divider/>
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
