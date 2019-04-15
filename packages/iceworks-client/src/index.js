import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '@alifd/next/reset.scss';
import MainLayout from './layouts/MainLayout';

ReactDOM.render(
  <Router>
    <Route path="/" component={MainLayout} />
  </Router>,
  document.getElementById('ice-container')
);
