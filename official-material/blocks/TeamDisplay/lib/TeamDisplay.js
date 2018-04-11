import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Array$from from 'babel-runtime/core-js/array/from';
import _Grid from '@icedesign/base/lib/grid';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
var Row = _Grid.Row,
    Col = _Grid.Col;


var generatorData = function generatorData(count) {
  return _Array$from({ length: count }).map(function (item, index) {
    return {
      name: '\u6210\u5458' + (index + 1),
      description: '成员的相关描述',
      imgUrl: 'https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png'
    };
  });
};

var TeamDisplay = (_temp = _class = function (_Component) {
  _inherits(TeamDisplay, _Component);

  function TeamDisplay(props) {
    _classCallCheck(this, TeamDisplay);

    var _this = _possibleConstructorReturn(this, (TeamDisplay.__proto__ || _Object$getPrototypeOf(TeamDisplay)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(TeamDisplay, [{
    key: 'render',
    value: function render() {
      var data = generatorData(6);
      return React.createElement(
        'div',
        { className: 'team-display', style: styles.container },
        React.createElement(
          'h2',
          { style: styles.title },
          '\u6211\u4EEC\u7684\u56E2\u961F'
        ),
        React.createElement(
          Row,
          { wrap: true },
          data.map(function (item, index) {
            return React.createElement(
              Col,
              { xxs: '12', s: '8', l: '8', key: index },
              React.createElement(
                'div',
                { style: styles.item },
                React.createElement('img', {
                  src: item.imgUrl,
                  style: styles.avatar,
                  alt: item.name
                }),
                React.createElement(
                  'h5',
                  { style: styles.name },
                  item.name
                ),
                React.createElement(
                  'p',
                  { style: styles.description },
                  item.description
                )
              )
            );
          })
        )
      );
    }
  }]);

  return TeamDisplay;
}(Component), _class.displayName = 'TeamDisplay', _temp);
export { TeamDisplay as default };


var styles = {
  container: {
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '80px 0'
  },
  title: {
    textAlign: 'center',
    fontSize: '28px'
  },
  name: {
    fontWeight: 'bold',
    fontSize: '15px'
  },
  avatar: {
    width: '150px',
    height: '150px'
  },
  description: {
    lineHeight: '22px',
    color: '#999'
  }
};