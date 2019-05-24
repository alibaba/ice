/* eslint object-curly-newline:0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@alifd/next';
import { FormattedMessage } from 'react-intl';
import Icon from '@components/Icon';
import styles from './index.module.scss';

const TerminalBar = ({ isWorking, onStart, onStop, onSetting }) => {
  return (
    <div className={styles.actionBar}>
      {/* Left Button Group */}
      <div className={styles.leftActionBar}>
        {!isWorking ? (
          <Button
            type="primary"
            className={styles.leftButton}
            onClick={onStart}
          >
            <Icon type="start" className={styles.icon} />
            <FormattedMessage id="iceworks.task.dev.start" />
          </Button>
        ) : (
          <Button type="primary" className={styles.leftButton} onClick={onStop}>
            <Icon type="stop" className={styles.icon} />
            <FormattedMessage id="iceworks.task.dev.stop" />
          </Button>
        )}
        <Button
          type="secondary"
          className={styles.leftButton}
          onClick={onSetting}
          disabled={isWorking}
        >
          <Icon type="settings" className={styles.icon} />
          <FormattedMessage id="iceworks.task.dev.setting" />
        </Button>
      </div>

      {/* Right Button Group */}
      <div className={styles.rightActionBar}>
        <Button.Group>
          <Button type="primary" className={styles.rightButton}>
            <Icon type="pc" /> 日志
          </Button>
          <Button type="secondary" className={styles.rightButton}>
            <Icon type="projects" /> 仪表盘
          </Button>
          <Button type="secondary" className={styles.rightButton}>
            <Icon type="wrencha" /> 构建分析
          </Button>
        </Button.Group>
      </div>
    </div>
  );
};

TerminalBar.defaultProps = {
  isWorking: false,
  onStart: () => {},
  onStop: () => {},
  onSetting: () => {},
};

TerminalBar.propTypes = {
  isWorking: PropTypes.bool,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onSetting: PropTypes.func,
};

export default TerminalBar;
