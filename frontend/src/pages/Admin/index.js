import React, { useState, useEffect } from 'react';
import './Admin.css';
import { Menu, Icon, Table, Badge } from 'antd';
import { Input, Button, Popconfirm, Form } from 'antd';


const UserTable =() => {
    const columns = [
      {
        title: '用户账号',
        align: 'center',
        width: 100,
        dataIndex: 'user_id',
        key: 'user_id',
      },
      {
        title: '昵称',
        align: 'center',
        width: 100,
        dataIndex: 'nickname',
        key: '1',
      },
      {
        title: '年龄',
        align: 'center',
        dataIndex: 'age',
        key: '2',
        width: 50,
      },
      {
        title: '学校',
        align: 'center',
        dataIndex: 'school',
        key: '3',
        width: 150,
      },
      {
        title: '简介',
        align: 'center',
        dataIndex: 'userprofile',
        key: '4',
        width: 150,
      },
      {
        title: '禁言时间',
        align: 'center',
        dataIndex: 'blocktime',
        key: '5',
        width: 100,
      },
      {
        title: '操作',
        align: 'center',
        key: 'operation',
        dataIndex: 'user_operation',
        width: 100,
        render: () => <a> 禁言</a>,
      },

    ];


    const initdataSource= [];
    for (let i = 0; i < 100; i++) {
      initdataSource.push({
        user_id: '114514',
        key: i,
        nickname: `Edrward ${i}`,
        school: '北京航空航天大学',
        age: 24,
        userprofile: `下北泽 no. ${i}`,
        blocktime: '1919810s',
    });
    }
    const[dataSource,setDataSource] = useState(initdataSource);
    
    const handleDelete = (key) => {
      console.log(dataSource);
      console.log(key);
      setDataSource(dataSource.filter(item => item.key !== key));
      console.log(dataSource);
    };
    


    return (
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          scroll={{ x: 600, y: 500 }}
        />
      </div>
    );
}

const ChatTable =() => {
  const columns = [
    {
      title: '帖子号',
      align: 'center',
      width: 100,
      dataIndex: 'posting_id',
    },
    {
      title: '发帖人',
      align: 'center',
      width: 100,
      dataIndex: 'posting_user',
    },
    {
      title: '发帖日期',
      align: 'center',
      dataIndex: 'posting_date',
      width: 150,
    },
    {
      title: '简介',
      align: 'center',
      dataIndex: 'profile',
      width: 150,
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'operation',
      width: 100,
      render: (text, record) =>
        (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        )
      
    }
  ];


  const initdataSource= [];
  for (let i = 0; i < 100; i++) {
    initdataSource.push({
      key: i,
      posting_id: '114514',
      posting_user: `宝生永梦 no. ${i}`,
      profile: `下北泽 no. ${i}`,
      posting_date: '1919810s'
  });

  }
  const[dataSource,setDataSource] = useState(initdataSource);
  
  const handleDelete = (key) => {
    console.log(dataSource);
    console.log(key);
    setDataSource(dataSource.filter(item => item.key !== key));
    console.log(dataSource);
  };
  


  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 600, y: 500 }}
      />
    </div>
  );
}


export default()=>{
    const [userStatus,setUserStatus] = useState("success");
    const { SubMenu } = Menu;

    const changeStatus=(key) => {
        if(userStatus === "success"){
          setUserStatus("error");
            console.log('success,after:',userStatus);
        }
        else{
            setUserStatus("success");
            console.log('error,after:',userStatus);
        }
    }

    const[myKey,setMyKey] = useState("user");


    const renderTable=(myKey) => {
      if(myKey === "user"){
        return (<UserTable></UserTable>)
      } else if(myKey === "chat"){
        return (<ChatTable></ChatTable>)
      }
    }

    const handleClick = (type) => {
      setMyKey(type.key);
    };

    return (
        <div className='panel'>
            <div className='left-navigator'>
                <Menu
                    onClick={(e)=>handleClick(e)}
                    style={{ width: 200}}
                    mode="inline">
                    <Menu.Item key="user">
                        <Icon type="user"/>
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
            <div className='right-table'>
                {renderTable(myKey)}
            </div>
        </div>
    );
}