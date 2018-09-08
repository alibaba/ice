import React, { Component } from 'react';

export default class Home extends Component {
  static displayName = 'Home';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      text: 'home',
    };
  }

  componentWillMount() {
    console.log('Test forceUpdate in componentWillMount');
    setTimeout(() => {
      console.log('Async load data');
      this.state.text = 'forceUpdate';
      this.forceUpdate();
    }, 3000);
  }

  render() {
    return <div style={styles.container}>{this.state.text}</div>;
  }
}

const styles = {
  container: {
    height: '2000px',
  },
};
