/* eslint react/jsx-no-bind: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Button } from '@alifd/next';
import CellEditor from './CellEditor';
import './EditableTable.scss';

const dataSource = [
  {
    text: '首页',
    path: '/home',
    attr: 'home',
  },
  {
    text: '文章列表',
    path: '/post/list',
    attr: 'post',
  },
  {
    text: '分类列表',
    path: '/cate/list',
    attr: 'cate',
  },
  {
    text: '添加用户',
    path: '/user/add',
    attr: 'user',
  },
  {
    text: '通用设置',
    path: '/setting/basic',
    attr: 'setting',
  },
];

export default class EditableTable extends Component {
  static displayName = 'EditableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      dataSource,
    };
  }

  renderOrder = (value, index) => {
    return <span>{index + 1}</span>;
  };

  deleteItem = (index) => {
    this.state.dataSource.splice(index, 1);
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  renderOperation = (value, index) => {
    return (
      <Button onClick={this.deleteItem.bind(this, index)} text>
        删除
      </Button>
    );
  };

  changeDataSource = (index, valueKey, value) => {
    // text 将修改后的表格数据发送接口，持久化
    this.state.dataSource[index][valueKey] = value;
    this.setState({
      dataSource: this.state.dataSource,
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
      text: '暂无',
      path: '暂无',
      attr: '暂无',
    });
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  render() {
    return (
      <div className="editable-table">
        <IceContainer>
          <Table dataSource={this.state.dataSource} hasBorder={false}>
            <Table.Column width={80} title="ID" cell={this.renderOrder} />
            <Table.Column
              width={280}
              title="菜单文本"
              cell={this.renderEditor.bind(this, 'text')}
            />
            <Table.Column
              width={240}
              title="菜单地址"
              cell={this.renderEditor.bind(this, 'path')}
            />
            <Table.Column
              width={180}
              title="菜单属性"
              cell={this.renderEditor.bind(this, 'attr')}
            />
            <Table.Column
              width={180}
              title="操作"
              cell={this.renderOperation}
            />
          </Table>
          <div onClick={this.addNewItem} style={styles.addNewItem}>
            + 新增一行
          </div>
        </IceContainer>
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
    textAlign: 'center',
  },
};
