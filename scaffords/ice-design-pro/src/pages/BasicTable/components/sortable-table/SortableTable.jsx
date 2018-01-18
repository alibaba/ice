

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceCard from '@icedesign/card';
import './SortableTable.scss';

import { Table, Icon, Button } from '@icedesign/base';

const generatorData = () => {
  return Array.from({ length: 5 }).map((item, index) => {
    console.log('item', item);
    return {
      todo: `待办事项 ${index}`,
      memo: `备注说明文案 ${index}`,
      validity: '2017-12-12',
    };
  });
};

export default class SortableTable extends Component {
  static displayName = 'SortableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: generatorData(),
    };
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期
  componentWillMount() { }

  componentDidMount() { }

  componentWillReceiveProps(nextProps, nextContext) { }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() { }

  moveUp = (index) => {
    if (index > 0) {
      const dataSource = this.state.dataSource;
      const prevItem = dataSource[index - 1];
      const currentItem = dataSource[index];
      dataSource.splice(index - 1, 2, currentItem, prevItem);
      this.setState({
        dataSource,
      });
    }
  };
  moveDown = (index) => {
    if (index < this.state.dataSource.length - 1) {
      const dataSource = this.state.dataSource;
      const currentItem = dataSource[index];
      const nextItem = dataSource[index + 1];
      dataSource.splice(index, 2, nextItem, currentItem);
      this.setState({
        dataSource,
      });
    }
  };

  renderOrder = (value, index, record) => {
    return <span>{index}</span>;
  };

  renderSortButton = (value, index, record) => {
    return (
      <div>
        <Button
          onClick={this.moveDown.bind(this, index)}
          size="large"
          shape="text"
          disabled={index === this.state.dataSource.length - 1}
        >
          <Icon title="下移" type="descending" />
        </Button>
        <Button
          onClick={this.moveUp.bind(this, index)}
          size="large"
          shape="text"
          disabled={index === 0}
        >
          <Icon title="上移" type="ascending" />
        </Button>
      </div>
    );
  };

  render() {
    return (
      <div className="sortable-table" style={styles.sortableTable}>
        <IceCard>
          <Table dataSource={this.state.dataSource} hasBorder={false}>
            <Table.Column width={80} title="顺序" cell={this.renderOrder} />
            <Table.Column width={280} title="待办事项" dataIndex="todo" />
            <Table.Column width={240} title="备注" dataIndex="memo" />
            <Table.Column width={180} title="有效时间" dataIndex="validity" />
            <Table.Column title="排序" cell={this.renderSortButton} />
          </Table>
        </IceCard>
      </div>
    );
  }
}


const styles = {
  sortableTable: {},
};
