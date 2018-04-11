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
  return _Array$from({ length: count }).map(function () {
    return {
      imgUrl: 'https://img.alicdn.com/tfs/TB1rnNcjr_I8KJjy1XaXXbsxpXa-603-474.png'
    };
  });
};

var BrandShowCase = (_temp = _class = function (_Component) {
  _inherits(BrandShowCase, _Component);

  function BrandShowCase(props) {
    _classCallCheck(this, BrandShowCase);

    var _this = _possibleConstructorReturn(this, (BrandShowCase.__proto__ || _Object$getPrototypeOf(BrandShowCase)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(BrandShowCase, [{
    key: 'render',
    value: function render() {
      var data = generatorData(12);
      return React.createElement(
        'div',
        { className: 'brand-show-case', style: styles.container },
        React.createElement(
          'div',
          { style: styles.head },
          React.createElement(
            'h2',
            { style: styles.title },
            '\u54C1\u724C\u5C55\u793A'
          ),
          React.createElement(
            'p',
            { style: styles.intro },
            '\u5E7F\u4E49\u7684\u201C\u54C1\u724C\u201D\u662F\u5177\u6709\u7ECF\u6D4E\u4EF7\u503C\u7684\u65E0\u5F62\u8D44\u4EA7\uFF0C\u7528\u62BD\u8C61\u5316\u7684\u3001\u7279\u6709\u7684\u3001\u80FD\u8BC6\u522B\u7684\u5FC3\u667A\u6982\u5FF5\u6765\u8868\u73B0\u5176\u5DEE\u5F02\u6027\uFF0C\u4ECE\u800C\u5728\u4EBA\u4EEC\u7684\u610F\u8BC6\u5F53\u4E2D\u5360\u636E\u4E00\u5B9A\u4F4D\u7F6E\u7684\u7EFC\u5408\u53CD\u6620\u3002\u54C1\u724C\u5EFA\u8BBE\u5177\u6709\u957F\u671F\u6027'
          )
        ),
        React.createElement(
          Row,
          { gutter: '20', wrap: true, style: styles.items },
          data.map(function (item, index) {
            return React.createElement(
              Col,
              { xxs: '12', s: '4', l: '4', key: index },
              React.createElement(
                'div',
                { style: styles.item },
                React.createElement('img', { src: item.imgUrl, style: styles.image, alt: '' })
              )
            );
          })
        )
      );
    }
  }]);

  return BrandShowCase;
}(Component), _class.displayName = 'BrandShowCase', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { BrandShowCase as default };


var styles = {
  container: {
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '80px 0'
  },
  head: {
    width: '80%',
    maxWidth: '540px',
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
    margin: '30px 0'
  },
  item: {
    margin: '10px 0',
    textAlign: 'center'
  },
  image: {
    width: '100px',
    height: '80px'
  }
};