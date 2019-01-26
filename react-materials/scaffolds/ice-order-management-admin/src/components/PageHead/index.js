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
    margin: '10px 10px 30px',
    paddingBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e5dddd',
  },
  title: {
    margin: '0',
    padding: '0',
    fontSize: '22px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: 'bold',
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
