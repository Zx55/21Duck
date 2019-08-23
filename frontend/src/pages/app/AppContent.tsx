import React from 'react';

import { Layout } from 'antd';

import Routes from '../Routes';

const { Content } = Layout;


export default () => (
    <Content className='app-content'>
        <Routes />
    </Content>
);
