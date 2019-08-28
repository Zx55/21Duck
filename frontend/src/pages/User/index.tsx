import React, { useState, useEffect } from 'react';

import { Avatar, Skeleton, Card } from 'antd';

import Template from '../../components/UserPostListTemplate';

import './User.css';
import { Tabs, Icon } from 'antd';

const { TabPane } = Tabs;
const { Meta } = Card;


export default () => {
  return (
    <div >
      <Card id='user-card'
        bordered
        hoverable
        cover={<img alt="example"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          style={{ height: 250, objectFit: "cover" }} />}
      >
        <Meta
          avatar={<Avatar src={"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />}
          title={"kiaia"}
        />
        <span className='user-nickname'>
          {"Happy Coding"}
        </span>

      </Card>
      <Tabs defaultActiveKey="2">
        <TabPane
          tab={
            <span>
              <Icon type="apple" />
              我的主贴
        </span>
          }
          key="1"
        >
          <div>
            <Template name='problem' category='2' />
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="android" />
              我的回复
        </span>
          }
          key="2"
        >
          <Template name='problem' category='2' />
        </TabPane>
      </Tabs>

    </div>


  );
}

