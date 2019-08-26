import React, { useState, useEffect } from 'react';

import { Card, Result, Icon, Button } from 'antd';

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
        <Result className="success-info"
            status="success"
            icon={<Icon type="smile" theme="twoTone" />}
            title={`${props.prefix}，${props.user.nickName}`}
            subTitle={`${clock}秒后自动跳转`}
            extra={[
                <div className="success-operation">
                    <Button type="primary" key="center" style={{ marginRight: 15 }}>
                        个人中心
                    </Button>
                    <Button key="return">
                        返回首页
                    </Button>
                </div>

            ]}
        />
    );
};

/*
{props.prefix}，{props.user.nickName} <br/>
            {clock}秒后自动跳转
            */