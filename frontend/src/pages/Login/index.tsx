import React from 'react';
import { withRouter } from 'react-router-dom';

import { useUser } from '../../hooks';
import LoginForm from '../../components/LoginForm';
import SuccessInfo from '../../components/SuccessInfo';

import { RouteComponentProps } from 'react-router-dom';

import './Login.css';


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

    const userLoginSuccess = () => {
        const clock = setTimeout(() => props.history.goBack(), 3000);
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
