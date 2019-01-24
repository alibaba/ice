import React from 'react';
import { Message } from '@alifd/next';
import './index.scss';

const CustomNotice = () => {
  const renderNum = (num, color) => {
    return <strong style={{ ...styles.num, ...color }}>{num}</strong>;
  };

  return (
    <Message
      closeable
      className="custom-notice"
      style={styles.notice}
      title={
        <div style={styles.title}>
          当前共有
          {renderNum(1, styles.orange)}
          份合同，其中已倒签 {renderNum(0, styles.orange)}
          份、一周后会倒签的合同
          {renderNum(0, styles.orange)}
          份、需要我去跟进盖章事宜的合同
          {renderNum(0, styles.lightBlue)}
          份、一个月内会到期的合同
          {renderNum(0, styles.lightBlue)}
          份！
        </div>
      }
    />
  );
};

const styles = {
  notice: {
    background: '#fffaf2',
    border: '1px solid #f2e3ce',
    marginBottom: '30px',
  },
  title: {
    color: '#666',
    fontSize: '14px',
  },
  num: {
    fontWeight: 'bold',
    margin: '0 4px',
  },
  orange: {
    color: '#F04631',
  },
  lightBlue: {
    color: '#48AAE6',
  },
};

export default CustomNotice;
