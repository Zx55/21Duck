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
const PostDetail = lazy(() => import('../../components/PostDetail'));


export default () => (
    <Suspense fallback={<Loading />}>
        <Switch>
            <Redirect from='/' to='/explore' exact />
            <Route exact path='/explore' component={Explore} />
            <Route exact path='/chat' component={Chat} />
            <Route exact path='/chat/:postId' component={PostDetail} />
            <Route exact path='/problems' component={Problems} />
            <Route exact path='/problems/:postId' component={PostDetail} />
            <Route exact path='/courses' component={Courses} />
            <Route exact path='/courses/:postId' component={PostDetail} />
            <Route exact path='/campus' component={Campus} />
            <Route exact path='/campus/:postId' component={PostDetail} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
        </Switch>
    </Suspense>
);
