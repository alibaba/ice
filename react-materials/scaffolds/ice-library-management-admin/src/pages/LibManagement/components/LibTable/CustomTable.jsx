import React, { Component } from 'react';
import { Table, Pagination } from '@alifd/next';

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  handlePaginationChange = (current) => {
    this.setState(
      {
        current,
      },
      () => {
        this.props.paginationChange();
      }
    );
  };

  render() {
    const { current } = this.state;
    const { dataSource, columns, isLoading } = this.props;
    return (
      <div style={styles.container}>
        <Table
          loading={isLoading}
          dataSource={dataSource}
          hasBorder={false}
          style={styles.table}
        >
          {columns.map((item, index) => {
            return (
              <Table.Column
                key={index}
                title={item.title}
                width={item.width || 'auto'}
                dataIndex={item.dataIndex}
                cell={item.cell || (value => value)}
              />
            );
          })}
        </Table>
        <Pagination
          style={styles.pagination}
          current={current}
          onChange={this.handlePaginationChange}
        />
      </div>
    );
  }
}

const styles = {
  table: {
    marginTop: '10px',
    minHeight: '500px',
  },
  pagination: {
    margin: '20px 0',
    textAlign: 'right',
  },
};
