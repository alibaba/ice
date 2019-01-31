import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@alifd/next';

const PageHead = ({ title, style, ...props }) => {
  return (
    <div style={{ ...styles.container, ...style }}>
      <h3 style={styles.title}>{title}</h3>
      {props.buttonText ? (
        <Button type="primary" onClick={props.onClick}>
          {props.buttonText}
        </Button>
      ) : null}
    </div>
  );
};

const styles = {
  container: {
    margin: '0 10px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    margin: '0',
    padding: '0',
    fonSize: '16px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
  },
};

PageHead.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
};

PageHead.defaultProps = {
  buttonText: '',
};

export default PageHead;
