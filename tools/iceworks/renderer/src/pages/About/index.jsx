'use strict';

// 当前 page 的主入口
import App from './About';
import React from 'react';
import ReactDOM from 'react-dom';

const renderEntry = React.createElement(App);

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(renderEntry, app);
