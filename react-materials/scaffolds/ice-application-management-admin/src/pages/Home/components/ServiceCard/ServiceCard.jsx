import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import IceContainer from '@icedesign/container';

const { Row, Col } = Grid;

// MOCK 数据，实际业务按需进行替换
const getData = () => {
  return [
    {
      name: 'taobao-management',
      desc: '淘小宝管理后台',
      tag: '核心应用',
      qps: '5140.97/s',
      machine: 91,
    },
    {
      name: 'content-management',
      desc: '内容管理后台',
      qps: '5140.97/s',
      machine: 91,
    },
    // {
    //   name: 'seller-management',
    //   desc: '商家管理后台',
    //   tag: '核心应用',
    //   qps: '5140.97/s',
    //   machine: 91
    // }
  ];
};

export default class ServiceCard extends Component {
  static displayName = 'ServiceCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const mockData = getData();
    return (
      <Row wrap gutter="20">
        {mockData.map((item, index) => {
          return (
            <Col l="12" key={index}>
              <IceContainer style={styles.container}>
                <a href="#/app" >
                  <div style={styles.body}>
                    <h5 style={styles.name}>{item.name}</h5>
                    <p style={styles.desc}>{item.desc}</p>
                    {item.tag ? <div style={styles.tag}>{item.tag}</div> : null}
                  </div>
                  <div style={styles.footer}>
                    <div href="#" style={{ ...styles.link, ...styles.line }}>
                      <span>QPS</span>
                      <span style={{ paddingLeft: 20 }}>{item.qps}</span>
                    </div>
                    <div href="#" style={{ ...styles.link, ...styles.line }}>
                      <span>机器数</span>
                      <span style={{ paddingLeft: 20 }}>{item.machine}</span>
                    </div>
                  </div>
                </a>
              </IceContainer>
            </Col>
          );
        })}
      </Row>
    );
  }
}

const styles = {
  container: {
    padding: '0',
  },
  body: {
    padding: '20px',
    height: '120px',
    position: 'relative',
    borderBottom: '1px solid #f0f0f0',
  },
  name: {
    margin: '0',
    padding: '0',
    height: '28px',
    lineHeight: '28px',
    fontSize: '16px',
    color: '#0d1a26',
  },
  desc: {
    fontSize: '14px',
    color: '#697b8c',
    margin: '12px 0',
  },
  tag: {
    background: '#fff0f6',
    border: '1px solid #ffadd2',
    color: '#eb2f96',
    position: 'absolute',
    right: '20px',
    top: '20px',
    padding: '4px 12px',
    textAlign: 'center',
    borderRadius: '50px',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  link: {
    height: '56px',
    lineHeight: '56px',
    color: '#314659',
    cursor: 'pointer',
    textDecoration: 'none',
    width: '50%',
    textAlign: 'center',
  },
  line: {
    borderRight: '1px solid #f0f0f0',
  },
  icon: {
    marginRight: '5px',
  },
};
