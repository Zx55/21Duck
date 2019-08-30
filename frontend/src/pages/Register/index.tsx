import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { useUser } from '../../hooks';
import RegisterForm from '../../components/RegisterForm';
import Agreement from '../../components/Agreement';

import { RouteComponentProps } from 'react-router-dom';

import './Register.css';


export default withRouter((props: RouteComponentProps) => {
    const user = useUser();
    const [visible, setVisible] = useState(false);

    const onOkClick = () => {
        setVisible(false);
        props.history.push('/explore');
    };

    useEffect(() => {
        if (user.identity === 3) {
            setVisible(true);
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
