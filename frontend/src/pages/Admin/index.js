import React, { useState } from 'react';
import './Admin.css';
import { Menu, Icon, Table } from 'antd';

export default()=>{
    const { SubMenu } = Menu;

    const columns = [
        {
          title: 'Full Name',
          width: 100,
          dataIndex: 'name',
          key: 'name',
          fixed: 'left',
        },
        {
          title: 'Age',
          width: 100,
          dataIndex: 'age',
          key: 'age',
          fixed: 'left',
        },
        {
          title: 'Column 1',
          dataIndex: 'address',
          key: '1',
          width: 150,
        },
        {
          title: 'Column 2',
          dataIndex: 'address',
          key: '2',
          width: 150,
        },
        {
          title: 'Column 3',
          dataIndex: 'address',
          key: '3',
          width: 150,
        },
        {
          title: 'Column 4',
          dataIndex: 'address',
          key: '4',
          width: 150,
        },
        {
          title: 'Column 5',
          dataIndex: 'address',
          key: '5',
          width: 150,
        },
        {
          title: 'Column 6',
          dataIndex: 'address',
          key: '6',
          width: 150,
        },
        {
          title: 'Column 7',
          dataIndex: 'address',
          key: '7',
          width: 150,
        },
        { title: 'Column 8', dataIndex: 'address', key: '8' },
        {
          title: 'Action',
          key: 'operation',
          fixed: 'right',
          width: 100,
          render: () => <a>action</a>,
        },
      ];
      
      const data = [];
      for (let i = 0; i < 100; i++) {
        data.push({
          key: i,
          name: `Edrward ${i}`,
          age: 32,
          address: `London Park no. ${i}`,
        });
      }

    const handleClick = (e) => {
      console.log('click ', e);
    };
  
    return (
        <div className='panel'>
            <div className='left-navigator'>
                <Menu
                    onClick={handleClick}
                    style={{ width: 256 }}
                    mode="inline">
                    <Menu.Item>
                        <Icon type="user" />
                        用户管理
                    </Menu.Item>
                    <SubMenu
                    key="post-manage"
                    title={
                        <span>
                        <Icon type="form" />
                        <span>帖子管理</span>
                        </span>
                    }
                    >
                    <Menu.Item key="chat">闲聊栈</Menu.Item>
                    <Menu.Item key="problem">AK我的OJ题</Menu.Item>
                    <Menu.Item key="courses">课程资源</Menu.Item>
                    <Menu.Item key="campus">校园周边</Menu.Item>
                    </SubMenu>
                    <Menu.Item>
                        <Icon type="folder-open" />
                        资源管理
                    </Menu.Item>
                </Menu>
            </div>
            <div>
                <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
            </div>
        </div>
    );
}