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

var _container = require('@icedesign/container');

var _container2 = _interopRequireDefault(_container);

var _enquireJs = require('enquire-js');

var _Video = require('./Video');

var _Video2 = _interopRequireDefault(_Video);

var _VideoList = require('./VideoList');

var _VideoList2 = _interopRequireDefault(_VideoList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = require('@icedesign/base/lib/grid');

var Col = Grid.Col,
    Row = Grid.Row;
var SimpleVideoPlayer = (_temp = _class = function (_Component) {
  _inherits(SimpleVideoPlayer, _Component);

  function SimpleVideoPlayer(props) {
    _classCallCheck(this, SimpleVideoPlayer);

    var _this = _possibleConstructorReturn(this, (SimpleVideoPlayer.__proto__ || Object.getPrototypeOf(SimpleVideoPlayer)).call(this, props));

    _this.enquireScreenRegister = function () {
      var mediaCondition = 'only screen and (max-width: 720px)';

      (0, _enquireJs.enquireScreen)(function (mobile) {
        _this.setState({
          isMobile: mobile
        });
      }, mediaCondition);
    };

    _this.switchVideo = function (selectVideo) {
      _this.setState({
        reloadVideo: true,
        currentVideo: selectVideo
      });
      // 每次切换 video 需要将 video 标签彻底销毁重新渲染，否则不会生效
      setTimeout(function () {
        _this.setState({
          reloadVideo: false
        });
      }, 100);
    };

    _this.state = {
      isMobile: false,
      currentVideo: {
        poster: 'https://img.alicdn.com/tfs/TB15B7LfeuSBuNjy1XcXXcYjFXa-596-356.png',
        title: '这里是示例视频1的视频标题',
        duration: '10:54',
        sources: [{
          src: '//cloud.video.taobao.com/play/u/435682200/p/2/e/6/t/1/50033572083.mp4',
          type: 'video/mp4'
        }]
      },
      videoLists: mockVideoData
    };
    return _this;
  }

  _createClass(SimpleVideoPlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.enquireScreenRegister();
    }
  }, {
    key: 'render',
    value: function render() {
      var isMobile = this.state.isMobile;

      return _react2.default.createElement(
        'div',
        { className: 'simple-video-player' },
        _react2.default.createElement(
          _container2.default,
          null,
          _react2.default.createElement(
            Row,
            { gutter: 20, wrap: true },
            _react2.default.createElement(
              Col,
              { m: '16', xxs: '24' },
              _react2.default.createElement(
                'div',
                {
                  style: _extends({}, styles.videoWrapper, isMobile ? styles.videoWrapperMobile : {})
                },
                !this.state.reloadVideo && _react2.default.createElement(_Video2.default, _extends({}, this.state.currentVideo, {
                  style: _extends({}, styles.video, isMobile ? styles.videoMobile : {})
                }))
              )
            ),
            _react2.default.createElement(
              Col,
              { m: '8', xxs: '24' },
              _react2.default.createElement(_VideoList2.default, {
                currentVideo: this.state.currentVideo,
                list: this.state.videoLists,
                onClick: this.switchVideo
              })
            )
          )
        )
      );
    }
  }]);

  return SimpleVideoPlayer;
}(_react.Component), _class.displayName = 'SimpleVideoPlayer', _class.propTypes = {}, _class.defaultProps = {}, _temp);
exports.default = SimpleVideoPlayer;


var styles = {
  videoWrapper: {
    width: '100%',
    background: '#000',
    height: 500
  },
  videoWrapperMobile: {
    height: 300,
    marginBottom: 20
  },
  video: {
    width: '100%',
    height: 300
  },
  videoMobile: {
    height: 300
  }
};

var mockVideoData = [{
  poster: 'https://img.alicdn.com/tfs/TB15B7LfeuSBuNjy1XcXXcYjFXa-596-356.png',
  title: '这里是示例视频1的视频标题',
  duration: '10:54',
  sources: [{
    src: '//cloud.video.taobao.com/play/u/435682200/p/2/e/6/t/1/50033572083.mp4',
    type: 'video/mp4'
  }]
}, {
  poster: 'https://img.alicdn.com/tfs/TB1Z8MnfmCWBuNjy0FhXXb6EVXa-593-389.png',
  title: '这里是示例视频2的视频标题',
  duration: '03:54',
  sources: [{
    src: '//cloud.video.taobao.com/play/u/435682200/p/2/e/6/t/1/50069942168.mp4',
    type: 'video/mp4'
  }]
}, {
  poster: 'https://img.alicdn.com/tfs/TB15B7LfeuSBuNjy1XcXXcYjFXa-596-356.png',
  title: '这里是示例视频3的视频标题',
  duration: '10:54',
  sources: [{
    src: '//cloud.video.taobao.com/play/u/435682200/p/2/e/6/t/1/50033572083.mp4',
    type: 'video/mp4'
  }]
}, {
  poster: 'https://img.alicdn.com/tfs/TB1Z8MnfmCWBuNjy0FhXXb6EVXa-593-389.png',
  title: '这里是示例视频4的视频标题',
  duration: '03:54',
  sources: [{
    src: '//cloud.video.taobao.com/play/u/435682200/p/2/e/6/t/1/50069942168.mp4',
    type: 'video/mp4'
  }]
}];
module.exports = exports['default'];