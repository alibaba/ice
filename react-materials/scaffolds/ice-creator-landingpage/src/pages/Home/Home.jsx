import React, { Component } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import PlatformIntro from './components/PlatformIntro';
import PlatformIntro2 from './components/PlatformIntro2';
import PlatformJoinus from './components/PlatformJoinus';
import PlatformLanding from './components/PlatformLanding';

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
        <PlatformIntro2 />
        <PlatformIntro />
        <PlatformJoinus />
        <Footer />
      </div>
    );
  }
}
