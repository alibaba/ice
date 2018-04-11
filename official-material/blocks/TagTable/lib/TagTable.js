import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Table from '@icedesign/base/lib/table';
import _Input from '@icedesign/base/lib/input';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Grid from '@icedesign/base/lib/grid';
import _Select from '@icedesign/base/lib/select';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

import { FormBinderWrapper, FormBinder } from '@icedesign/form-binder';
import IceCard from '@icedesign/card';

var Combobox = _Select.Combobox;
var Row = _Grid.Row,
    Col = _Grid.Col;


var dataSource = [{
  name: 'CVE-2016-1839',
  level: '高危',
  assets: {
    needFix: 'iceworks',
    unHandle: 'ice grid'
  },
  time: '2018-01-25 15:55:06'
}, {
  name: 'CVE-2018-6308',
  level: '低危',
  assets: {
    needFix: 'ice button',
    unHandle: 'ice tag'
  },
  time: '2018-01-25 15:55:06'
}, {
  name: 'CVE-2018-6309',
  level: '严重',
  assets: {
    needFix: 'ice datepicker',
    unHandle: ''
  },
  time: '2018-01-25 15:55:06'
}];

var TagTable = (_temp = _class = function (_Component) {
  _inherits(TagTable, _Component);

  function TagTable(props) {
    _classCallCheck(this, TagTable);

    var _this = _possibleConstructorReturn(this, (TagTable.__proto__ || _Object$getPrototypeOf(TagTable)).call(this, props));

    _this.getDataSource = function () {
      var formValue = _this.state.formValue;

      return dataSource.filter(function (data) {
        // 预先筛除
        if (formValue.name && !data.name.match(formValue.name)) {
          return false;
        }

        if (formValue.isHandle && (formValue.isHandle === 'YES' && data.assets.unHandle || formValue.isHandle === 'NO' && !data.assets.unHandle)) {
          return false;
        }

        if (formValue.levels && !formValue.levels.some(function (l) {
          return l === data.level;
        })) {
          return false;
        }

        return true;
      });
    };

    _this.formChange = function (value) {
      console.log('changed value', value);
      _this.setState({
        formValue: value
      });
    };

    _this.state = {
      formValue: {}
    };
    return _this;
  }

  _createClass(TagTable, [{
    key: 'render',
    value: function render() {
      var formValue = this.state.formValue;


      return React.createElement(
        'div',
        { className: 'tag-table' },
        React.createElement(
          IceCard,
          null,
          React.createElement(
            FormBinderWrapper,
            { value: formValue, onChange: this.formChange },
            React.createElement(
              'div',
              { style: { marginBottom: '25px' } },
              React.createElement(
                Row,
                { style: styles.formRow },
                React.createElement(
                  Col,
                  { xxs: '6', s: '4', l: '2', style: styles.label },
                  '\u6F0F\u6D1E\u641C\u7D22:',
                  ' '
                ),
                React.createElement(
                  Col,
                  { span: '10' },
                  React.createElement(
                    FormBinder,
                    null,
                    React.createElement(_Input, { name: 'name', placeholder: '\u8BF7\u8F93\u5165\u6F0F\u6D1E\u540D\u79F0' })
                  )
                )
              ),
              React.createElement(
                Row,
                { style: styles.formRow },
                React.createElement(
                  Col,
                  { xxs: '6', s: '4', l: '2', style: styles.label },
                  '\u5904\u7406\u72B6\u6001:',
                  ' '
                ),
                React.createElement(
                  Col,
                  { span: '10' },
                  React.createElement(
                    FormBinder,
                    null,
                    React.createElement(
                      _Select,
                      { name: 'isHandle', placeholder: '\u8BF7\u9009\u62E9' },
                      React.createElement(
                        _Select.Option,
                        { value: '' },
                        '\u4EFB\u610F'
                      ),
                      React.createElement(
                        _Select.Option,
                        { value: 'YES' },
                        '\u5DF2\u7ECF\u5904\u7406'
                      ),
                      React.createElement(
                        _Select.Option,
                        { value: 'NO' },
                        '\u672A\u5904\u7406'
                      )
                    )
                  )
                )
              ),
              React.createElement(
                Row,
                { style: styles.formRow },
                React.createElement(
                  Col,
                  { xxs: '6', s: '4', l: '2', style: styles.label },
                  '\u6F0F\u6D1E\u7B49\u7EA7:',
                  ' '
                ),
                React.createElement(
                  Col,
                  { span: '10' },
                  React.createElement(
                    FormBinder,
                    null,
                    React.createElement(Combobox, {
                      name: 'levels',
                      filterLocal: false,
                      fillProps: 'label',
                      placeholder: '\u8BF7\u9009\u62E9',
                      multiple: true,
                      dataSource: ['严重', '高危', '中危', '低危']
                    })
                  )
                )
              )
            )
          ),
          React.createElement(
            _Table,
            {
              locale: { empty: '没有查询到符合条件的记录' },
              dataSource: this.getDataSource()
            },
            React.createElement(_Table.Column, { title: '\u6F0F\u6D1E\u540D\u79F0', dataIndex: 'name', width: 200 }),
            React.createElement(_Table.Column, { title: '\u6F0F\u6D1E\u7B49\u7EA7', dataIndex: 'level', width: 200 }),
            React.createElement(_Table.Column, {
              title: '\u9700\u5C3D\u5FEB\u4FEE\u590D\u8D44\u4EA7',
              dataIndex: 'assets.needFix',
              width: 200
            }),
            React.createElement(_Table.Column, {
              title: '\u5F53\u524D\u672A\u5904\u7406\u8D44\u4EA7',
              dataIndex: 'assets.unHandle',
              width: 200,
              cell: function cell(val) {
                return val || '无';
              }
            }),
            React.createElement(_Table.Column, { title: '\u6700\u540E\u53D1\u73B0\u65F6\u95F4', dataIndex: 'time', width: 200 })
          )
        )
      );
    }
  }]);

  return TagTable;
}(Component), _class.displayName = 'TagTable', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { TagTable as default };


var styles = {
  formRow: {
    marginBottom: '18px'
  },
  label: { lineHeight: '28px', paddingRight: '10px' }
};