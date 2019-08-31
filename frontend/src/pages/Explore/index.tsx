import React from 'react';
import { Icon, Carousel, Card, Divider, Tabs } from 'antd';
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

};
const { TabPane } = Tabs;
const items: BannerItem[] = [{
    img: 'https://ch3302files.storage.live.com/y4p8V0WSEVZhW7x9hkA4HTuxm85eviUC4UH6MeKyPREyNsyXOrVDCsSHLnS1t1cS2T8L8bbh_t6nx5uPo38BtDI0c2A3O_yYyzM8zXx7F7LdEUt_5g0Ag_0TXbOrCkjZQBAekCq6HXyGt8FQj4D9naUbaUa4hG_M27yiGAxba_WjSayT3ka8W7lLholPNghGSbP/duckv2.png?psid=1&width=1920&height=721',
    title: '21duck团队出品',

}, {
    img: 'https://ionicframework.com/blog/wp-content/uploads/2019/02/react-beta.png',
    title: '前端 react+redux+react-router '
}
    , {
    img: 'https://joshuaavalon.io/static/b9ed8524d4fc3d0e0879cbd4d21419ea/94286/cover.png',
    title: '整体设计 ant design'
}];
const items2: BannerItem[] = [{
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9NvnzzeU0pVZW74FAxnh9vKj5Phz-m3H-4w-TubhLPcJeeUL6',
    title: '后端 django+mysql+redis',

}, {
    img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2239144230,720408640&fm=11&gp=0.jpg',
    title: '通信 axios 部署 nginx+uwsgi+serve'
}
    , {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9abiAwZw9mROnPsH1aP7CskXPDLjQHpGwzYbGdIGlwBu1LN95',
    title: 'huaweicloud 云平台支持'
}];

export interface PageListTemplateProps {
    category: string;
};
const renderBanner = (item: BannerItem) => (
    <div onClick={() => console.log(item.title)} className='sideexplore'>
        <img src={item.img} alt='' />
        <h3>{item.title}</h3>
    </div>
);

export default () => (
    <div>

        <div className='banner'>
            <Banner className='switch-banner' />
        </div>
        <div className='side-banner'>
            <div className='bar-padding'>
                <Carousel className="sidecar2"
                    autoplay
                    style={{


                        height: "222px",
                        background: "#ffffff",
                        overflow: "hidden",

                    }}
                    effect="fade"
                >
                    {items.map((item: BannerItem) => renderBanner(item))}

                </Carousel>
            </div>
            <div className='bar-padding'>
                <Carousel className="sidecar2"
                    autoplay
                    style={{

                        textAlign: "center",
                        height: "222px",
                        background: "#ffffff",
                        overflow: "hidden",

                    }}
                    effect="fade"
                >
                    {items2.map((item: BannerItem) => renderBanner(item))}

                </Carousel>
            </div>
        </div>

        <div>



            <div className="container">

                <Tabs>
                    <TabPane
                        tab={
                            <Link to='/problems'>
                                <Icon type='form' />
                                闲聊栈
                            </Link>
                        }
                    >
                        <ExploreCardList name="problem" category='1' />
                    </TabPane>
                </Tabs>
                
                <Tabs>
                    <TabPane
                        tab={
                            <Link to='/problems' className="linktitile"><Icon type="code" />  AK我的oj题</Link>
                        }
                    >
                        <ExploreCardList name="problem" category='2' />
                    </TabPane>
                </Tabs>
                <Tabs>
                    <TabPane
                        tab={
                            <Link to='/courses' className="linktitile"><Icon type="book" />  课程推荐</Link>
                        }
                    >
                        <ExploreCardList name="problem" category='3' />
                    </TabPane>
                </Tabs>
                <Tabs>
                    <TabPane
                        tab={
                            <Link to='/campus' className="linktitile" ><Icon type="laptop" />  校园周边</Link>
                        }
                    >
                        <ExploreCardList name="problem" category='4' />
                    </TabPane>
                </Tabs>
                <Tabs>
                    <TabPane
                        tab={
                            <Link to='/resources' className="linktitile"><Icon type="folder-open" />  资源分享</Link>
                        }
                    >
                        <ExploreCardList name="problem" category='5' />
                    </TabPane>
                </Tabs>
                

            </div>

        </div>
    </div >
);
