import React, { Component } from 'react';
import { Grid } from '@icedesign/base';
import MOCK_DATA from './data';

const { Row, Col } = Grid;

export default class GuestList extends Component {
  static displayName = 'GuestList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.title}>大会嘉宾</div>
        <div style={styles.line} />
        <p style={styles.desc}>持续更新中</p>
        <div style={styles.content}>
          <Row wrap gutter={20}>
            {MOCK_DATA.map((item, index) => {
              return (
                <Col xl="3" l="4" m="6" xs="12" key={index}>
                  <div style={styles.box}>
                    <img src={item.avatar} alt="" style={styles.avatar} />
                    <div style={styles.info}>
                      <div style={styles.name}>{item.name}</div>
                      <div style={styles.job}>{item.job}</div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    background: '#000',
    padding: '70px 0',
  },
  content: {
    width: '80%',
    margin: '50px auto 0',
  },
  title: {
    fontSize: '32px',
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    overflow: 'hidden',
  },
  line: {
    width: '38px',
    height: '3px',
    fontSize: '0',
    backgroundColor: '#fa7453',
    margin: '14px auto 0',
    overflow: 'hidden',
  },
  desc: {
    lineHeight: '20px',
    fontSize: '14px',
    color: '#999',
    textAlign: 'center',
    marginTop: '15px',
    overflow: 'hidden',
  },
  box: {
    position: 'relative',
    marginBottom: '20px',
  },
  avatar: {
    display: 'block',
    maxWidth: '100%',
    verticalAlign: 'top',
  },
  info: {
    position: 'absolute',
    left: '0',
    bottom: '0',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(180deg,transparent 0,rgba(0,0,0,.5))',
    backgroundRepeat: 'repeat-x',
  },
  name: {
    display: 'block',
    width: '90%',
    lineHeight: '28px',
    fontSize: '18px',
    color: '#fff',
    margin: '14px auto 0',
    overflow: 'hidden',
  },
  job: {
    display: 'block',
    width: '90%',
    lineHeight: '18px',
    fontSize: '12px',
    color: '#fff',
    margin: '0 auto 14px',
    overflow: 'hidden',
  },
};
