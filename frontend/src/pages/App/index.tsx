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
const URL= 'http://www.win4000.com/mobile_detail_135039_2.html';



var sectionStyle = {
    width: "100%",
    height: "3500px",
  // makesure here is String确保这里是一个字符串，以下是es6写法
    backgroundImage: `url(${URL})` ,
   
};

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
                <Layout className='app' 
    style={sectionStyle} >
                    
                    <AppHeader history={props.history} />
                    <AppContent />
                    <AppFooter />
                </Layout>
            </PersistGate>
        </Provider>
    );
}

export default withRouter(App);
