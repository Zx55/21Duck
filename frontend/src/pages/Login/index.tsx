import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { useUser } from '../../hooks';
import LoginForm from '../../components/LoginForm';
import SuccessInfo from './SuccessInfo';
import Agreement from '../../components/Agreement';

import { RouteComponentProps } from 'react-router-dom';

import './Login.css';
import api from '../../api';


// const URL= 'https://pic1.zhimg.com/v2-99413d2b2721b9fc33280ca041902aac_b.jpg';

/*
var sectionStyle = {
  width: "100%",
  height: "400px",
  backgroundImage: `url(${URL})`
};
*/

export interface LoginProps extends RouteComponentProps { }

export default withRouter((props: LoginProps) => {
    const user = useUser();
    const [visible, setVisible] = useState(false);

    const userLoginSuccess = () => {
        const clock = setTimeout(() => props.history.goBack(), 3000);
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
        props.history.push('/explore');
    };

    useEffect(() => {
        if (user.identity === 3) {
            setVisible(true);
        }
    }, [user.identity]);

    return (
        <div className='login-root'>
            {user.identity === 0 && <LoginForm />}
            {user.identity === 1 && userLoginSuccess()}
            <Agreement
                visible={visible}
                onOkClick={onOkClick}
            />
        </div>
    );
});
