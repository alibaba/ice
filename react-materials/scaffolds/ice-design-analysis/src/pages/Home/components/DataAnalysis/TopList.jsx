import React, { Component } from 'react';
import TextLoop from 'react-text-loop';
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
      <div style={{ height: '33%' }}>
        <Title data={this.props.title} />
        <ul style={styles.list}>
          {this.props.data.map((data, index) => {
            return (
              <TextLoop key={index}>
                <li style={styles.item}>
                  <span style={styles.idx}>No.{index + 1}</span>
                  <span style={styles.name}>{data.name}</span>
                </li>
              </TextLoop>
            );
          })}
        </ul>
      </div>
    );
  }
}

const styles = {
  list: {
    color: '#fff',
    lineHeight: '36px',
    marginTop: '20px',
  },
  item: {
    borderBottom: '1px solid #00F0FF',
    width: '300px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  name: {
    marginLeft: '10px',
  },
};
