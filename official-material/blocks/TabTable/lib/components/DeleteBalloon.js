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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = require('@icedesign/base/lib/button');

var Balloon = require('@icedesign/base/lib/balloon');

var DeleteBalloon = (_temp = _class = function (_Component) {
  _inherits(DeleteBalloon, _Component);

  function DeleteBalloon(props) {
    _classCallCheck(this, DeleteBalloon);

    var _this = _possibleConstructorReturn(this, (DeleteBalloon.__proto__ || Object.getPrototypeOf(DeleteBalloon)).call(this, props));

    _this.handleHide = function (visible, code) {
      if (code === 1) {
        _this.props.handleRemove();
      }
      _this.setState({
        visible: false
      });
    };

    _this.handleVisible = function (visible) {
      _this.setState({ visible: visible });
    };

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(DeleteBalloon, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var visibleTrigger = _react2.default.createElement(
        Button,
        { size: 'small', type: 'secondary', shape: 'warning' },
        '\u5220\u9664'
      );

      var content = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: styles.contentText },
          '\u786E\u8BA4\u5220\u9664\uFF1F'
        ),
        _react2.default.createElement(
          Button,
          {
            id: 'confirmBtn',
            size: 'small',
            type: 'normal',
            shape: 'warning',
            style: { marginRight: '5px' },
            onClick: function onClick(visible) {
              return _this2.handleHide(visible, 1);
            }
          },
          '\u786E\u8BA4'
        ),
        _react2.default.createElement(
          Button,
          {
            id: 'cancelBtn',
            size: 'small',
            onClick: function onClick(visible) {
              return _this2.handleHide(visible, 0);
            }
          },
          '\u5173\u95ED'
        )
      );

      return _react2.default.createElement(
        Balloon,
        {
          trigger: visibleTrigger,
          triggerType: 'click',
          visible: this.state.visible,
          onVisibleChange: this.handleVisible
        },
        content
      );
    }
  }]);

  return DeleteBalloon;
}(_react.Component), _class.propTypes = {
  handleRemove: _propTypes2.default.func
}, _class.defaultProps = {
  handleRemove: function handleRemove() {}
}, _temp);
exports.default = DeleteBalloon;


var styles = {
  contentText: {
    padding: '5px 0 15px'
  }
};
module.exports = exports['default'];