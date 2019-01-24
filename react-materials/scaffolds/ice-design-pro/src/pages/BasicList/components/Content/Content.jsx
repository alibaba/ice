import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Icon, Pagination, Loading } from '@alifd/next';

const { Row, Col } = Grid;

export default class Content extends Component {
  static displayName = 'Content';

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
    const { data, isLoading } = this.props;
    return (
      <IceContainer style={styles.container}>
        <h4 style={styles.cardTitle}>商品列表</h4>
        <Loading
          visible={isLoading}
          style={{ width: '100%' }}
          color="#333"
        >
          <div style={styles.contentList}>
            {data.map((item, index) => {
              return (
                <div style={styles.item} key={index}>
                  <h6 style={styles.title}>{item.title}</h6>
                  <Row>
                    <Col l="16">
                      <div style={styles.metaWrap}>
                        <div style={styles.meta}>
                          <span>审查方式: </span>
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
                          <span>分数: </span>
                          <span>{item.count}</span>
                        </div>
                      </div>
                    </Col>
                    <Col l="8">
                      <div style={styles.operWrap}>
                        <div style={styles.oper}>
                          <Icon
                            size="xs"
                            type="browse"
                            style={styles.operIcon}
                          />
                          <span style={styles.operText}>已阅读</span>
                        </div>
                        <div style={styles.oper}>
                          <Icon
                            size="xs"
                            type="comments"
                            style={styles.operIcon}
                          />
                          <span style={styles.operText}>已处理</span>
                        </div>
                        <div style={styles.oper}>
                          <Icon
                            size="xs"
                            type="success"
                            style={styles.operIcon}
                          />
                          <span style={styles.operText}>已归档</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </div>
        </Loading>
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
  container: {
    minWidth: '980px',
    overflowX: 'scroll',
  },
  cardTitle: {
    height: '16px',
    lineHeight: '16px',
    fontSize: '16px',
    color: 'rgb(51, 51, 51)',
    fontWeight: 'bold',
    margin: '0',
    padding: '0',
  },
  contentList: {
    minHeight: '500px',
  },
  item: {
    position: 'relative',
    borderBottom: '1px solid #eee',
    padding: '20px 0',
  },
  title: {
    margin: '0 0 10px',
    cursor: 'pointer',
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
    marginRight: '4px',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'right',
  },
};
