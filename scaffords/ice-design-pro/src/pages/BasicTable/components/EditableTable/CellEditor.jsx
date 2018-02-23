/* eslint no-unused-expressions: 0 */
import React, { Component } from 'react';
import { Icon, Input } from '@icedesign/base';

export default class CellEditor extends Component {
  static displayName = 'CellEditor';

  constructor(props) {
    super(props);

    this.tempValue = '';
    this.state = {
      editMode: false,
      value: props.value || '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  editThisCell = () => {
    // 缓存数据以便回滚
    this.tempValue = this.state.value;
    this.setState({
      editMode: true,
    });
  };

  onValueChange = (value) => {
    this.setState({
      value,
    });
  };

  updateValue = () => {
    this.setState({
      editMode: false,
    });
    const { index, valueKey } = this.props;
    const { value } = this.state;
    this.props.onChange && this.props.onChange(index, valueKey, value);
  };

  rollBackThisCell = () => {
    this.setState({
      value: this.tempValue,
      editMode: false,
    });
    this.tempValue = '';
  };

  render() {
    const { value, editMode } = this.state;

    if (editMode) {
      return (
        <div className="celleditor">
          <Input
            style={styles.cellInput}
            value={value}
            onChange={this.onValueChange}
          />
          <span
            style={styles.operationIcon}
            title="确定"
            onClick={this.updateValue}
          >
            <Icon size="xs" type="select" />
          </span>
          <span
            style={styles.operationIcon}
            title="撤销"
            onClick={this.rollBackThisCell}
          >
            <Icon size="xs" type="refresh" />
          </span>
        </div>
      );
    }
    return (
      <div className="celleditor">
        <span>{value}</span>
        <span
          style={styles.operationIcon}
          className="celleditor-trigger"
          title="编辑"
          onClick={this.editThisCell}
        >
          <Icon size="xs" type="edit" />
        </span>
      </div>
    );
  }
}

const styles = {
  cellInput: {
    width: 'calc(100% - 44px)',
  },
  operationIcon: {
    marginLeft: '10px',
    color: '#999',
    cursor: 'pointer',
  },
};
