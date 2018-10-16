import React, { Component } from 'react';

export default class RichtextRenderer extends Component {
  static displayName = 'RichtextRenderer';

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

