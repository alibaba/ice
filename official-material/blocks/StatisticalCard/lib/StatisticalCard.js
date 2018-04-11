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
import IceContainer from '@icedesign/container';
var Row = _Grid.Row,
    Col = _Grid.Col;


var dataSource = [{
  text: '昨日内容浏览次数',
  number: '46,657',
  circle: {
    width: 36,
    height: 31,
    icon: 'https://gw.alicdn.com/tfs/TB1YDjNh4rI8KJjy0FpXXb5hVXa-36-31.png'
  },
  helpURL: 'http://taobao.com'
}, {
  text: '昨日主页浏览人数',
  number: '96',
  circle: {
    width: 40,
    height: 43,
    icon: 'https://gw.alicdn.com/tfs/TB1Vzv5h2DH8KJjy1XcXXcpdXXa-40-43.png'
  },
  helpURL: 'http://taobao.com'
}, {
  text: '昨日粉丝数',
  number: '157',
  circle: {
    width: 42,
    height: 29,
    icon: 'https://gw.alicdn.com/tfs/TB1uB_Fh9_I8KJjy0FoXXaFnVXa-42-29.png'
  },
  helpURL: 'http://taobao.com'
}, {
  text: '昨日活跃粉丝数',
  number: '42',
  circle: {
    width: 43,
    height: 42,
    icon: 'https://gw.alicdn.com/tfs/TB186kphZLJ8KJjy0FnXXcFDpXa-43-42.png'
  },
  helpURL: 'http://taobao.com'
}];

var StatisticalCard = (_temp = _class = function (_Component) {
  _inherits(StatisticalCard, _Component);

  function StatisticalCard(props) {
    _classCallCheck(this, StatisticalCard);

    var _this = _possibleConstructorReturn(this, (StatisticalCard.__proto__ || _Object$getPrototypeOf(StatisticalCard)).call(this, props));

    _this.renderItem = function () {
      return dataSource.map(function (data, idx) {
        var imgStyle = {
          width: data.circle.width + 'px',
          height: data.circle.height + 'px'
        };
        return React.createElement(
          Col,
          {
            xxs: 24,
            xs: 12,
            l: 6,
            key: idx,
            style: styles.statisticalCardItem
          },
          React.createElement(
            'div',
            { style: styles.circleWrap },
            React.createElement('img', { src: data.circle.icon, style: imgStyle, alt: '\u56FE\u7247' })
          ),
          React.createElement(
            'div',
            { style: styles.statisticalCardDesc },
            React.createElement(
              'div',
              { style: styles.statisticalCardText },
              data.text,
              React.createElement(
                'a',
                { href: data.helpURL, target: '_blank' },
                React.createElement('img', {
                  src: 'https://gw.alicdn.com/tfs/TB1uR_Fh9_I8KJjy0FoXXaFnVXa-12-12.png',
                  style: styles.itemHelp,
                  alt: '\u56FE\u7247'
                })
              )
            ),
            React.createElement(
              'div',
              { style: styles.statisticalCardNumber },
              data.number
            )
          )
        );
      });
    };

    _this.state = {};
    return _this;
  }

  _createClass(StatisticalCard, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'statistical-card', style: styles.statisticalCard },
        React.createElement(
          IceContainer,
          { style: styles.statisticalCardItems },
          React.createElement(
            Row,
            { wrap: true, style: { width: '100%' } },
            this.renderItem()
          )
        )
      );
    }
  }]);

  return StatisticalCard;
}(Component), _class.displayName = 'StatisticalCard', _temp);
export { StatisticalCard as default };


var styles = {
  statisticalCardItems: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statisticalCardItem: {
    display: 'flex',
    flexDirection: 'row',
    margin: '10px 0'
  },
  circleWrap: {
    backgroundColor: '#FFECB3',
    width: '70px',
    height: '70px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    marginRight: '10px'
  },
  statisticalCardDesc: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  statisticalCardText: {
    position: 'relative',
    color: '#333333',
    fontSize: '12px',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  statisticalCardNumber: {
    color: '#333333',
    fontSize: '24px'
  },
  itemHelp: {
    width: '12px',
    height: '12px',
    position: 'absolute',
    top: '1px',
    right: '-15px'
  }
};