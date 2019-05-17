import React from 'react';
import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';

const Layout = () => {
  const layouts = stores.useStore('layouts');
  const { dataSource } = layouts;

  return (
    <Panel header={<h3>布局列表</h3>}>
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
      </div>
    </Panel>
  );
};

export default Layout;
