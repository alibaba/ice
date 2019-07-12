import React from 'react';
import PropTypes from 'prop-types';
import { Message } from '@alifd/next';
import { injectIntl, FormattedMessage } from 'react-intl';
import ActionStatus from '@components/ActionStatus';
import Panel from '../Panel';
import PanelHead from '../Panel/head';
import stores from '../../stores';
import styles from './index.module.scss';

const LayoutPanel = ({ intl, title, description }) => {
  const layoutsStore = stores.useStore('layouts');
  const { dataSource } = layoutsStore;

  function onRefresh() {
    layoutsStore.refresh();
  }

  const operations = [
    {
      type: 'reload',
      onClick: onRefresh,
      tip: intl.formatMessage({ id: 'iceworks.project.panel.layout.refresh' }),
    },
  ];

  return (
    <Panel
      header={
        <PanelHead
          title={title}
          description={description}
          operations={operations}
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
        !layoutsStore.refresh.error &&
        <Message
          title={<FormattedMessage id="iceworks.project.panel.layout.none" />}
          type="help"
        />
      )}
      <ActionStatus
        store={stores}
        config={[
          {
            storeName: 'layouts',
            actions: [
              {
                actionName: 'refresh',
                showLoading: true,
                showError: true,
              },
            ],
          },
        ]}
      />
    </Panel>
  );
};

LayoutPanel.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(LayoutPanel);
