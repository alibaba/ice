import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Icon } from '@alifd/next';

export default class Field extends Component {
  static displayName = 'Field';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { style } = this.props;
    return (
      <div style={{ ...styles.content, ...style }}>
        <div style={styles.trendItems}>
          <div style={styles.trendItem}>
            <span>
              <FormattedMessage id="app.chart.general.overview.week" />
              <span style={styles.trendRate}>12%</span>
            </span>
            <span style={styles.arrowIcon}>
              <Icon type="arrow-down-filling" size="xxs" />
            </span>
          </div>
          <div style={styles.trendItem}>
            <span>
              <FormattedMessage id="app.chart.general.overview.day" />
              <span style={styles.trendRate}>10%</span>
            </span>
            <span style={styles.arrowIcon}>
              <Icon type="arrow-up-filling" size="xxs" />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  content: {
    position: 'relative',
    height: '64px',
  },
  trendItems: {
    display: 'flex',
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    color: 'rgba(0,0,0,.65)',
  },
  trendItem: {
    marginRight: '20px',
  },
  trendRate: {
    marginLeft: '8px',
    color: 'rgba(0,0,0,.85)',
  },
  arrowIcon: {
    marginLeft: '4px',
    color: '#f5222d',
  },
};
