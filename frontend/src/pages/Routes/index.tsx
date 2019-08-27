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
const PostDetail = lazy(() => import('../../components/PostDetailTemplate'));
const User = lazy(() => import('../User'));

export default () => (
    <Suspense fallback={<Loading />}>
        <Switch>
            <Redirect from='/' to='/explore' exact />
            <Route exact path='/explore' component={Explore} />
            <Route exact path='/chat' component={Chat} />
            <Route exact path='/chat/:postId' render={() =>
                <PostDetail name='chat' category='1'/>}
            />
            <Route exact path='/problems' component={Problems} />
            <Route exact path='/problems/:postId' render={() =>
                <PostDetail name='problems' category='2'/>}
            />
            <Route exact path='/courses' component={Courses} />
            <Route exact path='/courses/:postId' render={() =>
                <PostDetail name='courses' category='3'/>}
            />
            <Route exact path='/campus' component={Campus} />
            <Route exact path='/campus/:postId' render={() =>
                <PostDetail name='campus' category='4'/>}
            />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/user' component={User} />
        </Switch>
    </Suspense>
);
