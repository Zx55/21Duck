import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import { useUser } from '../../hooks';
import { agreeAsync } from '../../actions';
import RegisterForm from '../../components/RegisterForm';
import Agreement from '../../components/Agreement';

import { RouteComponentProps } from 'react-router-dom';

import './Register.css';
import { message } from 'antd';


export default withRouter((props: RouteComponentProps) => {
    const user = useUser();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const onOkClick = () => {
        setVisible(false);
        dispatch(agreeAsync(
            user.userId,
            props.history
        ));
    };

    useEffect(() => {
        if (user.identity === 3) {
            setVisible(true);
        } else {
            setVisible(false);
        }

        if (user.identity === 1 || user.identity === 2) {
            message.config({ top: 75 });
            message.success('欢迎使用21Duck论坛');
            setTimeout(() => props.history.push('/explore'), 300);
        }
    }, [user.identity])

    return (
        <div className='register-root'>

            <RegisterForm />
            <Agreement
                visible={visible}
                onOkClick={onOkClick}
            />
        </div>
    );
});
