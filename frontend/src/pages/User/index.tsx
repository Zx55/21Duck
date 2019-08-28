import React from 'react';
import { Avatar } from 'antd'
import AutoAvator from '../../components/AutoAvator'
import { Card } from 'antd';

import Template from '../../components/PageListTemplate';

import './Problems.css';
import { Tabs, Icon } from 'antd';
import src from '*.bmp';

const { TabPane } = Tabs;

export default () => (
    <div >
         <Card
         
    hoverable
    style={{ width: 1400 }}
    cover={<img alt="example" src="https://pic1.zhimg.com/v2-99413d2b2721b9fc33280ca041902aac_b.jpg" />}
  >
          
            <div className="test">
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </div>
            <p className='name'>kiaia</p>
            <p className='sign'>happy coding</p>
            
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
      <div>
            <Template name='problem' category='2' />
        </div>
    </TabPane>
  </Tabs>
        
    </div>
    
    
);
