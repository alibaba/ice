'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _container = require('@icedesign/container');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Progress = require('@icedesign/base/lib/progress');

var Grid = require('@icedesign/base/lib/grid');

var Row = Grid.Row,
    Col = Grid.Col;
var CircleProgress = (_temp = _class = function (_Component) {
  _inherits(CircleProgress, _Component);

  function CircleProgress(props) {
    _classCallCheck(this, CircleProgress);

    var _this = _possibleConstructorReturn(this, (CircleProgress.__proto__ || Object.getPrototypeOf(CircleProgress)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(CircleProgress, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _container2.default,
        { title: '\u9879\u76EE\u8FDB\u5EA6' },
        _react2.default.createElement(
          Row,
          { wrap: true },
          _react2.default.createElement(
            Col,
            { xxs: '12', s: '6', l: '6' },
            _react2.default.createElement(
              'div',
              { style: styles.item },
              _react2.default.createElement(Progress, {
                percent: 10,
                shape: 'circle',
                state: 'error',
                size: 'large'
              }),
              _react2.default.createElement(
                'h6',
                { style: styles.title },
                '\u9879\u76EEA'
              )
            )
          ),
          _react2.default.createElement(
            Col,
            { xxs: '12', s: '6', l: '6' },
            _react2.default.createElement(
              'div',
              { style: styles.item },
              _react2.default.createElement(Progress, { percent: 50, shape: 'circle', size: 'large' }),
              _react2.default.createElement(
                'h6',
                { style: styles.title },
                '\u9879\u76EEB'
              )
            )
          ),
          _react2.default.createElement(
            Col,
            { xxs: '12', s: '6', l: '6' },
            _react2.default.createElement(
              'div',
              { style: styles.item },
              _react2.default.createElement(Progress, { percent: 50, shape: 'circle', size: 'large' }),
              _react2.default.createElement(
                'h6',
                { style: styles.title },
                '\u9879\u76EEC'
              )
            )
          ),
          _react2.default.createElement(
            Col,
            { xxs: '12', s: '6', l: '6' },
            _react2.default.createElement(
              'div',
              { style: styles.item },
              _react2.default.createElement(Progress, {
                percent: 100,
                shape: 'circle',
                state: 'success',
                size: 'large'
              }),
              _react2.default.createElement(
                'h6',
                { style: styles.title },
                '\u9879\u76EED'
              )
            )
          )
        )
      );
    }
  }]);

  return CircleProgress;
}(_react.Component), _class.displayName = 'CircleProgress', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = CircleProgress;


var styles = {
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  title: {
    marginTop: 20
  }
};
module.exports = exports['default'];