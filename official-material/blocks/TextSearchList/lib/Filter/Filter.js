import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

var Filter = function (_Component) {
  _inherits(Filter, _Component);

  function Filter() {
    _classCallCheck(this, Filter);

    return _possibleConstructorReturn(this, (Filter.__proto__ || _Object$getPrototypeOf(Filter)).apply(this, arguments));
  }

  _createClass(Filter, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        IceContainer,
        { style: styles.container },
        React.createElement(
          'div',
          { style: styles.category },
          React.createElement(
            'span',
            { style: styles.label },
            '\u6240\u5C5E\u7C7B\u76EE\uFF1A'
          ),
          React.createElement(
            'span',
            { style: styles.item },
            '\u5168\u90E8'
          ),
          React.createElement(
            'span',
            { style: styles.item },
            '\u7C7B\u76EE\u4E00'
          ),
          React.createElement(
            'span',
            { style: styles.item },
            '\u7C7B\u76EE\u4E8C'
          ),
          React.createElement(
            'span',
            { style: styles.item },
            '\u7C7B\u76EE\u4E09'
          ),
          React.createElement(
            'span',
            { style: styles.item },
            '\u7C7B\u76EE\u56DB'
          )
        ),
        React.createElement(
          'div',
          { style: styles.others },
          React.createElement(
            'span',
            { style: styles.label },
            '\u5176\u5B83\u7B5B\u9009\uFF1A'
          ),
          React.createElement(
            'span',
            { style: styles.item },
            '\u5168\u90E8'
          ),
          React.createElement(
            'span',
            { style: styles.item },
            '\u7C7B\u76EE\u4E00'
          ),
          React.createElement(
            'span',
            { style: styles.item },
            '\u7C7B\u76EE\u4E8C'
          ),
          React.createElement(
            'span',
            { style: styles.item },
            '\u7C7B\u76EE\u4E09'
          ),
          React.createElement(
            'span',
            { style: styles.item },
            '\u7C7B\u76EE\u56DB'
          )
        )
      );
    }
  }]);

  return Filter;
}(Component);

export { Filter as default };


var styles = {
  container: {},
  category: {
    padding: '0 10px 15px',
    borderBottom: '1px solid #eee'
  },
  others: {
    padding: '15px 10px 0'
  },
  label: {
    color: '#333',
    fontSize: '14px',
    marginRight: '10px'
  },
  item: {
    marginRight: '10px'
  }
};