'use strict';

import React, { Component } from 'react';

import LandingIntroBanner from './components/landing-intro-banner';

import './Landing.scss';

export default class Landing extends Component {
  static displayName = 'Landing';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="landing-page">
        
        <LandingIntroBanner />
        
      </div>
    );
  }
}
