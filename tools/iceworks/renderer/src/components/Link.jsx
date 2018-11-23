import classnames from 'classnames';
import React, { Component } from 'react';

import history from '../history';

const prettyUrl = (to) => {
  if (to.startsWith('/')) {
    return to;
  } else {
    return '/' + to;
  }
};

class Link extends Component {
  handleClick = (event) => {
    event.preventDefault();
    history.push(this.props.to);
  };

  render() {
    const classes = classnames({
      active: prettyUrl(this.props.to) == history.location.pathname,
    });

    return (
      <a className={classes} href={this.props.to} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

export default Link;
