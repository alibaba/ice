import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Icon from '@icedesign/base/lib/icon';
import _Input from '@icedesign/base/lib/input';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint no-unused-expressions: 0 */
import React, { Component } from 'react';
var CellEditor = (_temp = _class = function (_Component) {
  _inherits(CellEditor, _Component);

  function CellEditor(props) {
    _classCallCheck(this, CellEditor);

    var _this = _possibleConstructorReturn(this, (CellEditor.__proto__ || _Object$getPrototypeOf(CellEditor)).call(this, props));

    _this.editThisCell = function () {
      // 缓存数据以便回滚
      _this.tempValue = _this.state.value;
      _this.setState({
        editMode: true
      });
    };

    _this.onValueChange = function (value) {
      _this.setState({
        value: value
      });
    };

    _this.updateValue = function () {
      _this.setState({
        editMode: false
      });
      var _this$props = _this.props,
          index = _this$props.index,
          valueKey = _this$props.valueKey;
      var value = _this.state.value;

      _this.props.onChange && _this.props.onChange(index, valueKey, value);
    };

    _this.rollBackThisCell = function () {
      _this.setState({
        value: _this.tempValue,
        editMode: false
      });
      _this.tempValue = '';
    };

    _this.tempValue = '';
    _this.state = {
      editMode: false,
      value: props.value || ''
    };
    return _this;
  }

  _createClass(CellEditor, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          value = _state.value,
          editMode = _state.editMode;


      if (editMode) {
        return React.createElement(
          'div',
          { className: 'celleditor' },
          React.createElement(_Input, {
            style: styles.cellInput,
            value: value,
            onChange: this.onValueChange
          }),
          React.createElement(
            'span',
            {
              style: styles.operationIcon,
              title: '\u786E\u5B9A',
              onClick: this.updateValue
            },
            React.createElement(_Icon, { size: 'xs', type: 'select' })
          ),
          React.createElement(
            'span',
            {
              style: styles.operationIcon,
              title: '\u64A4\u9500',
              onClick: this.rollBackThisCell
            },
            React.createElement(_Icon, { size: 'xs', type: 'refresh' })
          )
        );
      }
      return React.createElement(
        'div',
        { className: 'celleditor' },
        React.createElement(
          'span',
          null,
          value
        ),
        React.createElement(
          'span',
          {
            style: styles.operationIcon,
            className: 'celleditor-trigger',
            title: '\u7F16\u8F91',
            onClick: this.editThisCell
          },
          React.createElement(_Icon, { size: 'xs', type: 'edit' })
        )
      );
    }
  }]);

  return CellEditor;
}(Component), _class.displayName = 'CellEditor', _temp);
export { CellEditor as default };


var styles = {
  cellInput: {
    width: 'calc(100% - 44px)'
  },
  operationIcon: {
    marginLeft: '10px',
    color: '#999',
    cursor: 'pointer'
  }
};