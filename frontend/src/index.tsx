import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/app';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
