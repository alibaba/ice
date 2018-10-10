import {Component} from 'react';

export default class Toolbar extends Component {
  render() {
    return (
      <div style={style.toolbar}>
        {this.props.children}
      </div>
    );
  }
}

const style = {
  toolbar: {
    position: 'relative',
    padding: '1px 18px 17px',
    margin: '0 -20px',
    borderBottom: '2px solid #eee',
    marginBottom: '20px'
  }
}
