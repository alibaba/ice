import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const MaterialCategories = ({ dataSource }) => {
  return (
    <div className={styles.container}>
      {dataSource.map((item, index) => {
        return (
          <div className={styles.cateName} key={index}>
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

MaterialCategories.propTypes = {
  dataSource: PropTypes.array.isRequired,
};

export default MaterialCategories;
