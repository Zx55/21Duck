import React from 'react';
import ReactDOM from 'react-dom';

import { Descriptions, Badge, Card, Avatar } from 'antd';

const { Meta } = Card;

export default () => (
    <div>
        <Card bodyStyle={{ padding: "0" }}>
            <Card id='user-data-card'
                bordered
            >
                <Meta
                    avatar={<Avatar src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                    />}
                    title={"kiaia"}
                />
                <span className='user-profile'>
                    {"Happy coding!"}
                </span>
            </Card>
            <Descriptions 
                className='user-information' 
                bordered
                column={1}
                layout='horizontal'>
                <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
                <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
                <Descriptions.Item label="Usage Time" span={1}>
                    2019-04-24 18:00:00
                </Descriptions.Item>
                <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                <Descriptions.Item label="Config Info">
                    Data disk type: MongoDB
      <br />
                    Database version: 3.4
      <br />
                    Package: dds.mongo.mid
      <br />
                    Storage space: 10 GB
      <br />
                    Replication_factor:3
      <br />
                    Region: East China 1<br />
                </Descriptions.Item>
            </Descriptions>
        </Card>
    </div>
);
