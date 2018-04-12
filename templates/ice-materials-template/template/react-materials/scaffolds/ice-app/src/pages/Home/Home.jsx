import React, { Component } from 'react';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-page">
        <h2 style={styles.greeting}>ICE React Template</h2>
      </div>
    );
  }
}

const styles = {
  greeting: {
    margin: 0,
    padding: '200px 0',
    fontSize: '38px',
    textAlign: 'center',
    textTransform: 'uppercase',
    background: '#333',
    color: '#fff',
  },
};
