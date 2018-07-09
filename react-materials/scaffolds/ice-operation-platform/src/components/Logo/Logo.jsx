import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss';

export default class Logo extends Component {
  render() {
    const { style } = this.props;
    return (
      <div
        className="logo"
        style={style}
      >
        <Link to="/">
          <span
            className="logo-img"
          >
            LOGO
          </span>
          <div className="logo-description">
            <span className="logo-description-workbench">运营平台</span>
            <br />
            <span className="logo-description-slogan">工作台</span>
          </div>
        </Link>
      </div>
    );
  }
}
