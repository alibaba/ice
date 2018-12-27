import React, { Component } from 'react';
import { Grid, Icon, Dialog } from '@icedesign/base';

const { Row, Col } = Grid;

const getData = () => {
  return Array.from({ length: 10 }).map((item, index) => {
    return {
      title: `神经网络模型 0${index + 1}`,
      body: [
        {
          label: '当前版本',
          value: `0.0.${index + 1}`,
        },
        {
          label: '调用次数',
          value: `123,23${index}`,
        },
        {
          label: '场景类型',
          value: '回归',
        },
        {
          label: '算法实现',
          value: '决策树',
        },
        {
          label: '更新时间',
          value: '2018-09-20',
        },
        {
          label: '发布人',
          value: '淘小宝',
        },
        {
          label: '相关备注',
          value: '无',
        },
      ],
    };
  });
};

export default class ModelCard extends Component {
  handleInvoke = () => {
    Dialog.confirm({
      content: '请先申请权限在查看调用示例',
    });
  };

  handleOnline = () => {
    Dialog.confirm({
      content: '只有超级权限才能设置在线预测',
    });
  };

  render() {
    const mockData = getData();
    return (
      <Row wrap gutter="40" style={styles.row}>
        {mockData.map((data, index) => {
          return (
            <Col l="6" key={index}>
              <div style={styles.modelCard}>
                <div style={styles.head}>
                  <Icon type="electronics" style={styles.icon} /> {data.title}
                </div>
                <div style={styles.body}>
                  {data.body.map((item, key) => {
                    return (
                      <div style={styles.item} key={key}>
                        <span style={styles.label}>{item.label}：</span>
                        <span style={styles.value}>{item.value}</span>
                      </div>
                    );
                  })}
                </div>
                <div style={styles.footer}>
                  <a
                    onClick={this.handleInvoke}
                    style={{ ...styles.button, background: '#58ca9a' }}
                  >
                    调用示例
                  </a>
                  <a
                    onClick={this.handleOnline}
                    style={{ ...styles.button, background: '#ee706d' }}
                  >
                    在线预测
                  </a>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    );
  }
}

const styles = {
  row: {
    padding: '20px',
  },
  modelCard: {
    background: '#fff',
    border: '1px solid #f5f5f5',
    marginBottom: '40px',
    borderRadius: '4px',
  },
  head: {
    padding: '10px 0',
    background: '#5e83fb',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '4px 4px 0 0',
  },
  item: {
    padding: '10px 0',
    display: 'flex',
  },
  label: {
    width: '50%',
    padding: '0 20px',
    fontWeight: '500',
    textAlign: 'right',
    fontSize: '13px',
  },
  value: {
    width: '50%',
    fontSize: '13px',
  },
  body: {
    padding: '20px',
  },
  icon: {
    marginRight: '10px',
  },
  footer: {
    borderTop: '1px solid #eee',
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginRight: '10px',
    padding: '6px 12px',
    fontSize: '12px',
    borderRadius: '3px',
    color: '#fff',
    textDecoration: 'none',
    cursor: 'pointer',
  },
};
