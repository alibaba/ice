import React, { Component } from 'react';
import Banner from '../Banner';
import AboutGeek from '../AboutGeek';
import Workshop from '../Workshop';
import Events from '../Events';
import Sponsorship from '../Sponsorship';

export default class ScrollScreen extends Component {
  static displayName = 'ScrollScreen';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <div id="page1" style={styles.section}>
          <Banner />
        </div>
        <div id="page2" style={styles.section}>
          <AboutGeek />
        </div>
        <div id="page3" style={styles.section}>
          <Events />
        </div>
        <div id="page4" style={styles.section}>
          <Workshop />
        </div>
        <div id="page5" style={styles.section}>
          <Sponsorship />
        </div>
      </div>
    );
  }
}

const styles = {
  section: {
    height: '100vh',
    overflow: 'hidden',
  },
};
