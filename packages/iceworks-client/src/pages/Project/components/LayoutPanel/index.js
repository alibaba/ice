import React from 'react';
import { Message } from '@alifd/next';
import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';

const Layout = () => {
  const layouts = stores.useStore('layouts');
  const { dataSource } = layouts;

  return (
    <Panel header={<h3>布局列表</h3>}>
      {
        dataSource.length ?
          <div className={styles.main}>
            {dataSource.map(({ name, title }) => {
              return (
                <div key={name} className={styles.item}>
                  <strong>
                    {name}
                  </strong>
                  <span>
                    {title}
                  </span>
                </div>
              );
            })}
          </div> :
          <div>
            <Message title="暂无布局" type="help" />
          </div>
      }
    </Panel>
  );
};

export default Layout;
