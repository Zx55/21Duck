import React from 'react';

import './SideBar.css';
import { Card } from 'antd';

export default () => {
    return (
        <div>
            <Card id='ad' title="Default size card">
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card id='ad' title="Default size card">
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </div>
    )
}