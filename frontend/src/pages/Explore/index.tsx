import React from 'react';

import { Carousel, Card } from 'antd';

import Banner from '../../components/ExploreBanner'

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
                <Card
                    title="Default size card"
                    style={{ 
                        width: 300,
                        borderRadius: "0.8ch",
                        margin: "10px",
                    }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card 
                    title="Default size card"
                    style={{ 
                        width: 300,
                        borderRadius: "0.8ch",
                        margin: "10px",
                    }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card title="Default size card" style={{ width: 300 }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </div>
        </div>
    </div >
);
