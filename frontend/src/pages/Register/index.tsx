import React from 'react';

import RegisterForm from '../../components/RegisterForm';
import SuccessInfo from '../../components/SuccessInfo';
import { useUser } from '../../hooks';

import './Register.css';


export default () => {
    const user = useUser();

    return (
        <div className='register-root'>
            {user.identity === 0 ?
                <RegisterForm /> : <SuccessInfo user={user} prefix='注册成功' />}
        </div>
    );
};
