import React, { Component } from 'react';
import { Message } from '@alifd/next';
import styles from './index.module.scss';

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
    Message.success('可以使用 Iceworks 按需添加页面');
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h4 className={styles.title}>功能区</h4>
          <div className={styles.content}>
            {mock.map((item, index) => {
              return (
                <div
                  className={styles.item}
                  key={index}
                  onClick={this.handleClick}
                >
                  <p className={styles.itemTitle}>{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
