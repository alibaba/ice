import React, { Component } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import PlatformIntro from './components/PlatformIntro';
import PlatformToolsIntro from './components/PlatformToolsIntro';
import PlatformJoinus from './components/PlatformJoinus';
import PlatformLanding from './components/PlatformLanding';
import PlatformBlackIntro from './components/PlatformBlackIntro';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-page" style={{ background: '#fff' }}>
        <Header />
        <PlatformLanding />
        <PlatformToolsIntro />
        <PlatformIntro />
        <PlatformBlackIntro />
        <PlatformJoinus />
        <Footer />
      </div>
    );
  }
}
