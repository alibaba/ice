import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const ComponentCard = ({ dataSource }) => {
  return (
    <div className={styles.container}>
      <h5 className={styles.title}>{dataSource.name}</h5>
      <p className={styles.desc}>{dataSource.description || dataSource.name}</p>
    </div>
  );
};

ComponentCard.defaultProps = {
  dataSource: {},
};

ComponentCard.propTypes = {
  dataSource: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

export default ComponentCard;
