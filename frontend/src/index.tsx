import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './pages/App';
import api from './api';

api.login({
    username: '123456',
    password: '123456'
}).then((response) => {
    console.log(response.data.success);
}).catch((err) => console.log(err));

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root')
);
