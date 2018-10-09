import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

class ColorPicker extends Component {
  static defaultProps = {
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: props.backgroundColor,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.backgroundColor !== this.state.color) {
      this.setState({ color: nextProps.backgroundColor });
    }
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    this.setState({ color: color.hex }, () => {
      this.props.onChange(this.state.color);
    });
  };

  render() {
    return (
      <div>
        <div
          onClick={this.handleClick}
          style={{
            border: '3px solid #fff',
            borderRadius: 2,
            height: 20,
            width: 50,
            backgroundColor: this.state.color,
            boxShadow: '0 0 1px rgba(0,0,0,0.5)',
          }}
        />

        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker
              disableAlpha
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
  swatch: {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
  },
  popover: {
    position: 'fixed',
    zIndex: '999999',
    paddingTop: 5,
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
};

export default ColorPicker;
