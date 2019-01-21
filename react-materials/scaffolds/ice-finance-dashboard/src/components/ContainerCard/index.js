import React, { Component } from 'react';
import './index.scss';

export default class ContainerCard extends Component {
  render() {
    const {
      title,
      extraContent,
      children,
      cardStyle,
      contentStyle,
    } = this.props;
    return (
      <div className="container-card" style={{ ...cardStyle }}>
        {title || extraContent ? (
          <div>
            <div className="container-card-head">
              {title ? <h3 className="container-card-title">{title}</h3> : null}
              {extraContent}
            </div>
          </div>
        ) : null}

        <div className="container-card-content" style={{ ...contentStyle }}>
          {children}
        </div>
      </div>
    );
  }
}
