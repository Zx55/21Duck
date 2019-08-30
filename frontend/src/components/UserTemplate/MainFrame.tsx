import React from 'react';

import { BackTop, Tabs, Icon, Card } from 'antd';

import UserCard from './UserCard';
import UserPostList from '../UserPostList';
import SideBar, { CardItem } from '../SideBar';
import UserData from '../UserData';

import { IPost } from '../../types';

const { TabPane } = Tabs;


const userInfo = {
    user_cover: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    user_head: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    user_nickname: 'kiaia',
    user_profile: 'Happy coding!',
};

export interface MainFrameProps {
    posts: Array<IPost>;
    postNum: number;
    postsLoading: boolean;
    getPosts: (page: string) => void;
    side: Array<CardItem>;
    sideLoading: boolean;
};

export default (props: MainFrameProps) => {
    return (
        <div className='user-template-main-frame'>
            <UserCard
                user_cover={userInfo.user_cover}
                user_head={userInfo.user_head}
                user_nickname={userInfo.user_nickname}
                user_profile={userInfo.user_profile}
            />
            <Tabs defaultActiveKey='1'>
                <TabPane
                    tab={
                        <span>
                            <Icon type='apple' />
                            我的主帖
                        </span>
                    }
                    key='1'
                >
                    <Card 
                        bodyStyle={{padding:"0px 1px 10px 1px"}}
                        className='user-center-list-wrapper'>
                        <UserPostList
                            posts={props.posts}
                            loading={props.postsLoading}
                            postNum={props.postNum}
                            getPosts={props.getPosts}
                        />
                    </Card>
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <Icon type='android' />
                                我的回帖
                        </span>
                    }
                    key='2'
                >
                    <UserPostList
                        posts={props.posts}
                        loading={props.postsLoading}
                        postNum={props.postNum}
                        getPosts={props.getPosts}
                    />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <Icon type='windows' />
                                修改资料
                        </span>
                    }
                    key='3'
                >
                    <UserData />
                </TabPane>
            </Tabs>
            <SideBar
                loading={props.sideLoading}
                userCenter={true}
                offsetTop={75}
                items={props.side}
            />
            <BackTop className='user-center-go-to-top-button' />
        </div>
    );
};
