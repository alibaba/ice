import React, { Component } from 'react';

export default class RichtextRenderer extends Component {

  render() {
    const {html, className, ...others} = this.props;

    return (
      <div
        className={(className ? className + ' ' : '') + 'ice-richtext'}
        {...others}
        dangerouslySetInnerHTML={{__html: html}}
      />
    );
  }
}

