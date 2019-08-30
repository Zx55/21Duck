import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Result, Icon, Button } from 'antd';

import { IUser } from '../../types';


export interface SuccessInfoProps {
    user: IUser;
    prefix: string;
    clock?: NodeJS.Timeout;
};

export default (props: SuccessInfoProps) => {
    const [timer, setTimer] = useState(3);

    useEffect(() => {
        const timeout = setInterval(() => setTimer(t => t - 1), 1000);
        setTimeout(() => clearInterval(timeout), 3100);
    }, []);

    const onClick = () => {
        if (props.clock) {
            clearTimeout(props.clock);
        }
    };

    return (
        <Result className="success-info"
            status="success"
            icon={<Icon type="smile" theme="twoTone" />}
            title={`${props.prefix}，${props.user.nickName}`}
            subTitle={`${timer}秒后自动跳转`}
            extra={[
                <div className="success-operation">
                    <Button
                        type="primary"
                        key="center"
                        style={{ marginRight: 15 }}
                        onClick={onClick}
                    >
                        <Link to='/User'>个人中心</Link>
                    </Button>
                    <Button key="return" onClick={onClick}>
                        <Link to='/explore'>返回</Link>
                    </Button>
                </div>
            ]}
        />
    );
};
