import React from 'react';

import { Button, BackTop, message } from 'antd';

import { useUser } from '../../hooks'


export interface ListSideButtonsProps {
    setVisible: (visible: boolean) => void;
    setRedirect: (redirect: boolean) => void;
};

export default (props: ListSideButtonsProps) => {
    const user = useUser();

    const warning = () => {
        message.config({ top: 75 });
        message.warning("游客请先登录或注册");
    };

    const onAddClick = () => {
        if (user.identity === 0) {
            warning();
            props.setRedirect(true);
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