import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Button from '@icedesign/base/lib/button';
import _Dialog from '@icedesign/base/lib/dialog';
import _Table from '@icedesign/base/lib/table';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Tab from '@icedesign/base/lib/tab';

var _extends = _Object$assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint no-unused-expressions: 0 */
import React, { Component } from 'react';

import IceContainer from '@icedesign/container';

var TabPane = _Tab.TabPane;

var mockData = [{
  title: '十九大后，习近平对中国经济给出8大论断',
  id: '1212'
}, {
  title: '中驻美使馆:美《国家安全战略报告》自相矛盾',
  id: '231'
}, {
  title: '美发国安战略:坚持"一中政策" 继续对台军售',
  id: '2321'
}, {
  title: '又一"港独"组织濒于溃散:召集人潜逃 发言人退伙',
  id: '22331'
}];

var TabDialog = (_temp = _class = function (_Component) {
  _inherits(TabDialog, _Component);

  function TabDialog(props) {
    _classCallCheck(this, TabDialog);

    var _this = _possibleConstructorReturn(this, (TabDialog.__proto__ || _Object$getPrototypeOf(TabDialog)).call(this, props));

    _this.onItemSelect = function (selectedItems) {
      _this.setState({
        selectedItems: selectedItems
      });
    };

    _this.onTabChange = function () {
      // 清理掉缓存数据
      _this.setState({
        selectedItems: []
      });
    };

    _this.onDialogOk = function () {
      console.log(_this.state.selectedItems);
      _this.hideDialog();
    };

    _this.showDialog = function () {
      _this.setState({
        visible: true
      });
    };

    _this.hideDialog = function () {
      _this.setState({
        selectedItems: [],
        visible: false
      });
    };

    _this.state = {
      visible: false,
      selectedItems: []
    };
    return _this;
  }

  _createClass(TabDialog, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        IceContainer,
        null,
        React.createElement(
          _Dialog,
          _extends({
            className: 'tab-dialog',
            style: styles.dialog,
            autoFocus: false,
            isFullScreen: true,
            title: '\u9009\u62E9\u4FE1\u606F'
          }, this.props, {
            onOk: this.onDialogOk,
            onClose: this.hideDialog,
            onCancel: this.hideDialog,
            visible: this.state.visible
          }),
          React.createElement(
            'div',
            { style: styles.dialogContent },
            React.createElement(
              _Tab,
              {
                size: 'small',
                contentStyle: styles.tabContentWrapper,
                onChange: this.onTabChange
              },
              React.createElement(
                TabPane,
                { tab: '\u9009\u62E9\u6587\u7AE0', key: 'post' },
                React.createElement(
                  'div',
                  { style: styles.tabContent },
                  React.createElement(
                    _Table,
                    {
                      dataSource: mockData,
                      rowSelection: {
                        selectedRowKeys: this.state.selectedItems,
                        onChange: this.onItemSelect
                      }
                    },
                    React.createElement(_Table.Column, { title: '\u6587\u7AE0\u6807\u9898', dataIndex: 'title' })
                  )
                )
              ),
              React.createElement(
                TabPane,
                { tab: '\u9009\u62E9\u89C6\u9891', key: 'video' },
                React.createElement(
                  'div',
                  { style: styles.tabContent },
                  React.createElement(
                    _Table,
                    {
                      dataSource: mockData,
                      rowSelection: {
                        selectedRowKeys: this.state.selectedItems,
                        onChange: this.onItemSelect
                      }
                    },
                    React.createElement(_Table.Column, { title: '\u89C6\u9891\u6807\u9898', dataIndex: 'title' })
                  )
                )
              )
            )
          )
        ),
        React.createElement(
          _Button,
          { type: 'primary', onClick: this.showDialog },
          '\u663E\u793A Dialog'
        )
      );
    }
  }]);

  return TabDialog;
}(Component), _class.displayName = 'TabDialog', _temp);
export { TabDialog as default };


var styles = {
  dialog: {
    width: '640px'
  },
  dialogContent: {},
  tabContentWrapper: {
    padding: '20px 0 20px 0'
  },
  tabContent: {
    display: 'flex',
    minHeight: '100px',
    fontSize: '20px'
  }
};