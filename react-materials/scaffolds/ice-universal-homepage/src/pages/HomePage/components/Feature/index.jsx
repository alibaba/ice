import React, { Component } from 'react';
import { Grid } from '@alifd/next';

const { Row, Col } = Grid;

const dataSource = [
  {
    title: '标题简介',
    pic: require('./images/img1.png'),
    desc: '这里是相关的功能介绍和描述',
  },
  {
    title: '标题简介',
    pic: require('./images/img3.png'),
    desc: '这这里是相关的功能介绍和描述',
  },
  {
    title: '标题简介',
    pic: require('./images/img4.png'),
    desc: '这这里是相关的功能介绍和描述',
  },
  {
    title: '标题简介',
    pic: require('./images/img2.png'),
    desc: '这这里是相关的功能介绍和描述',
  },
];

export default class Feature extends Component {
  static displayName = 'Feature';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <Row wrap style={styles.content}>
          {dataSource.map((item, index) => {
            return (
              <Col xxs="12" s="6" l="6" key={index} style={styles.item}>
                <img src={item.pic} style={styles.pic} alt="" />
                <h3 style={styles.title}>{item.title}</h3>
                <p style={styles.desc}>{item.desc}</p>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

const styles = {
  container: {
    padding: '80px 0',
    background: '#F6F7F9',
  },
  content: {
    width: '1200px',
    margin: '0 auto',
  },
  item: {
    textAlign: 'center',
    padding: '10px 20px',
  },
  pic: {
    width: '80px',
    marginBottom: '30px',
  },
  title: {
    fontWeight: 'bold',
  },
  desc: {
    lineHeight: '22px',
    color: '#999',
  },
};
