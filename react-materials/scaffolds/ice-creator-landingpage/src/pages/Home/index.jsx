import React, { Component } from 'react';
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
        <div id="tools">
          <PlatformToolsIntro />
        </div>
        <div id="fans">
          <PlatformIntro />
        </div>
        <div id="business">
          <PlatformBlackIntro />
        </div>
        <div id="join">
          <PlatformJoinus />
        </div>
      </div>
    );
  }
}
