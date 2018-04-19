import React, { Component } from 'react';

export default class extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.editable.innerHTML;
  }
  componentDidUpdate() {
    if (this.props.html !== this.editable.innerHTML) {
      this.editable.innerHTML = this.props.html;
    }
  }
  emitChange() {
    const html = this.editable.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html,
        },
      });
    }
    this.lastHtml = html;
  }
  render() {
    return (
      <div
        onInput={this.emitChange.bind(this)}
        onBlur={this.emitChange.bind(this)}
        contentEditable
        dangerouslySetInnerHTML={{ __html: this.props.html }}
        ref={(editable) => (this.editable = editable)}
      >
        {}
      </div>
    );
  }
}
