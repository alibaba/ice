import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Icon, Pagination } from '@alifd/next';

const { Row, Col } = Grid;

const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      title: `${index + 1}. 这里是试卷名称这里是试卷名称这里是试卷名称`,
      time: `2018-06-1${index}`,
      citation: index + 1,
      score: index + 90,
      subject: '自然语言',
      count: 20,
    };
  });
};

export default class Lists extends Component {
  static displayName = 'Lists';

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  handlePaginationChange = (current) => {
    this.setState({
      current,
    });
  };

  render() {
    const data = getData();
    return (
      <IceContainer>
        <h4 style={styles.cardTitle}>试卷列表</h4>
        <div style={styles.contentList}>
          {data.map((item, index) => {
            return (
              <div style={styles.item} key={index}>
                <h6 style={styles.title}>{item.title}</h6>
                <Row>
                  <Col l="16">
                    <div style={styles.metaWrap}>
                      <div style={styles.meta}>
                        <span>阅卷方式: </span>
                        <span>人工</span>
                      </div>
                      <div style={styles.meta}>
                        <span>时间: </span>
                        <span>{item.time}</span>
                      </div>
                      <div style={styles.meta}>
                        <span>引用次数: </span>
                        <span>{item.citation}</span>
                      </div>
                      <div style={styles.meta}>
                        <span>分值: </span>
                        <span>{item.score}</span>
                      </div>
                      <div style={styles.meta}>
                        <span>技术方向: </span>
                        <span>{item.subject}</span>
                      </div>
                      <div style={styles.meta}>
                        <span>题目: </span>
                        <span>{item.count}</span>
                      </div>
                    </div>
                  </Col>
                  <Col l="8">
                    <div style={styles.operWrap}>
                      <div style={styles.oper}>
                        <Icon size="xs" type="edit" style={styles.operIcon} />
                        <span style={styles.operText}>编辑</span>
                      </div>
                      <div style={styles.oper}>
                        <Icon size="xs" type="ashbin" style={styles.operIcon} />
                        <span style={styles.operText}>删除</span>
                      </div>
                      <div style={styles.oper}>
                        <Icon
                          size="xs"
                          type="success"
                          style={styles.operIcon}
                        />
                        <span style={styles.operText}>归档</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
        <Pagination
          style={styles.pagination}
          current={this.state.current}
          onChange={this.handlePaginationChange}
        />
      </IceContainer>
    );
  }
}

const styles = {
  cardTitle: {
    height: '16px',
    lineHeight: '16px',
    fontSize: '16px',
    color: 'rgb(51, 51, 51)',
    fontWeight: 'bold',
    margin: '0',
    padding: '0',
  },
  item: {
    position: 'relative',
    borderBottom: '1px solid #eee',
    padding: '20px 0',
  },
  title: {
    margin: '0 0 10px',
  },
  metaWrap: {
    display: 'flex',
    paddingLeft: '15px',
  },
  meta: {
    fontSize: '13px',
    color: '#999',
    marginRight: '15px',
  },
  operWrap: {
    position: 'absolute',
    right: '0',
    top: '36px',
    display: 'flex',
    cursor: 'pointer',
  },
  oper: {
    marginLeft: '15px',
    fontSize: '13px',
    color: '#999',
  },
  operIcon: {
    marginRight: '8px',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
