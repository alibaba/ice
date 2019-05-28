import React from 'react';
import { Message } from '@alifd/next';
import { FormattedMessage } from 'react-intl';
import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';

const LayoutPanel = () => {
  const layouts = stores.useStore('layouts');
  const { dataSource } = layouts;

  return (
    <Panel header={<h3><FormattedMessage id="iceworks.project.panel.layout.title" /></h3>}>
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
          <Message title="暂无布局" type="help" />
      }
    </Panel>
  );
};

export default LayoutPanel;
