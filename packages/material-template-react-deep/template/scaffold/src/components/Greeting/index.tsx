import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';

const Greeting = ({ title, description, links }) => {
  return (
    <div className={styles.greeting}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
      {Array.isArray(links) && (
        <div className={styles.links}>
          {links.map((item, index) => {
            if (item.external) {
              return (
                <a
                  className={styles.link}
                  key={index}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.text}
                </a>
              );
            }
            return (
              <Link key={index} className={styles.link} to={item.path}>
                {item.text}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

Greeting.defaultProps = {
  links: [],
};

Greeting.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.array,
};

export default Greeting;
