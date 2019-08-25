import React from 'react';

import { IUser } from '../../types';


export interface SuccessInfoProps {
    user: IUser;
};

export default (props: SuccessInfoProps) => (
    <div className='success-info'>
        欢迎回来，{props.user.nickName} <br/>
        3秒后自动跳转
    </div>
);
