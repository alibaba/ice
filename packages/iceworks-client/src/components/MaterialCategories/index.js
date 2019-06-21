import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

function MaterialCategories(props) {
  const {
    dataSource,
    current,
    onChange,
  } = props;

  return (
    <ul className={styles.materialCategories}>
      {dataSource.map(({ name }) => {
        return (
          <li key={name} className={cx({ [styles.active]: current === name })}>
            <span onClick={() => onChange(name)}>
              {name}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

MaterialCategories.propTypes = {
  dataSource: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  current: PropTypes.string.isRequired,
};

MaterialCategories.defaultProps = {
};

export default MaterialCategories;
