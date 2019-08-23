import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { History } from 'history';

import { Menu, Input, Icon } from 'antd';

import './Navigator.css';
import { ClickParam } from 'antd/lib/menu';

const { Item, SubMenu } = Menu;
const { Search } = Input;


export interface NavigatorProps {
    history: History;
};

export default (props: NavigatorProps) => {
    const [menuKey, setKey] = useState(props.history.location.pathname.slice(1));

    const handleClick = (e: ClickParam) => {
        if (e.key !== 'notify') {
            setKey(e.key);
        }
    }

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
            <Search
                className='navigator-search'
                placeholder='search'
                onSearch={(e: string) => console.log(e)}
            />
            <Item
                className='notify'
                key='notify'
                onClick={(e: ClickParam) => console.log('bell')}
            >
                <Icon type='bell' />
                通知
            </Item>
            <SubMenu
                className='user-menu'
                title={
                    <span>
                        <Icon type='user' />
                        用户
                    </span>
                }
            >
                <Item key='login'>登录</Item>
                <Item key='register'>注册</Item>
            </SubMenu>
        </Menu>
    );
};
