import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { message } from 'antd';

import { useUser } from '../../hooks';
import { agreeAsync } from '../../actions';
import LoginForm from '../../components/LoginForm';
import Agreement from '../../components/Agreement';

import { RouteComponentProps } from 'react-router-dom';


export interface LoginProps extends RouteComponentProps { }

export default withRouter((props: LoginProps) => {
    const user = useUser();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

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

        if (user.identity === 1 || user.identity === 2) {
            setTimeout(() => props.history.push('/explore'), 300);
            message.config({ top: 75 });
            message.info('登录成功！返回首页');
        }


    }, [user.identity]);

    return (
        <div className='login-root'>
            <LoginForm />
            <Agreement
                visible={visible}
                onOkClick={onOkClick}
            />
        </div>
    );
});