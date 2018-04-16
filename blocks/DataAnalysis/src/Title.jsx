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
    return (
      <p style={styles.title}>
        {this.props.data}
      </p>
    );
  }
}

const styles = {
  title: {
    maxWidth: '340px',
    margin: '0 auto',
    padding: '2px',
    textAlign: 'center',
    color: '#F8BC38',
    backgroundColor: '#1A484E',
    fontSize: '14px',
  },
};
