import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Grid from '@icedesign/base/lib/grid';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
var Row = _Grid.Row,
    Col = _Grid.Col;


var dataSource = [{
  title: '主页背书',
  pic: 'https://img.alicdn.com/tfs/TB1i7OMif6H8KJjSspmXXb2WXXa-210-210.png',
  desc: '这里填写具体的细节描述'
}, {
  title: '频道入驻',
  pic: 'https://img.alicdn.com/tfs/TB1wA5KinvI8KJjSspjXXcgjXXa-210-210.png',
  desc: '这里填写具体的细节描述'
}, {
  title: '商业扶持',
  pic: 'https://img.alicdn.com/tfs/TB1laelicjI8KJjSsppXXXbyVXa-210-210.png',
  desc: '这里填写具体的细节描述'
}, {
  title: '专属管家',
  pic: 'https://img.alicdn.com/tfs/TB1EfLYfOqAXuNjy1XdXXaYcVXa-207-210.png',
  desc: '这里填写具体的细节描述'
}, {
  title: '资源优选',
  pic: 'https://img.alicdn.com/tfs/TB1a31mignH8KJjSspcXXb3QFXa-210-210.png',
  desc: '这里填写具体的细节描述'
}, {
  title: '快捷搜索',
  pic: 'https://img.alicdn.com/tfs/TB1ALecicrI8KJjy0FhXXbfnpXa-210-210.png',
  desc: '这里填写具体的细节描述'
}];

var ProductInfo = (_temp = _class = function (_Component) {
  _inherits(ProductInfo, _Component);

  function ProductInfo(props) {
    _classCallCheck(this, ProductInfo);

    var _this = _possibleConstructorReturn(this, (ProductInfo.__proto__ || _Object$getPrototypeOf(ProductInfo)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(ProductInfo, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'product-info', style: styles.container },
        React.createElement(
          Row,
          { wrap: true },
          dataSource.map(function (item, index) {
            return React.createElement(
              Col,
              { xxs: '12', s: '8', l: '8', key: index, style: styles.item },
              React.createElement('img', { src: item.pic, style: styles.pic, alt: '' }),
              React.createElement(
                'h3',
                { style: styles.title },
                item.title
              ),
              React.createElement(
                'p',
                { style: styles.desc },
                item.desc
              )
            );
          })
        )
      );
    }
  }]);

  return ProductInfo;
}(Component), _class.displayName = 'ProductInfo', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { ProductInfo as default };


var styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '80px 0'
  },
  item: {
    textAlign: 'center',
    padding: '10px 22px',
    marginBottom: '20px'
  },
  pic: {
    width: 100,
    height: 100
  },
  title: {
    fontWeight: 'bold'
  },
  desc: {
    lineHeight: '22px',
    color: '#999'
  }
};