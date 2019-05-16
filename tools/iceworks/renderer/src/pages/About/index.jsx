

// 当前 page 的主入口
import React from 'react';
import ReactDOM from 'react-dom';
import App from './About';

const renderEntry = React.createElement(App);

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(renderEntry, app);
