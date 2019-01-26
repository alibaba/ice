import React, { PureComponent } from 'react';
import { Button, Icon } from '@alifd/next';
import PropTypes from 'prop-types';

export default class TopBar extends PureComponent {
  render() {
    const { title, buttonText, extraBefore, extraAfter } = this.props;

    return (
      <div style={styles.container}>
        {extraBefore || <div style={styles.title}>{title || ''}</div>}

        {extraAfter || (
          <div style={styles.buttons}>
            <Button iconSize="xs" type="primary">
              <Icon type="add" style={styles.addIcon} />
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

TopBar.propTypes = {
  extraBefore: PropTypes.element,
  extraAfter: PropTypes.element,
};

TopBar.defaultProps = {
  extraAfter: null,
  extraBefore: null,
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
  addIcon: {
    marginRight: '5px',
  },
};
