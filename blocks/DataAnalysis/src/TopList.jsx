import React, { Component } from 'react';
import Title from './Title';

export default class TopList extends Component {
  static displayName = 'TopList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Title data={this.props.title} />
        <ul style={styles.list}>
          {
            this.props.data.map((data, index) => {
              return (
                <li style={styles.item}>
                  <span style={styles.idx}>No.{index}</span>
                  <span style={styles.name}>{data.name}</span>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

const styles = {
  list: {
    color: '#fff',
    lineHeight: '36px',
    marginBottom: '60px'
  },
  item: {
    borderBottom: '1px solid #00F0FF',
    width: '300px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  name: {
    marginLeft: '10px',
  }
};
