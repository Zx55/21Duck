import React, { useState, useEffect } from 'react';

import { Card } from 'antd';

import { IUser } from '../../types';

import './SuccessInfo.css';


export interface SuccessInfoProps {
    user: IUser;
    prefix: string;
};

export default (props: SuccessInfoProps) => {
    const [clock, setClock] = useState(3);

    useEffect(() => {
        const timeout = setInterval(() => setClock(c => c - 1), 1000);
        setTimeout(() => clearInterval(timeout), 3100);
    }, []);

    return (
        <Card className='success-info'>
            {props.prefix}，{props.user.nickName} <br/>
            {clock}秒后自动跳转
        </Card>
    );
};
