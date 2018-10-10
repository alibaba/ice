import {Component} from 'react';

class Button extends Component {
  render() {
    const {reversed, active, icon, title, onMouseDown, onClick, iconStyle} = this.props;
    return (
      <span
        style={{
          display: 'inline-block',
          marginRight: '15px',
          cursor: 'pointer',
          color: reversed
              ? active ? 'white' : '#aaa'
              : active ? 'black' : '#ccc',
        }}
        title={title}
        onMouseDown={onMouseDown}
        onClick={onClick}
      >
        <span
          className={'material-icons'}
          style={{
            fontSize: '18px',
            verticalAlign: 'textBottom',
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
