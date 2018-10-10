import {Component} from 'react';

class Button extends Component {
  render() {
    const {reversed, active, icon, title, onMouseDown, onClick, iconStyle} = this.props;
    return (
      <span
        className="toolbar-button"
        style={{
          color: reversed
              ? active ? 'white' : '#ccc'
              : active ? 'black' : '#999',
        }}
        title={title}
        onMouseDown={onMouseDown}
        onClick={onClick}
      >
        <span
          className="material-icons"
          style={{
            ...iconStyle
          }}
        >
          {icon}
        </span>
      </span>
    );
  }
}

export default Button;
