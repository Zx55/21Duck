import React from 'react';

import { Icon } from 'antd';

import './Loading.css';


export default () => (
    <div className='loading'>
        <Icon type='loading' className='loading-icon' />
        <div className='loading-text'>Loading</div>
    </div>
);
