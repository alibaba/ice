import React from 'react';
import PropTypes from 'prop-types';
import { Balloon } from '@alifd/next';
import Icon from '@components/Icon';
import TipIcon from '@components/TipIcon';
import classNames from 'classnames';
import styles from './head.module.scss';

const { Tooltip } = Balloon;

const PanelHead = ({ title, description, operations, children }) => {
  return (
    <div className={styles.wrapper}>
      <h3>
        {title}
        {description ? <TipIcon>{description}</TipIcon> : null}
      </h3>
      <div className={styles.main}>
        {children}
      </div>
      <div className={styles.operation}>
        {operations.map((operation, index) => {
          const { tip } = operation;
          return (
            <Tooltip
              key={index}
              trigger={(
                <Icon
                  {...operation}
                  size="small"
                  className={classNames({
                    [styles.icon]: true,
                    ...operation.className,
                  })}
                />
              )}
              align="b"
            >
              {tip}
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

PanelHead.defaultProps = {
  description: '',
  operations: [],
  children: null,
};

PanelHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.element,
  operations: PropTypes.array,
};

export default PanelHead;
