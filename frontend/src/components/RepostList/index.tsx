import React from 'react';

import { List } from 'antd';

import Repost from '../Repost';

import { RepostItem } from '../../types';

import './RepostList.css';


export interface RepostListProps {
    reposts: Array<RepostItem>;
    loading: boolean;
};

export default (props: RepostListProps) => {
    return (
        <List
            className='repost-list'
            itemLayout='horizontal'
            dataSource={props.reposts}
            renderItem={(repost) => (
                <li>
                    <Repost
                        repost={repost}
                        loading={props.loading}
                    />
                </li>
            )}
        />
    );
};