import React, { useState, useEffect } from 'react';

import { IUser } from '../../types';


export interface SuccessInfoProps {
    user: IUser;
    prefix: string;
};

export default (props: SuccessInfoProps) => {
    const [clock, setClock] = useState(3);

    useEffect(() => {
        const timeout = setInterval(() => setClock(clock - 1), 1000);
        setTimeout(() => clearInterval(timeout), 3100);
    }, []);

    return (
        <div className='success-info'>
            {props.prefix}，{props.user.nickName} <br/>
            {clock}秒后自动跳转
        </div>
    );
};
