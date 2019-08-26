import React from 'react';

import LoginForm from '../../components/LoginForm';
import SuccessInfo from './SuccessInfo';
import { useUser } from '../../hooks';

import './Login.css';


export default () => {
    const user = useUser();

    return (
        <div className='login-root'>
            {user.identity === 0 ? <LoginForm /> : <SuccessInfo user={user} />}
        </div>
    );
};
