import React, {lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Loading from '../../components/Loading';
import Login from '../Login';
import Register from '../Register';

const Explore = lazy(() => import('../Explore'));
const Chat = lazy(() => import('../Chat'));
const Problems = lazy(() => import('../Problems'));
const Courses = lazy(() => import('../Courses'));
const Campus = lazy(() => import('../Campus'));


export default () => (
    <Suspense fallback={<Loading />}>
        <Switch>
            <Redirect from='/' to='/explore' exact />
            <Route path='/explore' exact component={Explore} />
            <Route path='/chat' exact component={Chat} />
            <Route path='/problems' exact component={Problems} />
            <Route path='/courses' exact component={Courses} />
            <Route path='/campus' exact component={Campus} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
        </Switch>
    </Suspense>
);
