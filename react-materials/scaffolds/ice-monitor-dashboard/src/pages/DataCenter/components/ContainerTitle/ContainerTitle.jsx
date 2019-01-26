import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Balloon } from '@alifd/next';

export default class ContainerTitle extends Component {
  static displayName = 'ContainerTitle';

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
  };

  static defaultProps = {
    title: '标题',
    description: '相关说明',
  };

  render() {
    const { title, description } = this.props;
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>{title}</h3>
        <span style={styles.extraIcon}>
          <Balloon
            trigger={<Icon type="help" size="xs" />}
            triggerType="hover"
            closable={false}
            align="t"
          >
            {description}
          </Balloon>
        </span>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    margin: '0 10px 0 0',
    fonSize: '16px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
  },
};
