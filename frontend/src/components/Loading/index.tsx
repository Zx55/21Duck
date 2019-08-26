import React from 'react';

import { Spin } from 'antd';

import './Loading.css';


// TODO: 让Loading占据整个页面，而不是显示出底部的Footer
export default () => (
    <Spin className='loading' size='large' />
);
