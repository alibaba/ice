import React from 'react';
import PropTypes from 'prop-types';
import { Balloon } from '@alifd/next';
import Icon from '@components/Icon';
import classNames from 'classnames';
import styles from './head.module.scss';

const { Tooltip } = Balloon;

const PanelHead = ({ title, description, operations, children }) => {
  return (
    <div className={styles.wrapper}>
      <h3>
        {title}
        {
          description ?
            <Tooltip
              trigger={(
                <Icon
                  size="small"
                  type="info"
                  className={styles.info}
                />
              )}
              align="b"
            >
              {description}
            </Tooltip> :
            null
        }
      </h3>
      <div className={styles.main}>
        {children}
      </div>
      <div className={styles.operation}>
        {operations.map((operation, index) => {
          const { tip, icon } = operation;
          return (
            <Tooltip
              key={index}
              trigger={(
                <Icon
                  {...icon}
                  size="small"
                  className={classNames({
                    [styles.icon]: true,
                    ...icon.className,
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
