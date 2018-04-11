import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Button from '@icedesign/base/lib/button';
import _DatePicker from '@icedesign/base/lib/date-picker';
import _Input from '@icedesign/base/lib/input';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Select from '@icedesign/base/lib/select';
import _Grid from '@icedesign/base/lib/grid';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';


// form binder 详细用法请参见官方文档
import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder } from '@icedesign/form-binder';

var Row = _Grid.Row,
    Col = _Grid.Col;
var Option = _Select.Option;
var Filter = (_temp = _class = function (_Component) {
  _inherits(Filter, _Component);

  function Filter() {
    _classCallCheck(this, Filter);

    return _possibleConstructorReturn(this, (Filter.__proto__ || _Object$getPrototypeOf(Filter)).apply(this, arguments));
  }

  _createClass(Filter, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        IceFormBinderWrapper,
        {
          value: this.props.value,
          onChange: this.props.onChange
        },
        React.createElement(
          'div',
          null,
          React.createElement(
            Row,
            { wrap: true },
            React.createElement(
              Col,
              { xxs: 24, xs: 12, l: 8, style: styles.filterCol },
              React.createElement(
                'label',
                { style: styles.filterTitle },
                '\u6240\u5C5E\u5E94\u7528'
              ),
              React.createElement(
                IceFormBinder,
                null,
                React.createElement(_Input, { name: 'app' })
              )
            ),
            React.createElement(
              Col,
              { xxs: 24, xs: 12, l: 8, style: styles.filterCol },
              React.createElement(
                'label',
                { style: styles.filterTitle },
                '\u5206\u7C7BID'
              ),
              React.createElement(
                IceFormBinder,
                null,
                React.createElement(_Input, { name: 'id' })
              )
            ),
            React.createElement(
              Col,
              { xxs: 24, xs: 12, l: 8, style: styles.filterCol },
              React.createElement(
                'label',
                { style: styles.filterTitle },
                '\u6807\u7B7EID'
              ),
              React.createElement(
                IceFormBinder,
                null,
                React.createElement(_Input, { name: 'tag' })
              )
            ),
            React.createElement(
              Col,
              { xxs: 24, xs: 12, l: 8, style: styles.filterCol },
              React.createElement(
                'label',
                { style: styles.filterTitle },
                '\u5F00\u59CB\u65F6\u95F4'
              ),
              React.createElement(
                IceFormBinder,
                {
                  valueFormatter: function valueFormatter(date, strValue) {
                    return strValue;
                  }
                },
                React.createElement(_DatePicker, { name: 'startTime', style: styles.filterTool })
              )
            ),
            React.createElement(
              Col,
              { xxs: 24, xs: 12, l: 8, style: styles.filterCol },
              React.createElement(
                'label',
                { style: styles.filterTitle },
                '\u7ED3\u675F\u65F6\u95F4'
              ),
              React.createElement(
                IceFormBinder,
                {
                  valueFormatter: function valueFormatter(date, strValue) {
                    return strValue;
                  }
                },
                React.createElement(_DatePicker, { name: 'endTime', style: styles.filterTool })
              )
            ),
            React.createElement(
              Col,
              { xxs: 24, xs: 12, l: 8, style: styles.filterCol },
              React.createElement(
                'label',
                { style: styles.filterTitle },
                '\u5C3A\u5BF8'
              ),
              React.createElement(
                IceFormBinder,
                null,
                React.createElement(
                  _Select,
                  {
                    name: 'size',
                    placeholder: '\u8BF7\u9009\u62E9',
                    style: styles.filterTool
                  },
                  React.createElement(
                    Option,
                    { value: 'small' },
                    'Small'
                  ),
                  React.createElement(
                    Option,
                    { value: 'medium' },
                    'Medium'
                  ),
                  React.createElement(
                    Option,
                    { value: 'large' },
                    'Large'
                  )
                )
              )
            ),
            React.createElement(
              Col,
              { xxs: 24, xs: 12, l: 8, style: styles.filterCol },
              React.createElement(
                'label',
                { style: styles.filterTitle },
                '\u5220\u9664\u72B6\u6001'
              ),
              React.createElement(
                IceFormBinder,
                null,
                React.createElement(
                  _Select,
                  { name: 'status', style: styles.filterTool },
                  React.createElement(
                    Option,
                    { value: 'success' },
                    '\u6210\u529F'
                  ),
                  React.createElement(
                    Option,
                    { value: 'failed' },
                    '\u5931\u8D25'
                  )
                )
              )
            ),
            React.createElement(
              Col,
              { xxs: 24, xs: 12, l: 8, style: styles.filterCol },
              React.createElement(
                'label',
                { style: styles.filterTitle },
                '\u8BA8\u8BBAID'
              ),
              React.createElement(
                IceFormBinder,
                null,
                React.createElement(_Input, { name: 'commentId' })
              )
            ),
            React.createElement(
              Col,
              { xxs: 24, xs: 12, l: 8, style: styles.filterCol },
              React.createElement(
                'label',
                { style: styles.filterTitle },
                '\u7F6E\u9876'
              ),
              React.createElement(
                IceFormBinder,
                null,
                React.createElement(
                  _Select,
                  {
                    name: 'isStick',
                    placeholder: '\u8BF7\u9009\u62E9',
                    style: styles.filterTool
                  },
                  React.createElement(
                    Option,
                    { value: 'all' },
                    '\u4E0D\u9650'
                  ),
                  React.createElement(
                    Option,
                    { value: 'stick' },
                    '\u7F6E\u9876'
                  ),
                  React.createElement(
                    Option,
                    { value: 'not-stick' },
                    '\u4E0D\u7F6E\u9876'
                  )
                )
              )
            )
          ),
          React.createElement(
            'div',
            {
              style: {
                textAlign: 'left',
                marginLeft: '12px'
              }
            },
            React.createElement(
              _Button,
              { onClick: this.props.onReset, type: 'normal' },
              '\u91CD\u7F6E'
            ),
            React.createElement(
              _Button,
              {
                onClick: this.props.onSubmit,
                type: 'primary',
                style: { marginLeft: '10px' }
              },
              '\u786E\u5B9A'
            )
          )
        )
      );
    }
  }]);

  return Filter;
}(Component), _class.displayName = 'Filter', _temp);
export { Filter as default };


var styles = {
  filterCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
  },

  filterTitle: {
    width: '68px',
    textAlign: 'right',
    marginRight: '12px',
    fontSize: '14px'
  },

  filterTool: {
    width: '200px'
  }
};