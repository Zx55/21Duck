import React from 'react';
import { withRouter } from 'react-router-dom';

import { useUser } from '../../hooks';
import LoginForm from '../../components/LoginForm';
import SuccessInfo from '../../components/SuccessInfo';

import { RouteComponentProps } from 'react-router-dom';

import './Login.css';


export interface LoginProps extends RouteComponentProps { }

export default withRouter((props: LoginProps) => {
    const user = useUser();

    const userLoginSuccess = () => {
        const clock = setTimeout(() => props.history.push('/explore'), 3000);
        return (
            <SuccessInfo
                user={user}
                prefix='欢迎回来'
                clock={clock}
            />
        );
    }

    return (
        <div className='login-root'>
            {user.identity === 0 ? <LoginForm /> : userLoginSuccess()}
        </div>
    );
});
