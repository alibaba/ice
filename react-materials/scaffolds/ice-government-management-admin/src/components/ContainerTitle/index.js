import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@alifd/next';

const ContainerTitle = ({ title, style, ...props }) => {
  return (
    <div style={{ ...styles.container, ...style }}>
      <h3 style={styles.title}>{title}</h3>
      {props.buttonText ? (
        <Button type="primary">{props.buttonText}</Button>
      ) : null}
    </div>
  );
};

const styles = {
  container: {
    padding: '15px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #f0f0f0',
  },
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
  buttonText: PropTypes.string,
};

ContainerTitle.defaultProps = {
  buttonText: '',
};

export default ContainerTitle;
