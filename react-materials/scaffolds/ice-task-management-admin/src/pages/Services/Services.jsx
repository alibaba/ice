import React, { Component } from 'react';
import ServiceCard from './components/ServiceCard';
import ServiceHead from './components/ServiceHead';

export default class Services extends Component {
  static displayName = 'Services';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ServiceHead />
        <ServiceCard />
      </div>
    );
  }
}
