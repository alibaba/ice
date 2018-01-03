import React, { PureComponent } from 'react';
import Header from './__components_Header__';
import Footer from './__components_Footer__';
import './Layout.scss';

export default class LandingLayout extends PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div className="landing-layout">
        <div className="landing-layout-header">
          <Header />
        </div>
        <div>{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}
