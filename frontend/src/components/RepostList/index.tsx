import React from 'react';

import { List } from 'antd';

import Repost from '../Repost';

import { RepostItem } from '../../types';

import './RepostList.css';


export interface PostListProps {
    reposts: Array<RepostItem>;
    loading: boolean;
};

export default (props: PostListProps) => {
    return (
        <List
            className='post-list'
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