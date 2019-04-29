import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Context as SocketContext } from '@hooks/useSocket';
import styles from './index.module.scss';

const ConnectionBar = () => {
  return (
    <SocketContext.Consumer>
      {value => (
        <div className={styles.connectionBar}>
          {value[1] ? (
            <FormattedMessage id="iceworks.global.connect" />
          ) : (
            <FormattedMessage id="iceworks.global.disconnect" />
          )}
        </div>
      )}
    </SocketContext.Consumer>
  );
};

ConnectionBar.propTypes = {
};

export default ConnectionBar;
