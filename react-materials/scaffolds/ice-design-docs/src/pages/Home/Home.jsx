import React, { Component } from 'react';
import Header from '../../components/Header';
import Asdie from '../../components/Aside';
import Footer from '../../components/Footer';
import MarkdownDocs from './components/MarkdownDocs';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.homepage}>
        <Header />

        <div style={styles.wrapper}>
          <div style={styles.container}>
            <div style={styles.aside}>
              <Asdie />
            </div>

            <div style={styles.content}>
              <MarkdownDocs />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    margin: '93px 0 40px',
  },
  container: {
    display: 'flex',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  aside: {
    position: 'fixed',
    width: '256px',
  },
  content: {
    marginLeft: '256px',
    padding: '0 0 0 54px',
  },
};
