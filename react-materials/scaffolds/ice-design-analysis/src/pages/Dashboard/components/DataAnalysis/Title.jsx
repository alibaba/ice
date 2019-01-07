import React, { Component } from 'react';

export default class Title extends Component {
  static displayName = 'Title';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <p style={styles.title}>{this.props.data}</p>;
  }
}

const styles = {
  title: {
    maxWidth: '340px',
    margin: '0 auto',
    padding: '4px 2px',
    borderRadius: '2px',
    fontSize: '16px',
    backgroundColor: 'rgba(26, 72, 78, 0.6)',
    color: '#f7d947',
    textAlign: 'center',
  },
};
