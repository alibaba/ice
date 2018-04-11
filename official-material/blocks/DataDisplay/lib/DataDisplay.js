import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

var data = [{
  count: 100,
  title: '日活跃数'
}, {
  count: '3,000',
  title: '月活跃数'
}, {
  count: '20,000',
  title: '年活跃数'
}];

var DataDisplay = (_temp = _class = function (_Component) {
  _inherits(DataDisplay, _Component);

  function DataDisplay(props) {
    _classCallCheck(this, DataDisplay);

    var _this = _possibleConstructorReturn(this, (DataDisplay.__proto__ || _Object$getPrototypeOf(DataDisplay)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(DataDisplay, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'data-display' },
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            'div',
            { style: styles.items },
            data.map(function (item, index) {
              return React.createElement(
                'div',
                { style: styles.item, key: index },
                React.createElement(
                  'h5',
                  { style: styles.count },
                  item.count
                ),
                React.createElement('span', { style: styles.splitLine }),
                React.createElement(
                  'p',
                  { style: styles.title },
                  item.title
                )
              );
            })
          )
        )
      );
    }
  }]);

  return DataDisplay;
}(Component), _class.displayName = 'DataDisplay', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { DataDisplay as default };


var styles = {
  items: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  item: {
    width: '33.3333%',
    margin: '5px 0',
    textAlign: 'center'
  },
  count: {
    margin: '12px 0',
    fontWeight: 'bold',
    fontSize: '32px',
    color: '#15A0FF'
  },
  title: {
    color: '#999'
  },
  splitLine: {
    display: 'block',
    margin: '0 auto',
    width: '24px',
    height: '1px',
    background: '#9B9B9B'
  }
};