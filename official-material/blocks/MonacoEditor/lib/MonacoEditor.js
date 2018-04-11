import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Promise from 'babel-runtime/core-js/promise';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import Monaco from 'react-monaco-editor';
import 'regenerator-runtime/runtime';
import './MonacoEditor.scss';

function getScript(uri) {
  return new _Promise(function (resolve, reject) {
    var el = document.createElement('script');
    el.type = 'text/javascript';
    var head = document.head || document.head.getElementsByTagName('head')[0];
    el.onerror = function onerror(e) {
      reject(new URIError(uri + ' could not be loaded'), e);
    };
    el.onload = function onload(e) {
      resolve({ uri: uri, event: e });
    };
    head.appendChild(el);
    el.src = uri;
  });
}

var MonacoEditor = (_temp = _class = function (_Component) {
  _inherits(MonacoEditor, _Component);

  function MonacoEditor(props) {
    _classCallCheck(this, MonacoEditor);

    var _this = _possibleConstructorReturn(this, (MonacoEditor.__proto__ || _Object$getPrototypeOf(MonacoEditor)).call(this, props));

    _this.onChange = function (newValue, e) {
      console.log('onChange', newValue, e);
    };

    _this.editorDidMount = function (editor) {
      console.log('editorDidMount', editor);
      editor.focus();
    };

    _this.state = {
      monacoReady: false
    };
    return _this;
  }

  // ICE: React Component 的生命周期


  _createClass(MonacoEditor, [{
    key: 'componentWillMount',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var vsBasePath, monacoRequire;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                vsBasePath = 'https://cdn.bootcss.com/monaco-editor/0.10.1/min/vs';

                if (window.require) {
                  _context.next = 4;
                  break;
                }

                _context.next = 4;
                return getScript(vsBasePath + '/loader.js');

              case 4:
                monacoRequire = window.require;

                monacoRequire.config({ paths: { vs: vsBasePath } });
                // monaco editor 的跨域解决方案：https://github.com/Microsoft/monaco-editor#integrate-cross-domain
                window.MonacoEnvironment = {
                  getWorkerUrl: function getWorkerUrl() {
                    return '/monaco-editor-worker-loader-proxy.js';
                  }
                };
                monacoRequire(['vs/editor/editor.main'], function () {
                  _this2.setState({
                    monacoReady: true
                  });
                });

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentWillMount() {
        return _ref.apply(this, arguments);
      }

      return componentWillMount;
    }()
  }, {
    key: 'render',
    value: function render() {
      var code = 'console.log(\'hello world\');\n\nfunction foo() {\n  // hello world\n}\n';
      var options = {
        selectOnLineNumbers: true,
        automaticLayout: true
      };
      var monacoReady = this.state.monacoReady;


      return React.createElement(
        'div',
        {
          className: 'monaco-editor-container',
          style: styles.monacoEditorContainer
        },
        React.createElement(
          IceContainer,
          { style: styles.container },
          monacoReady ? React.createElement(Monaco, {
            height: '600',
            language: 'javascript',
            theme: 'vs-dark',
            value: code,
            options: options,
            onChange: this.onChange,
            editorDidMount: this.editorDidMount
          }) : 'loading...'
        )
      );
    }
  }]);

  return MonacoEditor;
}(Component), _class.displayName = 'MonacoEditor', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { MonacoEditor as default };


var styles = {
  container: { overflow: 'hidden', position: 'relative' },
  monacoEditorContainer: {}
};