import React from 'react';

import { Icon } from 'antd';

import './Loading.css';


// TODO: 让Loading占据整个页面，而不是显示出底部的Footer
export default () => (
    <div className='loading'>
        <Icon type='loading' className='loading-icon' />
        <div className='loading-text'>Loading</div>
    </div>
);
