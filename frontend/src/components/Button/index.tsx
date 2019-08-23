import React from 'react';

import { Icon } from 'antd';


export interface ButtonProps {
    name: string;
    icon: string;
    text: string;
    onClick: (e: any) => any;
};

export default (props: ButtonProps) => (
    <div
        className={`$(props.name)-button`}
        onClick={(e) => props.onClick(e)}
    >
        <Icon className={`$(props.name)-button-icon`} type={props.icon} />
        <div className={`$(props.name)-button-text`}>{props.text}</div>
    </div>
);
