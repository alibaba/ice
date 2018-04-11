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

var Step = require('@icedesign/base/lib/step');

var Button = require('@icedesign/base/lib/button');

var StepItem = Step.Item;
var ButtonGroup = Button.Group;
var SimpleStep = (_temp = _class = function (_Component) {
  _inherits(SimpleStep, _Component);

  function SimpleStep(props) {
    _classCallCheck(this, SimpleStep);

    var _this = _possibleConstructorReturn(this, (SimpleStep.__proto__ || Object.getPrototypeOf(SimpleStep)).call(this, props));

    _this.next = function () {
      var s = _this.state.currentStep + 1;

      _this.setState({
        currentStep: s > 6 ? 6 : s
      });
    };

    _this.prev = function () {
      var s = _this.state.currentStep - 1;

      _this.setState({
        currentStep: s < 0 ? 0 : s
      });
    };

    _this.onClick = function (currentStep) {
      console.log(currentStep);

      _this.setState({
        currentStep: currentStep
      });
    };

    _this.state = {
      currentStep: 3
    };
    return _this;
  }

  _createClass(SimpleStep, [{
    key: 'render',
    value: function render() {
      var currentStep = this.state.currentStep;


      return _react2.default.createElement(
        _container2.default,
        { title: '\u6B65\u9AA4\u6761' },
        _react2.default.createElement(
          Step,
          { current: currentStep },
          _react2.default.createElement(StepItem, { title: '\u6B65\u9AA41', onClick: this.onClick }),
          _react2.default.createElement(StepItem, { title: '\u6B65\u9AA42', onClick: this.onClick }),
          _react2.default.createElement(StepItem, { title: '\u6B65\u9AA43', onClick: this.onClick }),
          _react2.default.createElement(StepItem, { title: '\u6B65\u9AA44', onClick: this.onClick }),
          _react2.default.createElement(StepItem, { title: '\u6B65\u9AA45', onClick: this.onClick }),
          _react2.default.createElement(StepItem, { title: '\u6B65\u9AA46', onClick: this.onClick })
        ),
        _react2.default.createElement(
          'div',
          { style: styles.buttonGroup },
          _react2.default.createElement(
            ButtonGroup,
            null,
            _react2.default.createElement(
              Button,
              {
                onClick: this.prev,
                type: 'primary',
                disabled: currentStep === 0
              },
              '\u4E0A\u4E00\u6B65'
            ),
            _react2.default.createElement(
              Button,
              {
                onClick: this.next,
                type: 'primary',
                disabled: currentStep === 5
              },
              '\u4E0B\u4E00\u6B65'
            )
          )
        )
      );
    }
  }]);

  return SimpleStep;
}(_react.Component), _class.displayName = 'SimpleStep', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = SimpleStep;


var styles = {
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    margin: '40px 0 20px'
  }
};
module.exports = exports['default'];