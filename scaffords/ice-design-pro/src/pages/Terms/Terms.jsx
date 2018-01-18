import React, { Component } from 'react';
import TermsInfo from './components/TermsInfo';
import './Terms.scss';

export default class Terms extends Component {
  static displayName = 'Terms';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="terms-page">
        <TermsInfo />
      </div>
    );
  }
}
