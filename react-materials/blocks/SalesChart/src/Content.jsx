import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@alifd/next';

export default class Content extends Component {
  static displayName = 'Content';

  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <div style={styles.content}>
        {data.map((item, index) => {
          return (
            <div style={styles.item} key={index}>
              <p style={styles.label}>{item.label}</p>
              <h1 style={styles.amount}>{item.amount}</h1>
              <div style={{ ...styles[item.flag] }}>
                <Icon
                  type={`arrow-${item.flag}-filling`}
                  size="xs"
                  style={{ ...styles.arrowIcon }}
                />
                <span style={styles.rate}>{item.rate}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const styles = {
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 20px',
  },
  label: {
    margin: '10px 0 0',
  },
  amount: {
    margin: '10px 0',
  },
  arrowIcon: {
    marginRight: '5px',
  },
  up: {
    color: 'red',
  },
  down: {
    color: 'green',
  },
};
