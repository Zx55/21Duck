import React from 'react';
import { Provider } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';

import { Layout } from 'antd';

import AppHeader from './AppHeader';
import AppContent from './AppContent';
import AppFooter from './AppFooter';
import getStore from '../../store';

import { DeepPartial } from 'redux';
import { IState, IUser } from '../../types';

import './App.css';


export interface AppProps extends RouteComponentProps {
    history: History;
}

const App = (props: AppProps) => {
    const visitState: DeepPartial<IState> = {
        user: new IUser(),
    };
    const store = getStore(visitState);

    return (
        <Provider store={store} >
            <Layout className='app'>
                <AppHeader history={props.history} />
                <AppContent />
                <AppFooter />
            </Layout>
        </Provider>
    );
}

export default withRouter(App);
