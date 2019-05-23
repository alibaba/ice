import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const ComponentCard = ({ dataSource, onInstall }) => {
  function handleInstall() {
    if (typeof onInstall === 'function') {
      onInstall(dataSource);
    }
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
          文档
        </a>
        <a className={styles.button} onClick={handleInstall}>安装</a>
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
  }),
  onInstall: PropTypes.func,
};

export default ComponentCard;
