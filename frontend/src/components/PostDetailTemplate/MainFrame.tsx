import React, { useState } from 'react';

import { Pagination, BackTop } from 'antd';

import RepostList from '../RepostList';
import PostCreator from '../PostCreator';

import { RepostItem } from '../../types';


export interface MainFrameProps {
    name: string;
    reposts: Array<RepostItem>;
    repostNum: number;
    loading: boolean;
    getReposts: (page: string) => void;
};

export default (props: MainFrameProps) => {
    const [current, setCurrent] = useState(1);

    const handlePageChange = (page: number): void => {
        setCurrent(page);
        props.getReposts((page - 1).toString());
    }

    return (
        <div className='detail-template-main-frame'>
            <RepostList
                reposts={props.reposts}
                loading={props.loading}
            />
            <Pagination
                className={`${props.name}-pagination`}
                current={current}
                defaultPageSize={15}
                size='small'
                hideOnSinglePage
                total={props.repostNum}
                showQuickJumper
                onChange={(page: number) => handlePageChange(page)}
            />
            <PostCreator />
            <BackTop className='go-to-top-button' />
        </div>
    );
};
