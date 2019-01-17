import React from 'react';
import PropTypes from 'prop-types';

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
            return null;
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
  title: 'ICE Block',
  description: 'Edit src/index.js and save to reload.',
  links: [],
};

Greeting.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  links: PropTypes.arrayOf({
    external: PropTypes.bool,
    path: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.string
  })
};

export default Greeting;
