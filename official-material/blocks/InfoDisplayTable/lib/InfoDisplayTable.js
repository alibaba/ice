import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Table from '@icedesign/base/lib/table';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import IceContainer from '@icedesign/container';
import './InfoDisplayTable.scss';

/**
 * 表格接收的数据
 */
var dataSource = function dataSource() {
  return [{
    label: '姓名',
    value: '张三'
  }, {
    label: '性别',
    value: '男'
  }, {
    label: '年龄',
    value: '25'
  }, {
    label: '籍贯',
    value: '杭州'
  }, {
    label: '职业',
    value: '程序员'
  }];
};

var InfoDisplayTable = (_temp = _class = function (_Component) {
  _inherits(InfoDisplayTable, _Component);

  function InfoDisplayTable(props) {
    _classCallCheck(this, InfoDisplayTable);

    var _this = _possibleConstructorReturn(this, (InfoDisplayTable.__proto__ || _Object$getPrototypeOf(InfoDisplayTable)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(InfoDisplayTable, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'info-display-table', style: styles.infoDisplayTable },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            _Table,
            { dataSource: dataSource() },
            React.createElement(_Table.Column, { title: '\u4E2A\u4EBA\u4FE1\u606F', dataIndex: 'label' }),
            React.createElement(_Table.Column, { title: '', dataIndex: 'value' })
          )
        )
      );
    }
  }]);

  return InfoDisplayTable;
}(Component), _class.displayName = 'InfoDisplayTable', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { InfoDisplayTable as default };


var styles = { infoDisplayTable: {} };