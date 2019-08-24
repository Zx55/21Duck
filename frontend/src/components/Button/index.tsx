import React from 'react';
import cx from 'classnames';

import { Icon } from 'antd';

import './Button.css';


export interface ButtonProps {
    name: string;
    icon: string;
    text: string;
    onClick: (e: any) => any;
};

export default (props: ButtonProps) => (
    <span
        className={cx(`${props.name}-button`, 'button-component-root')}
        onClick={(e) => props.onClick(e)}
    >
        <Icon
            className={cx(`${props.name}-button-icon`, 'button-component-icon')}
            type={props.icon}
        />
        <span className={cx(`${props.name}-button-text`, 'button-component-text')}>
            {props.text}
        </span>
    </span>
);
