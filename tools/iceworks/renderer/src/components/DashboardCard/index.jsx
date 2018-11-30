import React, { Component } from 'react';

import './index.scss';

class DashboardCard extends Component {
  render() {
    return (
      <div className="dashboard-card-wrapper" {...this.props}>
        <div className="dashboard-card">{this.props.children}</div>
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div className="dashboard-card-header" {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

class Body extends Component {
  render() {
    return (
      <div className="dashboard-card-body" {...this.props}>
        <div className="dashboard-card-body-innner">{this.props.children}</div>
      </div>
    );
  }
}

DashboardCard.Header = Header;
DashboardCard.Body = Body;

export default DashboardCard;
