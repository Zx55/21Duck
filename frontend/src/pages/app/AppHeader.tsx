import React from 'react';
import { History } from 'history';

import { Layout } from 'antd';

import Navigator from '../../components/Navigator';

const { Header } = Layout;


export interface AppHeaderProps {
    history: History;
};

export default (props: AppHeaderProps) => (
    <Header className='app-header'>
        <Navigator history={props.history} />
    </Header>
);
