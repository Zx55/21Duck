import React from 'react';
import cx from 'classnames';

import { Card, Affix } from 'antd';

import './SideBar.css';


export interface SideBarProps {
    loading: boolean;
    userCenter: boolean;
}

export default (props: SideBarProps) => {
    return (
        <div className={cx(props.userCenter 
            ? 'user-center-side-bar' : 'normal-side-bar')}>
            <Affix offsetTop={65}>
                <Card
                    id='side-card'
                    title="Default size card"
                    loading={props.loading}
                >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <Card
                    id='side-card'
                    title="Default size card"
                    loading={props.loading}
                >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </Affix>
        </div>
    );
};
