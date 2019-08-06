import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Balloon } from '@alifd/next';
import Icon from '@components/Icon';
import styles from './index.module.scss';

const SubMenu = ({ title, operations, children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        {title ? (
          <h2 className={styles.title}>
            <FormattedMessage id={title} />
          </h2>
        ) : null}
        <div className={styles.operation}>
          {operations.map((item, index) => {
            const { tip } = item;
            return (
              <Balloon.Tooltip
                key={index}
                trigger={<Icon {...item} size="small" className={styles.icon} />}
                align="b"
              >
                <FormattedMessage id={tip} />
              </Balloon.Tooltip>
            );
          })}
        </div>
      </div>
      {children}
    </div>
  );
};

SubMenu.defaultProps = {
  title: '',
  children: null,
  operations: []
};

SubMenu.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  operations: PropTypes.array
};

export default SubMenu;
