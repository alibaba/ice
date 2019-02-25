import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Table, Button } from '@alifd/next';
import CellEditor from './CellEditor';
import './EditableTable.scss';

@injectIntl
export default class EditableTable extends Component {
  static displayName = 'EditableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    const {
      intl: { formatMessage },
    } = props;
    const generatorData = () => {
      return Array.from({ length: 5 }).map((item, index) => {
        return {
          todo: `${formatMessage({
            id: 'app.dashboard.todo.item.value',
          })} ${index}`,
          remark: `${formatMessage({
            id: 'app.dashboard.todo.remark.value',
          })} ${index}`,
          validity: '2017-12-12',
        };
      });
    };

    this.state = {
      dataSource: generatorData(),
    };
  }

  renderOrder = (value, index) => {
    return <span>{index}</span>;
  };

  deleteItem = (index) => {
    this.state.dataSource.splice(index, 1);
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  renderOperation = (value, index) => {
    return (
      <Button type="primary" onClick={this.deleteItem.bind(this, index)}>
        <FormattedMessage id="app.dashboard.todo.delete" />
      </Button>
    );
  };

  changeDataSource = (index, valueKey, value) => {
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
    const {
      intl: { formatMessage },
    } = this.props;
    const text = formatMessage({ id: 'app.dashboard.todo.empty' });
    this.state.dataSource.push({
      todo: text,
      remark: text,
      validity: text,
    });
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  render() {
    const {
      intl: { formatMessage },
    } = this.props;

    return (
      <IceContainer title={formatMessage({ id: 'app.dashboard.todo.title' })}>
        <Table
          dataSource={this.state.dataSource}
          hasBorder={false}
          className="editable-table"
        >
          <Table.Column
            width={80}
            title={formatMessage({ id: 'app.dashboard.todo.index' })}
            cell={this.renderOrder}
          />
          <Table.Column
            width={280}
            title={formatMessage({ id: 'app.dashboard.todo.index' })}
            cell={this.renderEditor.bind(this, 'todo')}
          />
          <Table.Column
            width={240}
            title={formatMessage({ id: 'app.dashboard.todo.remark' })}
            cell={this.renderEditor.bind(this, 'remark')}
          />
          <Table.Column
            width={180}
            title={formatMessage({ id: 'app.dashboard.todo.time' })}
            cell={this.renderEditor.bind(this, 'validity')}
          />
          <Table.Column
            title={formatMessage({ id: 'app.dashboard.todo.oper' })}
            width={80}
            cell={this.renderOperation}
          />
        </Table>
        <div onClick={this.addNewItem} style={styles.addNewItem}>
          + <FormattedMessage id="app.dashboard.todo.newline" />
        </div>
      </IceContainer>
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
