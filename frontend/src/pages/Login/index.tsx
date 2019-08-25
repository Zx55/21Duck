import React from 'react';
import { useSelector } from 'react-redux';

import { getUser } from '../../selectors';
import LoginForm from '../../components/LoginForm';
import SuccessInfo from './SuccessInfo';

import './Login.css';


export default () => {
    const user = useSelector(getUser);

    return (
        <div className='login-root'>
            {user.identity === 0 ? <LoginForm /> : <SuccessInfo user={user} />}
        </div>
    );
};
