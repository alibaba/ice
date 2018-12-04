/**
 * 定义应用路由
 */
import { HashRouter } from 'react-router-dom';
import React from 'react';
import BasicLayout from './layouts/BasicLayout';

const router = () => {
  return (
    <HashRouter>
      <BasicLayout />
    </HashRouter>
  );
};

export default router;
