import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import { useUser } from '../../hooks';
import { agreeAsync } from '../../actions';
import SuccessInfo from './SuccessInfo';
import LoginForm from '../../components/LoginForm';
import Agreement from '../../components/Agreement';

import { RouteComponentProps } from 'react-router-dom';


export interface LoginProps extends RouteComponentProps { }

export default withRouter((props: LoginProps) => {
    const user = useUser();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const userLoginSuccess = () => {
        const clock = setTimeout(() => props.history.push('/explore'), 3000);
        return (
            <SuccessInfo
                user={user}
                prefix='欢迎回来'
                clock={clock}
            />
        );
    };

    const onOkClick = () => {
        setVisible(false);
        dispatch(agreeAsync(
            user.userId,
            props.history,
        ));
    };

    useEffect(() => {
        if (user.identity === 3) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [user.identity]);

    return (
        <div className='login-root'>
            {(user.identity === 1 || user.identity === 2) && userLoginSuccess()}
            {(user.identity === 0 || user.identity === 3) && <LoginForm />}
            <Agreement
                visible={visible}
                onOkClick={onOkClick}
            />
        </div>
    );
});