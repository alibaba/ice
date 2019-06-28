import React from 'react';
import PropTypes from 'prop-types';
import { Message, Balloon } from '@alifd/next';
import { injectIntl, FormattedMessage } from 'react-intl';
import Icon from '@components/Icon';
import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';

const { Tooltip } = Balloon;

const LayoutPanel = ({ intl, title }) => {
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
            {title}
          </h3>
          <div className={styles.icons}>
            <Tooltip
              trigger={(
                <Icon
                  className={styles.icon}
                  type="reload"
                  size="small"
                  onClick={onRefresh}
                />
              )}
              align="b"
            >
              {intl.formatMessage({ id: 'iceworks.project.panel.layout.refresh' })}
            </Tooltip>
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

LayoutPanel.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(LayoutPanel);
