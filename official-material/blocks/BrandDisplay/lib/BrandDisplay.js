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
import Img from '@icedesign/img';

import { enquireScreen } from 'enquire-js';

var Row = _Grid.Row,
    Col = _Grid.Col;


var dataSource = [{
  title: '飞利浦',
  subject: '一场内容营销活动获得超百万的进店点击，定位新广告的达人+积极迎接内容时代的品牌，如何刷新内容营销的定义？',
  headPic: 'https://img.alicdn.com/tfs/TB1QMwlSXXXXXaUXXXXXXXXXXXX-122-122.png',
  pic: 'https://img.alicdn.com/tfs/TB1n6H_SXXXXXc3XpXXXXXXXXXX-616-348.png',
  url: 'https://alibaba.github.io/ice'
}, {
  title: '万家乐',
  subject: '策划『生活改造家』主题全案，联合一线大咖制作图文、直播、短视频全域引流，助力品牌升级和高端人群种草，结合行业活动割草。',
  headPic: 'https://img.alicdn.com/tfs/TB1Z4CLSXXXXXcHXVXXXXXXXXXX-61-61.png',
  pic: 'https://img.alicdn.com/tfs/TB1bHO6SXXXXXaiXFXXXXXXXXXX-308-174.png',
  url: 'https://alibaba.github.io/ice'
}, {
  title: '职场游乐园',
  subject: '2017年以“职场游乐园”为主题，全方位推动Lee牛仔专家与创新者形象。',
  headPic: 'https://img.alicdn.com/tfs/TB1kX62SXXXXXXJXVXXXXXXXXXX-122-122.png',
  pic: 'https://img.alicdn.com/tfs/TB17bzrSXXXXXbpaFXXXXXXXXXX-616-348.png',
  url: 'https://alibaba.github.io/ice'
}, {
  title: '品味百味人生',
  subject: '吃货的世界你不懂，看着直播镜头里心仪的零食恨不得舔屏，从种草到剁手分分钟一气呵成。',
  headPic: 'https://img.alicdn.com/tfs/TB19C_9SXXXXXc1XpXXXXXXXXXX-122-122.png',
  pic: 'https://img.alicdn.com/tfs/TB1IkEjSXXXXXb1XXXXXXXXXXXX-616-348.png',
  url: 'https://alibaba.github.io/ice'
}];

var BrandDisplay = (_temp = _class = function (_Component) {
  _inherits(BrandDisplay, _Component);

  function BrandDisplay(props) {
    _classCallCheck(this, BrandDisplay);

    var _this = _possibleConstructorReturn(this, (BrandDisplay.__proto__ || _Object$getPrototypeOf(BrandDisplay)).call(this, props));

    _this.enquireScreenRegister = function () {
      var mediaCondition = 'only screen and (max-width: 720px)';

      enquireScreen(function (mobile) {
        _this.setState({
          isMobile: mobile
        });
      }, mediaCondition);
    };

    _this.state = {
      isMobile: false
    };
    return _this;
  }

  _createClass(BrandDisplay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.enquireScreenRegister();
    }
  }, {
    key: 'render',
    value: function render() {
      var isMobile = this.state.isMobile;

      var logoWidth = isMobile ? 150 : 195;
      var logoHeight = isMobile ? 150 : 175;

      return React.createElement(
        'div',
        { className: 'brand-display', style: styles.container },
        React.createElement(
          'div',
          { style: styles.brandHeader },
          React.createElement(
            'h5',
            { style: styles.brandTitle },
            '\u54C1\u724C\u5C55\u793A'
          )
        ),
        React.createElement(
          Row,
          { gutter: '20', wrap: true },
          dataSource.map(function (item, index) {
            return React.createElement(
              Col,
              { xxs: '24', s: '12', l: '12', key: index, style: styles.brandItem },
              React.createElement(
                'a',
                { href: item.url, style: styles.brandItemContent },
                React.createElement(
                  'div',
                  null,
                  React.createElement(Img, {
                    width: logoWidth,
                    height: logoHeight,
                    src: item.pic,
                    type: 'cover',
                    alt: '\u56FE\u7247'
                  })
                ),
                React.createElement(
                  'div',
                  { style: styles.caseContent },
                  React.createElement(
                    'div',
                    { style: styles.caseSubject },
                    React.createElement('img', {
                      src: item.headPic,
                      style: styles.subjectImage,
                      alt: '\u56FE\u7247'
                    }),
                    React.createElement(
                      'span',
                      { style: styles.subjectDesc },
                      item.title
                    )
                  ),
                  React.createElement(
                    'p',
                    { style: styles.caseDetail },
                    item.subject
                  )
                )
              )
            );
          })
        )
      );
    }
  }]);

  return BrandDisplay;
}(Component), _class.displayName = 'BrandDisplay', _temp);
export { BrandDisplay as default };


var styles = {
  container: {
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '80px 20px'
  },
  brandHeader: {
    position: 'relative',
    textAlign: 'center'
  },
  brandTitle: {
    marginBottom: '40px',
    fontSize: '20px',
    color: '#333333'
  },
  brandItem: {
    height: '175px',
    background: '#fff',
    display: 'inline-block',
    verticalAlign: 'top',
    marginBottom: '30px',
    overflow: 'hidden'
  },
  brandItemContent: {
    display: 'flex'
  },

  caseContent: {},
  caseSubject: {
    margin: '0 10px 0',
    lineHeight: '60px',
    height: '60px'
  },
  subjectImage: {
    width: '60px',
    height: '60px',
    borderRadius: '50%'
  },
  subjectDesc: {
    fontSize: '16px',
    color: '#333333',
    height: '60px',
    verticalAlign: 'top',
    marginLeft: '12px'
  },
  caseDetail: {
    marginTop: 0,
    fontSize: '12px',
    color: '#666666',
    padding: '0 16px',
    textAlign: 'left'
  }
};