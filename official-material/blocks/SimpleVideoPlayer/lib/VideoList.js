'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _img = require('@icedesign/img');

var _img2 = _interopRequireDefault(_img);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoList = function (_Component) {
  _inherits(VideoList, _Component);

  function VideoList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, VideoList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VideoList.__proto__ || Object.getPrototypeOf(VideoList)).call.apply(_ref, [this].concat(args))), _this), _this.switchVideo = function (video) {
      if (_this.props.onClick) {
        _this.props.onClick(video);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(VideoList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          list = _props.list,
          currentVideo = _props.currentVideo;


      return _react2.default.createElement(
        'div',
        { style: styles.videoList },
        list.length > 0 ? list.map(function (item, index) {
          var isCurrentVideo = JSON.stringify(item) === JSON.stringify(currentVideo);

          return _react2.default.createElement(
            'div',
            {
              key: index,
              style: _extends({}, styles.videoItem, isCurrentVideo ? styles.activeVideoItem : {}),
              onClick: _this2.switchVideo.bind(_this2, item)
            },
            _react2.default.createElement(
              'div',
              { style: styles.poster },
              _react2.default.createElement(_img2.default, {
                src: item.poster,
                width: 168,
                height: 94,
                type: 'cover'
              })
            ),
            _react2.default.createElement(
              'div',
              { style: styles.content },
              _react2.default.createElement(
                'div',
                { style: styles.videoTitle },
                item.title
              ),
              _react2.default.createElement(
                'div',
                { style: styles.videoDuration },
                item.duration
              )
            )
          );
        }) : null
      );
    }
  }]);

  return VideoList;
}(_react.Component);

exports.default = VideoList;


var styles = {
  videoList: {
    maxHeight: 500,
    overflowY: 'auto'
  },
  videoItem: {
    display: 'flex',
    marginBottom: 8,
    cursor: 'pointer'
  },
  activeVideoItem: {
    fontWeight: 'bold'
  },
  poster: {
    marginRight: 8
  },
  videoTitle: {
    fontSize: '16px',
    lineHeight: '24px',
    marginTop: '8px'
  },
  videoDuration: {
    marginTop: '8px'
  }
};
module.exports = exports['default'];