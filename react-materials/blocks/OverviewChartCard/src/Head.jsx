/* eslint react/require-default-props: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Balloon } from '@alifd/next';

export default class Head extends Component {
  static displayName = 'Head';

  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    total: PropTypes.string,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, content, total } = this.props;
    return (
      <div style={styles.metaWrap}>
        <div style={styles.meta}>
          <span style={styles.title}>{title}</span>
          <span style={styles.action}>
            <Balloon
              trigger={<Icon type="help" size="xs" style={styles.promptIcon} />}
              align="t"
              closable={false}
              triggerType="hover"
              style={{ width: 120 }}
            >
              {content}
            </Balloon>
          </span>
        </div>
        <div style={styles.total}>{total}</div>
      </div>
    );
  }
}

const styles = {
  metaWrap: {
    position: 'relative',
  },
  meta: {
    position: 'relative',
    color: 'rgba(0,0,0, 0.45)',
    fontSize: '14px',
    lineHeight: '22px',
    height: '22px',
  },
  title: {},
  promptIcon: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  total: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
    whiteSpace: 'nowrap',
    color: 'rgba(0,0,0,.85)',
    marginTop: '8px',
    marginBottom: '0',
    fontSize: '30px',
    lineHeight: '38px',
    height: '38px',
  },
};
