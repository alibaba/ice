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
      name: '人物名',
      company: '就职公司/职务',
      description: '随着个人用户对于互联网内容获取的要求和口味越来越特别，怎样提供更加精准个性化的资讯订阅服务是提升用户体验的关键。虽然我们发现目前市面上有非常多的资讯类app 都标榜自己能够提供个人定制化的新闻阅读功能，但是本质上来说一般都是通过新闻源+兴趣点+智能推荐这样的组合实现的',
      imgUrl: 'https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png'
    };
  });
};

var TestimonialCard = (_temp = _class = function (_Component) {
  _inherits(TestimonialCard, _Component);

  function TestimonialCard(props) {
    _classCallCheck(this, TestimonialCard);

    var _this = _possibleConstructorReturn(this, (TestimonialCard.__proto__ || _Object$getPrototypeOf(TestimonialCard)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(TestimonialCard, [{
    key: 'render',
    value: function render() {
      var data = generatorData(3);
      return React.createElement(
        'div',
        { style: styles.container },
        React.createElement(
          'div',
          { style: styles.content },
          React.createElement(
            Row,
            { wrap: true, gutter: 20 },
            data.map(function (item, index) {
              return React.createElement(
                Col,
                { xxs: '24', s: '8', l: '8', key: index },
                React.createElement(
                  'div',
                  { style: styles.item },
                  React.createElement(
                    'div',
                    { style: styles.infoBox },
                    React.createElement('img', {
                      style: styles.avatar,
                      src: item.imgUrl,
                      alt: item.name
                    }),
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
                        { style: styles.company },
                        item.company
                      )
                    )
                  ),
                  React.createElement(
                    'p',
                    { style: styles.description },
                    '\u201C',
                    item.description,
                    '\u201D'
                  )
                )
              );
            })
          )
        )
      );
    }
  }]);

  return TestimonialCard;
}(Component), _class.displayName = 'TestimonialCard', _temp);
export { TestimonialCard as default };


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
  infoBox: {
    display: 'flex'
  },
  baseInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '15px'
  },
  avatar: {
    width: '64px',
    height: '64px'
  },
  name: {
    margin: 0,
    fontSize: '15px',
    fontWeight: 'bold'
  },
  company: {
    margin: 0
  },
  description: {
    lineHeight: '28px'
  }
};