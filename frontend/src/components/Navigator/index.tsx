import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { History } from 'history';

import { Menu, Input, Icon } from 'antd';

import { getUser } from '../../selectors';
import { logout } from '../../actions';

import { ClickParam } from 'antd/lib/menu';
import { IUser } from '../../types';

import './Navigator.css';

const { Item, SubMenu } = Menu;
const { Search } = Input;


export interface NavigatorProps {
    history: History;
};

export default (props: NavigatorProps) => {
    const [menuKey, setKey] = useState(props.history.location.pathname.slice(1));
    const user: IUser = useSelector(getUser);
    const dispatch = useDispatch();

    const handleClick = (e: ClickParam) => {
        if (e.key !== 'notify') {
            setKey(e.key);
        }
    }

    useEffect(() => {
        console.log(user);
    });

    return (
        <Menu
            className='navigator'
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['explore']}
            selectedKeys={[menuKey]}
            onClick={handleClick}
        >
            <Item key='explore'>
                <Link to='/explore'>首页</Link>
            </Item>
            <Item key='chat'>
                <Link to='/chat'>闲聊栈</Link>
            </Item>
            <Item key='problems'>
                <Link to='/problems'>AK我的OJ题</Link>
            </Item>
            <Item key='courses'>
                <Link to='/courses'>课程资源</Link>
            </Item>
            <Item key='campus'>
                <Link to='/campus'>校园周边</Link>
            </Item>
            {user.identity === 0 ? (
                <Item
                    className='user'
                    key='user'
                >
                    <Link to='/login'>
                        <Icon type='user' />
                        登录
                    </Link>
                </Item>
            ) : (
                <SubMenu
                    className='user-menu'
                    title={
                        <span>
                            <Icon type='user' />
                            用户
                        </span>
                    }
                >
                    <Item key='logout' onClick={() => {
                        dispatch(logout());
                    }}>
                        注销
                    </Item>
                </SubMenu>
            )}
            <Item
                className='notify'
                key='notify'
                onClick={(e: ClickParam) => console.log('bell')}
            >
                <Icon type='bell' />
                通知
            </Item>
            <Search
                className='navigator-search'
                placeholder='search'
                onSearch={(e: string) => console.log(e)}
            />
        </Menu>
    );
};
