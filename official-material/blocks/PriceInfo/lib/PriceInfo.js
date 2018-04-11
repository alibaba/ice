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


var data = [{
  title: '基本配置',
  price: '99',
  type: '微型企业',
  description: '海纳百川，精选全球的高品质软件与服务，大咖云集，知识分享的开发者技术社区',
  imgUrl: 'https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png'
}, {
  title: '标准配置',
  price: '199',
  type: '中小企业',
  description: '海纳百川，精选全球的高品质软件与服务，大咖云集，知识分享的开发者技术社区',
  imgUrl: 'https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png'
}, {
  title: '高端配置',
  price: '299',
  type: '大型企业',
  description: '海纳百川，精选全球的高品质软件与服务，大咖云集，知识分享的开发者技术社区',
  imgUrl: 'https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png'
}];

var PriceInfo = (_temp = _class = function (_Component) {
  _inherits(PriceInfo, _Component);

  function PriceInfo(props) {
    _classCallCheck(this, PriceInfo);

    var _this = _possibleConstructorReturn(this, (PriceInfo.__proto__ || _Object$getPrototypeOf(PriceInfo)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(PriceInfo, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { style: styles.container },
        React.createElement(
          Row,
          { gutter: '20', wrap: true },
          data.map(function (item, index) {
            return React.createElement(
              Col,
              { xxs: '24', s: '8', l: '8', key: index },
              React.createElement(
                'div',
                { style: styles.item },
                React.createElement(
                  'div',
                  { style: styles.head },
                  React.createElement(
                    'h3',
                    { style: styles.title },
                    item.title
                  ),
                  React.createElement(
                    'p',
                    { style: styles.price },
                    '\uFFE5',
                    item.price
                  )
                ),
                React.createElement(
                  'div',
                  { style: styles.info },
                  React.createElement('img', { style: styles.image, src: item.imgUrl, alt: '' }),
                  React.createElement(
                    'h5',
                    { style: styles.type },
                    item.type
                  ),
                  React.createElement(
                    'p',
                    { style: styles.description },
                    item.description
                  )
                ),
                React.createElement(
                  'div',
                  { style: styles.buyBtn },
                  React.createElement(
                    'a',
                    { href: '/', style: styles.link },
                    '\u7ACB\u5373\u8D2D\u4E70'
                  )
                )
              )
            );
          })
        )
      );
    }
  }]);

  return PriceInfo;
}(Component), _class.displayName = 'PriceInfo', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { PriceInfo as default };


var styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '80px 0',
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto'
  },
  item: {
    background: '#FAFAFA',
    borderRadius: '6px',
    paddingBottom: '50px',
    marginBottom: '20px'
  },
  head: {
    padding: '30px 0',
    background: '#3080FE',
    textAlign: 'center',
    color: '#fff',
    borderRadius: '6px 6px 0 0'
  },
  title: {
    margin: '0 0 5px',
    fontWeight: 'bold',
    fontSize: '20px'
  },
  price: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '18px'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '40px'
  },
  image: {
    width: '52px',
    height: '52px'
  },
  type: {
    margin: 0,
    fontSize: '15px',
    fontWeight: 'bold',
    marginTop: '10px'
  },
  description: {
    margin: '20px 0',
    lineHeight: '22px',
    textAlign: 'center',
    width: '60%',
    color: '#999'
  },
  buyBtn: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
  },
  link: {
    padding: '6px 15px',
    background: '#3080FE',
    borderRadius: '16px',
    color: '#fff'
  }
};