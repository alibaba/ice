import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.scss';

const ComponentCard = ({ dataSource, onInstall }) => {
  function handleInstall() {
    onInstall(dataSource);
  }

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>{dataSource.name}</h5>
      <p className={styles.desc}>{dataSource.description || dataSource.name}</p>
      <div className={styles.actions}>
        <a
          href={dataSource.homepage}
          rel="noopener noreferrer"
          target="_blank"
          className={styles.button}
        >
          <FormattedMessage id="iceworks.material.doc" />
        </a>
        <a className={styles.button} onClick={handleInstall}><FormattedMessage id="iceworks.material.install" /></a>
      </div>
    </div>
  );
};

ComponentCard.defaultProps = {
  dataSource: {},
  onInstall: f => f,
};

ComponentCard.propTypes = {
  dataSource: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    homepage: PropTypes.string,
  }),
  onInstall: PropTypes.func,
};

export default ComponentCard;
