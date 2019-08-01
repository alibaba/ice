import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { PLACEHOLDER_IMG } from '@src/appConfig';
import styles from './index.module.scss';

const BlockCard = ({ dataSource, onClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.screenshot} onClick={onClick}>
        {dataSource.isNewly ? <div className={styles.newly}>NEW</div> : null}
        <img alt={dataSource.title} src={dataSource.screenshot || PLACEHOLDER_IMG} />
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
    isNewly: false,
  },
  onClick: () => {},
};

BlockCard.propTypes = {
  dataSource: PropTypes.shape({
    screenshot: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isNewly: PropTypes.bool,
    homepage: PropTypes.string,
    repository: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

export default BlockCard;
