import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './pages/App';
import api from './api';


const startApp = () => {
    api.login({
        username: '123456',
        password: 'e10adc3949ba59abbe56e057f20f883e'
    }).then((response) => {
        console.log(response.data.success);
    }).catch((err) => console.log(err));

    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
        , document.getElementById('root')
    );
};

startApp();
