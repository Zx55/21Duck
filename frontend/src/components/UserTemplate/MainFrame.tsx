import React, { useState, useEffect } from 'react';

import { BackTop, Tabs, Icon, Card, message } from 'antd';

import UserCard from './UserCard';
import UserPostList from '../UserPostList';
import SideBar, { CardItem } from '../SideBar';
import UserProfile from './UserProfile'
import PwChanger from './PwChanger';

import { IPost, IResponseUser } from '../../types';
import { Item } from '../UserPostList';
import api from '../../api';
import { useReposts, useUser } from '../../hooks';

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
    const user = useUser();
    const [postItems, setPosts] = useState(new Array<Item>());
    const [repostItems, setReposts] = useState(new Array<Item>());
    const [reposts, repostNum, thumbs, repostsLoading, notFound, getReposts] = useReposts(15);

    useEffect(() => {
        const items: Array<Item> = props.posts.map((post) => ({
            id: post.posting_id.toString(),
            category: post.category_id,
            formatedTime: post.formated_posting_time,
            content: post.theme,
        }));
        setPosts(items);
    }, [props.posts]);

    useEffect(() => {
        console.log('repost');
        const items: Array<Item> = reposts.map((repost) => ({
            id: repost.main_posting.toString(),
            category: repost.category_id,
            formatedTime: repost.formated_reposting_time,
            content: repost.reposting_content,
        }));
        setReposts(items);
    }, [reposts]);

    const onPostClick = (id: string, page: string) => {
        message.config({ top: 75 });
        api.post.remove(id).then((response) => {
            message.success('删除成功');
            props.getPosts(page);
        }).catch((err) => {
            message.error('删除失败');
            console.log(err);
        });
    };

    const onRepostClick = (id: string, page: string) => {
        message.config({ top: 75 });
        console.log(id);
        api.repost.remove(id).then((response) => {
            console.log(response);
            message.success('删除成功');
            getReposts({ page: page, user_id: user.userId });
        }).catch((err) => {
            message.error('删除失败');
            console.log(err);
        });
    }

    const onTabChange = (key: string) => {
        switch (key) {
            case 'post': {
                props.getPosts('0');
                break;
            }
            case 'repost': {
                getReposts({
                    page: '0',
                    user_id: user.userId,
                });
                break;
            }
        }
    };

    return (
        <div className='user-template-main-frame'>
            <UserCard
                user_cover={props.userInfo.cover}
                user_head={props.userInfo.head}
                user_nickname={props.userInfo.nickname}
                user_profile={props.userInfo.profile}
            />
            <Tabs
                defaultActiveKey='1'
                animated={{
                    inkBar: true,
                    tabPane: false
                }}
                onChange={onTabChange}
            >
                <TabPane
                    tab={
                        <span>
                            <Icon type='form' />
                            我的主帖
                        </span>
                    }
                    key='post'
                >
                    <Card
                        bodyStyle={{padding:"0px 1px 10px 1px"}}
                        className='user-center-list-wrapper'>
                        <UserPostList
                            items={postItems}
                            loading={props.postsLoading}
                            itemNum={props.postNum}
                            getItems={props.getPosts}
                            onClick={onPostClick}
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
                    key='repost'
                >
                    <Card
                        bodyStyle={{padding:"0px 1px 10px 1px"}}
                        className='user-center-list-wrapper'>
                        <UserPostList
                            items={repostItems}
                            loading={repostsLoading}
                            itemNum={repostNum}
                            getItems={(page: string) => getReposts({
                                page: page,
                                user_id: user.userId,
                            })}
                            onClick={onRepostClick}
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
                    key='user-profile'
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
                    key='pw-changer'
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
