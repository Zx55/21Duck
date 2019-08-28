import React, { useState } from 'react';

import { List } from 'antd';

import Repost from '../Repost';

import { IRepost } from '../../types';

import './RepostList.css';


export interface RepostListProps {
    reposts: Array<IRepost>;
    loading: boolean;
    repostNum: number;
    getReposts: (page: string) => void;
    setReplyRepostId: (id: number) => void;
    setVisible: (visible: boolean) => void;
};

export default (props: RepostListProps) => {
    const [current, setCurrent] = useState(1);

    const handlePageChange = (page: number): void => {
        setCurrent(page);
        props.getReposts((page - 1).toString());
    };

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
                        setReplyRepostId={props.setReplyRepostId}
                        setVisible={props.setVisible}
                    />
                </li>
            )}
            pagination={{
                current: current,
                defaultPageSize: 15,
                size: 'small',
                total: props.repostNum,
                hideOnSinglePage: true,
                showQuickJumper: true,
                onChange: (page) => handlePageChange(page),
                position: 'bottom'
            }}
        />
    );
};