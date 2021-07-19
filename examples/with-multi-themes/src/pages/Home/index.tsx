import React from 'react';
import { Switch } from '@alifd/next';
import { useTheme } from 'ice';

const Dashboard = () => {
  const [theme, setTheme] = useTheme();
  return (
    <div className="container">
      <h1 className="title">🧊 ICE.js 多主题能力配置</h1>
      <p className="desc">向夜晚飞去</p>
      <br />
      <Switch
        size="medium"
        defaultChecked={theme === 'dark'}
        checkedChildren="🌟"
        onChange={(e) => setTheme(e ? 'dark' : 'light')}
        unCheckedChildren="☀️"
        style={{ width: 55 }}
      />
    </div>
  );
};

export default Dashboard;
