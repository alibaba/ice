'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

require('./Testimonial.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var generatorData = function generatorData(count) {
  return Array.from({ length: count }).map(function () {
    return {
      name: '人物名',
      company: '就职公司/职务',
      description: '随着个人用户对于互联网内容获取的要求和口味越来越特别，怎样提供更加精准个性化的资讯订阅服务是提升用户体验的关键。但是本质上来说一般都是通过新闻源智能推荐这样的组合实现的',
      imgUrl: 'https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png'
    };
  });
};

var Testimonial = (_temp = _class = function (_Component) {
  _inherits(Testimonial, _Component);

  function Testimonial(props) {
    _classCallCheck(this, Testimonial);

    var _this = _possibleConstructorReturn(this, (Testimonial.__proto__ || Object.getPrototypeOf(Testimonial)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Testimonial, [{
    key: 'render',
    value: function render() {
      var data = generatorData(3);
      return _react2.default.createElement(
        'div',
        { className: 'testimonial' },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            'div',
            { style: styles.items },
            data.map(function (item, index) {
              var rowLastItem = (index + 1) % 3 === 0 ? styles.rowLastItem : {};
              return _react2.default.createElement(
                'div',
                {
                  key: index,
                  style: _extends({}, styles.item, rowLastItem),
                  className: 'item'
                },
                _react2.default.createElement(
                  'p',
                  { style: styles.description },
                  '\u201C',
                  item.description,
                  '\u201D'
                ),
                _react2.default.createElement(
                  'div',
                  { style: styles.infoBox },
                  _react2.default.createElement('img', {
                    style: styles.avatar,
                    src: item.imgUrl,
                    alt: item.name
                  }),
                  _react2.default.createElement(
                    'div',
                    { style: styles.baseInfo },
                    _react2.default.createElement(
                      'h5',
                      { style: styles.name },
                      item.name
                    ),
                    _react2.default.createElement(
                      'p',
                      { style: styles.company },
                      item.company
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

  return Testimonial;
}(_react.Component), _class.displayName = 'Testimonial', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = Testimonial;


var styles = {
  items: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '80px 0',
    width: '1080px',
    margin: '0 auto'
  },
  item: {
    width: '30%',
    padding: '20px 30px 60px',
    marginRight: '5%',
    background: '#fff',
    borderRadius: '6px',
    textAlign: 'center'
  },
  rowLastItem: {
    marginRight: 0
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '40px'
  },
  baseInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  avatar: {
    width: '64px',
    height: '64px'
  },
  name: {
    margin: '10px 0 0',
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
module.exports = exports['default'];