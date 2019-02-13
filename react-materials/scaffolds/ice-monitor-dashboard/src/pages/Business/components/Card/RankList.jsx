import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from '@alifd/next';
import PropTypes from 'prop-types';

export default class RankList extends Component {
  static defaultProps = {
    columns: [],
    dataSource: [],
  };

  static propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array,
  };

  render() {
    const { subTitle, dataSource, columns } = this.props;
    return (
      <div style={styles.content}>
        <h3 style={styles.subTitle}>{subTitle}</h3>
        <Table dataSource={dataSource} hasBorder={false} style={styles.table}>
          {columns.map((item) => {
            return (
              <Table.Column
                key={item.key}
                title={item.title}
                dataIndex={item.dataIndex}
              />
            );
          })}
        </Table>
        <div style={styles.footer}>
          <Link to="/user/activities" style={styles.link}>
            查看更多
          </Link>
        </div>
      </div>
    );
  }
}

const styles = {
  subTitle: {
    margin: '0',
    padding: '20px 20px 10px',
    fonSize: '16px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
    borderBottom: '1px solid #f0f0f0',
  },
  table: {
    margin: '0 10px',
  },
  footer: {
    height: '40px',
    padding: '0 20px',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  link: {
    color: '#447eff',
    cursor: 'pointer',
  },
};
