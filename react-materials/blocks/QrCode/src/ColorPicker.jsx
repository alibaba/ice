import React from 'react';
import { SketchPicker } from 'react-color';
import PropTypes from 'prop-types';

export default class ColorPicker extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: props.defaultColor,
    };
  }

  handleClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker,
    });
  };

  handleClose = () => {
    this.setState({
      displayColorPicker: false,
    });
  };

  handleChange = (color) => {
    this.setState(
      {
        color: color.hex,
      },
      () => {
        this.props.onChange(color);
      }
    );
  };

  render() {
    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={{ ...styles.color, background: `${this.state.color}` }} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const styles = {
  color: {
    width: '36px',
    height: '14px',
    borderRadius: '2px',
  },
  swatch: {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
  },
  popover: {
    position: 'absolute',
    zIndex: '2',
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
};
