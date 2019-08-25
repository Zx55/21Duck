import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';

import { Layout } from 'antd';

import AppHeader from './AppHeader';
import AppContent from './AppContent';
import AppFooter from './AppFooter';
import getStore from '../../store';
import Loading from '../../components/Loading';

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
    const { store, persistor } = getStore(visitState);

    return (
        <Provider store={store} >
            <PersistGate loading={<Loading />} persistor={persistor} >
                <Layout className='app'>
                    <AppHeader history={props.history} />
                    <AppContent />
                    <AppFooter />
                </Layout>
            </PersistGate>
        </Provider>
    );
}

export default withRouter(App);
