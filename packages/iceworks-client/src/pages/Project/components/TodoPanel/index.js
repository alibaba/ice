import React from 'react';
import { Message } from '@alifd/next';
import { FormattedMessage } from 'react-intl';
import Icon from '@components/Icon';
import Panel from '../Panel';
import stores from '../../stores';
import styles from './index.module.scss';

const TodoPanel = () => {
  const todo = stores.useStore('todo');
  const { dataSource } = todo;

  return (
    <Panel
      header={
        <div className={styles.header}>
          <h3><FormattedMessage id="iceworks.project.panel.todo.title" /></h3>
          <div className={styles.icons}>
            <FormattedMessage id="iceworks.project.panel.todo.refresh">
              {(title) => (
                <Icon
                  className={styles.icon}
                  type="reload"
                  size="small"
                  onClick={todo.refresh}
                  title={title}
                />
              )}
            </FormattedMessage>
          </div>
        </div>
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

export default TodoPanel;
