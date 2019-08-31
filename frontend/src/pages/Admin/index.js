import React, { useState, useEffect } from 'react';
import './Admin.css';
import { Menu, Icon, Table, Badge } from 'antd';
import { Input, Button, Popconfirm, Form } from 'antd';
import api from '../../api';
import {UserTable,ChatTable, ProblemTable, CourseTable, CampusTable, ResourcesTable} from './tables'


export default()=>{
    const [userStatus,setUserStatus] = useState("success");
    const { SubMenu } = Menu;

    const[myKey,setMyKey] = useState("user");


    const renderTable=(myKey) => {
      if(myKey === "user"){
        return (<UserTable></UserTable>)
      } else if(myKey === "chat"){
        return (<ChatTable myCategory_id='1'></ChatTable>)
      }else if(myKey === "problems"){
        return (<ProblemTable myCategory_id='2'></ProblemTable>)
      }else if(myKey === "courses"){
        return (<CourseTable myCategory_id='3'></CourseTable>)
      }else if(myKey === "campus"){
        return (<CampusTable myCategory_id='4'></CampusTable>)
      }else if(myKey === "resources"){
        return (<ResourcesTable myCategory_id='5'></ResourcesTable>)
      }

    }

    const handleClick = (type) => {
      console.log('hello3');
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
                    <Menu.Item key="problems">AK我的OJ题</Menu.Item>
                    <Menu.Item key="courses">课程资源</Menu.Item>
                    <Menu.Item key="campus">校园周边</Menu.Item>
                    </SubMenu>
                    <Menu.Item key='resources'>
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
