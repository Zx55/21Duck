import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'moment/locale/zh-cn';

import App from './pages/App';
import api from './api';


const startApp = () => {
    api.user.list().then((response) => {
        /*for(let i=0;i < response.data.length;i++){
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
        }*/
          //setFlag(true);
          console.log("hello");
      })
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
        , document.getElementById('root')
    );
};

startApp();
