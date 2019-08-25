import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';

import { Layout } from 'antd';

import AppHeader from './AppHeader';
import AppContent from './AppContent';
import AppFooter from './AppFooter';

import './App.css';


export interface AppProps extends RouteComponentProps {
    history: History;
}

const App = (props: AppProps) => (
    <Layout className='app'>
        <AppHeader history={props.history} />
        <AppContent />
        <AppFooter />
    </Layout>
);

export default withRouter(App);
