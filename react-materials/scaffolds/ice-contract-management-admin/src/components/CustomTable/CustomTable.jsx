import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import PropTypes from 'prop-types';
import './CustomTable.scss';

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  static defaultProps = {
    columns: [],
    dataSource: [],
  };

  static propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  handlePagination = (current) => {
    this.setState({
      current,
    });
  };

  render() {
    const { dataSource, columns, style } = this.props;

    return (
      <div style={style}>
        <Table
          dataSource={dataSource}
          hasBorder={false}
          className="custom-table"
        >
          {columns.map((item) => {
            return (
              <Table.Column
                title={item.title}
                dataIndex={item.dataIndex}
                key={item.key}
                sortable={item.sortable || false}
                cell={item.cell || ((value) => value)}
                width={item.width || 'auto'}
              />
            );
          })}
        </Table>
        <Pagination
          style={styles.pagination}
          current={this.state.current}
          onChange={this.handlePagination}
        />
      </div>
    );
  }
}

const styles = {
  pagination: {
    margin: '20px 0',
    textAlign: 'center',
  },
};
