import React, { Component } from 'react';
import { Icon, Grid, Loading, Feedback } from '@icedesign/base';
import FoundationSymbol from 'foundation-symbol';

const { Row, Col } = Grid;

export default class CardList extends Component {
  handleAdd = () => {
    Feedback.toast.prompt('只有管理员才能新增测试方案');
  };

  render() {
    const { data = [], isLoading = false } = this.props;
    return (
      <div style={styles.container}>
        <Loading
          visible={isLoading}
          shape="flower"
          color="#333"
          style={styles.loading}
        >
          <Row wrap gutter="20">
            <Col l="6" onClick={this.handleAdd}>
              <div style={{ ...styles.card, ...styles.createScheme }}>
                <Icon type="add" size="large" style={styles.addIcon} />
                <span>新增测试方案</span>
              </div>
            </Col>
            {data.map((item, index) => {
              return (
                <Col l="6" key={index}>
                  <div style={styles.card}>
                    <div style={styles.head}>
                      <h4 style={styles.title}>{item.title}</h4>
                      <p style={styles.desc}>{item.desc}</p>
                    </div>
                    <div style={styles.body}>
                      <p style={{ ...styles.creator, ...styles.info }}>
                        创建人：
                        {item.creator}
                      </p>
                      <p style={{ ...styles.leader, ...styles.info }}>
                        技术负责人：
                        {item.leader}
                      </p>
                      <p style={{ ...styles.time, ...styles.info }}>
                        创建时间：
                        {item.time}
                        <FoundationSymbol
                          type="edit2"
                          size="xs"
                          style={styles.editIcon}
                        />
                      </p>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Loading>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: '20px',
  },
  loading: {
    width: '100%',
    minHeight: '500px',
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
    padding: '16px',
  },
  info: {
    margin: '0 0 8px',
    fontSize: '13px',
  },
  time: {
    position: 'relative',
  },
  addIcon: {
    marginRight: '10px',
  },
  editIcon: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    cursor: 'pointer',
  },
};
