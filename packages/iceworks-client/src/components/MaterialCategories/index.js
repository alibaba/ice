import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

function MaterialCategories(props) {
  const {
    dataSource,
    current,
    linkPrefix,
    type,
  } = props;

  const linkToAll = type ? `${linkPrefix}/?type=${type}` : `${linkPrefix}`;

  return (
    <ul className={styles.materialCategories}>
      <li key={-1} className={cx({ [styles.active]: !current || current === 'all' })}>
        <Link to={linkToAll}>全部</Link>
      </li>
      {dataSource.map(({ name }, index) => {
        const item = {
          name,
        };

        return (
          <li key={index} className={cx({ [styles.active]: current === item.name })}>
            <Link
              to={
                type
                  ? `${linkPrefix}/?category=${item.name}&type=${type}`
                  : `${linkPrefix}/?category=${item.name}`
              }
            >
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

MaterialCategories.propTypes = {
  dataSource: PropTypes.array.isRequired,
  current: PropTypes.string,
  linkPrefix: PropTypes.string,
  type: PropTypes.string,
};

MaterialCategories.defaultProps = {
  current: '',
  linkPrefix: '/material',
  type: '',
};

export default MaterialCategories;
