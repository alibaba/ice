import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Greeting = ({ title, description, links }) => {
  return (
    <div style={styles.greeting}>
      <h1 style={styles.title}>{title}</h1>
      {description && <p style={styles.description}>{description}</p>}
      {Array.isArray(links) && (
        <div style={styles.links}>
          {links.map((item, index) => {
            if (item.external) {
              return (
                <a
                  style={styles.link}
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
              <Link key={index} style={styles.link} to={item.path}>
                {item.text}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

const styles = {
  greeting: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  title: {
    margin: '30px 0',
    fontSize: '28px',
  },
  description: {
    margin: '0 0 30px',
    fontSize: '18px',
  },
  links: {
    display: 'flex',
  },
  link: {
    margin: '0 10px',
    textDecoration: 'underline',
    color: '#666',
    fontSize: '14px',
  },
};

Greeting.defaultProps = {
  links: [],
};

Greeting.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf({
    external: PropTypes.bool,
    path: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.string
  })
};

export default Greeting;
