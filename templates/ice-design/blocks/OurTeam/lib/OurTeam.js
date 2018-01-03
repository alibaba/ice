'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _card = require('@icedesign/card');

var _card2 = _interopRequireDefault(_card);

require('./OurTeam.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var generatorData = function generatorData(count) {
  return Array.from({ length: count }).map(function (item, index) {
    return {
      name: '\u6210\u5458' + (index + 1),
      description: '描述文案描述文案描述文案描述文案描述文案',
      imgUrl: 'https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png'
    };
  });
};

var OurTeam = (_temp = _class = function (_Component) {
  _inherits(OurTeam, _Component);

  function OurTeam(props) {
    _classCallCheck(this, OurTeam);

    var _this = _possibleConstructorReturn(this, (OurTeam.__proto__ || Object.getPrototypeOf(OurTeam)).call(this, props));

    _this.state = {};
    return _this;
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期


  _createClass(OurTeam, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {}
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      var data = generatorData(4);
      return _react2.default.createElement(
        'div',
        { className: 'our-team', style: styles.ourTeam },
        _react2.default.createElement(
          _card2.default,
          null,
          _react2.default.createElement(
            'div',
            { style: styles.head },
            _react2.default.createElement(
              'h2',
              { style: styles.title },
              '\u6211\u4EEC\u7684\u56E2\u961F'
            ),
            _react2.default.createElement(
              'p',
              { style: styles.intro },
              '\u6211\u4EEC\u662F\u4E00\u652F\u5145\u6EE1\u6FC0\u60C5\u3001\u5FD7\u5411\u8FDC\u5927\u3001\u6000\u63E3\u68A6\u60F3\u7684\u56E2\u961F\uFF0C\u4E5F\u662F\u4E00\u4E2A\u601D\u7EF4\u6D3B\u8DC3\u3001\u671D\u6C14\u84EC\u52C3\u3001\u56E2\u7ED3\u4E92\u52A9\u7684\u5927\u5BB6\u5EAD\u3002'
            )
          ),
          _react2.default.createElement(
            'div',
            { style: styles.items },
            data.map(function (item, index) {
              return _react2.default.createElement(
                'div',
                { style: styles.item, key: index },
                _react2.default.createElement('img', { src: item.imgUrl, style: styles.avatar }),
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
                    { style: styles.description },
                    item.description
                  )
                )
              );
            })
          )
        )
      );
    }
  }]);

  return OurTeam;
}(_react.Component), _class.displayName = 'OurTeam', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = OurTeam;


var styles = {
  head: { width: '50%', margin: '0 auto' },
  title: { textAlign: 'center', fontSize: '28px' },
  intro: { textAlign: 'center' },
  items: { display: 'flex', flexWrap: 'wrap' },
  item: { display: 'flex', width: '50%', padding: '0 40px', margin: '40px 0' },
  baseInfo: { display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '25px' },
  name: {
    fontWeight: 'bold',
    margin: '0 0 10px',
    fontSize: '15px'
  },
  description: { margin: 0 },
  avatar: { width: '150px', height: '150px' },
  ourTeam: {}
};
module.exports = exports['default'];