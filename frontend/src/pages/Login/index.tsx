import React from 'react';

import { useUser } from '../../hooks';
import LoginForm from '../../components/LoginForm';
import SuccessInfo from '../../components/SuccessInfo';

import './Login.css';


export default () => {
    const user = useUser();

    return (
        <div className='login-root'>
            {user.identity === 0 ?
                <LoginForm /> : <SuccessInfo user={user} prefix='欢迎回来' />}
        </div>
    );
};

