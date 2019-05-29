import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';

const BlockCard = ({ dataSource }) => {
  return (
    <div className={styles.container}>
      <div className={styles.screenshot}>
        {dataSource.isNewly ? <div className={styles.newly}>NEW</div> : null}
        <img alt={dataSource.title} src={dataSource.screenshot} />
      </div>
      <h5 className={styles.title}>{dataSource.title}</h5>
      <div className={styles.actions}>
        <a
          href={dataSource.homepage}
          rel="noopener noreferrer"
          target="_blank"
          className={styles.button}
        >
          <FormattedMessage id="iceworks.material.preview" />
        </a>
        <a
          href={dataSource.repository}
          rel="noopener noreferrer"
          target="_blank"
          className={styles.button}
        >
          <FormattedMessage id="iceworks.material.source" />
        </a>
      </div>
    </div>
  );
};

BlockCard.defaultProps = {
  dataSource: {
    isNewlyCreated: false,
  },
};

BlockCard.propTypes = {
  dataSource: PropTypes.shape({
    isNewlyCreated: PropTypes.bool,
    screenshot: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

export default BlockCard;
