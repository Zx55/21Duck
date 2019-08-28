import React from 'react';

import { Card } from 'antd';

import './SideBar.css';


export default () => {
    return (
        <div id='side-bar'>
            <Card id='side-card' title="Default size card">
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card id='side-card' title="Default size card">
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </div>
    )
};
