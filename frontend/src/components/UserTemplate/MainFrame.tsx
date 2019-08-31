import React from 'react';

import { BackTop, Tabs, Icon, Card } from 'antd';

import UserCard from './UserCard';
import UserPostList from '../UserPostList';
import SideBar, { CardItem } from '../SideBar';
import UserProfile from './UserProfile'
import PwChanger from './PwChanger';

import { IPost, IResponseUser } from '../../types';

const { TabPane } = Tabs;


export interface MainFrameProps {
    userInfo: IResponseUser;
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
                user_cover={props.userInfo.cover}
                user_head={props.userInfo.head}
                user_nickname={props.userInfo.nickname}
                user_profile={props.userInfo.profile}
            />
            <Tabs defaultActiveKey='1'>
                <TabPane
                    tab={
                        <span>
                            <Icon type='form' />
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
                            <Icon type='edit' />
                                我的回帖
                        </span>
                    }
                    key='2'
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
                            <Icon type='profile' />
                                修改资料
                        </span>
                    }
                    key='3'
                >
                    <UserProfile />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <Icon type='security-scan' />
                                修改密码
                        </span>
                    }
                    key='4'
                >
                    <PwChanger />
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
