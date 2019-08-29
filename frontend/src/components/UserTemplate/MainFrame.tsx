import React from 'react';

import { BackTop, Tabs, Icon } from 'antd';

import UserCard from './UserCard';
import UserPostList from '../UserPostList';
import SideBar from '../SideBar';
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
    name: string;
    posts: Array<IPost>;
    postNum: number;
    postsLoading: boolean;
    sideLoading: boolean;
    getPosts: (page: string) => void;
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
            <Tabs defaultActiveKey="1">
                <TabPane
                    tab={
                        <span>
                            <Icon type="apple" />
                            我的主贴
                        </span>
                    }
                    key="1"
                >
                    <div className='user-center-list-wrapper'>
                        <UserPostList
                            posts={props.posts}
                            loading={props.postsLoading}
                            postNum={props.postNum}
                            getPosts={props.getPosts}
                        />
                    </div>
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <Icon type="android" />
                                我的回复
                        </span>
                    }
                    key="2"
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
                            <Icon type="windows" />
                                修改资料
                        </span>
                    }
                    key="3"
                >
                    <UserData />
                </TabPane>
            </Tabs>
            {/*<SideBar
                loading={props.sideLoading}
                userCenter={true}
                offsetTop={75}
            />*/}
            <BackTop className='user-center-go-to-top-button' />
        </div>
    );
};
