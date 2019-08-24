import React, {lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Loading from '../../components/Loading';
import NormalForm from '../Login';

const Explore = lazy(() => import('../explore'));
const Chat = lazy(() => import('../chat'));
const Problems = lazy(() => import('../problems'));
const Courses = lazy(() => import('../courses'));
const Campus = lazy(() => import('../campus'));


export default () => (
    <Suspense fallback={<Loading />}>
        <Switch>
            <Redirect from='/' to='/explore' exact />
            <Route path='/explore' exact component={Explore} />
            <Route path='/chat' exact component={Chat} />
            <Route path='/problems' exact component={Problems} />
            <Route path='/courses' exact component={Courses} />
            <Route path='/campus' exact component={Campus} />
            <Route path='/login' exact component={NormalForm} />
        </Switch>
    </Suspense>
);
