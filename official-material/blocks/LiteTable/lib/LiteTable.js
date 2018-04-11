import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Table from '@icedesign/base/lib/table';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Array$from from 'babel-runtime/core-js/array/from';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';


var styles = {
  processing: {
    color: '#5485F7'
  },
  finish: {
    color: '#64D874'
  },
  terminated: {
    color: '#999999'
  },
  pass: {
    color: '#FA7070'
  }
};

var generatorMockStatus = function generatorMockStatus() {
  var random = parseInt(Math.random() * 10, 10);
  if (random < 3) {
    return 'processing';
  } else if (random >= 3 && random < 6) {
    return 'finish';
  } else if (random >= 6 && random < 8) {
    return 'terminated';
  } else if (random >= 8) {
    return 'pass';
  }
};

var generatorData = function generatorData() {
  return _Array$from({ length: 10 }).map(function (item, index) {
    return {
      project: '\u9879\u76EE\u540D\u79F0 ' + index,
      owner: '\u5F00\u53D1\u8005 ' + index,
      status: generatorMockStatus()
    };
  });
};

var statusComponents = {
  processing: React.createElement(
    'span',
    { style: styles.processing },
    '\u8FDB\u884C\u4E2D'
  ),
  finish: React.createElement(
    'span',
    { style: styles.finish },
    '\u5DF2\u5B8C\u6210'
  ),
  terminated: React.createElement(
    'span',
    { style: styles.terminated },
    '\u5DF2\u7EC8\u6B62'
  ),
  pass: React.createElement(
    'span',
    { style: styles.pass },
    '\u672A\u901A\u8FC7'
  )
};

var LiteTable = (_temp = _class = function (_Component) {
  _inherits(LiteTable, _Component);

  function LiteTable(props) {
    _classCallCheck(this, LiteTable);

    var _this = _possibleConstructorReturn(this, (LiteTable.__proto__ || _Object$getPrototypeOf(LiteTable)).call(this, props));

    _this.renderStatus = function (value) {
      return statusComponents[value];
    };

    _this.state = {
      tableData: generatorData()
    };
    return _this;
  }

  _createClass(LiteTable, [{
    key: 'render',
    value: function render() {
      var tableData = this.state.tableData;

      return React.createElement(
        'div',
        { className: 'lite-table' },
        React.createElement(
          IceContainer,
          { style: styles.tableCard },
          React.createElement(
            _Table,
            { dataSource: tableData, hasBorder: false },
            React.createElement(_Table.Column, { title: '\u9879\u76EE\u540D\u79F0', dataIndex: 'project', width: 200 }),
            React.createElement(_Table.Column, { title: '\u521B\u5EFA\u8005', dataIndex: 'owner', width: 100 }),
            React.createElement(_Table.Column, {
              title: '\u72B6\u6001',
              dataIndex: 'status',
              cell: this.renderStatus,
              width: 100
            })
          )
        )
      );
    }
  }]);

  return LiteTable;
}(Component), _class.displayName = 'LiteTable', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { LiteTable as default };