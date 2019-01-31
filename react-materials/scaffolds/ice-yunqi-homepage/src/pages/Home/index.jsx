import React, { Component } from 'react';
import Banner from './components/Banner';
import Tickets from './components/Tickets';
import GreatVideo from './components/GreatVideo';
import FrontierContent from './components/FrontierContent';
import Exhibition from './components/Exhibition';
import Events from './components/Events';
import Speakers from './components/Speakers';
import Address from './components/Address';
import About from './components/About';
import Sponsor from './components/Sponsor';

export default class Home extends Component {
  static displayName = 'Home';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Banner />
        <Tickets />
        <GreatVideo />
        <FrontierContent />
        <Exhibition />
        <Events />
        <Speakers />
        <Address />
        <About />
        <Sponsor />
      </div>
    );
  }
}
