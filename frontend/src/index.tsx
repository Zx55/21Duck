import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'moment/locale/zh-cn';

import App from './pages/App';
import api from './api';
import { Param } from './types';


const startApp = () => {
    const param: Param = {
        category_id: '3',
        user_id: '114514',
        page: '0',
    }
    api.post.list(param).then((response) => {
        console.log(response);
    }).catch((err) => console.log(err));

    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
        , document.getElementById('root')
    );
};

startApp();
