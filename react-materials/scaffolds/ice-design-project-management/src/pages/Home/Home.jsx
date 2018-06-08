import React, { Component } from 'react';
import BoardList from './components/BoardList';
import ContentMenu from '../../components/ContentMenu';
import Header from '../../components/Header';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-page" style={styles.homePage}>
        <ContentMenu />
        <div style={styles.mainContent}>
          <Header />
          <BoardList />
        </div>
      </div>
    );
  }
}

const styles = {
  homePage: {
    display: 'flex',
    height: '100vh',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0',
    position: 'relative',
    overflowY: 'auto',
    overflowX: 'auto',
  },
};
