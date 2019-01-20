import React from 'react';
import PropTypes from 'prop-types';

const ContainerTitle = ({ title, style, ...props }) => {
  return (
    <h3 {...props} style={{ ...styles.title, ...style }}>
      {title}
    </h3>
  );
};

const styles = {
  title: {
    margin: '0',
    padding: '0',
    fonSize: '16px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
  },
};

ContainerTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ContainerTitle;
