import {Component} from 'react';

class Icon extends Component {
  render() {
    const { className, ...rest } = this.props;
    return (
      <span
        className={`material-icons ${className}`}
        style={{
          fontSize: '18px',
          verticalAlign: 'textBottom'
        }}
        {...rest}
      />
    );
  }
}

class Button extends Component {
  render() {
    const {reversed, active, icon, title, onMouseDown, onClick} = this.props;
    return (
      <span style={{
        display: 'inline-block',
        marginRight: '15px',
        cursor: 'pointer',
        color: reversed
            ? active ? 'white' : '#aaa'
            : active ? 'black' : '#ccc'
        }}
        title={title}
        onMouseDown={onMouseDown}
        onClick={onClick}
      >
        <Icon>{icon}</Icon>
      </span>
    );
  }
}

export default Button;
