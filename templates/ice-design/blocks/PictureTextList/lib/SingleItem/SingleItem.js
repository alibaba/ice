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

var _img = require('@icedesign/img');

var _img2 = _interopRequireDefault(_img);

require('./SingleItem.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SingleItem = (_temp = _class = function (_Component) {
  _inherits(SingleItem, _Component);

  function SingleItem() {
    _classCallCheck(this, SingleItem);

    return _possibleConstructorReturn(this, (SingleItem.__proto__ || Object.getPrototypeOf(SingleItem)).apply(this, arguments));
  }

  _createClass(SingleItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          _props$className = _props.className,
          className = _props$className === undefined ? '' : _props$className,
          active = _props.active,
          title = _props.title,
          image = _props.image,
          price = _props.price,
          extra = _props.extra;

      return _react2.default.createElement(
        'div',
        { className: className + ' single-item',
          style: _extends({}, style, {
            width: '165px',
            height: '230px',
            cursor: 'pointer',
            borderRadius: '4px',
            backgroundColor: active ? '#f4f4f4' : undefined
          })
        },
        _react2.default.createElement(_img2.default, {
          src: image,
          width: 149,
          height: 149,
          style: { margin: '8px' }
        }),
        _react2.default.createElement(
          'div',
          { style: {
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              color: '#999',
              fontSize: '12px',
              lineHeight: '18px',
              margin: '0 14px'
            }
          },
          title
        ),
        _react2.default.createElement(
          'div',
          { style: {
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              color: '#999',
              lineHeight: '18px',
              fontSize: '12px',
              margin: '0 14px'
            }
          },
          price
        ),
        _react2.default.createElement(
          'div',
          { style: {
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              lineHeight: '18px',
              color: '#C0C0C0',
              fontSize: '12px',
              margin: '0 14px'
            }
          },
          extra
        )
      );
    }
  }]);

  return SingleItem;
}(_react.Component), _class.displayName = 'SingleItem', _temp);
exports.default = SingleItem;
module.exports = exports['default'];