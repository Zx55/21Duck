import React, { useState } from 'react';

import { List } from 'antd';

import UserPost from '../UserPost';

import './UserPostList.css';


export interface Item {
    id: string;
    category: number;
    formatedTime: string;
    content: string;
};

export interface PostListProps {
    items: Array<Item>;
    loading: boolean;
    itemNum: number;
    getItems: (page: string) => void;
    onClick: (id: string, page: string) => void;
};

export default (props: PostListProps) => {
    const [current, setCurrent] = useState(1);

    const handlePageChange = (page: number): void => {
        setCurrent(page);
        props.getItems((page - 1).toString());
    };

    const getCategory = (categoryId: number) => {
        switch (categoryId) {
            case 1:
                return 'chat';
            case 2:
                return 'problems';
            case 3:
                return 'courses';
            case 4:
                return 'campus';
            case 5:
                return 'resources';
            default:
                return '';
        }
    };

    return (
        <List
            className='post-list'
            itemLayout='horizontal'
            dataSource={props.items}
            renderItem={(item) => (
                <li>
                    <UserPost
                        formatedTime={item.formatedTime}
                        content={item.content}
                        route={`/${getCategory(item.category)}/${item.id}`}
                        loading={props.loading}
                        onClick={() => props.onClick(item.id, (current - 1).toString())}
                    />
                </li>
            )}
            pagination={{
                current: current,
                defaultPageSize: 15,
                size: 'small',
                total: props.itemNum,
                hideOnSinglePage: true,
                showQuickJumper: true,
                onChange: (page) => handlePageChange(page),
                position: 'bottom'
            }}
        />
    );
};
