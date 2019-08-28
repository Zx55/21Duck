import React from 'react';

import { Card, Affix } from 'antd';

import './SideBar.css';


export interface SideBarProps {
    loading: boolean;
}

export default (props: SideBarProps) => {
    return (
        <div id='side-bar'>
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
