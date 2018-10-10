import React, {Component} from 'react';

/**
 * Image node renderer.
 *
 * @type {Component}
 */

export default class Image extends Component {
  state = {}

  componentDidMount() {
    const { node } = this.props;
    const { data } = node;
    const file = data.get('file');
    this.load(file);
  }

  load(file) {
    const reader = new FileReader();
    reader.addEventListener('load', () => this.setState({ src: reader.result }));
    reader.readAsDataURL(file);
  }

  render() {
    const { attributes, selected } = this.props;
    const { src } = this.state;
    return src ?
      <img
        {...attributes}
        src={src}
        style={{
          display: 'block',
          maxWidth: '100%',
          maxHeight: '20em',
          boxShadow: selected ? '0 0 0 2px blue' : 'none'
        }}
      /> :
      <span>Loading...</span>;
  }
}
