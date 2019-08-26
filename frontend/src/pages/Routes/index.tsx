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


interface PageRouteProps {
    name: string;
    component: React.LazyExoticComponent<() => JSX.Element>;
};

const PageRoute = (props: PageRouteProps) => (
    <div>
        <Route exact path={`/${props.name}`} component={props.component} />
        <Route exact path={`/${props.name}/:postId`} component={PostDetail} />
    </div>
);

export default () => (
    <Suspense fallback={<Loading />}>
        <Switch>
            <Redirect from='/' to='/explore' exact />
            <Route path='/explore' exact component={Explore} />
            <PageRoute name='chat' component={Chat} />
            <PageRoute name='problems' component={Problems} />
            <PageRoute name='courses' component={Courses} />
            <PageRoute name='campus' component={Campus} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
        </Switch>
    </Suspense>
);
