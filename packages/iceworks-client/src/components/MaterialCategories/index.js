import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
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
        <Link to={linkToAll}><FormattedMessage id="iceworks.material.all" /></Link>
      </li>
      {dataSource.map(({ name }) => {
        return (
          <li key={name} className={cx({ [styles.active]: current === name })}>
            <Link
              to={
                type
                  ? `${linkPrefix}/?category=${name}&type=${type}`
                  : `${linkPrefix}/?category=${name}`
              }
            >
              {name}
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
