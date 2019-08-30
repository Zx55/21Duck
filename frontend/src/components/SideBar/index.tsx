import React from 'react';
import cx from 'classnames';

import { Card, Affix } from 'antd';

import './SideBar.css';


export interface CardContent {
    key?: JSX.Element;
    value: JSX.Element;
};

export class CardItem {
    title: string = '';
    contents: Array<CardContent> = [];
}

export interface SideBarProps {
    loading: boolean;
    userCenter: boolean;
    offsetTop: number;
    items: Array<CardItem>;
}

export default (props: SideBarProps) => {
    const renderContent = (content: CardContent) => (
        <div>
            {content.key && content.key}
            {content.value}
        </div>
    );

    const renderCard = (item: CardItem) => (
        <Card
            hoverable
            className={cx(props.userCenter
                ? 'user-center-side-card' : 'normal-side-card')}
            title={item.title}
            loading={props.loading}
        >
            {item.contents.map((content: CardContent) => renderContent(content))}
        </Card>
    );

    return (
        <div className={cx(props.userCenter
            ? 'user-center-side-bar' : 'normal-side-bar')}>
            <Affix offsetTop={props.offsetTop}>
                {props.items.map((item: CardItem) => renderCard(item))}
            </Affix>
        </div>
    );
};
