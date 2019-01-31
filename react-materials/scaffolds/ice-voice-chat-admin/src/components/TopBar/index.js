import React, { PureComponent } from 'react';
import { Button } from '@alifd/next';
import PropTypes from 'prop-types';

export default class TopBar extends PureComponent {
  render() {
    const {
      title,
      buttonText,
      extraBefore,
      extraAfter,
      style,
      onClick,
    } = this.props;

    return (
      <div style={{ ...styles.container, ...style }}>
        {extraBefore || <div style={styles.title}>{title || ''}</div>}

        {extraAfter || (
          <div style={styles.buttons}>
            {buttonText ? (
              <Button type="primary" onClick={onClick}>
                {buttonText}
              </Button>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

TopBar.propTypes = {
  onClick: PropTypes.func,
  extraBefore: PropTypes.element,
  extraAfter: PropTypes.element,
  style: PropTypes.object,
};

TopBar.defaultProps = {
  onClick: () => {},
  extraAfter: null,
  extraBefore: null,
  style: {},
};

const styles = {
  container: {
    position: 'fixed',
    top: '62px',
    left: '240px',
    right: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60px',
    padding: '0 20px',
    zIndex: '99',
    background: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.2) 2px 0px 4px',
  },
};
