import React, { Component } from 'react';
import { Message } from '@alifd/next';

const mock = [
  {
    title: '变更承办人',
  },
  {
    title: '变更承办人(执保)',
  },
  {
    title: '跨院委托审批',
  },
  {
    title: '跨省委托审批',
  },
  {
    title: '限高业务审批',
  },
  {
    title: '失信名单审核',
  },
  {
    title: '提交银行申请审批',
  },
  {
    title: '提交工商申请审批',
  },
  {
    title: '提交房产申请审批',
  },
  {
    title: '提交银联申请审批',
  },
  {
    title: '评估超期审批',
  },
  {
    title: '拍卖超期审批',
  },
];

export default class Function extends Component {
  handleClick = () => {
    Feedback.toast.success('可以使用 Iceworks 按需添加页面');
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h4 style={styles.title}>功能区</h4>
          <div style={styles.content}>
            {mock.map((item, index) => {
              return (
                <div style={styles.item} key={index} onClick={this.handleClick}>
                  <p style={styles.itemTitle}>{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    width: '50%',
    boxSizing: 'border-box',
    padding: '10px',
  },
  card: {
    width: '100%',
    padding: '20px',
    color: '#42436b',
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    position: 'relative',
    height: '286px',
  },
  title: {
    marginTop: '0',
    marginBottom: '20px',
    borderLeft: '5px solid #447eff',
    paddingLeft: '10px',
    lineHeight: '20px',
  },
  content: {
    display: 'flex',
    alignItems: 'space-between',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    height: '200px',
  },
  item: {
    width: '25%',
    height: '24px',
    lineHeight: '24px',
    padding: '0 4px',
    boxSizing: 'border-box',
  },
  itemTitle: {
    backgroundColor: '#f2f6ff',
    border: '1px dashed #5488f0',
    fontSize: '12px',
    textAlign: 'center',
    borderRadius: '12px',
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  count: {
    color: '#ff363b',
  },
};
