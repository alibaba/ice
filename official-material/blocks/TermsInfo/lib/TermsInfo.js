import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Button from '@icedesign/base/lib/button';
import _Checkbox from '@icedesign/base/lib/checkbox';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
var TermsInfo = (_temp = _class = function (_Component) {
  _inherits(TermsInfo, _Component);

  function TermsInfo(props) {
    _classCallCheck(this, TermsInfo);

    var _this = _possibleConstructorReturn(this, (TermsInfo.__proto__ || _Object$getPrototypeOf(TermsInfo)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(TermsInfo, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        IceContainer,
        null,
        React.createElement(
          'h1',
          { style: styles.title },
          '\u6DD8\u5B9D\u8FBE\u4EBA\u5408\u4F5C\u534F\u8BAE'
        ),
        React.createElement(
          'div',
          { style: styles.content },
          React.createElement(
            'p',
            { style: styles.desc },
            '\u9274\u4E8E\u6DD8\u5B9D\u7F51\u63D0\u4F9B\u7684\u4FE1\u606F\u53D1\u5E03\u670D\u52A1\u5C5E\u4E8E\u7535\u5B50\u516C\u544A\u724C\uFF08BBS\uFF09\u6027\u8D28\uFF0C\u6DD8\u5B9D\u7F51\u4E0A\u7684\u5E97\u94FA\u3001\u5546\u54C1\u4FE1\u606F\uFF08\u5305\u62EC\u4F46\u4E0D\u9650\u4E8E\u5E97\u94FA\u540D\u79F0\u3001\u516C\u53F8\u540D\u79F0\u3001 \u8054\u7CFB\u4EBA\u53CA\u8054\u7EDC\u4FE1\u606F\u3001\u4EA7\u54C1\u7684\u63CF\u8FF0\u548C\u8BF4\u660E\u3001\u76F8\u5173\u56FE\u7247\u3001\u89C6\u9891\u7B49\uFF09\u7531\u7528\u6237\u81EA\u884C\u63D0\u4F9B\u5E76\u4E0A\u4F20\uFF0C\u7531\u7528\u6237\u5BF9\u5176\u63D0\u4F9B\u5E76\u4E0A\u4F20\u7684\u4FE1\u606F\u627F\u62C5\u76F8\u5E94\u6CD5\u5F8B\u8D23\u4EFB \u6DD8\u5B9D\u7F51\u670D\u52A1\u63D0\u4F9B\u8005\u5BF9\u6B64\u53E6\u6709\u7EA6\u5B9A\u7684\uFF0C\u5C06\u5728\u76F8\u5173\u7684\u534F\u8BAE\u6216\u5176\u4ED6\u6CD5\u5F8B\u6587\u672C\u4E2D\u4E0E\u60A8\u8FDB\u884C\u660E\u786E\u3002'
          ),
          React.createElement(
            'p',
            { style: styles.desc },
            '\u6211\u4EEC\u5C0A\u91CD\u77E5\u8BC6\u4EA7\u6743\uFF0C\u53CD\u5BF9\u5E76\u6253\u51FB\u4FB5\u72AF\u77E5\u8BC6\u4EA7\u6743\u7684\u884C\u4E3A\u3002\u77E5\u8BC6\u4EA7\u6743\u6743\u5229\u4EBA\u82E5\u8BA4\u4E3A\u6DD8\u5B9D\u7F51\u5185\u5BB9\uFF08\u5305\u62EC\u4F46\u4E0D\u9650\u4E8E\u6DD8\u5B9D\u7F51\u7528\u6237\u53D1\u5E03\u7684\u5546\u54C1\u4FE1\u606F\uFF09 \u4FB5\u72AF\u5176\u5408\u6CD5\u6743\u76CA\u7684\uFF0C\u53EF\u4EE5\u901A\u8FC7\u963F\u91CC\u5DF4\u5DF4\u77E5\u8BC6\u4EA7\u6743\u4FDD\u62A4\u5E73\u53F0\uFF08https://ipp.alibabagroup.com/\uFF09\u8FDB\u884C\u6295\u8BC9\uFF0C\u6211\u4EEC\u5C06\u5728\u6536\u5230\u77E5\u8BC6 \u4EA7\u6743\u6743\u5229\u4EBA\u5408\u683C\u901A\u77E5\u540E\u4F9D\u636E\u76F8\u5E94\u7684\u6CD5\u5F8B\u6CD5\u89C4\u4EE5\u53CA\u5E73\u53F0\u89C4\u5219\u53CA\u65F6\u5904\u7406\u3002'
          ),
          React.createElement(
            'p',
            { style: styles.desc },
            '\u5E7F\u544A\u3001\u5206\u6790\u670D\u52A1\u7C7B\u7684\u6388\u6743\u5408\u4F5C\u4F19\u4F34\u3002\u9664\u975E\u5F97\u5230\u60A8\u7684\u8BB8\u53EF\uFF0C\u5426\u5219\u6211\u4EEC\u4E0D\u4F1A\u5C06\u60A8\u7684\u4E2A\u4EBA\u8EAB\u4EFD\u4FE1\u606F\uFF08\u6307\u53EF\u4EE5\u8BC6\u522B\u60A8\u8EAB\u4EFD\u7684\u4FE1\u606F\uFF0C\u4F8B\u5982\u59D3\u540D\u6216 \u7535\u5B50\u90AE\u7BB1\uFF0C\u901A\u8FC7\u8FD9\u4E9B\u4FE1\u606F\u53EF\u4EE5\u8054\u7CFB\u5230\u60A8\u6216\u8BC6\u522B\u60A8\u7684\u8EAB\u4EFD\uFF09\u4E0E\u63D0\u4F9B\u5E7F\u544A\u3001\u5206\u6790\u670D\u52A1\u7684\u5408\u4F5C\u4F19\u4F34\u5171\u4EAB\u3002\u6211\u4EEC\u4F1A\u5411\u8FD9\u4E9B\u5408\u4F5C\u4F19\u4F34\u63D0\u4F9B\u6709\u5173\u5176 \u5E7F\u544A\u8986\u76D6\u9762\u548C\u6709\u6548\u6027\u7684\u4FE1\u606F\uFF0C\u800C\u4E0D\u4F1A\u63D0\u4F9B\u60A8\u7684\u4E2A\u4EBA\u8EAB\u4EFD\u4FE1\u606F\uFF0C\u6216\u8005\u6211\u4EEC\u5C06\u8FD9\u4E9B\u4FE1\u606F\u8FDB\u884C\u6C47\u603B\uFF0C\u4EE5\u4FBF\u5B83\u4E0D\u4F1A\u8BC6\u522B\u60A8\u4E2A\u4EBA\u3002\u4F8B\u5982\uFF0C\u53EA\u6709\u5728\u5E7F \u544A\u4E3B\u540C\u610F\u9075\u5B88\u6211\u4EEC\u7684\u5E7F\u544A\u53D1\u5E03\u51C6\u5219\u540E\uFF0C\u6211\u4EEC\u624D\u53EF\u80FD\u4F1A\u544A\u8BC9\u5E7F\u544A\u4E3B\u4ED6\u4EEC\u5E7F\u544A\u7684\u6548\u679C\u5982\u4F55\uFF0C\u6216\u8005\u6709\u591A\u5C11\u4EBA\u770B\u4E86\u4ED6\u4EEC\u5E7F\u544A\u6216\u5728\u770B\u5230\u5E7F\u544A\u540E\u5B89 \u88C5\u4E86\u5E94\u7528\uFF0C\u6216\u8005\u5411\u8FD9\u4E9B\u5408\u4F5C\u4F19\u4F34\u63D0\u4F9B\u4E0D\u80FD\u8BC6\u522B\u4E2A\u4EBA\u8EAB\u4EFD\u7684\u7EDF\u8BA1\u4FE1\u606F\uFF08\u4F8B\u5982\u201C\u7537\u6027\uFF0C25-29\u5C81\uFF0C\u4F4D\u4E8E\u5317\u4EAC\u201D\uFF09\uFF0C\u5E2E\u52A9\u4ED6\u4EEC\u4E86\u89E3\u5176\u53D7\u4F17\u6216\u987E\u5BA2\u3002'
          ),
          React.createElement(
            'p',
            { style: styles.desc },
            '\u6211\u4EEC\u5DF2\u91C7\u53D6\u7B26\u5408\u4E1A\u754C\u6807\u51C6\u3001\u5408\u7406\u53EF\u884C\u7684\u5B89\u5168\u9632\u62A4\u63AA\u65BD\u4FDD\u62A4\u60A8\u63D0\u4F9B\u7684\u4E2A\u4EBA\u4FE1\u606F\u5B89\u5168\uFF0C\u9632\u6B62\u4E2A\u4EBA\u4FE1\u606F\u906D\u5230\u672A\u7ECF\u6388\u6743\u8BBF\u95EE\u3001\u516C\u5F00\u62AB\u9732\u3001\u4F7F\u7528\u3001\u4FEE \u6539\u3001\u635F\u574F\u6216\u4E22\u5931\u3002\u4F8B\u5982\uFF0C\u5728\u60A8\u7684\u6D4F\u89C8\u5668\u4E0E\u670D\u52A1\u5668\u4E4B\u95F4\u4EA4\u6362\u6570\u636E\uFF08\u5982\u4FE1\u7528\u5361\u4FE1\u606F\uFF09\u65F6\u53D7 SSL\uFF08Secure Socket Layer\uFF09\u534F\u8BAE\u52A0\u5BC6\u4FDD\u62A4\uFF1B \u6211\u4EEC\u540C\u65F6\u5BF9\u6DD8\u5B9D\u7F51\u7F51\u7AD9\u63D0\u4F9BHTTPS\uFF08Hyper Text Transfer Protocol over Secure Socket Layer\uFF09\u534F\u8BAE\u5B89\u5168\u6D4F\u89C8\u65B9\u5F0F'
          )
        ),
        React.createElement(
          'p',
          null,
          React.createElement(
            _Checkbox,
            null,
            '\u6211\u540C\u610F\u300A\u6DD8\u5B9D\u8FBE\u4EBA\u5408\u4F5C\u534F\u8BAE\u300B'
          )
        ),
        React.createElement(
          'div',
          { style: styles.btn },
          React.createElement(
            _Button,
            { type: 'primary', size: 'large' },
            '\u786E\u8BA4\u5F00\u901A'
          )
        )
      );
    }
  }]);

  return TermsInfo;
}(Component), _class.displayName = 'TermsInfo', _temp);
export { TermsInfo as default };


var styles = {
  desc: {
    fontSize: '13px',
    lineHeight: '28px'
  },
  title: {
    textAlign: 'center',
    margin: 0,
    paddingBottom: '20px',
    fontSize: '20px',
    borderBottom: '1px solid #dedede'
  },
  content: {
    color: '#666',
    fontSize: '16px',
    padding: '20px 0',
    borderBottom: '1px solid #dedede'
  },
  btn: {
    textAlign: 'center'
  }
};