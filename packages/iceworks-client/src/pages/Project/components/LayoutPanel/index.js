import React from 'react';
import { Message } from '@alifd/next';
import { FormattedMessage } from 'react-intl';
import Icon from '@components/Icon';
import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';

const LayoutPanel = () => {
  const layouts = stores.useStore('layouts');
  const { dataSource } = layouts;

  function onRefresh() {
    layouts.refresh();
  }

  return (
    <Panel
      header={
        <div className={styles.header}>
          <h3>
            <FormattedMessage id="iceworks.project.panel.layout.title" />
          </h3>
          <div className={styles.icons}>
            <Icon className={styles.icon} type="reload" size="small" onClick={onRefresh} />
          </div>
        </div>
      }
    >
      {dataSource.length ? (
        <div className={styles.main}>
          {dataSource.map(({ name, title }) => {
            return (
              <div key={name} className={styles.item}>
                <strong>{name}</strong>
                <span>{title}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <Message
          title={<FormattedMessage id="iceworks.project.panel.layout.none" />}
          type="help"
        />
      )}
    </Panel>
  );
};

export default LayoutPanel;
