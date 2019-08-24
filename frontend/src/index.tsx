import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './pages/app';
import api from './api';

import { ParamList } from './types';


const params: ParamList = [{
        key: 'page',
        value: '0'
    }
]
console.log('data');
api.post.list(params).then((response) => console.log(response.data)).catch(err => console.log(err));


ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root')
);
