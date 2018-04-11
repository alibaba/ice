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
      description: '成员的相关简介和描述',
      imgUrl: 'https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png'
    };
  });
};

var OurTeam = (_temp = _class = function (_Component) {
  _inherits(OurTeam, _Component);

  function OurTeam(props) {
    _classCallCheck(this, OurTeam);

    var _this = _possibleConstructorReturn(this, (OurTeam.__proto__ || _Object$getPrototypeOf(OurTeam)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(OurTeam, [{
    key: 'render',
    value: function render() {
      var data = generatorData(4);
      return React.createElement(
        'div',
        { className: 'our-team', style: styles.container },
        React.createElement(
          'div',
          { style: styles.head },
          React.createElement(
            'h2',
            { style: styles.title },
            '\u6211\u4EEC\u7684\u56E2\u961F'
          ),
          React.createElement(
            'p',
            { style: styles.intro },
            '\u6211\u4EEC\u662F\u4E00\u652F\u5145\u6EE1\u6FC0\u60C5\u3001\u5FD7\u5411\u8FDC\u5927\u3001\u6000\u63E3\u68A6\u60F3',
            React.createElement('br', null),
            '\u7684\u56E2\u961F\uFF0C\u4E5F\u662F\u4E00\u4E2A\u601D\u7EF4\u6D3B\u8DC3\u3001\u671D\u6C14\u84EC\u52C3\u3001\u56E2\u7ED3\u4E92\u52A9\u7684\u5927\u5BB6\u5EAD\u3002'
          )
        ),
        React.createElement(
          Row,
          { wrap: true, style: styles.items },
          data.map(function (item, index) {
            return React.createElement(
              Col,
              { xxs: '24', s: '12', l: '12', style: styles.item, key: index },
              React.createElement('img', { src: item.imgUrl, style: styles.avatar, alt: '' }),
              React.createElement(
                'div',
                { style: styles.baseInfo },
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

  return OurTeam;
}(Component), _class.displayName = 'OurTeam', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { OurTeam as default };


var styles = {
  container: {
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '80px 0'
  },
  head: {
    width: '50%',
    margin: '0 auto'
  },
  title: {
    textAlign: 'center',
    fontSize: '28px'
  },
  intro: {
    textAlign: 'center',
    color: '#999'
  },
  items: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  item: {
    display: 'flex',
    width: '50%',
    padding: '0 40px',
    margin: '40px 0'
  },
  baseInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '25px'
  },
  name: {
    fontWeight: 'bold',
    margin: '0 0 10px',
    fontSize: '15px'
  },
  description: {
    margin: 0,
    color: '#999'
  },
  avatar: {
    width: '150px',
    height: '150px'
  }
};