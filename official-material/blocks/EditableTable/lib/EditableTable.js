import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Table from '@icedesign/base/lib/table';
import _Button from '@icedesign/base/lib/button';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Array$from from 'babel-runtime/core-js/array/from';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

import CellEditor from './CellEditor';
import './EditableTable.scss';

var generatorData = function generatorData() {
  return _Array$from({ length: 5 }).map(function (item, index) {
    return {
      todo: '\u5F85\u529E\u4E8B\u9879 ' + index,
      memo: '\u5907\u6CE8\u8BF4\u660E\u6587\u6848 ' + index,
      validity: '2017-12-12'
    };
  });
};

var EditableTable = (_temp = _class = function (_Component) {
  _inherits(EditableTable, _Component);

  function EditableTable(props) {
    _classCallCheck(this, EditableTable);

    var _this = _possibleConstructorReturn(this, (EditableTable.__proto__ || _Object$getPrototypeOf(EditableTable)).call(this, props));

    _this.renderOrder = function (value, index) {
      return React.createElement(
        'span',
        null,
        index
      );
    };

    _this.deleteItem = function (index) {
      _this.state.dataSource.splice(index, 1);
      _this.setState({
        dataSource: _this.state.dataSource
      });
    };

    _this.renderOperation = function (value, index) {
      return React.createElement(
        _Button,
        { onClick: _this.deleteItem.bind(_this, index), shape: 'text' },
        '\u5220\u9664'
      );
    };

    _this.changeDataSource = function (index, valueKey, value) {
      _this.state.dataSource[index][valueKey] = value;
      _this.setState({
        dataSource: _this.state.dataSource
      });
    };

    _this.renderEditor = function (valueKey, value, index, record) {
      return React.createElement(CellEditor, {
        valueKey: valueKey,
        index: index,
        value: record[valueKey],
        onChange: _this.changeDataSource
      });
    };

    _this.addNewItem = function () {
      _this.state.dataSource.push({
        todo: '暂无',
        memo: '暂无',
        validity: '暂无'
      });
      _this.setState({
        dataSource: _this.state.dataSource
      });
    };

    _this.state = {
      dataSource: generatorData()
    };
    return _this;
  }

  _createClass(EditableTable, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'editable-table' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            _Table,
            { dataSource: this.state.dataSource, hasBorder: false },
            React.createElement(_Table.Column, { width: 80, title: '\u987A\u5E8F', cell: this.renderOrder }),
            React.createElement(_Table.Column, {
              width: 280,
              title: '\u5F85\u529E\u4E8B\u9879',
              cell: this.renderEditor.bind(this, 'todo')
            }),
            React.createElement(_Table.Column, {
              width: 240,
              title: '\u5907\u6CE8',
              cell: this.renderEditor.bind(this, 'memo')
            }),
            React.createElement(_Table.Column, {
              width: 180,
              title: '\u6709\u6548\u65F6\u95F4',
              cell: this.renderEditor.bind(this, 'validity')
            }),
            React.createElement(_Table.Column, { title: '\u64CD\u4F5C', width: 80, cell: this.renderOperation })
          ),
          React.createElement(
            'div',
            { onClick: this.addNewItem, style: styles.addNewItem },
            '+ \u65B0\u589E\u4E00\u884C'
          )
        )
      );
    }
  }]);

  return EditableTable;
}(Component), _class.displayName = 'EditableTable', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { EditableTable as default };


var styles = {
  addNewItem: {
    background: '#F5F5F5',
    height: 32,
    lineHeight: '32px',
    marginTop: 20,
    cursor: 'pointer',
    textAlign: 'center'
  }
};