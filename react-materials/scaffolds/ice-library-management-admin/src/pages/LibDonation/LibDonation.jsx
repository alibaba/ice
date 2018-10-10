import React, { Component } from 'react';
import DonationForm from './components/DonationForm';

export default class LibDonation extends Component {
  static displayName = 'LibDonation';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <DonationForm />
      </div>
    );
  }
}
