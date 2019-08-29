import React, { useState, useEffect } from 'react';
import { Table, Badge } from 'antd';
import { Popconfirm } from 'antd';
import api from '../../api';

const UserTable =() => {

    const [apiData,setapiData] = useState([]);

    const columns = [
      {
        title: '用户账号',
        align: 'center',
        width: 150,
        dataIndex: 'user_id',
      },
      {
        title: '昵称',
        align: 'center',
        width: 100,
        dataIndex: 'nickname',
      },
      {
        title: '年龄',
        align: 'center',
        dataIndex: 'age',
        width: 100,
      },
      {
        title: '学校',
        align: 'center',
        dataIndex: 'school',
        width: 150,
      },
      {
        title: '简介',
        align: 'center',
        dataIndex: 'userprofile',
        width: 150,
      },
      {
        title: '禁言时间',
        align: 'center',
        dataIndex: 'blocktime',
        width: 100,
      },
      {
        title: '状态',
        align: 'center',
        dataIndex: 'status',
        width: 100,
      },
      {
        title: '操作',
        align: 'center',
        key: 'operation',
        dataIndex: 'user_operation',
        width: 100,
        render: (text, record) => <Popconfirm title={"确认操作?"} onConfirm={() => handleBlock(record.key)}>
        <a>禁言/解禁</a>
      </Popconfirm>,
      },

    ];



    const[dataSource,setDataSource] = useState([]);
    const[flag,setFlag] = useState(false);
    
    useEffect(()=>{
      api.user.list().then((response) => {
        const initdataSource= [];
        for(let i=0;i < response.data.length;i++){
          const text = response.data[i]['blocktime'] === 0 ? "正常" : "禁言";
          const state = response.data[i]['blocktime'] === 0 ? "success" : "error";
          initdataSource.push({
            user_id: response.data[i]['user_id'],
            key: i,
            nickname: response.data[i]['nickname'],
            school: response.data[i]['school'],
            age: response.data[i]['age'],
            userprofile: response.data[i]['profile'],
            blocktime: response.data[i]['blocktime'],
            status: <Badge text={text} status={state}></Badge>
          });
        }
        setDataSource(initdataSource);
        console.log("hello-user");
      })
    },[])

    
    const handleBlock = (key) => {
      let tempRow = dataSource.filter(item => item.key === key);
      let tempData = dataSource.filter(item => item.key !== key);
      if(tempRow[0]['blocktime'] === 0){
        tempData.splice(key,0,{
          user_id: tempRow[0]['user_id'],
          key: tempRow[0]['key'],
          nickname: tempRow[0]['nickname'],
          school: tempRow[0]['school'],
          age: tempRow[0]['age'],
          userprofile: tempRow[0]['userprofile'],
          blocktime: 1,
          status: <Badge text='禁言' status='error'></Badge>
        });
      }else{
        tempData.splice(key,0,{
          user_id: tempRow[0]['user_id'],
          key: tempRow[0]['key'],
          nickname: tempRow[0]['nickname'],
          school: tempRow[0]['school'],
          age: tempRow[0]['age'],
          userprofile: tempRow[0]['userprofile'],
          blocktime: 0,
          status: <Badge text='正常' status='success'></Badge>
        });
      }
      setDataSource(tempData);
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

const ChatTable =({myCategory_id}) => {

    
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
      dataIndex: 'user_nickname',
    },
    {
        title: '发帖账号',
        align: 'center',
        width: 100,
        dataIndex: 'posting_user',
    },
    {
      title: '发帖日期',
      align: 'center',
      dataIndex: 'formated_posting_time',
      width: 150,
    },
    {
      title: '简介',
      align: 'center',
      dataIndex: 'theme',
      width: 150,
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'operation',
      width: 100,
      render: (text, record) =>
        (
          <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.posting_id)}>
            <a>删除</a>
          </Popconfirm>
        )
      
    }
  ];

    const [postNum, setPostNum] = useState([]);

    const [current, setCurrent] = useState(1);

    const[dataSource,setDataSource] = useState([]);

    const getPosts = (page,category) => {

        const params = {
            page: page,
            category_id: category,
        };

        api.post.list(params).then((response) => {
            console.log(response.data);
            setDataSource(response.data);
            setPostNum(response.data[0]['posting_num'])
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getPosts('0',myCategory_id);
    }, []);


  const handlePageChange = (page) => {
    setCurrent(page);
    getPosts((page - 1).toString(),'1');
};
  
  const handleDelete = (key) => {
    //console.log(dataSource);
    console.log(key);
    setDataSource(dataSource.filter(item => item.posting_id !== key));
    //console.log(dataSource);
  };
  


  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 600, y: 500 }}
        pagination={{
            current: current,
            defaultPageSize: 15,
            size: 'small',
            total: postNum,
            hideOnSinglePage: true,
            showQuickJumper: true,
            onChange: (page) => handlePageChange(page),
            position: 'bottom'
        }}
      />
    </div>
  );
}

const ProblemTable =({myCategory_id}) => {
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
      dataIndex: 'user_nickname',
    },
    {
        title: '发帖账号',
        align: 'center',
        width: 100,
        dataIndex: 'posting_user',
    },
    {
      title: '发帖日期',
      align: 'center',
      dataIndex: 'formated_posting_time',
      width: 150,
    },
    {
      title: '简介',
      align: 'center',
      dataIndex: 'theme',
      width: 150,
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'operation',
      width: 100,
      render: (text, record) =>
        (
          <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.posting_id)}>
            <a>删除</a>
          </Popconfirm>
        )
      
    }
  ];

    const [postNum, setPostNum] = useState([]);

    const [current, setCurrent] = useState(1);

    const[dataSource,setDataSource] = useState([]);

    const getPosts = (page,category) => {

        const params = {
            page: page,
            category_id: category,
        };

        api.post.list(params).then((response) => {
            console.log(response.data);
            setDataSource(response.data);
            setPostNum(response.data[0]['posting_num'])
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getPosts('0',myCategory_id);
    }, []);


  const handlePageChange = (page) => {
    setCurrent(page);
    getPosts((page - 1).toString(),'1');
};
  
  const handleDelete = (key) => {
    //console.log(dataSource);
    console.log(key);
    setDataSource(dataSource.filter(item => item.posting_id !== key));
    //console.log(dataSource);
  };
  


  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 600, y: 500 }}
        pagination={{
            current: current,
            defaultPageSize: 15,
            size: 'small',
            total: postNum,
            hideOnSinglePage: true,
            showQuickJumper: true,
            onChange: (page) => handlePageChange(page),
            position: 'bottom'
        }}
      />
    </div>
  );
}

const CourseTable =({myCategory_id}) => {
  
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
      dataIndex: 'user_nickname',
    },
    {
        title: '发帖账号',
        align: 'center',
        width: 100,
        dataIndex: 'posting_user',
    },
    {
      title: '发帖日期',
      align: 'center',
      dataIndex: 'formated_posting_time',
      width: 150,
    },
    {
      title: '简介',
      align: 'center',
      dataIndex: 'theme',
      width: 150,
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'operation',
      width: 100,
      render: (text, record) =>
        (
          <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.posting_id)}>
            <a>删除</a>
          </Popconfirm>
        )
      
    }
  ];

    const [postNum, setPostNum] = useState([]);

    const [current, setCurrent] = useState(1);

    const[dataSource,setDataSource] = useState([]);

    const getPosts = (page,category) => {

        const params = {
            page: page,
            category_id: category,
        };

        api.post.list(params).then((response) => {
            console.log(response.data);
            setDataSource(response.data);
            setPostNum(response.data[0]['posting_num'])
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getPosts('0',myCategory_id);
    }, []);


  const handlePageChange = (page) => {
    setCurrent(page);
    getPosts((page - 1).toString(),'1');
};
  
  const handleDelete = (key) => {
    //console.log(dataSource);
    console.log(key);
    setDataSource(dataSource.filter(item => item.posting_id !== key));
    //console.log(dataSource);
  };
  


  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 600, y: 500 }}
        pagination={{
            current: current,
            defaultPageSize: 15,
            size: 'small',
            total: postNum,
            hideOnSinglePage: true,
            showQuickJumper: true,
            onChange: (page) => handlePageChange(page),
            position: 'bottom'
        }}
      />
    </div>
  );
}

const CampusTable =({myCategory_id}) => {
  
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
        dataIndex: 'user_nickname',
      },
      {
          title: '发帖账号',
          align: 'center',
          width: 100,
          dataIndex: 'posting_user',
      },
      {
        title: '发帖日期',
        align: 'center',
        dataIndex: 'formated_posting_time',
        width: 150,
      },
      {
        title: '简介',
        align: 'center',
        dataIndex: 'theme',
        width: 150,
      },
      {
        title: '操作',
        align: 'center',
        dataIndex: 'operation',
        width: 100,
        render: (text, record) =>
          (
            <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record.posting_id)}>
              <a>删除</a>
            </Popconfirm>
          )
        
      }
    ];
  
      const [postNum, setPostNum] = useState([]);
  
      const [current, setCurrent] = useState(1);
  
      const[dataSource,setDataSource] = useState([]);
  
      const getPosts = (page,category) => {
  
          const params = {
              page: page,
              category_id: category,
          };
  
          api.post.list(params).then((response) => {
              console.log(response.data);
              setDataSource(response.data);
              setPostNum(response.data[0]['posting_num'])
          }).catch(err => console.log(err));
      };
  
      useEffect(() => {
          getPosts('0',myCategory_id);
      }, []);
  
  
    const handlePageChange = (page) => {
      setCurrent(page);
      getPosts((page - 1).toString(),'1');
  };
    
    const handleDelete = (key) => {
      //console.log(dataSource);
      console.log(key);
      setDataSource(dataSource.filter(item => item.posting_id !== key));
      //console.log(dataSource);
    };
    
  
  
    return (
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          scroll={{ x: 600, y: 500 }}
          pagination={{
              current: current,
              defaultPageSize: 15,
              size: 'small',
              total: postNum,
              hideOnSinglePage: true,
              showQuickJumper: true,
              onChange: (page) => handlePageChange(page),
              position: 'bottom'
          }}
        />
      </div>
    );
  }

export {UserTable,ChatTable, ProblemTable, CourseTable, CampusTable}