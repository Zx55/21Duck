import React from 'react';

import { Card, Avatar } from 'antd';

const { Meta } = Card;


export interface UserCardProps {
    user_cover: string,
    user_head: string,
    user_nickname: string,
    user_profile: string,
}

export default (props: UserCardProps) => {
    return (
        <div>
            <Card id='user-card'
                bordered
                hoverable
                cover={
                    <img
                        src={props.user_cover}
                        alt=''
                        style={{ height: 250, objectFit: "cover" }}
                    />
                }
            >
                <Meta
                    avatar={<Avatar src={props.user_head} />}
                    title={props.user_nickname}
                />
                <span className='user-profile'>
                    {props.user_profile}
                </span>
            </Card>
        </div>
    );
};
