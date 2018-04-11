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
  description: '海纳百川精选全球的高品质软件与服务，大咖云集，知识分享的开发者技术社区'
}, {
  title: '标准配置',
  price: '199',
  description: '海纳百川精选全球的高品质软件与服务，大咖云集，知识分享的开发者技术社区'
}, {
  title: '高端配置',
  price: '299',
  description: '海纳百川精选全球的高品质软件与服务，大咖云集，知识分享的开发者技术社区'
}];

var PriceCard = (_temp = _class = function (_Component) {
  _inherits(PriceCard, _Component);

  function PriceCard(props) {
    _classCallCheck(this, PriceCard);

    var _this = _possibleConstructorReturn(this, (PriceCard.__proto__ || _Object$getPrototypeOf(PriceCard)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(PriceCard, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { style: styles.container },
        React.createElement(
          'div',
          { style: styles.content },
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
                      { style: styles.description },
                      item.description
                    )
                  ),
                  React.createElement(
                    'div',
                    { style: styles.info },
                    React.createElement(
                      'p',
                      { style: styles.price },
                      '\uFFE5',
                      item.price
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
        )
      );
    }
  }]);

  return PriceCard;
}(Component), _class.displayName = 'PriceCard', _class.defaultProps = {}, _temp);
export { PriceCard as default };


var styles = {
  container: {
    background: 'url(https://img.alicdn.com/tfs/TB1JGoDi3vD8KJjy0FlXXagBFXa-5040-2811.png)',
    borderRadius: 0,
    width: '100%',
    padding: '80px 0'
  },
  content: {
    maxWidth: '1080px',
    margin: '0 auto',
    overflow: 'hidden'
  },
  item: {
    marginBottom: '20px',
    padding: '20px 30px 60px',
    background: '#fff',
    borderRadius: '6px'
  },
  head: {
    padding: '30px 0',
    textAlign: 'center',
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
    fontSize: '22px'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  description: {
    margin: '20px auto',
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