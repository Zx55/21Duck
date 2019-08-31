import React, { useState } from 'react';

import { List, Empty, Card } from 'antd';

import Repost from '../Repost';

import { IRepost } from '../../types';

import './RepostList.css';


export interface RepostListProps {
    reposts: Array<IRepost>;
    loading: boolean;
    repostNum: number;
    thumbs: Array<boolean>;
    getReposts: (page: string) => void;
    setReplyRepostId: (id: number) => void;
    setVisible: (visible: boolean) => void;
    setRedirect: (redirect: boolean) => void;
};

export default (props: RepostListProps) => {
    const [current, setCurrent] = useState(1);

    const handlePageChange = (page: number): void => {
        setCurrent(page);
        props.getReposts((page - 1).toString());
    };

    return (
        props.reposts.length===0 ?
        <Card className='no-repost'>
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                    <span>暂无回帖</span>
                }
            />
        </Card> :
        <List
            className='repost-list'
            itemLayout='horizontal'
            dataSource={props.reposts}
            renderItem={(repost,index) => (
                <li>
                    <Repost
                        repost={repost}
                        loading={props.loading}
                        setReplyRepostId={props.setReplyRepostId}
                        setVisible={props.setVisible}
                        setRedirect={props.setRedirect}
                        thumb={props.thumbs[index]}
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