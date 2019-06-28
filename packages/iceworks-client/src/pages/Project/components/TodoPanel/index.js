import React from 'react';
import PropTypes from 'prop-types';
import { Message } from '@alifd/next';
import { FormattedMessage, injectIntl } from 'react-intl';
import Panel from '../Panel';
import PanelHead from '../Panel/head';
import stores from '../../stores';
import styles from './index.module.scss';

const TodoPanel = ({ title, intl, description }) => {
  const todo = stores.useStore('todo');
  const { dataSource } = todo;

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
                onClick: todo.refresh,
              },
              tip: intl.formatMessage({ id: 'iceworks.project.panel.todo.refresh' }),
            },
          ]}
        />
      }
    >
      {dataSource.length ? (
        <div className={styles.main}>
          {dataSource.map((v, k) => {
            return (
              <div key={k} className={styles.item}>
                <div className={styles.path}>{v.path}</div>
                {v.messages.map((msg, kk) => {
                  return (
                    <div key={kk} className={styles.msg}>
                      <span className={styles.msgLine}>[<FormattedMessage id="iceworks.project.panel.todo.line" values={{ line: msg.line }} />]</span>
                      {msg.type}: {msg.content}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <Message
          title={<FormattedMessage id="iceworks.project.panel.todo.none" />}
          type="help"
        >
          <FormattedMessage id="iceworks.project.panel.todo.example" />
        </Message>
      )}
    </Panel>
  );
};

TodoPanel.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(TodoPanel);
