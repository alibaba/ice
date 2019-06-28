import React from 'react';
import PropTypes from 'prop-types';
import { Message } from '@alifd/next';
import { injectIntl, FormattedMessage } from 'react-intl';
import Panel from '../Panel';
import PanelHead from '../Panel/head';
import stores from '../../stores';
import styles from './index.module.scss';

const LayoutPanel = ({ intl, title, description }) => {
  const layouts = stores.useStore('layouts');
  const { dataSource } = layouts;

  function onRefresh() {
    layouts.refresh();
  }

  return (
    <Panel
      header={
        <PanelHead
          title={title}
          description={description}
          operations={[
            {
              icon: {
                type: 'reload',
                onClick: onRefresh,
              },
              tip: intl.formatMessage({ id: 'iceworks.project.panel.layout.refresh' }),
            },
          ]}
        />
      }
    >
      {dataSource.length ? (
        <div className={styles.main}>
          {dataSource.map(({ name, title: layoutTitle }) => {
            return (
              <div key={name} className={styles.item}>
                <strong>{name}</strong>
                <span>{layoutTitle}</span>
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

LayoutPanel.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(LayoutPanel);
