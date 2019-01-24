import React, { Component } from 'react';
import { Table, Pagination } from '@alifd/next';
import PropTypes from 'prop-types';
import './CustomTable.scss';

export default class Home extends Component {
  static displayName = 'Home';

  static defaultProps = {
    isLoading: false,
    columns: [],
    dataSource: [],
  };

  static propTypes = {
    isLoading: PropTypes.bool,
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
    this.setState(
      {
        current,
      },
      () => {
        this.props.onChange();
      }
    );
  };

  render() {
    const { isLoading, dataSource, columns } = this.props;

    return (
      <div>
        <Table
          dataSource={dataSource}
          hasBorder={false}
          className="custom-table"
          loading={isLoading}
        >
          {columns.map((item) => {
            return (
              <Table.Column
                title={item.title}
                dataIndex={item.dataIndex}
                key={item.key}
                sortable={item.sortable || false}
                cell={item.cell || (value => value)}
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
