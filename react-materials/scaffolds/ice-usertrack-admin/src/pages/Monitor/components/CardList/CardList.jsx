import React, { Component } from 'react';
import { Icon, Grid } from '@alifd/next';
import { Link } from 'react-router-dom';

const { Row, Col } = Grid;

const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      title: '淘宝首页监控',
      appVersion: `0.0.${index}`,
      error: `${index}`,
      dau: `1000${index}`,
      compareVersion: `0.0.${index}`,
      newTrack: `${index + 1}1`,
      omitTrack: 0,
    };
  });
};

export default class CardList extends Component {
  static displayName = 'CardList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = getData();
    return (
      <div style={styles.container}>
        <Row wrap gutter="20">
          {data.map((item, index) => {
            return (
              <Col l="6" key={index}>
                <div style={styles.card}>
                  <div style={styles.head}>
                    <h4 style={styles.title}>
                      {index === 0 ? item.title : item.appVersion}
                    </h4>
                  </div>
                  <Row wrap style={styles.body}>
                    <Col l="12" style={styles.info}>
                      埋点错误数：
                      {item.error}
                    </Col>
                    <Col l="12" style={styles.info}>
                      今日 DAU：
                      {item.dau}
                    </Col>
                    <Col l="12" style={styles.info}>
                      新增埋点数：
                      {item.newTrack}
                    </Col>
                    <Col l="12" style={styles.info}>
                      遗漏埋点数：
                      {item.omitTrack}
                    </Col>
                  </Row>
                  <Row style={styles.footer}>
                    <Col l="12">
                      <Link to="/monitor/monitor" style={styles.link}>
                        <Icon type="set" size="small" style={styles.icon} />
                        告警配置
                      </Link>
                    </Col>
                    <Col l="12">
                      <Link to="/monitor/monitor" style={styles.link}>
                        <Icon
                          type="attachment"
                          size="small"
                          style={styles.icon}
                        />
                        查看详情
                      </Link>
                    </Col>
                  </Row>
                </div>
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
    margin: '20px',
  },
  createScheme: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '190px',
    cursor: 'pointer',
  },
  card: {
    displayName: 'flex',
    marginBottom: '20px',
    background: '#fff',
    borderRadius: '6px',
  },
  head: {
    position: 'relative',
    padding: '16px 16px 8px',
    borderBottom: '1px solid #e9e9e9',
  },
  title: {
    margin: '0 0 5px',
    width: '90%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '16px',
    fontWeight: '500',
    color: 'rgba(0,0,0,.85)',
  },
  desc: {
    margin: '0',
    fontSize: '14px',
  },
  body: {
    position: 'relative',
    padding: '16px 16px 6px',
  },
  info: {
    margin: '0 0 10px',
    fontSize: '13px',
  },
  footer: {
    padding: '10px 16px',
    borderTop: '1px solid #eee',
    textAlign: 'center',
  },
  icon: {
    marginRight: '5px',
  },
};
