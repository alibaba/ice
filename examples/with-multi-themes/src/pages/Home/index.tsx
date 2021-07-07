import React from 'react';
import { Switch, Collapse, Radio } from '@alifd/next';
import { useTheme } from 'ice';

const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;

const Dashboard = () => {
  const [theme, setTheme] = useTheme();
  return (
    <div className="container">
      <Collapse>
        <Panel title="simple tile">
      Promotions are marketing campaigns ran by Marketplace. Participate to sale
      your products during that promotion and make a profit
        </Panel>
        <Panel title="What are Promotion Products?">
      Promotion Products is a service that helps you to promote products you
      list on Marketplace during a certain time range. You can choose which
      products should be available for the promotion. Not all Products of you
      will be available, because Promotions will only attract certain Product
      areas.
        </Panel>
        <Panel title="Why can i not submit a higher price?">
      The Promotion requires a certain price to make sure that our customers are
      attracted.
        </Panel>
        <Panel title="What is Promo Stock?" disabled>
      Promo Stock is the criteria needed to be followed to be able to join
      Promotion. With setting particular Promo Stock value you commit to have
      this amount of stock available while Promotion is active.
        </Panel>
      </Collapse>
      <h1 className="title">🧊 ICE.js 多主题能力配置</h1>
      <p className="desc">向夜晚飞去</p>
      <br />
      <Switch
        size="medium"
        defaultChecked={theme === 'dark'}
        checkedChildren="🌟"
        onChange={(e) => setTheme(e ? 'dark' : 'default')}
        unCheckedChildren="☀️"
        style={{ width: 55 }}
      />
    </div>
  );
};

export default Dashboard;
