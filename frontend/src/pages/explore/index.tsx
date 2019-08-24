import React from 'react';

import { Layout } from 'antd';
import Routes from '../Routes';
import Banner from '../../components/Banner'

import './explore.css'

export interface BannerProps {
    className: string;
}

export default () => (
    <div className = 'banner'>
        <Banner className = 'switch-banner'/>
    </div>
);
