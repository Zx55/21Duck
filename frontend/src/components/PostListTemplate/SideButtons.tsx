import React from 'react';

import { Button, BackTop, message } from 'antd';

import { useUser } from '../../hooks'


export interface ListSideButtonsProps {
    setVisible: (visible: boolean) => void;
    setRedirect: (redirect: boolean) => void;
};

export default (props: ListSideButtonsProps) => {
    const user = useUser();

    const warning = (msg: string) => {
        message.config({ top: 75 });
        message.warning(msg);
    };

    const error = (msg: string) => {
        message.config({ top: 75 });
        message.error(msg);
    };

    const onAddClick = () => {
        console.log(user);
        if (user.identity === 0) {
            warning('游客请先登录或注册');
            props.setRedirect(true);
        } else if (user.identity === 3) {
            warning('请先阅读新手上路');
            props.setRedirect(true);
        } else if (user.blocktime !== 0) {
            error('你已被禁言！请联系管理员');
        } else {
            props.setVisible(true);
        }
    };

    return (
        <div>
            <Button
                className='post-button'
                type='primary'
                icon='plus'
                shape='circle'
                size='large'
                onClick={onAddClick}
            />
            <BackTop className='go-to-top-button' />
        </div>
    );
}