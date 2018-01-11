'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IceCard from '@icedesign/card';
import './EditableTable.scss';
import { Table, Icon, Button, Input } from '@icedesign/base';
import CellEditor from './CellEditor';

const generatorData = () => {
  return Array.from({ length: 5 }).map((item, index) => {
    return {
      todo: '待办事项 ' + index,
      memo: '备注说明文案 ' + index,
      validity: '2017-12-12'
    };
  });
};

export default class EditableTable extends Component {
  static displayName = 'EditableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource: generatorData()
    };
  }

  // ICE: React Component 的生命周期

  componentWillMount() { }

  componentDidMount() { }

  componentWillReceiveProps(nextProps, nextContext) { }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() { }

  renderOrder = (value, index, record) => {
    return <span>{index}</span>;
  };

  deleteItem = (index) => {
    this.state.dataSource.splice(index, 1);
    this.setState({
      dataSource: this.state.dataSource
    });
  };

  renderOperation = (value, index, record) => {
    return (
      <Button onClick={this.deleteItem.bind(this, index)} shape="text">
        删除
      </Button>
    );
  };

  changeDataSource = (index, valueKey, value) => {
    // todo 将修改后的表格数据发送接口，持久化
    this.state.dataSource[index][valueKey] = value;
    this.setState({
      dataSource: this.state.dataSource
    });
  };

  renderEditor = (valueKey, value, index, record) => {
    return (
      <CellEditor
        valueKey={valueKey}
        index={index}
        value={record[valueKey]}
        onChange={this.changeDataSource}
      />
    );
  };

  addNewItem = () => {
    this.state.dataSource.push({
      todo: '暂无',
      memo: '暂无',
      validity: '暂无'
    });
    this.setState({
      dataSource: this.state.dataSource
    });
  };

  render() {
    return (
      <div className="editable-table">
        <IceCard>
          <Table dataSource={this.state.dataSource} hasBorder={false}>
            <Table.Column width={80} title="顺序" cell={this.renderOrder} />
            <Table.Column
              width={280}
              title="待办事项"
              cell={this.renderEditor.bind(this, 'todo')}
            />
            <Table.Column
              width={240}
              title="备注"
              cell={this.renderEditor.bind(this, 'memo')}
            />
            <Table.Column
              width={180}
              title="有效时间"
              cell={this.renderEditor.bind(this, 'validity')}
            />
            <Table.Column title="操作" cell={this.renderOperation} />
          </Table>
          <div onClick={this.addNewItem} style={styles.addNewItem}>
            + 新增一行
          </div>
        </IceCard>
      </div>
    );
  }
}

const styles = {
  addNewItem: {
    background: '#F5F5F5',
    height: 32,
    lineHeight: '32px',
    marginTop: 20,
    cursor: 'pointer',
    textAlign: 'center'
  }
};
