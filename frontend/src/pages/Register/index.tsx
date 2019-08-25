import React from 'react';
import { useSelector } from 'react-redux';

import RegisterForm from '../../components/RegisterForm';
import SuccessInfo from './SuccessInfo';
import { getUser } from '../../selectors';

import './Register.css';


export default () => {
    const user = useSelector(getUser);

    return (
        <div className='register-root'>
            {user.identity === 0 ? <RegisterForm /> : <SuccessInfo user={user} />}
        </div>
    );
};
