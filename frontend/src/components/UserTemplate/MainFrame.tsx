import React from 'react';

import { BackTop, Tabs, Icon } from 'antd';

import UserCard from './UserCard';
import UserPostList from '../UserPostList';
import SideBar from '../SideBar';

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
            <Tabs defaultActiveKey="2">
                <TabPane
                    tab={
                        <span>
                            <Icon type="apple" />
                            我的主贴
                        </span>
                    }
                    key="1"
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
            </Tabs>
            <SideBar
                loading={props.sideLoading}
                userCenter={true} />
            <BackTop className='go-to-top-button' />
        </div>
    );
};
