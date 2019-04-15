(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ 1178:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1179:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1180:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1181:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 659:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/progress/index.js
var progress = __webpack_require__(125);
var progress_default = /*#__PURE__*/__webpack_require__.n(progress);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/dialog/index.js
var dialog = __webpack_require__(24);
var dialog_default = /*#__PURE__*/__webpack_require__.n(dialog);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/button/index.js
var lib_button = __webpack_require__(65);
var button_default = /*#__PURE__*/__webpack_require__.n(lib_button);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/feedback/index.js
var feedback = __webpack_require__(26);
var feedback_default = /*#__PURE__*/__webpack_require__.n(feedback);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/tab/index.js
var tab = __webpack_require__(674);
var tab_default = /*#__PURE__*/__webpack_require__.n(tab);

// EXTERNAL MODULE: ./renderer/node_modules/mobx-react/index.module.js
var index_module = __webpack_require__(81);

// EXTERNAL MODULE: external "window.React"
var external_window_React_ = __webpack_require__(1);
var external_window_React_default = /*#__PURE__*/__webpack_require__.n(external_window_React_);

// EXTERNAL MODULE: external "electron"
var external_electron_ = __webpack_require__(4);

// EXTERNAL MODULE: ./renderer/src/components/Block/Panel.jsx
var Panel = __webpack_require__(687);

// EXTERNAL MODULE: ./renderer/src/components/EmptyTips/index.jsx
var EmptyTips = __webpack_require__(663);

// EXTERNAL MODULE: ./renderer/src/components/Link.jsx
var Link = __webpack_require__(63);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/input/index.js
var input = __webpack_require__(664);
var input_default = /*#__PURE__*/__webpack_require__.n(input);

// CONCATENATED MODULE: ./renderer/src/components/Block/CustomBlockForm.jsx


var _dec, _class, _temp;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



/**
 * 模板生成表单项目
 */

var CustomBlockForm_CustomBlockForm = (_dec = Object(index_module["b" /* inject */])('customBlocks'), _dec(_class = Object(index_module["c" /* observer */])(_class = (_temp =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomBlockForm, _Component);

  function CustomBlockForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CustomBlockForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CustomBlockForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.changeBlockName = function (value) {
      _this.props.customBlocks.setBlockName(value);
    };

    _this.changeBlockAlias = function (value) {
      _this.props.customBlocks.setBlockAlias(value);
    };

    return _this;
  }

  _createClass(CustomBlockForm, [{
    key: "render",
    value: function render() {
      return external_window_React_default.a.createElement("div", {
        className: "project-config-form"
      }, external_window_React_default.a.createElement("div", {
        className: "project-config-form-item"
      }, external_window_React_default.a.createElement("h3", {
        style: {
          margin: 0
        }
      }, external_window_React_default.a.createElement("span", {
        style: {
          color: 'red'
        }
      }, "*"), " \u533A\u5757\u540D\uFF1A"), external_window_React_default.a.createElement(input_default.a, {
        ref: "name",
        placeholder: '字母数字中下划线组合 (必填)',
        value: this.props.customBlocks.blockName,
        onChange: this.changeBlockName
      }), external_window_React_default.a.createElement("div", {
        className: "project-config-form-item-error-message"
      }, this.props.customBlocks.blockNameValidation)), external_window_React_default.a.createElement("div", {
        className: "project-config-form-item"
      }, external_window_React_default.a.createElement("h3", {
        style: {
          margin: 0
        }
      }, "\u533A\u5757\u522B\u540D\uFF1A"), external_window_React_default.a.createElement(input_default.a, {
        placeholder: '可输入中文 (选填)',
        value: this.props.customBlocks.blockAlias,
        onChange: this.changeBlockAlias
      })));
    }
  }]);

  return CustomBlockForm;
}(external_window_React_["Component"]), _temp)) || _class) || _class);

// EXTERNAL MODULE: ./renderer/src/components/Block/CustomBlockPanel.scss
var Block_CustomBlockPanel = __webpack_require__(1178);

// CONCATENATED MODULE: ./renderer/src/components/Block/CustomBlockPanel.jsx



var CustomBlockPanel_dec, CustomBlockPanel_class, CustomBlockPanel_temp;

function CustomBlockPanel_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { CustomBlockPanel_typeof = function _typeof(obj) { return typeof obj; }; } else { CustomBlockPanel_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return CustomBlockPanel_typeof(obj); }

function CustomBlockPanel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function CustomBlockPanel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function CustomBlockPanel_createClass(Constructor, protoProps, staticProps) { if (protoProps) CustomBlockPanel_defineProperties(Constructor.prototype, protoProps); if (staticProps) CustomBlockPanel_defineProperties(Constructor, staticProps); return Constructor; }

function CustomBlockPanel_possibleConstructorReturn(self, call) { if (call && (CustomBlockPanel_typeof(call) === "object" || typeof call === "function")) { return call; } return CustomBlockPanel_assertThisInitialized(self); }

function CustomBlockPanel_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function CustomBlockPanel_getPrototypeOf(o) { CustomBlockPanel_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return CustomBlockPanel_getPrototypeOf(o); }

function CustomBlockPanel_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) CustomBlockPanel_setPrototypeOf(subClass, superClass); }

function CustomBlockPanel_setPrototypeOf(o, p) { CustomBlockPanel_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return CustomBlockPanel_setPrototypeOf(o, p); }




var Toast = feedback_default.a.toast;
var CustomBlockPanel_CustomBlockPanel = (CustomBlockPanel_dec = Object(index_module["b" /* inject */])('customBlocks'), CustomBlockPanel_dec(CustomBlockPanel_class = Object(index_module["c" /* observer */])(CustomBlockPanel_class = (CustomBlockPanel_temp =
/*#__PURE__*/
function (_Component) {
  CustomBlockPanel_inherits(CustomBlockPanel, _Component);

  function CustomBlockPanel() {
    var _getPrototypeOf2;

    var _this;

    CustomBlockPanel_classCallCheck(this, CustomBlockPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = CustomBlockPanel_possibleConstructorReturn(this, (_getPrototypeOf2 = CustomBlockPanel_getPrototypeOf(CustomBlockPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.editBlock = function (name) {
      if (_this.operationValidation()) {
        _this.props.customBlocks.editBlock(name);
      }
    };

    _this.renameBlock = function (name) {
      if (_this.operationValidation()) {
        _this.props.customBlocks.renameOpen(name);
      }
    };

    _this.deleteBlock = function (name) {
      if (_this.operationValidation()) {
        _this.props.customBlocks.deleteBlock(name);
      }
    };

    _this.operationValidation = function () {
      if (_this.props.customBlocks.blockEditing) {
        Toast.show({
          type: 'prompt',
          content: '请先关闭正在搭建的区块',
          duration: 1000
        });
        return false;
      } else if (_this.props.customBlocks.dataLoading) {
        _this.props.customBlocks.openProgress();

        return false;
      } else {
        return true;
      }
    };

    return _this;
  }

  CustomBlockPanel_createClass(CustomBlockPanel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var blocks = this.props.blocks;

      if (Object.keys(blocks).length > 0) {
        return Object.keys(blocks).map(function (blockName, index) {
          return external_window_React_default.a.createElement("div", {
            className: "scaffold-item",
            key: index
          }, external_window_React_default.a.createElement("div", {
            className: "scaffold-image"
          }, external_window_React_default.a.createElement("img", {
            src: 'data:image/png;base64,' + _this2.props.customBlocks.getBlockImg(blockName),
            alt: ""
          })), external_window_React_default.a.createElement("div", {
            className: "scaffold-title"
          }, blockName), external_window_React_default.a.createElement("div", {
            className: "scaffold-flipcard"
          }, external_window_React_default.a.createElement("div", {
            className: "scaffold-flipcard-body"
          }, external_window_React_default.a.createElement("h2", null, blockName), external_window_React_default.a.createElement("h3", null, blocks[blockName]['alias']), external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement("p", null, "\u4FEE\u6539\u65F6\u95F4: ", blocks[blockName]['time']))), external_window_React_default.a.createElement("div", {
            className: "scaffold-flipcard-button"
          }, external_window_React_default.a.createElement(button_default.a, {
            size: "small",
            type: "primary",
            onClick: _this2.editBlock.bind(_this2, blockName)
          }, "\u642D\u5EFA"), "\xA0", external_window_React_default.a.createElement(button_default.a, {
            size: "small",
            type: "normal",
            onClick: _this2.renameBlock.bind(_this2, blockName)
          }, "\u91CD\u547D\u540D"), "\xA0", external_window_React_default.a.createElement(button_default.a, {
            size: "small",
            type: "normal",
            onClick: _this2.deleteBlock.bind(_this2, blockName)
          }, "\u5220\u9664"))));
        });
      } else {
        return null;
      }
    }
  }]);

  return CustomBlockPanel;
}(external_window_React_["Component"]), CustomBlockPanel_temp)) || CustomBlockPanel_class) || CustomBlockPanel_class);

// EXTERNAL MODULE: ./renderer/src/components/Icon/index.jsx
var Icon = __webpack_require__(22);

// CONCATENATED MODULE: ./renderer/src/components/Block/Trigger.jsx
var Trigger_dec, Trigger_class, _class2, Trigger_temp;

function Trigger_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Trigger_typeof = function _typeof(obj) { return typeof obj; }; } else { Trigger_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Trigger_typeof(obj); }

function Trigger_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Trigger_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Trigger_createClass(Constructor, protoProps, staticProps) { if (protoProps) Trigger_defineProperties(Constructor.prototype, protoProps); if (staticProps) Trigger_defineProperties(Constructor, staticProps); return Constructor; }

function Trigger_possibleConstructorReturn(self, call) { if (call && (Trigger_typeof(call) === "object" || typeof call === "function")) { return call; } return Trigger_assertThisInitialized(self); }

function Trigger_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Trigger_getPrototypeOf(o) { Trigger_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Trigger_getPrototypeOf(o); }

function Trigger_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Trigger_setPrototypeOf(subClass, superClass); }

function Trigger_setPrototypeOf(o, p) { Trigger_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Trigger_setPrototypeOf(o, p); }




var Trigger_ScaffoldTrigger = (Trigger_dec = Object(index_module["b" /* inject */])('customScaffold', 'scaffold'), Trigger_dec(Trigger_class = Object(index_module["c" /* observer */])(Trigger_class = (Trigger_temp = _class2 =
/*#__PURE__*/
function (_Component) {
  Trigger_inherits(ScaffoldTrigger, _Component);

  function ScaffoldTrigger() {
    Trigger_classCallCheck(this, ScaffoldTrigger);

    return Trigger_possibleConstructorReturn(this, Trigger_getPrototypeOf(ScaffoldTrigger).apply(this, arguments));
  }

  Trigger_createClass(ScaffoldTrigger, [{
    key: "render",
    value: function render() {
      return external_window_React_default.a.createElement("div", {
        className: "scaffold-item",
        style: {
          cursor: 'pointer'
        },
        onClick: this.props.onClick
      }, external_window_React_default.a.createElement("div", {
        className: "scaffold-image",
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "add",
        style: {
          fontSize: 60,
          color: '#297CFF'
        }
      })), external_window_React_default.a.createElement("div", {
        className: "scaffold-title"
      }, "\u65B0\u5EFA\u81EA\u5B9A\u4E49\u533A\u5757"));
    }
  }]);

  return ScaffoldTrigger;
}(external_window_React_["Component"]), _class2.displayName = 'ScaffoldTrigger', Trigger_temp)) || Trigger_class) || Trigger_class);

// CONCATENATED MODULE: ./renderer/src/components/Block/BlockRenameForm.jsx


var BlockRenameForm_dec, BlockRenameForm_class, BlockRenameForm_temp;

function BlockRenameForm_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { BlockRenameForm_typeof = function _typeof(obj) { return typeof obj; }; } else { BlockRenameForm_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return BlockRenameForm_typeof(obj); }

function BlockRenameForm_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function BlockRenameForm_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function BlockRenameForm_createClass(Constructor, protoProps, staticProps) { if (protoProps) BlockRenameForm_defineProperties(Constructor.prototype, protoProps); if (staticProps) BlockRenameForm_defineProperties(Constructor, staticProps); return Constructor; }

function BlockRenameForm_possibleConstructorReturn(self, call) { if (call && (BlockRenameForm_typeof(call) === "object" || typeof call === "function")) { return call; } return BlockRenameForm_assertThisInitialized(self); }

function BlockRenameForm_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function BlockRenameForm_getPrototypeOf(o) { BlockRenameForm_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return BlockRenameForm_getPrototypeOf(o); }

function BlockRenameForm_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) BlockRenameForm_setPrototypeOf(subClass, superClass); }

function BlockRenameForm_setPrototypeOf(o, p) { BlockRenameForm_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return BlockRenameForm_setPrototypeOf(o, p); }



/**
 * 模板生成表单项目
 */

var BlockRenameForm_BlockRenameForm = (BlockRenameForm_dec = Object(index_module["b" /* inject */])('customBlocks'), BlockRenameForm_dec(BlockRenameForm_class = Object(index_module["c" /* observer */])(BlockRenameForm_class = (BlockRenameForm_temp =
/*#__PURE__*/
function (_Component) {
  BlockRenameForm_inherits(BlockRenameForm, _Component);

  function BlockRenameForm() {
    var _getPrototypeOf2;

    var _this;

    BlockRenameForm_classCallCheck(this, BlockRenameForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = BlockRenameForm_possibleConstructorReturn(this, (_getPrototypeOf2 = BlockRenameForm_getPrototypeOf(BlockRenameForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.changeBlockName = function (value) {
      _this.props.customBlocks.resetBlockName(value);
    };

    _this.changeBlockAlias = function (value) {
      _this.props.customBlocks.resetBlockAlias(value);
    };

    return _this;
  }

  BlockRenameForm_createClass(BlockRenameForm, [{
    key: "render",
    value: function render() {
      return external_window_React_default.a.createElement("div", {
        className: "project-config-form"
      }, external_window_React_default.a.createElement("div", {
        className: "project-config-form-item"
      }, external_window_React_default.a.createElement("h3", {
        style: {
          margin: 0
        }
      }, external_window_React_default.a.createElement("span", {
        style: {
          color: 'red'
        }
      }, "*"), " \u533A\u5757\u540D\uFF1A"), external_window_React_default.a.createElement(input_default.a, {
        ref: "name",
        placeholder: '字母数字中下划线组合 (必填)',
        value: this.props.customBlocks.renameBlockName,
        onChange: this.changeBlockName
      }), external_window_React_default.a.createElement("div", {
        className: "project-config-form-item-error-message"
      }, this.props.customBlocks.blockNameValidation)), external_window_React_default.a.createElement("div", {
        className: "project-config-form-item"
      }, external_window_React_default.a.createElement("h3", {
        style: {
          margin: 0
        }
      }, "\u533A\u5757\u522B\u540D\uFF1A"), external_window_React_default.a.createElement(input_default.a, {
        placeholder: '可输入中文 (选填)',
        value: this.props.customBlocks.renameBlockAlias,
        onChange: this.changeBlockAlias
      })));
    }
  }]);

  return BlockRenameForm;
}(external_window_React_["Component"]), BlockRenameForm_temp)) || BlockRenameForm_class) || BlockRenameForm_class);

// EXTERNAL MODULE: ./renderer/src/pages/Blocks/index.scss
var Blocks = __webpack_require__(1179);

// CONCATENATED MODULE: ./renderer/src/pages/Blocks/index.jsx






var Blocks_dec, Blocks_class, Blocks_class2, Blocks_temp;

function Blocks_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Blocks_typeof = function _typeof(obj) { return typeof obj; }; } else { Blocks_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Blocks_typeof(obj); }

function Blocks_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Blocks_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Blocks_createClass(Constructor, protoProps, staticProps) { if (protoProps) Blocks_defineProperties(Constructor.prototype, protoProps); if (staticProps) Blocks_defineProperties(Constructor, staticProps); return Constructor; }

function Blocks_possibleConstructorReturn(self, call) { if (call && (Blocks_typeof(call) === "object" || typeof call === "function")) { return call; } return Blocks_assertThisInitialized(self); }

function Blocks_getPrototypeOf(o) { Blocks_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Blocks_getPrototypeOf(o); }

function Blocks_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Blocks_setPrototypeOf(subClass, superClass); }

function Blocks_setPrototypeOf(o, p) { Blocks_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Blocks_setPrototypeOf(o, p); }

function Blocks_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }













var TabPane = tab_default.a.TabPane;
var Blocks_Toast = feedback_default.a.toast;
var Blocks_PageBlocks = (Blocks_dec = Object(index_module["b" /* inject */])('materials', 'customBlocks'), Blocks_dec(Blocks_class = Object(index_module["c" /* observer */])(Blocks_class = (Blocks_temp = Blocks_class2 =
/*#__PURE__*/
function (_Component) {
  Blocks_inherits(PageBlocks, _Component);

  function PageBlocks() {
    var _getPrototypeOf2;

    var _this;

    Blocks_classCallCheck(this, PageBlocks);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Blocks_possibleConstructorReturn(this, (_getPrototypeOf2 = Blocks_getPrototypeOf(PageBlocks)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleRefresh = function () {
      _this.props.customBlocks.showCustomBlocks = false;

      _this.props.materials.refresh();
    };

    _this.handleTabChange = function (key) {
      if (key) {
        _this.props.materials.setBlockTabActiveKey(key);
      } else {
        _this.props.materials.setBlockTabActiveKey(-1);
      }
    };

    _this.renderMaterialsTabPanel = function () {
      var _this$props$materials = _this.props.materials,
          materials = _this$props$materials.materials,
          getBlockTabActiveKey = _this$props$materials.getBlockTabActiveKey;
      return materials.map(function (material, index) {
        return external_window_React_default.a.createElement(TabPane, {
          tab: material.name,
          key: getBlockTabActiveKey(index),
          onClick: _this.handleShowCustomBlocks.bind(Blocks_assertThisInitialized(Blocks_assertThisInitialized(_this)), false)
        }, external_window_React_default.a.createElement(Panel["a" /* default */], {
          material: material
        }));
      });
    };

    _this.handleShowCustomBlocks = function (show) {
      _this.props.customBlocks.showCustomBlocks = show;
    };

    _this.handleProgressClose = function () {
      _this.props.customBlocks.closeProgress();
    };

    _this.handleErrorClose = function () {
      _this.props.customBlocks.closeError();
    };

    _this.handleOpen = function () {
      if (_this.props.customBlocks.blockEditing) {
        Blocks_Toast.show({
          type: 'prompt',
          content: '请先关闭正在搭建的区块',
          duration: 1000
        });
        return null;
      } else if (_this.props.customBlocks.dataLoading) {
        _this.props.customBlocks.openProgress();

        return null;
      }

      _this.props.customBlocks.open();
    };

    _this.handleClose = function () {
      _this.props.customBlocks.close();
    };

    _this.handleRenameClose = function () {
      _this.props.customBlocks.renameClose();
    };

    _this.handleRenameBlock = function () {
      _this.props.customBlocks.renameClose();

      _this.props.customBlocks.refactorBlock();
    };

    _this.handleOpenWorkbench = function () {
      _this.props.customBlocks.openWorkBench();

      _this.props.customBlocks.close();
    };

    _this.handleFeedBack = function () {
      external_electron_["shell"].openExternal('https://github.com/alibaba/ice/issues/new?labels=iceworks');
    };

    _this.renderScaffoldsTabPanel = function () {
      var _this$props$materials2 = _this.props.materials,
          materials = _this$props$materials2.materials,
          getBlockTabActiveKey = _this$props$materials2.getBlockTabActiveKey;
      return materials.map(function (material, index) {
        return external_window_React_default.a.createElement(TabPane, {
          tab: material.name,
          key: getBlockTabActiveKey(index)
        }, external_window_React_default.a.createElement(Panel["a" /* default */], {
          material: material
        }));
      });
    };

    _this.renderCustomBlocksTabPanel = function () {
      var blocksStorage = _this.props.customBlocks.blocksStorage;
      var hasCustomBlock = Object.keys(blocksStorage).length > 0;

      if (hasCustomBlock) {
        return external_window_React_default.a.createElement(TabPane, {
          tab: "\u81EA\u5B9A\u4E49\u533A\u5757",
          key: -1,
          onClick: _this.handleShowCustomBlocks.bind(Blocks_assertThisInitialized(Blocks_assertThisInitialized(_this)), true)
        }, external_window_React_default.a.createElement("div", {
          className: "scaffold-items-wrapper",
          style: {
            marginTop: '20px'
          }
        }, external_window_React_default.a.createElement("div", {
          className: "custom-block-notice"
        }, "\u7531\u4E8E\u81EA\u5B9A\u4E49\u533A\u5757\u529F\u80FD\u76EE\u524D\u5B58\u5728\u4F7F\u7528\u4F53\u9A8C\u95EE\u9898\u5DF2\u4E0B\u7EBF\uFF0C\u4EE5\u4E0B\u662F\u60A8\u81EA\u5B9A\u4E49\u7684\u533A\u5757\u5217\u8868\u8BB0\u5F55"), external_window_React_default.a.createElement(CustomBlockPanel_CustomBlockPanel, {
          blocks: blocksStorage
        })));
      }

      return null;
    };

    _this.renderBlockTabs = function () {
      var materials = _this.props.materials.materials;

      if (!materials || materials.length === 0) {
        return external_window_React_default.a.createElement("div", {
          style: {
            padding: 10,
            textAlign: 'center'
          }
        }, external_window_React_default.a.createElement(EmptyTips["a" /* default */], {
          size: 120
        }, "\u6682\u65E0\u7269\u6599\u6E90\uFF0C\u53EF\u524D\u5F80 ", external_window_React_default.a.createElement(Link["a" /* default */], {
          to: "/settings"
        }, "\u7269\u6599\u6E90\u914D\u7F6E"), " \b\u914D\u7F6E"), external_window_React_default.a.createElement(button_default.a, {
          type: "primary",
          loading: _this.props.materials.refreshing,
          size: "small",
          onClick: _this.handleRefresh
        }, "\u5237\u65B0\u5217\u8868"));
      }

      return external_window_React_default.a.createElement(tab_default.a, {
        className: "tab-fullscreen",
        activeKey: _this.props.materials.tabBlockActiveKey,
        onChange: _this.handleTabChange,
        contentStyle: {
          padding: 0,
          height: 0
        },
        tabBarExtraContent: external_window_React_default.a.createElement("div", {
          style: {
            height: 48,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 20
          }
        }, _this.props.customBlocks.showCustomBlocks && external_window_React_default.a.createElement(button_default.a, {
          type: "primary",
          style: {
            marginRight: 4
          },
          loading: _this.props.materials.refreshing,
          size: "small",
          onClick: _this.handleFeedBack
        }, "\u53CD\u9988\u610F\u89C1"), external_window_React_default.a.createElement(button_default.a, {
          loading: _this.props.materials.refreshing,
          size: "small",
          onClick: _this.handleRefresh
        }, "\u5237\u65B0\u5217\u8868"))
      }, _this.renderMaterialsTabPanel());
    };

    return _this;
  }

  Blocks_createClass(PageBlocks, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.materials.refresh();
    }
  }, {
    key: "render",
    value: function render() {
      return external_window_React_default.a.createElement("div", {
        className: "blocks-page"
      }, external_window_React_default.a.createElement("div", {
        className: "blocks-header"
      }, "\u533A\u5757\u9884\u89C8", external_window_React_default.a.createElement("span", {
        style: {
          fontSize: 12,
          color: '#999',
          paddingLeft: 20,
          fontWeight: 300
        }
      }, "\u901A\u8FC7\u533A\u5757\u642D\u5EFA\u7EC4\u5408\u65B9\u5F0F\u53EF\u5FEB\u901F\u65B0\u5EFA\u9879\u76EE\u9875\u9762")), external_window_React_default.a.createElement("div", {
        className: "blocks-body",
        style: {
          opacity: this.props.materials.refreshing ? 0.8 : 1
        }
      }, this.renderBlockTabs()), external_window_React_default.a.createElement(dialog_default.a, {
        title: "\u65B0\u5EFA\u81EA\u5B9A\u4E49\u533A\u5757",
        autoFocus: true,
        className: "poject-config-dialog",
        footerAlign: "center",
        onClose: this.handleClose,
        footer: external_window_React_default.a.createElement("div", {
          className: "project-config-footer"
        }, external_window_React_default.a.createElement(button_default.a, {
          onClick: this.handleOpenWorkbench,
          disabled: this.props.customBlocks.isDisabled,
          type: "primary"
        }, "\u521B\u5EFA\u533A\u5757"), external_window_React_default.a.createElement(button_default.a, {
          onClick: this.handleClose
        }, "\u53D6\u6D88")),
        visible: this.props.customBlocks.visible
      }, external_window_React_default.a.createElement(CustomBlockForm_CustomBlockForm, null)), external_window_React_default.a.createElement(dialog_default.a, {
        title: "\u533A\u5757\u91CD\u547D\u540D",
        autoFocus: true,
        className: "poject-config-dialog",
        footerAlign: "center",
        onClose: this.handleRenameClose,
        footer: external_window_React_default.a.createElement("div", {
          className: "project-config-footer"
        }, external_window_React_default.a.createElement(button_default.a, {
          onClick: this.handleRenameBlock,
          disabled: this.props.customBlocks.isDisabled,
          type: "primary"
        }, "\u91CD\u547D\u540D"), external_window_React_default.a.createElement(button_default.a, {
          onClick: this.handleRenameClose
        }, "\u53D6\u6D88")),
        visible: this.props.customBlocks.renameVisible
      }, external_window_React_default.a.createElement(BlockRenameForm_BlockRenameForm, null)), external_window_React_default.a.createElement(dialog_default.a, {
        title: "\u8BF7\u6C42\u7269\u6599\u6570\u636E",
        autoFocus: true,
        className: "poject-config-dialog progress-dialog",
        onOk: this.handleProgressClose,
        onClose: this.handleProgressClose,
        onCancel: this.handleProgressClose,
        footerAlign: "center",
        visible: this.props.customBlocks.progressVisible
      }, external_window_React_default.a.createElement("div", {
        className: "project-config-form-item"
      }, external_window_React_default.a.createElement(progress_default.a, {
        style: {
          width: '40%'
        },
        showInfo: false,
        percent: this.props.customBlocks.materialProgress
      }), external_window_React_default.a.createElement("span", {
        style: {
          fontSize: 12,
          color: '#999',
          paddingLeft: 10
        }
      }, this.props.customBlocks.materialProgress, "%"), external_window_React_default.a.createElement("span", {
        style: {
          fontSize: 12,
          color: '#999',
          paddingLeft: 10
        }
      }, this.props.customBlocks.progressSpeed, "/kbs"), external_window_React_default.a.createElement("span", {
        style: {
          fontSize: 12,
          color: '#999',
          paddingLeft: 10
        }
      }, this.props.customBlocks.progressTitle))), external_window_React_default.a.createElement(dialog_default.a, {
        title: "\u8BF7\u6C42\u7269\u6599\u6570\u636E\u5931\u8D25",
        autoFocus: true,
        className: "poject-config-dialog progress-dialog",
        onOk: this.handleErrorClose,
        onClose: this.handleErrorClose,
        onCancel: this.handleErrorClose,
        footerAlign: "center",
        visible: this.props.customBlocks.errorVisible
      }, external_window_React_default.a.createElement("div", {
        className: "project-config-form-item"
      }, external_window_React_default.a.createElement("h4", null, "\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u662F\u5426\u6B63\u5E38"))));
    }
  }]);

  return PageBlocks;
}(external_window_React_["Component"]), Blocks_class2.displayName = 'PageBlocks', Blocks_temp)) || Blocks_class) || Blocks_class);
/* harmony default export */ var pages_Blocks = __webpack_exports__["default"] = (Blocks_PageBlocks);

/***/ }),

/***/ 660:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/button/index.js
var lib_button = __webpack_require__(65);
var button_default = /*#__PURE__*/__webpack_require__.n(lib_button);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/tab/index.js
var tab = __webpack_require__(674);
var tab_default = /*#__PURE__*/__webpack_require__.n(tab);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(2);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./renderer/node_modules/mobx-react/index.module.js
var index_module = __webpack_require__(81);

// EXTERNAL MODULE: external "window.React"
var external_window_React_ = __webpack_require__(1);
var external_window_React_default = /*#__PURE__*/__webpack_require__.n(external_window_React_);

// EXTERNAL MODULE: ./renderer/src/pages/Components/index.scss
var Components = __webpack_require__(1180);

// EXTERNAL MODULE: ./renderer/src/lib/project-scripts.js
var project_scripts = __webpack_require__(673);

// EXTERNAL MODULE: ./renderer/src/lib/logger.js
var logger = __webpack_require__(7);

// EXTERNAL MODULE: ./renderer/src/components/CateMenu/index.jsx
var CateMenu = __webpack_require__(705);

// EXTERNAL MODULE: ./renderer/src/components/EmptyTips/index.jsx
var EmptyTips = __webpack_require__(663);

// EXTERNAL MODULE: ./renderer/src/components/dialog/index.js + 4 modules
var dialog = __webpack_require__(100);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/dialog/index.js
var lib_dialog = __webpack_require__(24);
var dialog_default = /*#__PURE__*/__webpack_require__.n(lib_dialog);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/balloon/index.js
var balloon = __webpack_require__(723);
var balloon_default = /*#__PURE__*/__webpack_require__.n(balloon);

// EXTERNAL MODULE: ./renderer/src/components/Progress/index.jsx
var Progress = __webpack_require__(679);

// CONCATENATED MODULE: ./renderer/src/pages/Components/components/DownloadDialog.jsx




var _dec, _class, _class2, _temp;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var DownloadDialog_DownloadDialog = (_dec = Object(index_module["b" /* inject */])('component'), _dec(_class = Object(index_module["c" /* observer */])(_class = (_temp = _class2 =
/*#__PURE__*/
function (_Component) {
  _inherits(DownloadDialog, _Component);

  function DownloadDialog() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DownloadDialog);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DownloadDialog)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.dialogClose = function () {
      _this.props.component.close();
    };

    return _this;
  }

  _createClass(DownloadDialog, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          component = _this$props.component,
          handleDownloadComponent = _this$props.handleDownloadComponent;
      var currentComponent = component.currentComponent;
      return external_window_React_default.a.createElement(dialog_default.a, {
        title: "\u7EC4\u4EF6\u4E0B\u8F7D",
        visible: component.visible,
        onClose: this.dialogClose,
        style: {
          width: '500px',
          height: '306px'
        },
        footerAlign: "center",
        footer: external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement(balloon_default.a, {
          trigger: external_window_React_default.a.createElement(button_default.a, {
            onClick: handleDownloadComponent,
            loading: component.isDownloading,
            type: "primary"
          }, "\u4E0B\u8F7D"),
          align: "t",
          alignment: "normal",
          triggerType: "hover",
          style: {
            width: 350,
            height: 85
          },
          visible: component.isDownloading
        }, external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement(Progress["a" /* default */], {
          styleOffset: [-350, 0]
        }))), external_window_React_default.a.createElement(button_default.a, {
          disabled: component.isDownloading,
          onClick: this.dialogClose
        }, "\u53D6\u6D88"))
      }, external_window_React_default.a.createElement("p", null, "\u7EC4\u4EF6\u5305\u540D: ", currentComponent.source && currentComponent.source.npm), currentComponent.source && currentComponent.source.version && external_window_React_default.a.createElement("p", null, "\u7EC4\u4EF6\u7248\u672C: ", currentComponent.source && currentComponent.source.version), external_window_React_default.a.createElement("p", null, "\u5F15\u7528\u65B9\u6CD5: ", currentComponent.importStatement));
    }
  }]);

  return DownloadDialog;
}(external_window_React_["Component"]), _class2.displayName = 'DownloadDialog', _class2.propTypes = {
  handleDownloadComponent: prop_types_default.a.func
}, _class2.defaultProps = {
  handleDownloadComponent: function handleDownloadComponent() {}
}, _temp)) || _class) || _class);
/* harmony default export */ var components_DownloadDialog = (DownloadDialog_DownloadDialog);
// EXTERNAL MODULE: external "electron"
var external_electron_ = __webpack_require__(4);

// EXTERNAL MODULE: ./renderer/node_modules/rc-tooltip/es/index.js + 28 modules
var es = __webpack_require__(99);

// EXTERNAL MODULE: ./renderer/src/lib/utils.js
var utils = __webpack_require__(58);

// EXTERNAL MODULE: ./renderer/src/services.js
var services = __webpack_require__(6);

// EXTERNAL MODULE: ./renderer/src/components/Icon/index.jsx
var Icon = __webpack_require__(22);

// EXTERNAL MODULE: ./renderer/src/pages/Components/item.scss
var item = __webpack_require__(1181);

// CONCATENATED MODULE: ./renderer/src/pages/Components/Item.jsx


var Item_dec, Item_class, Item_class2, Item_temp;

function Item_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Item_typeof = function _typeof(obj) { return typeof obj; }; } else { Item_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Item_typeof(obj); }

function Item_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Item_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Item_createClass(Constructor, protoProps, staticProps) { if (protoProps) Item_defineProperties(Constructor.prototype, protoProps); if (staticProps) Item_defineProperties(Constructor, staticProps); return Constructor; }

function Item_possibleConstructorReturn(self, call) { if (call && (Item_typeof(call) === "object" || typeof call === "function")) { return call; } return Item_assertThisInitialized(self); }

function Item_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Item_getPrototypeOf(o) { Item_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Item_getPrototypeOf(o); }

function Item_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Item_setPrototypeOf(subClass, superClass); }

function Item_setPrototypeOf(o, p) { Item_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Item_setPrototypeOf(o, p); }









var interaction = services["a" /* default */].interaction;

var Item_Item = (Item_dec = Object(index_module["b" /* inject */])('projects', 'component'), Item_dec(Item_class = Object(index_module["c" /* observer */])(Item_class = (Item_temp = Item_class2 =
/*#__PURE__*/
function (_Component) {
  Item_inherits(Item, _Component);

  function Item() {
    var _getPrototypeOf2;

    var _this;

    Item_classCallCheck(this, Item);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Item_possibleConstructorReturn(this, (_getPrototypeOf2 = Item_getPrototypeOf(Item)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.download = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          download = _this$props.download,
          component = _this$props.component,
          projects = _this$props.projects;
      var currentProject = projects.currentProject;

      if (!currentProject) {
        dialog["a" /* default */].alert({
          title: '提示',
          content: external_window_React_default.a.createElement("div", null, " \u8BF7\u5148\u65B0\u5EFA\u9879\u76EE ")
        });
        return;
      }

      component.currentComponent = data;
      download(data);
    };

    _this.import = function () {
      var data = _this.props.data;
      external_electron_["clipboard"].writeText(data.importStatement || '');
      interaction.notify({
        title: '复制成功，请到对应的文件黏贴引入',
        body: "\u5F15\u7528\u65B9\u6CD5\uFF1A".concat(data.importStatement),
        type: 'success'
      });
    };

    _this.openInBrowser = function () {
      // https://github.com/alibaba/ice/issues/219
      // sometimes data is not trustable
      // make sure url is a valid URL any time
      var _this$props2 = _this.props,
          _this$props2$data = _this$props2.data,
          data = _this$props2$data === void 0 ? {} : _this$props2$data,
          material = _this$props2.material,
          projects = _this$props2.projects;
      var currentProject = projects.currentProject;
      var iceVersion = currentProject ? currentProject.iceVersion : '1.x';
      var isAlibaba = services["a" /* default */].settings.get('isAlibaba');
      var url = 'https://github.com/alibaba/ice';
      var preUrl;

      if (data.homepage) {
        url = data.homepage;
      } else {
        // 没有homepage字段但是属于飞冰物料源，则判断是 飞冰基础组件
        if (Object(utils["a" /* isIceMaterial */])(material.source)) {
          preUrl = iceVersion === '0.x' ? "https://alibaba.github.io/ice/0.x/component/" : "https://alibaba.github.io/ice/component/";
          url = preUrl + data.name.toLocaleLowerCase();
        }
      }

      external_electron_["shell"].openExternal(url);
    };

    return _this;
  }

  Item_createClass(Item, [{
    key: "render",
    value: function render() {
      var data = this.props.data;
      return external_window_React_default.a.createElement("div", {
        className: "component-card",
        onClick: this.handleClick
      }, external_window_React_default.a.createElement("h2", {
        className: "component-card-title"
      }, data.title), external_window_React_default.a.createElement("div", {
        className: "component-card-name"
      }, data.name), data.isDownloaded && external_window_React_default.a.createElement("div", {
        className: "component-downloaded"
      }, external_window_React_default.a.createElement(es["default"], {
        placement: 'top',
        overlay: '当前项目已依赖'
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "yixiazai",
        style: {
          color: 'rgb(48, 128, 254)'
        }
      }))), external_window_React_default.a.createElement("div", {
        className: "component-card-opts"
      }, external_window_React_default.a.createElement("div", {
        className: "component-card-opt"
      }, data.isDownloaded ? external_window_React_default.a.createElement(button_default.a, {
        size: "small",
        onClick: this.import,
        type: "primary"
      }, "\u590D\u5236\u5F15\u5165\u4EE3\u7801") : external_window_React_default.a.createElement(button_default.a, {
        size: "small",
        onClick: this.download,
        type: "primary"
      }, "\u5B89\u88C5"), "\xA0\xA0", external_window_React_default.a.createElement(button_default.a, {
        size: "small",
        onClick: this.openInBrowser,
        type: "normal"
      }, "\u6587\u6863"))));
    }
  }]);

  return Item;
}(external_window_React_["Component"]), Item_class2.propTypes = {}, Item_class2.defaultProps = {}, Item_temp)) || Item_class) || Item_class);
/* harmony default export */ var Components_Item = (Item_Item);
// CONCATENATED MODULE: ./renderer/src/pages/Components/ComponentPanel.jsx
var ComponentPanel_dec, ComponentPanel_class, ComponentPanel_temp;

function ComponentPanel_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ComponentPanel_typeof = function _typeof(obj) { return typeof obj; }; } else { ComponentPanel_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ComponentPanel_typeof(obj); }

function ComponentPanel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ComponentPanel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ComponentPanel_createClass(Constructor, protoProps, staticProps) { if (protoProps) ComponentPanel_defineProperties(Constructor.prototype, protoProps); if (staticProps) ComponentPanel_defineProperties(Constructor, staticProps); return Constructor; }

function ComponentPanel_possibleConstructorReturn(self, call) { if (call && (ComponentPanel_typeof(call) === "object" || typeof call === "function")) { return call; } return ComponentPanel_assertThisInitialized(self); }

function ComponentPanel_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ComponentPanel_getPrototypeOf(o) { ComponentPanel_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ComponentPanel_getPrototypeOf(o); }

function ComponentPanel_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ComponentPanel_setPrototypeOf(subClass, superClass); }

function ComponentPanel_setPrototypeOf(o, p) { ComponentPanel_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ComponentPanel_setPrototypeOf(o, p); }











var ComponentPanel_interaction = services["a" /* default */].interaction;
var ComponentPanel_ComponentPanel = (ComponentPanel_dec = Object(index_module["b" /* inject */])('projects', 'component', 'materials', 'progress'), ComponentPanel_dec(ComponentPanel_class = Object(index_module["c" /* observer */])(ComponentPanel_class = (ComponentPanel_temp =
/*#__PURE__*/
function (_Component) {
  ComponentPanel_inherits(ComponentPanel, _Component);

  function ComponentPanel(props) {
    var _this;

    ComponentPanel_classCallCheck(this, ComponentPanel);

    _this = ComponentPanel_possibleConstructorReturn(this, ComponentPanel_getPrototypeOf(ComponentPanel).call(this, props));

    _this.handleClick = function (value) {
      var material = _this.props.material;
      var components = material.components;

      if (components) {
        components.activeCategory = value;
      }
    };

    _this.download = function (data) {
      var _this$props = _this.props,
          component = _this$props.component,
          material = _this$props.material;
      component.open();
    };

    _this.handleDownloadComponent = function () {
      var _this$props2 = _this.props,
          component = _this$props2.component,
          projects = _this$props2.projects,
          materials = _this$props2.materials,
          progress = _this$props2.progress;
      var currentComponent = component.currentComponent;
      var _currentComponent$sou = currentComponent.source,
          npm = _currentComponent$sou.npm,
          version = _currentComponent$sou.version;
      var currentProject = projects.currentProject;
      component.downloading = true;
      progress.start();
      progress.setStatusText('正在下载组件');
      progress.setShowTerminal(true);
      project_scripts["a" /* default */].npminstall(currentProject, "".concat(npm, "@").concat(version), false, function (error, dependencies) {
        component.downloading = false;
        progress.end();

        if (error) {
          logger["a" /* default */].error(new Error("\u7EC4\u4EF6".concat(npm, "@").concat(version, "\u4E0B\u8F7D\u5931\u8D25")));
          dialog["a" /* default */].alert({
            title: '组件下载失败',
            content: external_window_React_default.a.createElement("div", null, "\u8BF7\u786E\u8BA4\u7F51\u7EDC\u8FDE\u63A5\u6B63\u5E38\uFF0C\u6216\u5728\u8BBE\u7F6E\u4E2D\u5207\u6362 npm \u6E90\u91CD\u8BD5", external_window_React_default.a.createElement("br", null), "\u53EF\u5C55\u5F00\u3010\u8FD0\u884C\u65E5\u5FD7\u3011\u67E5\u770B\u8BE6\u7EC6\u53CD\u9988\u4FE1\u606F\u3002")
          });
        } else {
          component.close();
          materials.updateComponents();
          ComponentPanel_interaction.notify({
            title: '组件下载成功，组件需要自行引入到页面中',
            body: component.importStatement ? "\u5F15\u7528\u65B9\u6CD5\uFF1A".concat(component.importStatement) : "".concat(npm),
            type: 'success'
          });
        }
      });
    };

    return _this;
  }
  /**
   * 点击模板分类菜单的回调
   */


  ComponentPanel_createClass(ComponentPanel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var material = this.props.material;
      var components = material.components || null;

      if (material.componentsError) {
        return external_window_React_default.a.createElement(EmptyTips["a" /* default */], {
          size: 120
        }, material.componentsError);
      }

      if (!components) {
        return external_window_React_default.a.createElement(EmptyTips["a" /* default */], {
          size: 120
        }, "\u52A0\u8F7D\u4E2D...");
      }

      if (Array.isArray(components.values) && components.values.length === 0) {
        return external_window_React_default.a.createElement("div", {
          style: {
            padding: 10
          }
        }, external_window_React_default.a.createElement(EmptyTips["a" /* default */], {
          size: 120
        }, "\u5F53\u524D\u7269\u6599\u6E90\u6682\u65E0\u7EC4\u4EF6"));
      }

      return external_window_React_default.a.createElement("div", {
        className: "component-panel-body"
      }, components.categories && components.categories.length > 0 && external_window_React_default.a.createElement(CateMenu["a" /* default */], {
        data: components.categories,
        onClick: this.handleClick
      }), external_window_React_default.a.createElement("div", {
        className: "component-items-wrapper"
      }, components.values.map(function (component, index) {
        return external_window_React_default.a.createElement(Components_Item, {
          key: index,
          data: component,
          material: material,
          download: _this2.download
        });
      })), external_window_React_default.a.createElement(components_DownloadDialog, {
        handleDownloadComponent: this.handleDownloadComponent
      }));
    }
  }]);

  return ComponentPanel;
}(external_window_React_["Component"]), ComponentPanel_temp)) || ComponentPanel_class) || ComponentPanel_class);
/* harmony default export */ var Components_ComponentPanel = (ComponentPanel_ComponentPanel);
// CONCATENATED MODULE: ./renderer/src/pages/Components/index.jsx



var Components_dec, Components_class, Components_class2, Components_temp;

function Components_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Components_typeof = function _typeof(obj) { return typeof obj; }; } else { Components_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Components_typeof(obj); }

function Components_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Components_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Components_createClass(Constructor, protoProps, staticProps) { if (protoProps) Components_defineProperties(Constructor.prototype, protoProps); if (staticProps) Components_defineProperties(Constructor, staticProps); return Constructor; }

function Components_possibleConstructorReturn(self, call) { if (call && (Components_typeof(call) === "object" || typeof call === "function")) { return call; } return Components_assertThisInitialized(self); }

function Components_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Components_getPrototypeOf(o) { Components_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Components_getPrototypeOf(o); }

function Components_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Components_setPrototypeOf(subClass, superClass); }

function Components_setPrototypeOf(o, p) { Components_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Components_setPrototypeOf(o, p); }






var TabPane = tab_default.a.TabPane;
var Components_IceComponent = (Components_dec = Object(index_module["b" /* inject */])('materials', 'scaffold', 'customScaffold'), Components_dec(Components_class = Object(index_module["c" /* observer */])(Components_class = (Components_temp = Components_class2 =
/*#__PURE__*/
function (_Component) {
  Components_inherits(IceComponent, _Component);

  function IceComponent() {
    var _getPrototypeOf2;

    var _this;

    Components_classCallCheck(this, IceComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Components_possibleConstructorReturn(this, (_getPrototypeOf2 = Components_getPrototypeOf(IceComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleRefresh = function () {
      _this.props.materials.refresh();
    };

    _this.handleTabChange = function (key) {
      if (key) {
        _this.props.materials.setComponentTabActiveKey(key);
      } else {
        _this.props.materials.setComponentTabActiveKey(-1);
      }
    };

    _this.handleSelectedComponent = function (scaffold) {// this.props.scaffold.setScaffoldConfig({ scaffold });
      // this.props.scaffold.open();
    };

    _this.renderComponentsTabPanel = function () {
      var _this$props$materials = _this.props.materials,
          materials = _this$props$materials.materials,
          getComponentTabActiveKey = _this$props$materials.getComponentTabActiveKey;

      if (!materials || materials.length === 0) {
        return null;
      }

      return materials.map(function (material, index) {
        return external_window_React_default.a.createElement(TabPane, {
          tab: material.name,
          key: getComponentTabActiveKey(index)
        }, external_window_React_default.a.createElement(Components_ComponentPanel, {
          onClick: _this.props.handleSelectedComponent,
          material: material
        }));
      });
    };

    return _this;
  }

  Components_createClass(IceComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.materials.refresh();
    }
  }, {
    key: "render",
    value: function render() {
      return external_window_React_default.a.createElement("div", {
        className: "component-page"
      }, external_window_React_default.a.createElement("div", {
        className: "component-header"
      }, "\u7EC4\u4EF6\u5E02\u573A"), external_window_React_default.a.createElement("div", {
        className: "component-body"
      }, external_window_React_default.a.createElement(tab_default.a, {
        className: "tab-fullscreen",
        activeKey: this.props.materials.tabComponentActiveKey,
        onChange: this.handleTabChange,
        contentStyle: {
          padding: 0
        },
        tabBarExtraContent: external_window_React_default.a.createElement("div", {
          style: {
            height: 48,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 20
          }
        }, external_window_React_default.a.createElement(button_default.a, {
          loading: this.props.materials.refreshing,
          size: "small",
          onClick: this.handleRefresh
        }, "\u5237\u65B0\u5217\u8868"))
      }, this.renderComponentsTabPanel())));
    }
  }]);

  return IceComponent;
}(external_window_React_["Component"]), Components_class2.propTypes = {
  materials: prop_types_default.a.object.isRequired
}, Components_temp)) || Components_class) || Components_class);
/* harmony default export */ var pages_Components = __webpack_exports__["default"] = (Components_IceComponent);

/***/ }),

/***/ 663:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _default; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var _default =
/*#__PURE__*/
function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, _getPrototypeOf(_default).apply(this, arguments));
  }

  _createClass(_default, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$size = _this$props.size,
          size = _this$props$size === void 0 ? 60 : _this$props$size,
          _this$props$style = _this$props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: _objectSpread({
          flex: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          minHeight: 140,
          whiteSpace: 'initial',
          margin: '0 20px',
          lineHeight: 1.6
        }, style)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          color: '#aaa',
          fontSize: 14
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Icon__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
        type: "tip",
        style: {
          color: 'rgb(48, 128, 254)'
        }
      }), ' ', this.props.children));
    }
  }]);

  return _default;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ 665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rc_tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(99);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(703);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var ExtraButton =
/*#__PURE__*/
function (_Component) {
  _inherits(ExtraButton, _Component);

  function ExtraButton() {
    _classCallCheck(this, ExtraButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(ExtraButton).apply(this, arguments));
  }

  _createClass(ExtraButton, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          tipContent = _this$props.tipContent,
          tipText = _this$props.tipText,
          onClick = _this$props.onClick,
          _this$props$disabled = _this$props.disabled,
          disabled = _this$props$disabled === void 0 ? false : _this$props$disabled,
          _this$props$style = _this$props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style,
          _this$props$placement = _this$props.placement,
          placement = _this$props$placement === void 0 ? 'bottomRight' : _this$props$placement,
          active = _this$props.active,
          other = _objectWithoutProperties(_this$props, ["tipContent", "tipText", "onClick", "disabled", "style", "placement", "active"]);

      var btn = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", _extends({}, other, {
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()({
          'extra-button': true,
          active: active
        }),
        onClick: disabled ? function () {} : onClick,
        style: disabled ? styles.disabled : style
      }), this.props.children);

      if (tipContent || tipText) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(rc_tooltip__WEBPACK_IMPORTED_MODULE_1__["default"], {
          placement: placement,
          overlay: tipContent || react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: {
              maxWidth: 120
            }
          }, tipText)
        }, btn);
      }

      return btn;
    }
  }]);

  return ExtraButton;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var styles = {
  disabled: {
    color: '#999'
  }
};
/* harmony default export */ __webpack_exports__["a"] = (ExtraButton);

/***/ }),

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _icedesign_base_lib_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _icedesign_base_lib_dialog__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_icedesign_base_lib_dialog__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rimraf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(759);
/* harmony import */ var rimraf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(rimraf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(100);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6);
/* harmony import */ var _terms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(102);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }










var detectPort = electron__WEBPACK_IMPORTED_MODULE_1__["remote"].require('detect-port');

var isAlibaba = _services__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].settings.get('isAlibaba');
var folder = _services__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].folder,
    interaction = _services__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].interaction,
    sessions = _services__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].sessions,
    shared = _services__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].shared,
    glodlog = _services__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].glodlog; // todo 后续抽出到独立套件保持独立更新
// todo vue cli 后续需要升级
// const configs = {
//   vue: {
//     devDependencies: {
//       '@vue/cli-plugin-babel': '^3.0.0-beta.6',
//       '@vue/cli-plugin-eslint': '^3.0.0-beta.6',
//       '@vue/cli-service': '^3.0.0-beta.6',
//       '@vue/eslint-config-airbnb': '^3.0.0-beta.6',
//     },
//     scripts: {
//       start: 'vue-cli-service serve',
//       build: 'vue-cli-service build',
//     },
//   },
//   react: {
//     devDependencies: {
//       'ice-scripts': '^1.0.0',
//     },
//     scripts: {
//       start: 'ice dev',
//       build: 'ice build',
//     },
//   },
// };

/**
 * 获取当前的 Env 对象
 */

var getEnv = function getEnv() {
  var _shared$env = shared.env,
      env = _shared$env === void 0 ? {} : _shared$env;
  return env.getEnv();
};
/**
 * 获取当前 registry 源信息
 * @param {string} value
 */


var getRegistryInfo = function getRegistryInfo(value) {
  var _shared$registries = shared.registries,
      registries = _shared$registries === void 0 ? [] : _shared$registries;
  return registries.find(function (item) {
    return item.value === value || item.name === value;
  });
};

var doProjectInstall = function doProjectInstall(_ref, reInstall) {
  var cwd = _ref.cwd,
      env = _ref.env,
      shell = _ref.shell,
      callback = _ref.callback;
  var installConfig = {
    cwd: cwd,
    env: env,
    shell: shell,
    shellArgs: ['install']
  };
  var npmCacheCleanConfig = {
    cwd: cwd,
    env: env,
    shell: shell,
    shellArgs: ['cache', 'clean', '--force']
  };
  sessions.manager.new(installConfig, function (code) {
    if (code !== 0) {
      _logger__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].error(new Error('project-install-failed'));
      glodlog.record({
        type: 'app',
        action: 'project-install-failed'
      });

      if (reInstall) {
        _logger__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].info('执行 npm cache clean --force 重试');
        sessions.manager.new(npmCacheCleanConfig, function () {
          doProjectInstall({
            cwd: cwd,
            env: env,
            shell: shell,
            callback: callback
          });
        });
      } else if (shell === 'tnpm' || shell === 'cnpm') {
        var registryInfo = getRegistryInfo(shell);
        callback(code, {
          title: '重装依赖失败',
          content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", null, "1. \u8BF7\u68C0\u67E5 ", shell, " \u547D\u4EE4\u662F\u5426\u5B89\u88C5\u4E86\uFF0C\u6CA1\u6709\u8BF7\u6267\u884C $ [sudo] npm install --registry=", registryInfo.value, " -g ", shell, " \u8FDB\u884C\u5B89\u88C5"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("p", null, "2. \u5DF2\u5B89\u88C5 ", shell, "\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u662F\u5426\u6B63\u5E38\uFF0C\u53EF\u5C55\u5F00\u3010\u8FD0\u884C\u65E5\u5FD7\u3011\u65E5\u5FD7\u67E5\u770B\u8BE6\u7EC6\u53CD\u9988\u4FE1\u606F"))
        });
      } else {
        callback(code, {
          title: '重装依赖失败',
          content: '请检查网络连接是否正常，可展开【运行日志】日志查看详细反馈信息'
        });
      }
    } else {
      callback(0);
    }
  });
};

var doDependenciesInstall = function doDependenciesInstall(dependenciesInstallConfig, dependencies, callback, reInstall) {
  // cwd 项目目录，用于获取对应的 term，term 使用项目路径作为key存储
  var cwd = dependenciesInstallConfig.cwd,
      env = dependenciesInstallConfig.env;
  sessions.manager.new(dependenciesInstallConfig, function (code) {
    if (code !== 0) {
      if (reInstall) {
        _logger__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].info('重试');
        _terms__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].writeln(cwd, '依赖安装重试');
        doDependenciesInstall(dependenciesInstallConfig, dependencies, callback);
      } else {
        var error = new Error("\u5B89\u88C5\u4F9D\u8D56\u5931\u8D25: ".concat(JSON.stringify({
          dependencies: dependencies,
          env: env
        })));
        _logger__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].error(error);
        callback(1, dependencies);
      }
    } else {
      _logger__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].info('安装依赖成功', cwd, dependencies);
      callback(null, dependencies);
    }
  });
};
/**
 * 根据内网环境更新 env
 * @param {string} isAli
 */


var getEnvByAli = function getEnvByAli(isAli) {
  var env = {};

  if (isAli) {
    _logger__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].debug('安装依赖 - 检测为内网环境默认使用内网源'); // 检测到内网环境自动将路径设置为集团内部

    env.npm_config_registry = 'https://registry.npm.alibaba-inc.com';
  } else {
    env = getEnv();
  }

  return env;
};
/**
 * session 以“项目路径”为 key 做处理
 */


/* harmony default export */ __webpack_exports__["a"] = ({
  /**
   * 启动项目服务，并改变项目的状态
   * @param {Object} project 项目 stores 实例
   */
  start: function start(project) {
    var libraryType = project.getLibraryType();

    if (sessions.startProxy.has(project.fullPath)) {
      project.devStart();
      _logger__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].debug('服务已启动');
    } else {
      // @HACK angular 默认端口为 4200
      var DEFAULT_PORT = 4444;

      if (libraryType === 'angular') {
        DEFAULT_PORT = 4200;
      } else if (libraryType === 'rax') {
        DEFAULT_PORT = 4200;
      }

      detectPort(DEFAULT_PORT).then(function (newPort) {
        return new Promise(function (resolve, reject) {
          if (newPort === DEFAULT_PORT) {
            resolve(newPort);
          } else {
            project.serverPort = newPort;

            _icedesign_base_lib_dialog__WEBPACK_IMPORTED_MODULE_0___default.a.confirm({
              title: '端口冲突',
              content: react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
                style: {
                  lineHeight: '24px'
                }
              }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, "\u9ED8\u8BA4\u7AEF\u53E3 `", DEFAULT_PORT, "` \u5DF2\u88AB\u5360\u7528"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, "\u662F\u5426\u4F7F\u7528", react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("input", {
                style: {
                  width: 60,
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderTop: 'none',
                  margin: '0 6px',
                  borderBottom: '1px solid #ddd'
                },
                max: 65535,
                type: "number",
                defaultValue: newPort,
                onChange: function onChange(event) {
                  var value = event.target.value;
                  project.serverPort = Number(value);
                }
              }), "\u542F\u52A8\u670D\u52A1\uFF1F")),
              onOk: function onOk() {
                resolve(project.serverPort);
              },
              onCancel: function onCancel() {
                reject();
              },
              onClose: function onClose() {
                reject();
              }
            });
          }
        });
      }).then(function (port) {
        project.devStart();
        var shellArgs = ['start'];

        if (libraryType === 'angular') {
          shellArgs = ['run', 'start', '--', "--port=".concat(port)];
        }

        sessions.startProxy.start({
          cwd: project.fullPath,
          shell: 'npm',
          shellArgs: shellArgs,
          env: project.nodeFramework ? {} : {
            PORT: port
          }
        }, function (code) {
          project.devStop();

          if (code !== 0) {
            if (!project.terminalVisible) {
              project.toggleTerminal();
              _terms__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].writeln(project.fullPath, '');
              _terms__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].writeln(project.fullPath, '解决办法：');
              _terms__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].writeln(project.fullPath, '    1. 当前项目依赖未安装或依赖缺失，请重装依赖后重试。');
            }
          }
        });
      }).catch(function (error) {
        _logger__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].error(error);
      });
    }
  },

  /**
   * 停止项目，并改变项目的状态
   * @param {Object} project 项目 stores 实例
   */
  stop: function stop(project) {
    sessions.startProxy.stop(project.fullPath);
    project.devStop();
  },

  /**
   * 构建项目，并改变项目的状态
   * @param {Object} project 项目 stores 实例
   */
  build: function build(project) {
    if (!sessions.buildProxy.has(project.fullPath)) {
      project.buildStart();
      sessions.buildProxy.start({
        cwd: project.fullPath,
        shell: 'npm',
        shellArgs: ['run', 'build']
      }, function (code) {
        if (code === 0) {
          project.buildDone();
          var dist = path__WEBPACK_IMPORTED_MODULE_2___default.a.join(project.clientPath, 'build');
          interaction.notify({
            title: '构建完成，点击查看构建结果',
            body: dist,
            onClick: function onClick() {
              folder.open(dist);
            }
          });
        } else {
          project.buildFailed();
          _components_dialog__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].notice({
            title: '构建失败',
            error: '请查看运行日志'
          });
        }
      });
    }
  },

  /**
   * 依赖单个/多个安装，目前只支持client（前端）安装。
   * TODO: 支持前后端选择安装，需要配合UI处理
   * deps： string
   */
  npminstall: function npminstall(project, deps) {
    var isDev = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var callback = arguments.length > 3 ? arguments[3] : undefined;
    var dependencies = deps.split(/\s+/);
    dependencies = dependencies.filter(function (d) {
      return !!d.trim();
    }); // 如果包含内网包返回内网的 registry 源

    var env = getEnvByAli(isAlibaba);

    if (dependencies.length > 0) {
      dependencies = dependencies.map(function (dep) {
        if (dep.lastIndexOf('@') > 0) {
          return dep;
        }

        return "".concat(dep, "@latest");
      });
      var installPrefix = '--save';

      if (isDev) {
        installPrefix = '--save-dev';
      }

      var cwd = project.fullPath;
      var cwdClient = project.clientPath;
      _terms__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].writeln(cwd, '开始安装依赖');
      var npmInstallConfig = {
        cwd: cwd,
        // 项目目录，用于获取对应的term，term使用项目路径作为key存储
        cwdClient: cwdClient,
        // 是否是node模板，如果是node模板，此时安装目录于普通前端模板不同
        env: env,
        shell: 'npm',
        shellArgs: ['install', '--no-package-lock', installPrefix].concat(dependencies)
      };
      doDependenciesInstall(npmInstallConfig, dependencies, callback, true);
    }
  },

  /**
   * project: 当前项目
   * 依赖全量安装/重装，都是client和server共同执行。
   */
  install: function install(_ref2, callback) {
    var project = _ref2.project,
        _ref2$reinstall = _ref2.reinstall,
        reinstall = _ref2$reinstall === void 0 ? true : _ref2$reinstall;
    _logger__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].debug('开始安装', project.fullPath);
    var cwd = project.fullPath;
    var nodeModulesPaths = [];
    nodeModulesPaths.push(path__WEBPACK_IMPORTED_MODULE_2___default.a.join(project.clientPath, 'node_modules'));

    if (project.serverPath) {
      nodeModulesPaths.push(path__WEBPACK_IMPORTED_MODULE_2___default.a.join(project.serverPath, 'node_modules'));
    } // const nodeModulesPath = path.join(cwd, 'node_modules');


    new Promise(
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(resolve, reject) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (reinstall) {
                  _terms__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].writeln(cwd, '正在清理 node_modules 目录请稍等...');
                  rimraf__WEBPACK_IMPORTED_MODULE_4___default()(nodeModulesPaths[0], function (error) {
                    _logger__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].debug('node_modules 删除成功');

                    if (error) {
                      _terms__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].writeln(cwd, '清理 node_modules 失败');
                      reject(error);
                    } else {
                      var env = getEnv();
                      var registry = isAlibaba ? 'https://registry.npm.alibaba-inc.com/' : env.npm_config_registry;
                      _terms__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].writeln(cwd, '清理 node_modules 目录完成');
                      _terms__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].writeln(cwd, "\n\u5F53\u524D\u4E0B\u8F7D\u6E90\uFF1A".concat(registry, "\n"));

                      if (!isAlibaba && registry.indexOf('registry.npm.taobao.org') === -1) {
                        _terms__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].writeln(cwd, '推荐使用淘宝 NPM 镜像源 https://registry.npm.taobao.org 进行下载，可在设置面板进行设置\n');
                      }

                      resolve();
                    }
                  });
                } else {
                  resolve();
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2) {
        return _ref3.apply(this, arguments);
      };
    }()).then(function () {
      if (reinstall && nodeModulesPaths.length === 2) {
        return new Promise(
        /*#__PURE__*/
        function () {
          var _ref4 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2(resolve, reject) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    rimraf__WEBPACK_IMPORTED_MODULE_4___default()(nodeModulesPaths[1], function (error) {
                      if (error) {
                        _terms__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].writeln(cwd, '清理 node_modules 失败');
                        reject(error);
                      } else {
                        _terms__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].writeln(cwd, '清理 server/node_modules 目录完成');
                        resolve();
                      }
                    });

                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          return function (_x3, _x4) {
            return _ref4.apply(this, arguments);
          };
        }());
      }

      return Promise.resolve();
    }).catch(function (error) {
      var nodeModulesPath = nodeModulesPaths.join(';');
      callback(1, {
        title: '依赖清空失败',
        content: "\u6E05\u7406 node_modules \u76EE\u5F55\u5931\u8D25\uFF0C\u8BF7\u5C1D\u8BD5\u624B\u52A8\u5220\u9664 ".concat(nodeModulesPath, " ").concat(error.message)
      });
    }).then(function () {
      var env = getEnvByAli(isAlibaba);
      doProjectInstall({
        cwd: project.fullPath,
        env: env,
        shell: 'npm',
        callback: callback
      }, true);
    });
  }
});

/***/ }),

/***/ 676:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canUseDOM = undefined;

var _exenv = __webpack_require__(305);

var _exenv2 = _interopRequireDefault(_exenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EE = _exenv2.default;

var SafeHTMLElement = EE.canUseDOM ? window.HTMLElement : {};

var canUseDOM = exports.canUseDOM = EE.canUseDOM;

exports.default = SafeHTMLElement;

/***/ }),

/***/ 677:
/***/ (function(module, exports, __webpack_require__) {

module.exports = minimatch
minimatch.Minimatch = Minimatch

var path = { sep: '/' }
try {
  path = __webpack_require__(3)
} catch (er) {}

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
var expand = __webpack_require__(761)

var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
}

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]'

// * => any number of characters
var star = qmark + '*?'

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!')

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/

minimatch.filter = filter
function filter (pattern, options) {
  options = options || {}
  return function (p, i, list) {
    return minimatch(p, pattern, options)
  }
}

function ext (a, b) {
  a = a || {}
  b = b || {}
  var t = {}
  Object.keys(b).forEach(function (k) {
    t[k] = b[k]
  })
  Object.keys(a).forEach(function (k) {
    t[k] = a[k]
  })
  return t
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch

  var orig = minimatch

  var m = function minimatch (p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options))
  }

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  }

  return m
}

Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch
  return minimatch.defaults(def).Minimatch
}

function minimatch (p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === ''

  return new Minimatch(pattern, options).match(p)
}

function Minimatch (pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}
  pattern = pattern.trim()

  // windows support: need to use /, not \
  if (path.sep !== '/') {
    pattern = pattern.split(path.sep).join('/')
  }

  this.options = options
  this.set = []
  this.pattern = pattern
  this.regexp = null
  this.negate = false
  this.comment = false
  this.empty = false

  // make the set of regexps etc.
  this.make()
}

Minimatch.prototype.debug = function () {}

Minimatch.prototype.make = make
function make () {
  // don't do it more than once.
  if (this._made) return

  var pattern = this.pattern
  var options = this.options

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true
    return
  }
  if (!pattern) {
    this.empty = true
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate()

  // step 2: expand braces
  var set = this.globSet = this.braceExpand()

  if (options.debug) this.debug = console.error

  this.debug(this.pattern, set)

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  })

  this.debug(this.pattern, set)

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this)

  this.debug(this.pattern, set)

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  })

  this.debug(this.pattern, set)

  this.set = set
}

Minimatch.prototype.parseNegate = parseNegate
function parseNegate () {
  var pattern = this.pattern
  var negate = false
  var options = this.options
  var negateOffset = 0

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate
    negateOffset++
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset)
  this.negate = negate
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
}

Minimatch.prototype.braceExpand = braceExpand

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options
    } else {
      options = {}
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern')
  }

  if (options.nobrace ||
    !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return expand(pattern)
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch.prototype.parse = parse
var SUBPARSE = {}
function parse (pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long')
  }

  var options = this.options

  // shortcuts
  if (!options.noglobstar && pattern === '**') return GLOBSTAR
  if (pattern === '') return ''

  var re = ''
  var hasMagic = !!options.nocase
  var escaping = false
  // ? => one single character
  var patternListStack = []
  var negativeLists = []
  var stateChar
  var inClass = false
  var reClassStart = -1
  var classStart = -1
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)'
  var self = this

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star
          hasMagic = true
        break
        case '?':
          re += qmark
          hasMagic = true
        break
        default:
          re += '\\' + stateChar
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re)
      stateChar = false
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c)

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c
      escaping = false
      continue
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false

      case '\\':
        clearStateChar()
        escaping = true
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class')
          if (c === '!' && i === classStart + 1) c = '^'
          re += c
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar)
        clearStateChar()
        stateChar = c
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar()
      continue

      case '(':
        if (inClass) {
          re += '('
          continue
        }

        if (!stateChar) {
          re += '\\('
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        })
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
        this.debug('plType %j %j', stateChar, re)
        stateChar = false
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)'
          continue
        }

        clearStateChar()
        hasMagic = true
        var pl = patternListStack.pop()
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close
        if (pl.type === '!') {
          negativeLists.push(pl)
        }
        pl.reEnd = re.length
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|'
          escaping = false
          continue
        }

        clearStateChar()
        re += '|'
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar()

        if (inClass) {
          re += '\\' + c
          continue
        }

        inClass = true
        classStart = i
        reClassStart = re.length
        re += c
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c
          escaping = false
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i)
          try {
            RegExp('[' + cs + ']')
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE)
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
            hasMagic = hasMagic || sp[1]
            inClass = false
            continue
          }
        }

        // finish up the class.
        hasMagic = true
        inClass = false
        re += c
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar()

        if (escaping) {
          // no need
          escaping = false
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\'
        }

        re += c

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1)
    sp = this.parse(cs, SUBPARSE)
    re = re.substr(0, reClassStart) + '\\[' + sp[0]
    hasMagic = hasMagic || sp[1]
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length)
    this.debug('setting tail', re, pl)
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\'
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    })

    this.debug('tail=%j\n   %s', tail, tail, pl, re)
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type

    hasMagic = true
    re = re.slice(0, pl.reStart) + t + '\\(' + tail
  }

  // handle trailing things that only matter at the very end.
  clearStateChar()
  if (escaping) {
    // trailing \\
    re += '\\\\'
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(': addPatternStart = true
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n]

    var nlBefore = re.slice(0, nl.reStart)
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
    var nlAfter = re.slice(nl.reEnd)

    nlLast += nlAfter

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1
    var cleanAfter = nlAfter
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
    }
    nlAfter = cleanAfter

    var dollar = ''
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$'
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
    re = newRe
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re
  }

  if (addPatternStart) {
    re = patternStart + re
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : ''
  try {
    var regExp = new RegExp('^' + re + '$', flags)
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern
  regExp._src = re

  return regExp
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe()
}

Minimatch.prototype.makeRe = makeRe
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set

  if (!set.length) {
    this.regexp = false
    return this.regexp
  }
  var options = this.options

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot
  var flags = options.nocase ? 'i' : ''

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|')

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$'

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$'

  try {
    this.regexp = new RegExp(re, flags)
  } catch (ex) {
    this.regexp = false
  }
  return this.regexp
}

minimatch.match = function (list, pattern, options) {
  options = options || {}
  var mm = new Minimatch(pattern, options)
  list = list.filter(function (f) {
    return mm.match(f)
  })
  if (mm.options.nonull && !list.length) {
    list.push(pattern)
  }
  return list
}

Minimatch.prototype.match = match
function match (f, partial) {
  this.debug('match', f, this.pattern)
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options

  // windows: need to use /, not \
  if (path.sep !== '/') {
    f = f.split(path.sep).join('/')
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit)
  this.debug(this.pattern, 'split', f)

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set
  this.debug(this.pattern, 'set', set)

  // Find the basename of the path by looking for the last non-empty segment
  var filename
  var i
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i]
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i]
    var file = f
    if (options.matchBase && pattern.length === 1) {
      file = [filename]
    }
    var hit = this.matchOne(file, pattern, partial)
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern })

  this.debug('matchOne', file.length, pattern.length)

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop')
    var p = pattern[pi]
    var f = file[fi]

    this.debug(pattern, p, f)

    // should be impossible.
    // some invalid regexp stuff in the set.
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f])

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi
      var pr = pi + 1
      if (pr === pl) {
        this.debug('** at the end')
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr]

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee)
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr)
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue')
          fr++
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase()
      } else {
        hit = f === p
      }
      this.debug('string match', p, f, hit)
    } else {
      hit = f.match(p)
      this.debug('pattern match', p, f, hit)
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
    return emptyFileEnd
  }

  // should be unreachable.
  throw new Error('wtf?')
}

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}


/***/ }),

/***/ 678:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function posix(path) {
	return path.charAt(0) === '/';
}

function win32(path) {
	// https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
	var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
	var result = splitDeviceRe.exec(path);
	var device = result[1] || '';
	var isUnc = Boolean(device && device.charAt(1) !== ':');

	// UNC paths are always absolute
	return Boolean(result[2] || isUnc);
}

module.exports = process.platform === 'win32' ? win32 : posix;
module.exports.posix = posix;
module.exports.win32 = win32;


/***/ }),

/***/ 679:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _icedesign_base_lib_progress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(125);
/* harmony import */ var _icedesign_base_lib_progress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_icedesign_base_lib_progress__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _icedesign_base_lib_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(766);
/* harmony import */ var _icedesign_base_lib_overlay__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_icedesign_base_lib_overlay__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(81);
/* harmony import */ var _ExtraButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(665);
/* harmony import */ var _ProjectTerminal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(688);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(22);



var _dec, _class;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var Popup = _icedesign_base_lib_overlay__WEBPACK_IMPORTED_MODULE_1___default.a.Popup;
/**
 * 进度条
 */

var ProgressWrap = (_dec = Object(mobx_react__WEBPACK_IMPORTED_MODULE_4__[/* inject */ "b"])('progress', 'projects'), _dec(_class = Object(mobx_react__WEBPACK_IMPORTED_MODULE_4__[/* observer */ "c"])(_class =
/*#__PURE__*/
function (_Component) {
  _inherits(ProgressWrap, _Component);

  function ProgressWrap() {
    _classCallCheck(this, ProgressWrap);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProgressWrap).apply(this, arguments));
  }

  _createClass(ProgressWrap, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          projects = _this$props.projects,
          styleOffset = _this$props.styleOffset;
      var currentProject = projects.currentProject;
      var _this$props$progress = this.props.progress,
          visible = _this$props$progress.visible,
          showProgress = _this$props$progress.showProgress,
          showTerminal = _this$props$progress.showTerminal,
          statusText = _this$props$progress.statusText,
          progress = _this$props$progress.progress,
          progressSpeed = _this$props$progress.progressSpeed,
          progressRemaining = _this$props$progress.progressRemaining;

      if (!visible) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        style: {
          height: '24px',
          margin: '10px 0'
        }
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        style: {
          fontSize: '12px',
          color: '#2eca9c',
          lineHeight: '24px'
        }
      }, statusText, "..."), showTerminal && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Popup, {
        trigger: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ExtraButton__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
          placement: 'bottom',
          tipText: '查看依赖安装日志，点击切换',
          style: {
            float: 'right',
            fontSize: '12px'
          }
        }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Icon__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
          size: "small",
          type: "history"
        }), " \u8FD0\u884C\u65E5\u5FD7"),
        triggerType: "click",
        animation: false,
        align: "bl tl",
        offset: styleOffset || [-370, 0]
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        style: {
          border: '1px solid #999',
          padding: '10px',
          width: '600px',
          height: '300px',
          background: '#fff'
        }
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ProjectTerminal__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
        project: currentProject,
        visible: true,
        shwoClose: false,
        id: "terminal2",
        style: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          padding: 0
        }
      })))), showProgress && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_icedesign_base_lib_progress__WEBPACK_IMPORTED_MODULE_0___default.a, {
        style: {
          width: '40%'
        },
        showInfo: false,
        percent: progress,
        animation: false
      }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        style: {
          fontSize: 12,
          color: '#999',
          paddingLeft: 10
        }
      }, progress, "%"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        style: {
          fontSize: 12,
          color: '#999',
          paddingLeft: 10
        }
      }, progressSpeed, "/kbs"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
        style: {
          fontSize: 12,
          color: '#999',
          paddingLeft: 10
        }
      }, "\u5269\u4F59 ", progressRemaining, " s")));
    }
  }]);

  return ProgressWrap;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"])) || _class) || _class);
/* harmony default export */ __webpack_exports__["a"] = (ProgressWrap);

/***/ }),

/***/ 687:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BlockCategory___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(741);
/* harmony import */ var _BlockSlider___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(719);
/* harmony import */ var _EmptyTips___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(663);
var _class, _temp;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var Panel = Object(mobx_react__WEBPACK_IMPORTED_MODULE_0__[/* observer */ "c"])(_class = (_temp =
/*#__PURE__*/
function (_Component) {
  _inherits(Panel, _Component);

  function Panel(props) {
    var _this;

    _classCallCheck(this, Panel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Panel).call(this, props));

    _this.handleCategorySlideChange = function (index) {
      var id = '#' + _this.idPrefix + index;
      var title = document.querySelector(id);
      title.scrollIntoView({
        behavior: 'instant',
        block: 'start',
        inline: 'start'
      });
    };

    _this.idPrefix = 'Block-' + Date.now().toString(32) + '-';
    return _this;
  }

  _createClass(Panel, [{
    key: "render",
    value: function render() {
      var _this$props$material = this.props.material,
          material = _this$props$material === void 0 ? {} : _this$props$material;
      var blocks = material && material.blocks || null;

      if (material.error) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_EmptyTips___WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
          size: 120,
          style: {
            margin: '0 10px'
          }
        }, material.error);
      }

      if (!blocks) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_EmptyTips___WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
          size: 120
        }, "\u52A0\u8F7D\u4E2D...");
      }

      if (Array.isArray(blocks.values) && blocks.values.length === 0) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            padding: 10
          }
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_EmptyTips___WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
          size: 120
        }, "\u5F53\u524D\u7269\u6599\u6E90\u6682\u65E0\u533A\u5757"));
      }

      var blocksWithCategory = blocks.blocksWithCategory;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: styles.wrapper
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_BlockSlider___WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
        onClick: this.handleCategorySlideChange,
        blocksWithCategory: blocksWithCategory
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_BlockCategory___WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
        idPrefix: this.idPrefix,
        blocksWithCategory: blocksWithCategory
      }));
    }
  }]);

  return Panel;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]), _temp)) || _class;

var styles = {
  wrapper: {
    display: 'flex',
    flex: 'auto',
    overflow: 'hidden',
    position: 'relative',
    flexDirection: 'column'
  }
};
/* harmony default export */ __webpack_exports__["a"] = (Panel);

/***/ }),

/***/ 688:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _icedesign_base_lib_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65);
/* harmony import */ var _icedesign_base_lib_button__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_icedesign_base_lib_button__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ExtraButton___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(665);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
/* harmony import */ var _terms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(102);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(704);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_6__);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var ProjectTerminal =
/*#__PURE__*/
function (_Component) {
  _inherits(ProjectTerminal, _Component);

  function ProjectTerminal(props) {
    var _this;

    _classCallCheck(this, ProjectTerminal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ProjectTerminal).call(this, props));

    _this.clearLogs = function () {
      _terms__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].getTerm(_this.state.path).clear();
    };

    _this.handleResize = function () {
      clearTimeout(_this.timer);
      _this.timer = setTimeout(function () {
        _this.setTerminalSize();
      }, 1000 / 30);
    };

    _this.state = {
      path: props.project.fullPath
    };
    return _this;
  }

  _createClass(ProjectTerminal, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (nextProps.project.fullPath !== this.state.path) {
        this.setState({
          path: nextProps.project.fullPath
        }, function () {
          _this2.createTerm();
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.createTerm();
      window.addEventListener('resize', this.handleResize);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      window.removeEventListener('resize', this.handleResize);
    }
  }, {
    key: "createTerm",
    value: function createTerm() {
      var id = this.props.id;
      var terminalContainer = document.getElementById(id);
      terminalContainer.innerHTML = '';
      _terms__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].new(this.state.path, terminalContainer);
    }
  }, {
    key: "setTerminalSize",
    value: function setTerminalSize() {
      var id = this.props.id;
      var container = document.getElementById(id);

      if (!container) {
        return null;
      }

      var _container$getBoundin = container.getBoundingClientRect(),
          width = _container$getBoundin.width,
          height = _container$getBoundin.height;

      var charMeasure = _terms__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].getTerm(this.state.path).charMeasure;
      var cols = Math.floor(width / (charMeasure.width || 9.015625));
      var rows = Math.floor(height / 21);
      _terms__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].resize(this.state.path, cols, rows);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          style = _this$props.style,
          id = _this$props.id,
          closeLogs = _this$props.closeLogs,
          shwoClose = _this$props.shwoClose;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "project-terminal-wrapper",
        style: _objectSpread({
          zIndex: this.props.visible ? '0' : '-1'
        }, style)
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "buttons"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ExtraButton___WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
        onClick: this.clearLogs,
        tipText: '清空当前日志',
        style: {
          color: '#eee',
          marginRight: 10
        }
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Icon__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
        type: "clear",
        size: "small"
      })), shwoClose && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_icedesign_base_lib_button__WEBPACK_IMPORTED_MODULE_0___default.a, {
        type: "dark",
        shape: "ghost",
        onClick: closeLogs
      }, "\u8FD4\u56DE\u5DE5\u4F5C\u53F0") // <ExtraButton
      //   onClick={closeLogs}
      //   tipText={'关闭日志面板'}
      //   style={{ color: '#eee' }}
      // >
      //   <Icon type="close" />
      // </ExtraButton>
      ), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        id: id,
        className: "project-terminal"
      }));
    }
  }]);

  return ProjectTerminal;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

ProjectTerminal.propTypes = {
  id: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  style: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
  closeLogs: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  shwoClose: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool
};
ProjectTerminal.defaultProps = {
  id: 'terminal',
  style: {},
  closeLogs: function closeLogs() {},
  shwoClose: true
};
/* harmony default export */ __webpack_exports__["a"] = (ProjectTerminal);

/***/ }),

/***/ 693:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 694:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Modal = __webpack_require__(749);

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Modal2.default;
module.exports = exports["default"];

/***/ }),

/***/ 695:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findTabbableDescendants;
/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */

var tabbableNode = /input|select|textarea|button|object/;

function hidesContents(element) {
  var zeroSize = element.offsetWidth <= 0 && element.offsetHeight <= 0;

  // If the node is empty, this is good enough
  if (zeroSize && !element.innerHTML) return true;

  // Otherwise we need to check some styles
  var style = window.getComputedStyle(element);
  return zeroSize ? style.getPropertyValue("overflow") !== "visible" : style.getPropertyValue("display") == "none";
}

function visible(element) {
  var parentElement = element;
  while (parentElement) {
    if (parentElement === document.body) break;
    if (hidesContents(parentElement)) return false;
    parentElement = parentElement.parentNode;
  }
  return true;
}

function focusable(element, isTabIndexNotNaN) {
  var nodeName = element.nodeName.toLowerCase();
  var res = tabbableNode.test(nodeName) && !element.disabled || (nodeName === "a" ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);
  return res && visible(element);
}

function tabbable(element) {
  var tabIndex = element.getAttribute("tabindex");
  if (tabIndex === null) tabIndex = undefined;
  var isTabIndexNaN = isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
}

function findTabbableDescendants(element) {
  return [].slice.call(element.querySelectorAll("*"), 0).filter(tabbable);
}
module.exports = exports["default"];

/***/ }),

/***/ 696:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertNodeList = assertNodeList;
exports.setElement = setElement;
exports.validateElement = validateElement;
exports.hide = hide;
exports.show = show;
exports.documentNotReadyOrSSRTesting = documentNotReadyOrSSRTesting;
exports.resetForTesting = resetForTesting;

var _warning = __webpack_require__(175);

var _warning2 = _interopRequireDefault(_warning);

var _safeHTMLElement = __webpack_require__(676);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalElement = null;

function assertNodeList(nodeList, selector) {
  if (!nodeList || !nodeList.length) {
    throw new Error("react-modal: No elements were found for selector " + selector + ".");
  }
}

function setElement(element) {
  var useElement = element;
  if (typeof useElement === "string" && _safeHTMLElement.canUseDOM) {
    var el = document.querySelectorAll(useElement);
    assertNodeList(el, useElement);
    useElement = "length" in el ? el[0] : el;
  }
  globalElement = useElement || globalElement;
  return globalElement;
}

function validateElement(appElement) {
  if (!appElement && !globalElement) {
    (0, _warning2.default)(false, ["react-modal: App element is not defined.", "Please use `Modal.setAppElement(el)` or set `appElement={el}`.", "This is needed so screen readers don't see main content", "when modal is opened. It is not recommended, but you can opt-out", "by setting `ariaHideApp={false}`."].join(" "));

    return false;
  }

  return true;
}

function hide(appElement) {
  if (validateElement(appElement)) {
    (appElement || globalElement).setAttribute("aria-hidden", "true");
  }
}

function show(appElement) {
  if (validateElement(appElement)) {
    (appElement || globalElement).removeAttribute("aria-hidden");
  }
}

function documentNotReadyOrSSRTesting() {
  globalElement = null;
}

function resetForTesting() {
  globalElement = null;
}

/***/ }),

/***/ 698:
/***/ (function(module, exports, __webpack_require__) {

// Approach:
//
// 1. Get the minimatch set
// 2. For each pattern in the set, PROCESS(pattern, false)
// 3. Store matches per-set, then uniq them
//
// PROCESS(pattern, inGlobStar)
// Get the first [n] items from pattern that are all strings
// Join these together.  This is PREFIX.
//   If there is no more remaining, then stat(PREFIX) and
//   add to matches if it succeeds.  END.
//
// If inGlobStar and PREFIX is symlink and points to dir
//   set ENTRIES = []
// else readdir(PREFIX) as ENTRIES
//   If fail, END
//
// with ENTRIES
//   If pattern[n] is GLOBSTAR
//     // handle the case where the globstar match is empty
//     // by pruning it out, and testing the resulting pattern
//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
//     // handle other cases.
//     for ENTRY in ENTRIES (not dotfiles)
//       // attach globstar + tail onto the entry
//       // Mark that this entry is a globstar match
//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
//
//   else // not globstar
//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
//       Test ENTRY against pattern[n]
//       If fails, continue
//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
//
// Caveat:
//   Cache all stats and readdirs results to minimize syscall.  Since all
//   we ever care about is existence and directory-ness, we can just keep
//   `true` for files, and [children,...] for directories, or `false` for
//   things that don't exist.

module.exports = glob

var fs = __webpack_require__(11)
var rp = __webpack_require__(699)
var minimatch = __webpack_require__(677)
var Minimatch = minimatch.Minimatch
var inherits = __webpack_require__(84)
var EE = __webpack_require__(32).EventEmitter
var path = __webpack_require__(3)
var assert = __webpack_require__(49)
var isAbsolute = __webpack_require__(678)
var globSync = __webpack_require__(764)
var common = __webpack_require__(700)
var alphasort = common.alphasort
var alphasorti = common.alphasorti
var setopts = common.setopts
var ownProp = common.ownProp
var inflight = __webpack_require__(765)
var util = __webpack_require__(10)
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

var once = __webpack_require__(702)

function glob (pattern, options, cb) {
  if (typeof options === 'function') cb = options, options = {}
  if (!options) options = {}

  if (options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return globSync(pattern, options)
  }

  return new Glob(pattern, options, cb)
}

glob.sync = globSync
var GlobSync = glob.GlobSync = globSync.GlobSync

// old api surface
glob.glob = glob

function extend (origin, add) {
  if (add === null || typeof add !== 'object') {
    return origin
  }

  var keys = Object.keys(add)
  var i = keys.length
  while (i--) {
    origin[keys[i]] = add[keys[i]]
  }
  return origin
}

glob.hasMagic = function (pattern, options_) {
  var options = extend({}, options_)
  options.noprocess = true

  var g = new Glob(pattern, options)
  var set = g.minimatch.set

  if (!pattern)
    return false

  if (set.length > 1)
    return true

  for (var j = 0; j < set[0].length; j++) {
    if (typeof set[0][j] !== 'string')
      return true
  }

  return false
}

glob.Glob = Glob
inherits(Glob, EE)
function Glob (pattern, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = null
  }

  if (options && options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return new GlobSync(pattern, options)
  }

  if (!(this instanceof Glob))
    return new Glob(pattern, options, cb)

  setopts(this, pattern, options)
  this._didRealPath = false

  // process each pattern in the minimatch set
  var n = this.minimatch.set.length

  // The matches are stored as {<filename>: true,...} so that
  // duplicates are automagically pruned.
  // Later, we do an Object.keys() on these.
  // Keep them as a list so we can fill in when nonull is set.
  this.matches = new Array(n)

  if (typeof cb === 'function') {
    cb = once(cb)
    this.on('error', cb)
    this.on('end', function (matches) {
      cb(null, matches)
    })
  }

  var self = this
  this._processing = 0

  this._emitQueue = []
  this._processQueue = []
  this.paused = false

  if (this.noprocess)
    return this

  if (n === 0)
    return done()

  var sync = true
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false, done)
  }
  sync = false

  function done () {
    --self._processing
    if (self._processing <= 0) {
      if (sync) {
        process.nextTick(function () {
          self._finish()
        })
      } else {
        self._finish()
      }
    }
  }
}

Glob.prototype._finish = function () {
  assert(this instanceof Glob)
  if (this.aborted)
    return

  if (this.realpath && !this._didRealpath)
    return this._realpath()

  common.finish(this)
  this.emit('end', this.found)
}

Glob.prototype._realpath = function () {
  if (this._didRealpath)
    return

  this._didRealpath = true

  var n = this.matches.length
  if (n === 0)
    return this._finish()

  var self = this
  for (var i = 0; i < this.matches.length; i++)
    this._realpathSet(i, next)

  function next () {
    if (--n === 0)
      self._finish()
  }
}

Glob.prototype._realpathSet = function (index, cb) {
  var matchset = this.matches[index]
  if (!matchset)
    return cb()

  var found = Object.keys(matchset)
  var self = this
  var n = found.length

  if (n === 0)
    return cb()

  var set = this.matches[index] = Object.create(null)
  found.forEach(function (p, i) {
    // If there's a problem with the stat, then it means that
    // one or more of the links in the realpath couldn't be
    // resolved.  just return the abs value in that case.
    p = self._makeAbs(p)
    rp.realpath(p, self.realpathCache, function (er, real) {
      if (!er)
        set[real] = true
      else if (er.syscall === 'stat')
        set[p] = true
      else
        self.emit('error', er) // srsly wtf right here

      if (--n === 0) {
        self.matches[index] = set
        cb()
      }
    })
  })
}

Glob.prototype._mark = function (p) {
  return common.mark(this, p)
}

Glob.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}

Glob.prototype.abort = function () {
  this.aborted = true
  this.emit('abort')
}

Glob.prototype.pause = function () {
  if (!this.paused) {
    this.paused = true
    this.emit('pause')
  }
}

Glob.prototype.resume = function () {
  if (this.paused) {
    this.emit('resume')
    this.paused = false
    if (this._emitQueue.length) {
      var eq = this._emitQueue.slice(0)
      this._emitQueue.length = 0
      for (var i = 0; i < eq.length; i ++) {
        var e = eq[i]
        this._emitMatch(e[0], e[1])
      }
    }
    if (this._processQueue.length) {
      var pq = this._processQueue.slice(0)
      this._processQueue.length = 0
      for (var i = 0; i < pq.length; i ++) {
        var p = pq[i]
        this._processing--
        this._process(p[0], p[1], p[2], p[3])
      }
    }
  }
}

Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
  assert(this instanceof Glob)
  assert(typeof cb === 'function')

  if (this.aborted)
    return

  this._processing++
  if (this.paused) {
    this._processQueue.push([pattern, index, inGlobStar, cb])
    return
  }

  //console.error('PROCESS %d', this._processing, pattern)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // see if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index, cb)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip _processing
  if (childrenIgnored(this, read))
    return cb()

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)
}

Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}

Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return cb()

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return cb()

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return cb()
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix) {
      if (prefix !== '/')
        e = prefix + '/' + e
      else
        e = prefix + e
    }
    this._process([e].concat(remain), index, inGlobStar, cb)
  }
  cb()
}

Glob.prototype._emitMatch = function (index, e) {
  if (this.aborted)
    return

  if (isIgnored(this, e))
    return

  if (this.paused) {
    this._emitQueue.push([index, e])
    return
  }

  var abs = isAbsolute(e) ? e : this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute)
    e = abs

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  var st = this.statCache[abs]
  if (st)
    this.emit('stat', e, st)

  this.emit('match', e)
}

Glob.prototype._readdirInGlobStar = function (abs, cb) {
  if (this.aborted)
    return

  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false, cb)

  var lstatkey = 'lstat\0' + abs
  var self = this
  var lstatcb = inflight(lstatkey, lstatcb_)

  if (lstatcb)
    fs.lstat(abs, lstatcb)

  function lstatcb_ (er, lstat) {
    if (er && er.code === 'ENOENT')
      return cb()

    var isSym = lstat && lstat.isSymbolicLink()
    self.symlinks[abs] = isSym

    // If it's not a symlink or a dir, then it's definitely a regular file.
    // don't bother doing a readdir in that case.
    if (!isSym && lstat && !lstat.isDirectory()) {
      self.cache[abs] = 'FILE'
      cb()
    } else
      self._readdir(abs, false, cb)
  }
}

Glob.prototype._readdir = function (abs, inGlobStar, cb) {
  if (this.aborted)
    return

  cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb)
  if (!cb)
    return

  //console.error('RD %j %j', +inGlobStar, abs)
  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs, cb)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return cb()

    if (Array.isArray(c))
      return cb(null, c)
  }

  var self = this
  fs.readdir(abs, readdirCb(this, abs, cb))
}

function readdirCb (self, abs, cb) {
  return function (er, entries) {
    if (er)
      self._readdirError(abs, er, cb)
    else
      self._readdirEntries(abs, entries, cb)
  }
}

Glob.prototype._readdirEntries = function (abs, entries, cb) {
  if (this.aborted)
    return

  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries
  return cb(null, entries)
}

Glob.prototype._readdirError = function (f, er, cb) {
  if (this.aborted)
    return

  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        this.emit('error', error)
        this.abort()
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict) {
        this.emit('error', er)
        // If the error is handled, then we abort
        // if not, we threw out of here
        this.abort()
      }
      if (!this.silent)
        console.error('glob error', er)
      break
  }

  return cb()
}

Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}


Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
  //console.error('pgs2', prefix, remain[0], entries)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return cb()

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false, cb)

  var isSym = this.symlinks[abs]
  var len = entries.length

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return cb()

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true, cb)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true, cb)
  }

  cb()
}

Glob.prototype._processSimple = function (prefix, index, cb) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var self = this
  this._stat(prefix, function (er, exists) {
    self._processSimple2(prefix, index, er, exists, cb)
  })
}
Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

  //console.error('ps2', prefix, exists)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return cb()

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
  cb()
}

// Returns either 'DIR', 'FILE', or false
Glob.prototype._stat = function (f, cb) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return cb()

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return cb(null, c)

    if (needDir && c === 'FILE')
      return cb()

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (stat !== undefined) {
    if (stat === false)
      return cb(null, stat)
    else {
      var type = stat.isDirectory() ? 'DIR' : 'FILE'
      if (needDir && type === 'FILE')
        return cb()
      else
        return cb(null, type, stat)
    }
  }

  var self = this
  var statcb = inflight('stat\0' + abs, lstatcb_)
  if (statcb)
    fs.lstat(abs, statcb)

  function lstatcb_ (er, lstat) {
    if (lstat && lstat.isSymbolicLink()) {
      // If it's a symlink, then treat it as the target, unless
      // the target does not exist, then treat it as a file.
      return fs.stat(abs, function (er, stat) {
        if (er)
          self._stat2(f, abs, null, lstat, cb)
        else
          self._stat2(f, abs, er, stat, cb)
      })
    } else {
      self._stat2(f, abs, er, lstat, cb)
    }
  }
}

Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
  if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
    this.statCache[abs] = false
    return cb()
  }

  var needDir = f.slice(-1) === '/'
  this.statCache[abs] = stat

  if (abs.slice(-1) === '/' && stat && !stat.isDirectory())
    return cb(null, false, stat)

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'
  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return cb()

  return cb(null, c, stat)
}


/***/ }),

/***/ 699:
/***/ (function(module, exports, __webpack_require__) {

module.exports = realpath
realpath.realpath = realpath
realpath.sync = realpathSync
realpath.realpathSync = realpathSync
realpath.monkeypatch = monkeypatch
realpath.unmonkeypatch = unmonkeypatch

var fs = __webpack_require__(11)
var origRealpath = fs.realpath
var origRealpathSync = fs.realpathSync

var version = process.version
var ok = /^v[0-5]\./.test(version)
var old = __webpack_require__(760)

function newError (er) {
  return er && er.syscall === 'realpath' && (
    er.code === 'ELOOP' ||
    er.code === 'ENOMEM' ||
    er.code === 'ENAMETOOLONG'
  )
}

function realpath (p, cache, cb) {
  if (ok) {
    return origRealpath(p, cache, cb)
  }

  if (typeof cache === 'function') {
    cb = cache
    cache = null
  }
  origRealpath(p, cache, function (er, result) {
    if (newError(er)) {
      old.realpath(p, cache, cb)
    } else {
      cb(er, result)
    }
  })
}

function realpathSync (p, cache) {
  if (ok) {
    return origRealpathSync(p, cache)
  }

  try {
    return origRealpathSync(p, cache)
  } catch (er) {
    if (newError(er)) {
      return old.realpathSync(p, cache)
    } else {
      throw er
    }
  }
}

function monkeypatch () {
  fs.realpath = realpath
  fs.realpathSync = realpathSync
}

function unmonkeypatch () {
  fs.realpath = origRealpath
  fs.realpathSync = origRealpathSync
}


/***/ }),

/***/ 700:
/***/ (function(module, exports, __webpack_require__) {

exports.alphasort = alphasort
exports.alphasorti = alphasorti
exports.setopts = setopts
exports.ownProp = ownProp
exports.makeAbs = makeAbs
exports.finish = finish
exports.mark = mark
exports.isIgnored = isIgnored
exports.childrenIgnored = childrenIgnored

function ownProp (obj, field) {
  return Object.prototype.hasOwnProperty.call(obj, field)
}

var path = __webpack_require__(3)
var minimatch = __webpack_require__(677)
var isAbsolute = __webpack_require__(678)
var Minimatch = minimatch.Minimatch

function alphasorti (a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase())
}

function alphasort (a, b) {
  return a.localeCompare(b)
}

function setupIgnores (self, options) {
  self.ignore = options.ignore || []

  if (!Array.isArray(self.ignore))
    self.ignore = [self.ignore]

  if (self.ignore.length) {
    self.ignore = self.ignore.map(ignoreMap)
  }
}

// ignore patterns are always in dot:true mode.
function ignoreMap (pattern) {
  var gmatcher = null
  if (pattern.slice(-3) === '/**') {
    var gpattern = pattern.replace(/(\/\*\*)+$/, '')
    gmatcher = new Minimatch(gpattern, { dot: true })
  }

  return {
    matcher: new Minimatch(pattern, { dot: true }),
    gmatcher: gmatcher
  }
}

function setopts (self, pattern, options) {
  if (!options)
    options = {}

  // base-matching: just use globstar for that.
  if (options.matchBase && -1 === pattern.indexOf("/")) {
    if (options.noglobstar) {
      throw new Error("base matching requires globstar")
    }
    pattern = "**/" + pattern
  }

  self.silent = !!options.silent
  self.pattern = pattern
  self.strict = options.strict !== false
  self.realpath = !!options.realpath
  self.realpathCache = options.realpathCache || Object.create(null)
  self.follow = !!options.follow
  self.dot = !!options.dot
  self.mark = !!options.mark
  self.nodir = !!options.nodir
  if (self.nodir)
    self.mark = true
  self.sync = !!options.sync
  self.nounique = !!options.nounique
  self.nonull = !!options.nonull
  self.nosort = !!options.nosort
  self.nocase = !!options.nocase
  self.stat = !!options.stat
  self.noprocess = !!options.noprocess
  self.absolute = !!options.absolute

  self.maxLength = options.maxLength || Infinity
  self.cache = options.cache || Object.create(null)
  self.statCache = options.statCache || Object.create(null)
  self.symlinks = options.symlinks || Object.create(null)

  setupIgnores(self, options)

  self.changedCwd = false
  var cwd = process.cwd()
  if (!ownProp(options, "cwd"))
    self.cwd = cwd
  else {
    self.cwd = path.resolve(options.cwd)
    self.changedCwd = self.cwd !== cwd
  }

  self.root = options.root || path.resolve(self.cwd, "/")
  self.root = path.resolve(self.root)
  if (process.platform === "win32")
    self.root = self.root.replace(/\\/g, "/")

  // TODO: is an absolute `cwd` supposed to be resolved against `root`?
  // e.g. { cwd: '/test', root: __dirname } === path.join(__dirname, '/test')
  self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd)
  if (process.platform === "win32")
    self.cwdAbs = self.cwdAbs.replace(/\\/g, "/")
  self.nomount = !!options.nomount

  // disable comments and negation in Minimatch.
  // Note that they are not supported in Glob itself anyway.
  options.nonegate = true
  options.nocomment = true

  self.minimatch = new Minimatch(pattern, options)
  self.options = self.minimatch.options
}

function finish (self) {
  var nou = self.nounique
  var all = nou ? [] : Object.create(null)

  for (var i = 0, l = self.matches.length; i < l; i ++) {
    var matches = self.matches[i]
    if (!matches || Object.keys(matches).length === 0) {
      if (self.nonull) {
        // do like the shell, and spit out the literal glob
        var literal = self.minimatch.globSet[i]
        if (nou)
          all.push(literal)
        else
          all[literal] = true
      }
    } else {
      // had matches
      var m = Object.keys(matches)
      if (nou)
        all.push.apply(all, m)
      else
        m.forEach(function (m) {
          all[m] = true
        })
    }
  }

  if (!nou)
    all = Object.keys(all)

  if (!self.nosort)
    all = all.sort(self.nocase ? alphasorti : alphasort)

  // at *some* point we statted all of these
  if (self.mark) {
    for (var i = 0; i < all.length; i++) {
      all[i] = self._mark(all[i])
    }
    if (self.nodir) {
      all = all.filter(function (e) {
        var notDir = !(/\/$/.test(e))
        var c = self.cache[e] || self.cache[makeAbs(self, e)]
        if (notDir && c)
          notDir = c !== 'DIR' && !Array.isArray(c)
        return notDir
      })
    }
  }

  if (self.ignore.length)
    all = all.filter(function(m) {
      return !isIgnored(self, m)
    })

  self.found = all
}

function mark (self, p) {
  var abs = makeAbs(self, p)
  var c = self.cache[abs]
  var m = p
  if (c) {
    var isDir = c === 'DIR' || Array.isArray(c)
    var slash = p.slice(-1) === '/'

    if (isDir && !slash)
      m += '/'
    else if (!isDir && slash)
      m = m.slice(0, -1)

    if (m !== p) {
      var mabs = makeAbs(self, m)
      self.statCache[mabs] = self.statCache[abs]
      self.cache[mabs] = self.cache[abs]
    }
  }

  return m
}

// lotta situps...
function makeAbs (self, f) {
  var abs = f
  if (f.charAt(0) === '/') {
    abs = path.join(self.root, f)
  } else if (isAbsolute(f) || f === '') {
    abs = f
  } else if (self.changedCwd) {
    abs = path.resolve(self.cwd, f)
  } else {
    abs = path.resolve(f)
  }

  if (process.platform === 'win32')
    abs = abs.replace(/\\/g, '/')

  return abs
}


// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
function isIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
  })
}

function childrenIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return !!(item.gmatcher && item.gmatcher.match(path))
  })
}


/***/ }),

/***/ 701:
/***/ (function(module, exports) {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),

/***/ 702:
/***/ (function(module, exports, __webpack_require__) {

var wrappy = __webpack_require__(701)
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),

/***/ 703:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 704:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 705:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CateMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(706);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var CateMenu =
/*#__PURE__*/
function (_Component) {
  _inherits(CateMenu, _Component);

  function CateMenu(props) {
    var _this;

    _classCallCheck(this, CateMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CateMenu).call(this, props));

    _this.handleClick = function (index, value) {
      _this.setState({
        activeIndex: index
      }, function () {
        _this.props.onClick(value);
      });
    };

    _this.state = {
      activeIndex: props.defaultActiveKey
    };
    return _this;
  }

  _createClass(CateMenu, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var data = this.props.data;
      var activeIndex = this.state.activeIndex;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "scaffold-cate-menu"
      }, data.map(function (item, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: index,
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('scaffold-cate-menu-item', {
            active: activeIndex === index
          }),
          onClick: function onClick() {
            return _this2.handleClick(index, item);
          }
        }, item);
      }));
    }
  }]);

  return CateMenu;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

CateMenu.displayName = 'CateMenu';
CateMenu.propTypes = {
  defaultActiveKey: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  data: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
  onCick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func
};
CateMenu.defaultProps = {
  defaultActiveKey: 0,
  data: [],
  onCick: function onCick() {}
};


/***/ }),

/***/ 706:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 718:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(755);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var DEFAULT_APP_WIDTH = 890;

var BlockSlider =
/*#__PURE__*/
function (_Component) {
  _inherits(BlockSlider, _Component);

  function BlockSlider() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, BlockSlider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(BlockSlider)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      visible: false
    };
    _this.containerRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();

    _this.init = function () {
      if (window.innerWidth > DEFAULT_APP_WIDTH) {
        _this.setState({
          visible: true
        });
      }
    };

    _this.handleMouseenter = function () {
      _this.setState({
        visible: true
      });
    };

    _this.handleMouseleave = function () {
      _this.setState({
        visible: false
      });
    };

    _this.handleResize = function () {
      var visible = _this.state.visible;

      if (window.innerWidth > DEFAULT_APP_WIDTH) {
        visible = true;
      } else {
        visible = false;
      }

      _this.setState({
        visible: visible
      });
    };

    return _this;
  }

  _createClass(BlockSlider, [{
    key: "handleClick",
    value: function handleClick(index) {
      var onClick = this.props.onClick;

      if ('function' === typeof onClick) {
        onClick(index);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      this.containerRef.current.addEventListener('mouseenter', this.handleMouseenter);
      this.containerRef.current.addEventListener('mouseleave', this.handleMouseleave);
      this.init();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
      this.containerRef.current.removeEventListener('mouseenter', this.handleMouseenter);
      this.containerRef.current.removeEventListener('mouseleave', this.handleMouseleave);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var blocksWithCategory = this.props.blocksWithCategory;
      var visible = this.state.visible;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        ref: this.containerRef,
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('block-slider', {
          'block-slider-visible': visible
        })
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "block-slider-trigger"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "block-category-nav"
      }, blocksWithCategory.map(function (_ref, index) {
        var category = _ref.category,
            blocks = _ref.blocks;

        if (blocks.length === 0) {
          return null;
        }

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          onClick: _this2.handleClick.bind(_this2, index),
          key: index
        }, category);
      })));
    }
  }]);

  return BlockSlider;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (BlockSlider);

/***/ }),

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomBlock; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rc_tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(99);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(693);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(81);
var _dec, _class, _temp;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var CustomBlock = (_dec = Object(mobx_react__WEBPACK_IMPORTED_MODULE_4__[/* inject */ "b"])('customBlocks'), _dec(_class = Object(mobx_react__WEBPACK_IMPORTED_MODULE_4__[/* observer */ "c"])(_class = (_temp =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomBlock, _Component);

  function CustomBlock() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CustomBlock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CustomBlock)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleClick = function () {
      if (typeof _this.props.onClick === 'function') {
        _this.props.onClick(_this.props.block, _this.props.blockName);
      }
    };

    _this.openBlockImgPreview = function (event) {
      event.stopPropagation();
      var _this$props = _this.props,
          customBlocks = _this$props.customBlocks,
          blockName = _this$props.blockName;
      customBlocks.openModal(blockName);
    };

    return _this;
  }

  _createClass(CustomBlock, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          block = _this$props2.block,
          blockName = _this$props2.blockName;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "block",
        onClick: this.handleClick
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "screenshot"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        className: "custom-screenshot-img",
        src: 'data:image/png;base64,' + this.props.customBlocks.getBlockImg(blockName)
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "title-wrapper"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "title"
      }, block.alias), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "class-name"
      }, blockName)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "preview",
        onClick: this.openBlockImgPreview
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(rc_tooltip__WEBPACK_IMPORTED_MODULE_1__["default"], {
        placement: 'bottom',
        overlay: '预览效果图'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Icon__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
        type: "02magnifyingglasspluszoom"
      })))));
    }
  }]);

  return CustomBlock;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]), _temp)) || _class) || _class);


/***/ }),

/***/ 721:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 741:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./renderer/node_modules/mobx-react/index.module.js
var index_module = __webpack_require__(81);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(2);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: external "window.React"
var external_window_React_ = __webpack_require__(1);
var external_window_React_default = /*#__PURE__*/__webpack_require__.n(external_window_React_);

// EXTERNAL MODULE: ./renderer/node_modules/rc-tooltip/es/index.js + 28 modules
var es = __webpack_require__(99);

// EXTERNAL MODULE: ./renderer/src/external.js
var external = __webpack_require__(179);

// EXTERNAL MODULE: ./renderer/src/components/Icon/index.jsx
var Icon = __webpack_require__(22);

// EXTERNAL MODULE: ./renderer/node_modules/react-in-viewport/dist/es/index.js
var dist_es = __webpack_require__(717);

// EXTERNAL MODULE: ./renderer/src/components/Block/index.scss
var components_Block = __webpack_require__(693);

// CONCATENATED MODULE: ./renderer/src/components/Block/Block.jsx
var _dec, _class, _class2, _temp;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










function withAlicdnImage(url) {
  if (url && url.indexOf('img.alicdn.com') !== -1) {
    return url + '_250x250.jpg';
  }

  return url;
}

var Block_Block = (_dec = Object(index_module["b" /* inject */])('blocks'), _dec(_class = Object(index_module["c" /* observer */])(_class = (_temp = _class2 =
/*#__PURE__*/
function (_Component) {
  _inherits(Block, _Component);

  function Block() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Block);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Block)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleClick = function () {
      _this.props.handleBlocksAdd(_this.props.block);
    };

    _this.createPageOpener = function (url) {
      return function () {
        Object(external["a" /* openInBrowser */])(url);
      };
    };

    _this.openBlockImgPreview = function (event) {
      event.stopPropagation();
      var _this$props = _this.props,
          blocks = _this$props.blocks,
          block = _this$props.block;
      blocks.openModal(block);
    };

    _this.openBlockOnlinePreview = function (event) {
      event.stopPropagation();
      var block = _this.props.block;
      Object(external["a" /* openInBrowser */])(block.homepage);
    };

    _this.openBlockGithub = function (event) {
      event.stopPropagation();
      var block = _this.props.block;
      Object(external["a" /* openInBrowser */])(block.repository);
    };

    return _this;
  }

  _createClass(Block, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          block = _this$props2.block,
          _this$props2$originKe = _this$props2.originKeywords,
          originKeywords = _this$props2$originKe === void 0 ? '' : _this$props2$originKe,
          innerRef = _this$props2.innerRef,
          enterCount = _this$props2.enterCount;
      var title = block.title;
      var name = block.name;

      if (originKeywords) {
        var keys = originKeywords.split(/\s+/).filter(Boolean);
        var matchRegex = new RegExp(keys.join('|'), 'gi');
        title = title.replace(matchRegex, function (str) {
          return "<span style=\"color: #ffa000\">".concat(str, "</span>");
        });
        name = name.replace(matchRegex, function (str) {
          return "<span style=\"color: #ffa000\">".concat(str, "</span>");
        });
      }

      return external_window_React_default.a.createElement("div", {
        className: "block",
        onClick: this.handleClick,
        ref: innerRef
      }, external_window_React_default.a.createElement("div", {
        className: "screenshot"
      }, enterCount > 0 && external_window_React_default.a.createElement("div", {
        className: "screenshot-img",
        style: {
          backgroundImage: "url(".concat(withAlicdnImage(block.screenshot), ")")
        }
      })), enterCount > 0 && external_window_React_default.a.createElement("div", {
        className: "title-wrapper"
      }, external_window_React_default.a.createElement("div", {
        className: "title-body"
      }, external_window_React_default.a.createElement("div", {
        className: "title",
        dangerouslySetInnerHTML: {
          __html: title
        }
      }), block._isNew && external_window_React_default.a.createElement("div", {
        className: "global-new-tag"
      }, "new")), external_window_React_default.a.createElement("div", {
        className: "class-name",
        dangerouslySetInnerHTML: {
          __html: name
        }
      })), enterCount > 0 && external_window_React_default.a.createElement("div", {
        className: "block-flipcard"
      }, external_window_React_default.a.createElement("div", {
        className: "block-flipcard-body"
      }, external_window_React_default.a.createElement("h2", null, block.title), block.description && external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement("p", null, block.description))), external_window_React_default.a.createElement("div", {
        className: "block-flipcard-panel"
      }, external_window_React_default.a.createElement("span", {
        className: "preview",
        onClick: this.openBlockImgPreview
      }, external_window_React_default.a.createElement(es["default"], {
        afterVisibleChange: this.afterVisibleChange,
        placement: 'bottom',
        overlay: '预览效果图'
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "02magnifyingglasspluszoom"
      }))), block.homepage && external_window_React_default.a.createElement("span", {
        className: "preview",
        onClick: this.openBlockOnlinePreview
      }, external_window_React_default.a.createElement(es["default"], {
        placement: 'bottom',
        overlay: '在线预览'
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "eye"
      }))), block.repository && external_window_React_default.a.createElement("span", {
        className: "repo",
        onClick: this.openBlockGithub
      }, external_window_React_default.a.createElement(es["default"], {
        placement: 'bottom',
        overlay: '查看源码'
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "github"
      }))))));
    }
  }]);

  return Block;
}(external_window_React_["Component"]), _class2.propTypes = {
  handleBlocksAdd: prop_types_default.a.func,
  block: prop_types_default.a.object,
  blocks: prop_types_default.a.object,
  originKeywords: prop_types_default.a.string
}, _class2.defaultProps = {
  handleBlocksAdd: function handleBlocksAdd() {}
}, _temp)) || _class) || _class);
/* harmony default export */ var components_Block_Block = (Object(dist_es["a" /* default */])(Block_Block));
// EXTERNAL MODULE: ./renderer/node_modules/react-modal/lib/index.js
var lib = __webpack_require__(694);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./renderer/src/components/Block/PreviewModal/index.scss
var Block_PreviewModal = __webpack_require__(718);

// CONCATENATED MODULE: ./renderer/src/components/Block/PreviewModal/index.jsx
var PreviewModal_dec, PreviewModal_class, PreviewModal_class2, PreviewModal_temp;

function PreviewModal_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { PreviewModal_typeof = function _typeof(obj) { return typeof obj; }; } else { PreviewModal_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return PreviewModal_typeof(obj); }

function PreviewModal_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function PreviewModal_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function PreviewModal_createClass(Constructor, protoProps, staticProps) { if (protoProps) PreviewModal_defineProperties(Constructor.prototype, protoProps); if (staticProps) PreviewModal_defineProperties(Constructor, staticProps); return Constructor; }

function PreviewModal_possibleConstructorReturn(self, call) { if (call && (PreviewModal_typeof(call) === "object" || typeof call === "function")) { return call; } return PreviewModal_assertThisInitialized(self); }

function PreviewModal_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function PreviewModal_getPrototypeOf(o) { PreviewModal_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return PreviewModal_getPrototypeOf(o); }

function PreviewModal_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) PreviewModal_setPrototypeOf(subClass, superClass); }

function PreviewModal_setPrototypeOf(o, p) { PreviewModal_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return PreviewModal_setPrototypeOf(o, p); }







var PreviewModal_PreviewModal = (PreviewModal_dec = Object(index_module["b" /* inject */])('blocks'), PreviewModal_dec(PreviewModal_class = Object(index_module["c" /* observer */])(PreviewModal_class = (PreviewModal_temp = PreviewModal_class2 =
/*#__PURE__*/
function (_Component) {
  PreviewModal_inherits(PreviewModal, _Component);

  function PreviewModal() {
    PreviewModal_classCallCheck(this, PreviewModal);

    return PreviewModal_possibleConstructorReturn(this, PreviewModal_getPrototypeOf(PreviewModal).apply(this, arguments));
  }

  PreviewModal_createClass(PreviewModal, [{
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      lib_default.a.setAppElement('body');
    }
  }, {
    key: "render",
    value: function render() {
      var blocks = this.props.blocks;
      return external_window_React_default.a.createElement(lib_default.a, {
        isOpen: blocks.showModal,
        onRequestClose: blocks.closeModal,
        className: "preview-modal",
        style: {
          overlay: {
            background: '#fff',
            zIndex: '10000'
          }
        }
      }, external_window_React_default.a.createElement("img", {
        className: "preview-block-img",
        src: blocks.previewBlock.screenshot,
        alt: blocks.previewBlock.name,
        onClick: blocks.closeModal
      }), external_window_React_default.a.createElement("div", {
        className: "preview-block-close",
        onClick: blocks.closeModal
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "close",
        className: "preview-block-close-icon"
      })));
    }
  }]);

  return PreviewModal;
}(external_window_React_["Component"]), PreviewModal_class2.displayName = 'PreviewModal', PreviewModal_class2.propTypes = {
  blocks: prop_types_default.a.object.isRequired
}, PreviewModal_temp)) || PreviewModal_class) || PreviewModal_class);
/* harmony default export */ var components_Block_PreviewModal = (PreviewModal_PreviewModal);
// EXTERNAL MODULE: ./renderer/src/components/Block/Panel.jsx
var Panel = __webpack_require__(687);

// CONCATENATED MODULE: ./renderer/src/components/Block/index.jsx




// EXTERNAL MODULE: ./renderer/src/components/Block/CustomBlock.jsx
var CustomBlock = __webpack_require__(720);

// EXTERNAL MODULE: ./renderer/src/components/BlockCategory/index.scss
var components_BlockCategory = __webpack_require__(721);

// CONCATENATED MODULE: ./renderer/src/components/BlockCategory/index.jsx
var BlockCategory_class, BlockCategory_class2, BlockCategory_temp;

function BlockCategory_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { BlockCategory_typeof = function _typeof(obj) { return typeof obj; }; } else { BlockCategory_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return BlockCategory_typeof(obj); }

function BlockCategory_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function BlockCategory_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function BlockCategory_createClass(Constructor, protoProps, staticProps) { if (protoProps) BlockCategory_defineProperties(Constructor.prototype, protoProps); if (staticProps) BlockCategory_defineProperties(Constructor, staticProps); return Constructor; }

function BlockCategory_possibleConstructorReturn(self, call) { if (call && (BlockCategory_typeof(call) === "object" || typeof call === "function")) { return call; } return BlockCategory_assertThisInitialized(self); }

function BlockCategory_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function BlockCategory_getPrototypeOf(o) { BlockCategory_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return BlockCategory_getPrototypeOf(o); }

function BlockCategory_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) BlockCategory_setPrototypeOf(subClass, superClass); }

function BlockCategory_setPrototypeOf(o, p) { BlockCategory_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return BlockCategory_setPrototypeOf(o, p); }








var BlockCategory_BlockCategory = Object(index_module["c" /* observer */])(BlockCategory_class = (BlockCategory_temp = BlockCategory_class2 =
/*#__PURE__*/
function (_Component) {
  BlockCategory_inherits(BlockCategory, _Component);

  function BlockCategory() {
    BlockCategory_classCallCheck(this, BlockCategory);

    return BlockCategory_possibleConstructorReturn(this, BlockCategory_getPrototypeOf(BlockCategory).apply(this, arguments));
  }

  BlockCategory_createClass(BlockCategory, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          blocksWithCategory = _this$props.blocksWithCategory,
          originKeywords = _this$props.originKeywords,
          idPrefix = _this$props.idPrefix,
          handleBlocksAdd = _this$props.handleBlocksAdd;

      if (blocksWithCategory === undefined) {
        return external_window_React_default.a.createElement("div", {
          className: "blocks-empty-tip"
        }, "loading...");
      } else if (Array.isArray(blocksWithCategory) && blocksWithCategory.length === 0 && originKeywords) {
        return external_window_React_default.a.createElement("div", {
          className: "blocks-empty-tip"
        }, "\u6CA1\u6709\u627E\u5230", external_window_React_default.a.createElement("span", {
          style: {
            fontWeight: 400,
            color: '#3080fe',
            padding: '0 5px'
          }
        }, originKeywords), "\u76F8\u5173\u7684\u533A\u5757");
      } else if (Array.isArray(blocksWithCategory) && blocksWithCategory.length === 0) {
        return external_window_React_default.a.createElement("div", {
          className: "blocks-empty-tip"
        }, "\u6682\u65E0\u53EF\u7528\u533A\u5757...");
      } else {
        return external_window_React_default.a.createElement("div", {
          className: "blocks-wrapper"
        }, blocksWithCategory.map(function (_ref, index) {
          var category = _ref.category,
              blocks = _ref.blocks;

          if (blocks.length === 0) {
            return null;
          }

          var blockPanelId = "".concat(idPrefix).concat(index);
          return external_window_React_default.a.createElement("div", {
            className: "block-category",
            key: category
          }, external_window_React_default.a.createElement("div", {
            id: blockPanelId
          }, external_window_React_default.a.createElement("div", {
            className: "block-category-title"
          }, category, external_window_React_default.a.createElement("span", null, "(", blocks.length, ")")), external_window_React_default.a.createElement("div", {
            className: "block-category-body"
          }, blocks.map(function (block) {
            return external_window_React_default.a.createElement(components_Block_Block, {
              key: "".concat(category, "-").concat(block.name),
              block: block,
              originKeywords: originKeywords,
              handleBlocksAdd: handleBlocksAdd
            });
          }))));
        }), external_window_React_default.a.createElement(components_Block_PreviewModal, null));
      }
    }
  }]);

  return BlockCategory;
}(external_window_React_["Component"]), BlockCategory_class2.propTypes = {
  handleBlocksAdd: prop_types_default.a.func
}, BlockCategory_class2.defaultProps = {
  handleBlocksAdd: function handleBlocksAdd() {}
}, BlockCategory_temp)) || BlockCategory_class;

/* harmony default export */ var src_components_BlockCategory = __webpack_exports__["a"] = (BlockCategory_BlockCategory);

/***/ }),

/***/ 749:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bodyOpenClassName = exports.portalClassName = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(5);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ModalPortal = __webpack_require__(750);

var _ModalPortal2 = _interopRequireDefault(_ModalPortal);

var _ariaAppHider = __webpack_require__(696);

var ariaAppHider = _interopRequireWildcard(_ariaAppHider);

var _safeHTMLElement = __webpack_require__(676);

var _safeHTMLElement2 = _interopRequireDefault(_safeHTMLElement);

var _reactLifecyclesCompat = __webpack_require__(754);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var portalClassName = exports.portalClassName = "ReactModalPortal";
var bodyOpenClassName = exports.bodyOpenClassName = "ReactModal__Body--open";

var isReact16 = _reactDom2.default.createPortal !== undefined;

var getCreatePortal = function getCreatePortal() {
  return isReact16 ? _reactDom2.default.createPortal : _reactDom2.default.unstable_renderSubtreeIntoContainer;
};

function getParentElement(parentSelector) {
  return parentSelector();
}

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.removePortal = function () {
      !isReact16 && _reactDom2.default.unmountComponentAtNode(_this.node);
      var parent = getParentElement(_this.props.parentSelector);
      parent.removeChild(_this.node);
    }, _this.portalRef = function (ref) {
      _this.portal = ref;
    }, _this.renderPortal = function (props) {
      var createPortal = getCreatePortal();
      var portal = createPortal(_this, _react2.default.createElement(_ModalPortal2.default, _extends({ defaultStyles: Modal.defaultStyles }, props)), _this.node);
      _this.portalRef(portal);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!_safeHTMLElement.canUseDOM) return;

      if (!isReact16) {
        this.node = document.createElement("div");
      }
      this.node.className = this.props.portalClassName;

      var parent = getParentElement(this.props.parentSelector);
      parent.appendChild(this.node);

      !isReact16 && this.renderPortal(this.props);
    }
  }, {
    key: "getSnapshotBeforeUpdate",
    value: function getSnapshotBeforeUpdate(prevProps) {
      var prevParent = getParentElement(prevProps.parentSelector);
      var nextParent = getParentElement(this.props.parentSelector);
      return { prevParent: prevParent, nextParent: nextParent };
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, _, snapshot) {
      if (!_safeHTMLElement.canUseDOM) return;
      var _props = this.props,
          isOpen = _props.isOpen,
          portalClassName = _props.portalClassName;


      if (prevProps.portalClassName !== portalClassName) {
        this.node.className = portalClassName;
      }

      var prevParent = snapshot.prevParent,
          nextParent = snapshot.nextParent;

      if (nextParent !== prevParent) {
        prevParent.removeChild(this.node);
        nextParent.appendChild(this.node);
      }

      // Stop unnecessary renders if modal is remaining closed
      if (!prevProps.isOpen && !isOpen) return;

      !isReact16 && this.renderPortal(this.props);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!_safeHTMLElement.canUseDOM || !this.node || !this.portal) return;

      var state = this.portal.state;
      var now = Date.now();
      var closesAt = state.isOpen && this.props.closeTimeoutMS && (state.closesAt || now + this.props.closeTimeoutMS);

      if (closesAt) {
        if (!state.beforeClose) {
          this.portal.closeWithTimeout();
        }

        setTimeout(this.removePortal, closesAt - now);
      } else {
        this.removePortal();
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!_safeHTMLElement.canUseDOM || !isReact16) {
        return null;
      }

      if (!this.node && isReact16) {
        this.node = document.createElement("div");
      }

      var createPortal = getCreatePortal();
      return createPortal(_react2.default.createElement(_ModalPortal2.default, _extends({
        ref: this.portalRef,
        defaultStyles: Modal.defaultStyles
      }, this.props)), this.node);
    }
  }], [{
    key: "setAppElement",
    value: function setAppElement(element) {
      ariaAppHider.setElement(element);
    }

    /* eslint-disable react/no-unused-prop-types */

    /* eslint-enable react/no-unused-prop-types */

  }]);

  return Modal;
}(_react.Component);

Modal.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  style: _propTypes2.default.shape({
    content: _propTypes2.default.object,
    overlay: _propTypes2.default.object
  }),
  portalClassName: _propTypes2.default.string,
  bodyOpenClassName: _propTypes2.default.string,
  htmlOpenClassName: _propTypes2.default.string,
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    base: _propTypes2.default.string.isRequired,
    afterOpen: _propTypes2.default.string.isRequired,
    beforeClose: _propTypes2.default.string.isRequired
  })]),
  overlayClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    base: _propTypes2.default.string.isRequired,
    afterOpen: _propTypes2.default.string.isRequired,
    beforeClose: _propTypes2.default.string.isRequired
  })]),
  appElement: _propTypes2.default.instanceOf(_safeHTMLElement2.default),
  onAfterOpen: _propTypes2.default.func,
  onRequestClose: _propTypes2.default.func,
  closeTimeoutMS: _propTypes2.default.number,
  ariaHideApp: _propTypes2.default.bool,
  shouldFocusAfterRender: _propTypes2.default.bool,
  shouldCloseOnOverlayClick: _propTypes2.default.bool,
  shouldReturnFocusAfterClose: _propTypes2.default.bool,
  parentSelector: _propTypes2.default.func,
  aria: _propTypes2.default.object,
  data: _propTypes2.default.object,
  role: _propTypes2.default.string,
  contentLabel: _propTypes2.default.string,
  shouldCloseOnEsc: _propTypes2.default.bool,
  overlayRef: _propTypes2.default.func,
  contentRef: _propTypes2.default.func
};
Modal.defaultProps = {
  isOpen: false,
  portalClassName: portalClassName,
  bodyOpenClassName: bodyOpenClassName,
  role: "dialog",
  ariaHideApp: true,
  closeTimeoutMS: 0,
  shouldFocusAfterRender: true,
  shouldCloseOnEsc: true,
  shouldCloseOnOverlayClick: true,
  shouldReturnFocusAfterClose: true,
  parentSelector: function parentSelector() {
    return document.body;
  }
};
Modal.defaultStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)"
  },
  content: {
    position: "absolute",
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px"
  }
};


(0, _reactLifecyclesCompat.polyfill)(Modal);

exports.default = Modal;

/***/ }),

/***/ 750:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _focusManager = __webpack_require__(751);

var focusManager = _interopRequireWildcard(_focusManager);

var _scopeTab = __webpack_require__(752);

var _scopeTab2 = _interopRequireDefault(_scopeTab);

var _ariaAppHider = __webpack_require__(696);

var ariaAppHider = _interopRequireWildcard(_ariaAppHider);

var _classList = __webpack_require__(753);

var classList = _interopRequireWildcard(_classList);

var _safeHTMLElement = __webpack_require__(676);

var _safeHTMLElement2 = _interopRequireDefault(_safeHTMLElement);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// so that our CSS is statically analyzable
var CLASS_NAMES = {
  overlay: "ReactModal__Overlay",
  content: "ReactModal__Content"
};

var TAB_KEY = 9;
var ESC_KEY = 27;

var ariaHiddenInstances = 0;

var ModalPortal = function (_Component) {
  _inherits(ModalPortal, _Component);

  function ModalPortal(props) {
    _classCallCheck(this, ModalPortal);

    var _this = _possibleConstructorReturn(this, (ModalPortal.__proto__ || Object.getPrototypeOf(ModalPortal)).call(this, props));

    _this.setOverlayRef = function (overlay) {
      _this.overlay = overlay;
      _this.props.overlayRef && _this.props.overlayRef(overlay);
    };

    _this.setContentRef = function (content) {
      _this.content = content;
      _this.props.contentRef && _this.props.contentRef(content);
    };

    _this.afterClose = function () {
      var _this$props = _this.props,
          appElement = _this$props.appElement,
          ariaHideApp = _this$props.ariaHideApp,
          htmlOpenClassName = _this$props.htmlOpenClassName,
          bodyOpenClassName = _this$props.bodyOpenClassName;

      // Remove classes.

      bodyOpenClassName && classList.remove(document.body, bodyOpenClassName);

      htmlOpenClassName && classList.remove(document.getElementsByTagName("html")[0], htmlOpenClassName);

      // Reset aria-hidden attribute if all modals have been removed
      if (ariaHideApp && ariaHiddenInstances > 0) {
        ariaHiddenInstances -= 1;

        if (ariaHiddenInstances === 0) {
          ariaAppHider.show(appElement);
        }
      }

      if (_this.props.shouldFocusAfterRender) {
        if (_this.props.shouldReturnFocusAfterClose) {
          focusManager.returnFocus();
          focusManager.teardownScopedFocus();
        } else {
          focusManager.popWithoutFocus();
        }
      }

      if (_this.props.onAfterClose) {
        _this.props.onAfterClose();
      }
    };

    _this.open = function () {
      _this.beforeOpen();
      if (_this.state.afterOpen && _this.state.beforeClose) {
        clearTimeout(_this.closeTimer);
        _this.setState({ beforeClose: false });
      } else {
        if (_this.props.shouldFocusAfterRender) {
          focusManager.setupScopedFocus(_this.node);
          focusManager.markForFocusLater();
        }

        _this.setState({ isOpen: true }, function () {
          _this.setState({ afterOpen: true });

          if (_this.props.isOpen && _this.props.onAfterOpen) {
            _this.props.onAfterOpen();
          }
        });
      }
    };

    _this.close = function () {
      if (_this.props.closeTimeoutMS > 0) {
        _this.closeWithTimeout();
      } else {
        _this.closeWithoutTimeout();
      }
    };

    _this.focusContent = function () {
      return _this.content && !_this.contentHasFocus() && _this.content.focus();
    };

    _this.closeWithTimeout = function () {
      var closesAt = Date.now() + _this.props.closeTimeoutMS;
      _this.setState({ beforeClose: true, closesAt: closesAt }, function () {
        _this.closeTimer = setTimeout(_this.closeWithoutTimeout, _this.state.closesAt - Date.now());
      });
    };

    _this.closeWithoutTimeout = function () {
      _this.setState({
        beforeClose: false,
        isOpen: false,
        afterOpen: false,
        closesAt: null
      }, _this.afterClose);
    };

    _this.handleKeyDown = function (event) {
      if (event.keyCode === TAB_KEY) {
        (0, _scopeTab2.default)(_this.content, event);
      }

      if (_this.props.shouldCloseOnEsc && event.keyCode === ESC_KEY) {
        event.stopPropagation();
        _this.requestClose(event);
      }
    };

    _this.handleOverlayOnClick = function (event) {
      if (_this.shouldClose === null) {
        _this.shouldClose = true;
      }

      if (_this.shouldClose && _this.props.shouldCloseOnOverlayClick) {
        if (_this.ownerHandlesClose()) {
          _this.requestClose(event);
        } else {
          _this.focusContent();
        }
      }
      _this.shouldClose = null;
    };

    _this.handleContentOnMouseUp = function () {
      _this.shouldClose = false;
    };

    _this.handleOverlayOnMouseDown = function (event) {
      if (!_this.props.shouldCloseOnOverlayClick && event.target == _this.overlay) {
        event.preventDefault();
      }
    };

    _this.handleContentOnClick = function () {
      _this.shouldClose = false;
    };

    _this.handleContentOnMouseDown = function () {
      _this.shouldClose = false;
    };

    _this.requestClose = function (event) {
      return _this.ownerHandlesClose() && _this.props.onRequestClose(event);
    };

    _this.ownerHandlesClose = function () {
      return _this.props.onRequestClose;
    };

    _this.shouldBeClosed = function () {
      return !_this.state.isOpen && !_this.state.beforeClose;
    };

    _this.contentHasFocus = function () {
      return document.activeElement === _this.content || _this.content.contains(document.activeElement);
    };

    _this.buildClassName = function (which, additional) {
      var classNames = (typeof additional === "undefined" ? "undefined" : _typeof(additional)) === "object" ? additional : {
        base: CLASS_NAMES[which],
        afterOpen: CLASS_NAMES[which] + "--after-open",
        beforeClose: CLASS_NAMES[which] + "--before-close"
      };
      var className = classNames.base;
      if (_this.state.afterOpen) {
        className = className + " " + classNames.afterOpen;
      }
      if (_this.state.beforeClose) {
        className = className + " " + classNames.beforeClose;
      }
      return typeof additional === "string" && additional ? className + " " + additional : className;
    };

    _this.attributesFromObject = function (prefix, items) {
      return Object.keys(items).reduce(function (acc, name) {
        acc[prefix + "-" + name] = items[name];
        return acc;
      }, {});
    };

    _this.state = {
      afterOpen: false,
      beforeClose: false
    };

    _this.shouldClose = null;
    _this.moveFromContentToOverlay = null;
    return _this;
  }

  _createClass(ModalPortal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.isOpen) {
        this.open();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (false) {}

      if (this.props.isOpen && !prevProps.isOpen) {
        this.open();
      } else if (!this.props.isOpen && prevProps.isOpen) {
        this.close();
      }

      // Focus only needs to be set once when the modal is being opened
      if (this.props.shouldFocusAfterRender && this.state.isOpen && !prevState.isOpen) {
        this.focusContent();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.afterClose();
      clearTimeout(this.closeTimer);
    }
  }, {
    key: "beforeOpen",
    value: function beforeOpen() {
      var _props = this.props,
          appElement = _props.appElement,
          ariaHideApp = _props.ariaHideApp,
          htmlOpenClassName = _props.htmlOpenClassName,
          bodyOpenClassName = _props.bodyOpenClassName;

      // Add classes.

      bodyOpenClassName && classList.add(document.body, bodyOpenClassName);

      htmlOpenClassName && classList.add(document.getElementsByTagName("html")[0], htmlOpenClassName);

      if (ariaHideApp) {
        ariaHiddenInstances += 1;
        ariaAppHider.hide(appElement);
      }
    }

    // Don't steal focus from inner elements

  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          overlayClassName = _props2.overlayClassName,
          defaultStyles = _props2.defaultStyles;

      var contentStyles = className ? {} : defaultStyles.content;
      var overlayStyles = overlayClassName ? {} : defaultStyles.overlay;

      return this.shouldBeClosed() ? null : _react2.default.createElement(
        "div",
        {
          ref: this.setOverlayRef,
          className: this.buildClassName("overlay", overlayClassName),
          style: _extends({}, overlayStyles, this.props.style.overlay),
          onClick: this.handleOverlayOnClick,
          onMouseDown: this.handleOverlayOnMouseDown
        },
        _react2.default.createElement(
          "div",
          _extends({
            ref: this.setContentRef,
            style: _extends({}, contentStyles, this.props.style.content),
            className: this.buildClassName("content", className),
            tabIndex: "-1",
            onKeyDown: this.handleKeyDown,
            onMouseDown: this.handleContentOnMouseDown,
            onMouseUp: this.handleContentOnMouseUp,
            onClick: this.handleContentOnClick,
            role: this.props.role,
            "aria-label": this.props.contentLabel
          }, this.attributesFromObject("aria", this.props.aria || {}), this.attributesFromObject("data", this.props.data || {}), {
            "data-testid": this.props.testId
          }),
          this.props.children
        )
      );
    }
  }]);

  return ModalPortal;
}(_react.Component);

ModalPortal.defaultProps = {
  style: {
    overlay: {},
    content: {}
  },
  defaultStyles: {}
};
ModalPortal.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  defaultStyles: _propTypes2.default.shape({
    content: _propTypes2.default.object,
    overlay: _propTypes2.default.object
  }),
  style: _propTypes2.default.shape({
    content: _propTypes2.default.object,
    overlay: _propTypes2.default.object
  }),
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  overlayClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  bodyOpenClassName: _propTypes2.default.string,
  htmlOpenClassName: _propTypes2.default.string,
  ariaHideApp: _propTypes2.default.bool,
  appElement: _propTypes2.default.instanceOf(_safeHTMLElement2.default),
  onAfterOpen: _propTypes2.default.func,
  onAfterClose: _propTypes2.default.func,
  onRequestClose: _propTypes2.default.func,
  closeTimeoutMS: _propTypes2.default.number,
  shouldFocusAfterRender: _propTypes2.default.bool,
  shouldCloseOnOverlayClick: _propTypes2.default.bool,
  shouldReturnFocusAfterClose: _propTypes2.default.bool,
  role: _propTypes2.default.string,
  contentLabel: _propTypes2.default.string,
  aria: _propTypes2.default.object,
  data: _propTypes2.default.object,
  children: _propTypes2.default.node,
  shouldCloseOnEsc: _propTypes2.default.bool,
  overlayRef: _propTypes2.default.func,
  contentRef: _propTypes2.default.func,
  testId: _propTypes2.default.string
};
exports.default = ModalPortal;
module.exports = exports["default"];

/***/ }),

/***/ 751:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleBlur = handleBlur;
exports.handleFocus = handleFocus;
exports.markForFocusLater = markForFocusLater;
exports.returnFocus = returnFocus;
exports.popWithoutFocus = popWithoutFocus;
exports.setupScopedFocus = setupScopedFocus;
exports.teardownScopedFocus = teardownScopedFocus;

var _tabbable = __webpack_require__(695);

var _tabbable2 = _interopRequireDefault(_tabbable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var focusLaterElements = [];
var modalElement = null;
var needToFocus = false;

function handleBlur() {
  needToFocus = true;
}

function handleFocus() {
  if (needToFocus) {
    needToFocus = false;
    if (!modalElement) {
      return;
    }
    // need to see how jQuery shims document.on('focusin') so we don't need the
    // setTimeout, firefox doesn't support focusin, if it did, we could focus
    // the element outside of a setTimeout. Side-effect of this implementation
    // is that the document.body gets focus, and then we focus our element right
    // after, seems fine.
    setTimeout(function () {
      if (modalElement.contains(document.activeElement)) {
        return;
      }
      var el = (0, _tabbable2.default)(modalElement)[0] || modalElement;
      el.focus();
    }, 0);
  }
}

function markForFocusLater() {
  focusLaterElements.push(document.activeElement);
}

/* eslint-disable no-console */
function returnFocus() {
  var toFocus = null;
  try {
    if (focusLaterElements.length !== 0) {
      toFocus = focusLaterElements.pop();
      toFocus.focus();
    }
    return;
  } catch (e) {
    console.warn(["You tried to return focus to", toFocus, "but it is not in the DOM anymore"].join(" "));
  }
}
/* eslint-enable no-console */

function popWithoutFocus() {
  focusLaterElements.length > 0 && focusLaterElements.pop();
}

function setupScopedFocus(element) {
  modalElement = element;

  if (window.addEventListener) {
    window.addEventListener("blur", handleBlur, false);
    document.addEventListener("focus", handleFocus, true);
  } else {
    window.attachEvent("onBlur", handleBlur);
    document.attachEvent("onFocus", handleFocus);
  }
}

function teardownScopedFocus() {
  modalElement = null;

  if (window.addEventListener) {
    window.removeEventListener("blur", handleBlur);
    document.removeEventListener("focus", handleFocus);
  } else {
    window.detachEvent("onBlur", handleBlur);
    document.detachEvent("onFocus", handleFocus);
  }
}

/***/ }),

/***/ 752:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scopeTab;

var _tabbable = __webpack_require__(695);

var _tabbable2 = _interopRequireDefault(_tabbable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scopeTab(node, event) {
  var tabbable = (0, _tabbable2.default)(node);

  if (!tabbable.length) {
    // Do nothing, since there are no elements that can receive focus.
    event.preventDefault();
    return;
  }

  var shiftKey = event.shiftKey;
  var head = tabbable[0];
  var tail = tabbable[tabbable.length - 1];

  // proceed with default browser behavior on tab.
  // Focus on last element on shift + tab.
  if (node === document.activeElement) {
    if (!shiftKey) return;
    target = tail;
  }

  var target;
  if (tail === document.activeElement && !shiftKey) {
    target = head;
  }

  if (head === document.activeElement && shiftKey) {
    target = tail;
  }

  if (target) {
    event.preventDefault();
    target.focus();
    return;
  }

  // Safari radio issue.
  //
  // Safari does not move the focus to the radio button,
  // so we need to force it to really walk through all elements.
  //
  // This is very error prone, since we are trying to guess
  // if it is a safari browser from the first occurence between
  // chrome or safari.
  //
  // The chrome user agent contains the first ocurrence
  // as the 'chrome/version' and later the 'safari/version'.
  var checkSafari = /(\bChrome\b|\bSafari\b)\//.exec(navigator.userAgent);
  var isSafariDesktop = checkSafari != null && checkSafari[1] != "Chrome" && /\biPod\b|\biPad\b/g.exec(navigator.userAgent) == null;

  // If we are not in safari desktop, let the browser control
  // the focus
  if (!isSafariDesktop) return;

  var x = tabbable.indexOf(document.activeElement);

  if (x > -1) {
    x += shiftKey ? -1 : 1;
  }

  // If the tabbable element does not exist,
  // focus head/tail based on shiftKey
  if (typeof tabbable[x] === "undefined") {
    event.preventDefault();
    target = shiftKey ? tail : head;
    target.focus();
    return;
  }

  event.preventDefault();

  tabbable[x].focus();
}
module.exports = exports["default"];

/***/ }),

/***/ 753:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dumpClassLists = dumpClassLists;
var htmlClassList = {};
var docBodyClassList = {};

function dumpClassLists() {
  if (false) { var _x, x, buffer, classes; }
}

/**
 * Track the number of reference of a class.
 * @param {object} poll The poll to receive the reference.
 * @param {string} className The class name.
 * @return {string}
 */
var incrementReference = function incrementReference(poll, className) {
  if (!poll[className]) {
    poll[className] = 0;
  }
  poll[className] += 1;
  return className;
};

/**
 * Drop the reference of a class.
 * @param {object} poll The poll to receive the reference.
 * @param {string} className The class name.
 * @return {string}
 */
var decrementReference = function decrementReference(poll, className) {
  if (poll[className]) {
    poll[className] -= 1;
  }
  return className;
};

/**
 * Track a class and add to the given class list.
 * @param {Object} classListRef A class list of an element.
 * @param {Object} poll         The poll to be used.
 * @param {Array}  classes      The list of classes to be tracked.
 */
var trackClass = function trackClass(classListRef, poll, classes) {
  classes.forEach(function (className) {
    incrementReference(poll, className);
    classListRef.add(className);
  });
};

/**
 * Untrack a class and remove from the given class list if the reference
 * reaches 0.
 * @param {Object} classListRef A class list of an element.
 * @param {Object} poll         The poll to be used.
 * @param {Array}  classes      The list of classes to be untracked.
 */
var untrackClass = function untrackClass(classListRef, poll, classes) {
  classes.forEach(function (className) {
    decrementReference(poll, className);
    poll[className] === 0 && classListRef.remove(className);
  });
};

/**
 * Public inferface to add classes to the document.body.
 * @param {string} bodyClass The class string to be added.
 *                           It may contain more then one class
 *                           with ' ' as separator.
 */
var add = exports.add = function add(element, classString) {
  return trackClass(element.classList, element.nodeName.toLowerCase() == "html" ? htmlClassList : docBodyClassList, classString.split(" "));
};

/**
 * Public inferface to remove classes from the document.body.
 * @param {string} bodyClass The class string to be added.
 *                           It may contain more then one class
 *                           with ' ' as separator.
 */
var remove = exports.remove = function remove(element, classString) {
  return untrackClass(element.classList, element.nodeName.toLowerCase() == "html" ? htmlClassList : docBodyClassList, classString.split(" "));
};

/***/ }),

/***/ 754:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polyfill", function() { return polyfill; });
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function componentWillMount() {
  // Call this.constructor.gDSFP to support sub-classes.
  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
  if (state !== null && state !== undefined) {
    this.setState(state);
  }
}

function componentWillReceiveProps(nextProps) {
  // Call this.constructor.gDSFP to support sub-classes.
  // Use the setState() updater to ensure state isn't stale in certain edge cases.
  function updater(prevState) {
    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
    return state !== null && state !== undefined ? state : null;
  }
  // Binding "this" is important for shallow renderer support.
  this.setState(updater.bind(this));
}

function componentWillUpdate(nextProps, nextState) {
  try {
    var prevProps = this.props;
    var prevState = this.state;
    this.props = nextProps;
    this.state = nextState;
    this.__reactInternalSnapshotFlag = true;
    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
      prevProps,
      prevState
    );
  } finally {
    this.props = prevProps;
    this.state = prevState;
  }
}

// React may warn about cWM/cWRP/cWU methods being deprecated.
// Add a flag to suppress these warnings for this special case.
componentWillMount.__suppressDeprecationWarning = true;
componentWillReceiveProps.__suppressDeprecationWarning = true;
componentWillUpdate.__suppressDeprecationWarning = true;

function polyfill(Component) {
  var prototype = Component.prototype;

  if (!prototype || !prototype.isReactComponent) {
    throw new Error('Can only polyfill class components');
  }

  if (
    typeof Component.getDerivedStateFromProps !== 'function' &&
    typeof prototype.getSnapshotBeforeUpdate !== 'function'
  ) {
    return Component;
  }

  // If new component APIs are defined, "unsafe" lifecycles won't be called.
  // Error if any of these lifecycles are present,
  // Because they would work differently between older and newer (16.3+) versions of React.
  var foundWillMountName = null;
  var foundWillReceivePropsName = null;
  var foundWillUpdateName = null;
  if (typeof prototype.componentWillMount === 'function') {
    foundWillMountName = 'componentWillMount';
  } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
    foundWillMountName = 'UNSAFE_componentWillMount';
  }
  if (typeof prototype.componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'componentWillReceiveProps';
  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
  }
  if (typeof prototype.componentWillUpdate === 'function') {
    foundWillUpdateName = 'componentWillUpdate';
  } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
    foundWillUpdateName = 'UNSAFE_componentWillUpdate';
  }
  if (
    foundWillMountName !== null ||
    foundWillReceivePropsName !== null ||
    foundWillUpdateName !== null
  ) {
    var componentName = Component.displayName || Component.name;
    var newApiName =
      typeof Component.getDerivedStateFromProps === 'function'
        ? 'getDerivedStateFromProps()'
        : 'getSnapshotBeforeUpdate()';

    throw Error(
      'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' +
        componentName +
        ' uses ' +
        newApiName +
        ' but also contains the following legacy lifecycles:' +
        (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') +
        (foundWillReceivePropsName !== null
          ? '\n  ' + foundWillReceivePropsName
          : '') +
        (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') +
        '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' +
        'https://fb.me/react-async-component-lifecycle-hooks'
    );
  }

  // React <= 16.2 does not support static getDerivedStateFromProps.
  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
  // Newer versions of React will ignore these lifecycles if gDSFP exists.
  if (typeof Component.getDerivedStateFromProps === 'function') {
    prototype.componentWillMount = componentWillMount;
    prototype.componentWillReceiveProps = componentWillReceiveProps;
  }

  // React <= 16.2 does not support getSnapshotBeforeUpdate.
  // As a workaround, use cWU to invoke the new lifecycle.
  // Newer versions of React will ignore that lifecycle if gSBU exists.
  if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
    if (typeof prototype.componentDidUpdate !== 'function') {
      throw new Error(
        'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'
      );
    }

    prototype.componentWillUpdate = componentWillUpdate;

    var componentDidUpdate = prototype.componentDidUpdate;

    prototype.componentDidUpdate = function componentDidUpdatePolyfill(
      prevProps,
      prevState,
      maybeSnapshot
    ) {
      // 16.3+ will not execute our will-update method;
      // It will pass a snapshot value to did-update though.
      // Older versions will require our polyfilled will-update value.
      // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
      // Because for <= 15.x versions this might be a "prevContext" object.
      // We also can't just check "__reactInternalSnapshot",
      // Because get-snapshot might return a falsy value.
      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
      var snapshot = this.__reactInternalSnapshotFlag
        ? this.__reactInternalSnapshot
        : maybeSnapshot;

      componentDidUpdate.call(this, prevProps, prevState, snapshot);
    };
  }

  return Component;
}




/***/ }),

/***/ 755:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 759:
/***/ (function(module, exports, __webpack_require__) {

module.exports = rimraf
rimraf.sync = rimrafSync

var assert = __webpack_require__(49)
var path = __webpack_require__(3)
var fs = __webpack_require__(11)
var glob = __webpack_require__(698)
var _0666 = parseInt('666', 8)

var defaultGlobOpts = {
  nosort: true,
  silent: true
}

// for EMFILE handling
var timeout = 0

var isWindows = (process.platform === "win32")

function defaults (options) {
  var methods = [
    'unlink',
    'chmod',
    'stat',
    'lstat',
    'rmdir',
    'readdir'
  ]
  methods.forEach(function(m) {
    options[m] = options[m] || fs[m]
    m = m + 'Sync'
    options[m] = options[m] || fs[m]
  })

  options.maxBusyTries = options.maxBusyTries || 3
  options.emfileWait = options.emfileWait || 1000
  if (options.glob === false) {
    options.disableGlob = true
  }
  options.disableGlob = options.disableGlob || false
  options.glob = options.glob || defaultGlobOpts
}

function rimraf (p, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert.equal(typeof cb, 'function', 'rimraf: callback function required')
  assert(options, 'rimraf: invalid options argument provided')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  defaults(options)

  var busyTries = 0
  var errState = null
  var n = 0

  if (options.disableGlob || !glob.hasMagic(p))
    return afterGlob(null, [p])

  options.lstat(p, function (er, stat) {
    if (!er)
      return afterGlob(null, [p])

    glob(p, options.glob, afterGlob)
  })

  function next (er) {
    errState = errState || er
    if (--n === 0)
      cb(errState)
  }

  function afterGlob (er, results) {
    if (er)
      return cb(er)

    n = results.length
    if (n === 0)
      return cb()

    results.forEach(function (p) {
      rimraf_(p, options, function CB (er) {
        if (er) {
          if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") &&
              busyTries < options.maxBusyTries) {
            busyTries ++
            var time = busyTries * 100
            // try again, with the same exact callback as this one.
            return setTimeout(function () {
              rimraf_(p, options, CB)
            }, time)
          }

          // this one won't happen if graceful-fs is used.
          if (er.code === "EMFILE" && timeout < options.emfileWait) {
            return setTimeout(function () {
              rimraf_(p, options, CB)
            }, timeout ++)
          }

          // already gone
          if (er.code === "ENOENT") er = null
        }

        timeout = 0
        next(er)
      })
    })
  }
}

// Two possible strategies.
// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
//
// Both result in an extra syscall when you guess wrong.  However, there
// are likely far more normal files in the world than directories.  This
// is based on the assumption that a the average number of files per
// directory is >= 1.
//
// If anyone ever complains about this, then I guess the strategy could
// be made configurable somehow.  But until then, YAGNI.
function rimraf_ (p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  // sunos lets the root user unlink directories, which is... weird.
  // so we have to lstat here and make sure it's not a dir.
  options.lstat(p, function (er, st) {
    if (er && er.code === "ENOENT")
      return cb(null)

    // Windows can EPERM on stat.  Life is suffering.
    if (er && er.code === "EPERM" && isWindows)
      fixWinEPERM(p, options, er, cb)

    if (st && st.isDirectory())
      return rmdir(p, options, er, cb)

    options.unlink(p, function (er) {
      if (er) {
        if (er.code === "ENOENT")
          return cb(null)
        if (er.code === "EPERM")
          return (isWindows)
            ? fixWinEPERM(p, options, er, cb)
            : rmdir(p, options, er, cb)
        if (er.code === "EISDIR")
          return rmdir(p, options, er, cb)
      }
      return cb(er)
    })
  })
}

function fixWinEPERM (p, options, er, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')
  if (er)
    assert(er instanceof Error)

  options.chmod(p, _0666, function (er2) {
    if (er2)
      cb(er2.code === "ENOENT" ? null : er)
    else
      options.stat(p, function(er3, stats) {
        if (er3)
          cb(er3.code === "ENOENT" ? null : er)
        else if (stats.isDirectory())
          rmdir(p, options, er, cb)
        else
          options.unlink(p, cb)
      })
  })
}

function fixWinEPERMSync (p, options, er) {
  assert(p)
  assert(options)
  if (er)
    assert(er instanceof Error)

  try {
    options.chmodSync(p, _0666)
  } catch (er2) {
    if (er2.code === "ENOENT")
      return
    else
      throw er
  }

  try {
    var stats = options.statSync(p)
  } catch (er3) {
    if (er3.code === "ENOENT")
      return
    else
      throw er
  }

  if (stats.isDirectory())
    rmdirSync(p, options, er)
  else
    options.unlinkSync(p)
}

function rmdir (p, options, originalEr, cb) {
  assert(p)
  assert(options)
  if (originalEr)
    assert(originalEr instanceof Error)
  assert(typeof cb === 'function')

  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
  // if we guessed wrong, and it's not a directory, then
  // raise the original error.
  options.rmdir(p, function (er) {
    if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
      rmkids(p, options, cb)
    else if (er && er.code === "ENOTDIR")
      cb(originalEr)
    else
      cb(er)
  })
}

function rmkids(p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  options.readdir(p, function (er, files) {
    if (er)
      return cb(er)
    var n = files.length
    if (n === 0)
      return options.rmdir(p, cb)
    var errState
    files.forEach(function (f) {
      rimraf(path.join(p, f), options, function (er) {
        if (errState)
          return
        if (er)
          return cb(errState = er)
        if (--n === 0)
          options.rmdir(p, cb)
      })
    })
  })
}

// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
function rimrafSync (p, options) {
  options = options || {}
  defaults(options)

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert(options, 'rimraf: missing options')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  var results

  if (options.disableGlob || !glob.hasMagic(p)) {
    results = [p]
  } else {
    try {
      options.lstatSync(p)
      results = [p]
    } catch (er) {
      results = glob.sync(p, options.glob)
    }
  }

  if (!results.length)
    return

  for (var i = 0; i < results.length; i++) {
    var p = results[i]

    try {
      var st = options.lstatSync(p)
    } catch (er) {
      if (er.code === "ENOENT")
        return

      // Windows can EPERM on stat.  Life is suffering.
      if (er.code === "EPERM" && isWindows)
        fixWinEPERMSync(p, options, er)
    }

    try {
      // sunos lets the root user unlink directories, which is... weird.
      if (st && st.isDirectory())
        rmdirSync(p, options, null)
      else
        options.unlinkSync(p)
    } catch (er) {
      if (er.code === "ENOENT")
        return
      if (er.code === "EPERM")
        return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
      if (er.code !== "EISDIR")
        throw er

      rmdirSync(p, options, er)
    }
  }
}

function rmdirSync (p, options, originalEr) {
  assert(p)
  assert(options)
  if (originalEr)
    assert(originalEr instanceof Error)

  try {
    options.rmdirSync(p)
  } catch (er) {
    if (er.code === "ENOENT")
      return
    if (er.code === "ENOTDIR")
      throw originalEr
    if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
      rmkidsSync(p, options)
  }
}

function rmkidsSync (p, options) {
  assert(p)
  assert(options)
  options.readdirSync(p).forEach(function (f) {
    rimrafSync(path.join(p, f), options)
  })

  // We only end up here once we got ENOTEMPTY at least once, and
  // at this point, we are guaranteed to have removed all the kids.
  // So, we know that it won't be ENOENT or ENOTDIR or anything else.
  // try really hard to delete stuff on windows, because it has a
  // PROFOUNDLY annoying habit of not closing handles promptly when
  // files are deleted, resulting in spurious ENOTEMPTY errors.
  var retries = isWindows ? 100 : 1
  var i = 0
  do {
    var threw = true
    try {
      var ret = options.rmdirSync(p, options)
      threw = false
      return ret
    } finally {
      if (++i < retries && threw)
        continue
    }
  } while (true)
}


/***/ }),

/***/ 760:
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var pathModule = __webpack_require__(3);
var isWindows = process.platform === 'win32';
var fs = __webpack_require__(11);

// JavaScript implementation of realpath, ported from node pre-v6

var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

function rethrow() {
  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
  // is fairly slow to generate.
  var callback;
  if (DEBUG) {
    var backtrace = new Error;
    callback = debugCallback;
  } else
    callback = missingCallback;

  return callback;

  function debugCallback(err) {
    if (err) {
      backtrace.message = err.message;
      err = backtrace;
      missingCallback(err);
    }
  }

  function missingCallback(err) {
    if (err) {
      if (process.throwDeprecation)
        throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
      else if (!process.noDeprecation) {
        var msg = 'fs: missing callback ' + (err.stack || err.message);
        if (process.traceDeprecation)
          console.trace(msg);
        else
          console.error(msg);
      }
    }
  }
}

function maybeCallback(cb) {
  return typeof cb === 'function' ? cb : rethrow();
}

var normalize = pathModule.normalize;

// Regexp that finds the next partion of a (partial) path
// result is [base_with_slash, base], e.g. ['somedir/', 'somedir']
if (isWindows) {
  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
} else {
  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
}

// Regex to find the device root, including trailing slash. E.g. 'c:\\'.
if (isWindows) {
  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
} else {
  var splitRootRe = /^[\/]*/;
}

exports.realpathSync = function realpathSync(p, cache) {
  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return cache[p];
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstatSync(base);
      knownHard[base] = true;
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  // NB: p.length changes.
  while (pos < p.length) {
    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      continue;
    }

    var resolvedLink;
    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // some known symbolic link.  no need to stat again.
      resolvedLink = cache[base];
    } else {
      var stat = fs.lstatSync(base);
      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        continue;
      }

      // read the link if it wasn't read before
      // dev/ino always return 0 on windows, so skip the check.
      var linkTarget = null;
      if (!isWindows) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          linkTarget = seenLinks[id];
        }
      }
      if (linkTarget === null) {
        fs.statSync(base);
        linkTarget = fs.readlinkSync(base);
      }
      resolvedLink = pathModule.resolve(previous, linkTarget);
      // track this, if given a cache.
      if (cache) cache[base] = resolvedLink;
      if (!isWindows) seenLinks[id] = linkTarget;
    }

    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }

  if (cache) cache[original] = p;

  return p;
};


exports.realpath = function realpath(p, cache, cb) {
  if (typeof cb !== 'function') {
    cb = maybeCallback(cache);
    cache = null;
  }

  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return process.nextTick(cb.bind(null, null, cache[p]));
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstat(base, function(err) {
        if (err) return cb(err);
        knownHard[base] = true;
        LOOP();
      });
    } else {
      process.nextTick(LOOP);
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  function LOOP() {
    // stop if scanned past end of path
    if (pos >= p.length) {
      if (cache) cache[original] = p;
      return cb(null, p);
    }

    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      return process.nextTick(LOOP);
    }

    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // known symbolic link.  no need to stat again.
      return gotResolvedLink(cache[base]);
    }

    return fs.lstat(base, gotStat);
  }

  function gotStat(err, stat) {
    if (err) return cb(err);

    // if not a symlink, skip to the next path part
    if (!stat.isSymbolicLink()) {
      knownHard[base] = true;
      if (cache) cache[base] = base;
      return process.nextTick(LOOP);
    }

    // stat & read the link if not read before
    // call gotTarget as soon as the link target is known
    // dev/ino always return 0 on windows, so skip the check.
    if (!isWindows) {
      var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
      if (seenLinks.hasOwnProperty(id)) {
        return gotTarget(null, seenLinks[id], base);
      }
    }
    fs.stat(base, function(err) {
      if (err) return cb(err);

      fs.readlink(base, function(err, target) {
        if (!isWindows) seenLinks[id] = target;
        gotTarget(err, target);
      });
    });
  }

  function gotTarget(err, target, base) {
    if (err) return cb(err);

    var resolvedLink = pathModule.resolve(previous, target);
    if (cache) cache[base] = resolvedLink;
    gotResolvedLink(resolvedLink);
  }

  function gotResolvedLink(resolvedLink) {
    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }
};


/***/ }),

/***/ 761:
/***/ (function(module, exports, __webpack_require__) {

var concatMap = __webpack_require__(762);
var balanced = __webpack_require__(763);

module.exports = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function identity(e) {
  return e;
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balanced('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length)
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}



/***/ }),

/***/ 762:
/***/ (function(module, exports) {

module.exports = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ 763:
/***/ (function(module, exports) {

module.exports = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}


/***/ }),

/***/ 764:
/***/ (function(module, exports, __webpack_require__) {

module.exports = globSync
globSync.GlobSync = GlobSync

var fs = __webpack_require__(11)
var rp = __webpack_require__(699)
var minimatch = __webpack_require__(677)
var Minimatch = minimatch.Minimatch
var Glob = __webpack_require__(698).Glob
var util = __webpack_require__(10)
var path = __webpack_require__(3)
var assert = __webpack_require__(49)
var isAbsolute = __webpack_require__(678)
var common = __webpack_require__(700)
var alphasort = common.alphasort
var alphasorti = common.alphasorti
var setopts = common.setopts
var ownProp = common.ownProp
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

function globSync (pattern, options) {
  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  return new GlobSync(pattern, options).found
}

function GlobSync (pattern, options) {
  if (!pattern)
    throw new Error('must provide pattern')

  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  if (!(this instanceof GlobSync))
    return new GlobSync(pattern, options)

  setopts(this, pattern, options)

  if (this.noprocess)
    return this

  var n = this.minimatch.set.length
  this.matches = new Array(n)
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false)
  }
  this._finish()
}

GlobSync.prototype._finish = function () {
  assert(this instanceof GlobSync)
  if (this.realpath) {
    var self = this
    this.matches.forEach(function (matchset, index) {
      var set = self.matches[index] = Object.create(null)
      for (var p in matchset) {
        try {
          p = self._makeAbs(p)
          var real = rp.realpathSync(p, self.realpathCache)
          set[real] = true
        } catch (er) {
          if (er.syscall === 'stat')
            set[self._makeAbs(p)] = true
          else
            throw er
        }
      }
    })
  }
  common.finish(this)
}


GlobSync.prototype._process = function (pattern, index, inGlobStar) {
  assert(this instanceof GlobSync)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // See if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip processing
  if (childrenIgnored(this, read))
    return

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar)
}


GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
  var entries = this._readdir(abs, inGlobStar)

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix.slice(-1) !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix)
      newPattern = [prefix, e]
    else
      newPattern = [e]
    this._process(newPattern.concat(remain), index, inGlobStar)
  }
}


GlobSync.prototype._emitMatch = function (index, e) {
  if (isIgnored(this, e))
    return

  var abs = this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute) {
    e = abs
  }

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  if (this.stat)
    this._stat(e)
}


GlobSync.prototype._readdirInGlobStar = function (abs) {
  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false)

  var entries
  var lstat
  var stat
  try {
    lstat = fs.lstatSync(abs)
  } catch (er) {
    if (er.code === 'ENOENT') {
      // lstat failed, doesn't exist
      return null
    }
  }

  var isSym = lstat && lstat.isSymbolicLink()
  this.symlinks[abs] = isSym

  // If it's not a symlink or a dir, then it's definitely a regular file.
  // don't bother doing a readdir in that case.
  if (!isSym && lstat && !lstat.isDirectory())
    this.cache[abs] = 'FILE'
  else
    entries = this._readdir(abs, false)

  return entries
}

GlobSync.prototype._readdir = function (abs, inGlobStar) {
  var entries

  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return null

    if (Array.isArray(c))
      return c
  }

  try {
    return this._readdirEntries(abs, fs.readdirSync(abs))
  } catch (er) {
    this._readdirError(abs, er)
    return null
  }
}

GlobSync.prototype._readdirEntries = function (abs, entries) {
  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries

  // mark and cache dir-ness
  return entries
}

GlobSync.prototype._readdirError = function (f, er) {
  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        throw error
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict)
        throw er
      if (!this.silent)
        console.error('glob error', er)
      break
  }
}

GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

  var entries = this._readdir(abs, inGlobStar)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false)

  var len = entries.length
  var isSym = this.symlinks[abs]

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true)
  }
}

GlobSync.prototype._processSimple = function (prefix, index) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var exists = this._stat(prefix)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
}

// Returns either 'DIR', 'FILE', or false
GlobSync.prototype._stat = function (f) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return false

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return c

    if (needDir && c === 'FILE')
      return false

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (!stat) {
    var lstat
    try {
      lstat = fs.lstatSync(abs)
    } catch (er) {
      if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
        this.statCache[abs] = false
        return false
      }
    }

    if (lstat && lstat.isSymbolicLink()) {
      try {
        stat = fs.statSync(abs)
      } catch (er) {
        stat = lstat
      }
    } else {
      stat = lstat
    }
  }

  this.statCache[abs] = stat

  var c = true
  if (stat)
    c = stat.isDirectory() ? 'DIR' : 'FILE'

  this.cache[abs] = this.cache[abs] || c

  if (needDir && c === 'FILE')
    return false

  return c
}

GlobSync.prototype._mark = function (p) {
  return common.mark(this, p)
}

GlobSync.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}


/***/ }),

/***/ 765:
/***/ (function(module, exports, __webpack_require__) {

var wrappy = __webpack_require__(701)
var reqs = Object.create(null)
var once = __webpack_require__(702)

module.exports = wrappy(inflight)

function inflight (key, cb) {
  if (reqs[key]) {
    reqs[key].push(cb)
    return null
  } else {
    reqs[key] = [cb]
    return makeres(key)
  }
}

function makeres (key) {
  return once(function RES () {
    var cbs = reqs[key]
    var len = cbs.length
    var args = slice(arguments)

    // XXX It's somewhat ambiguous whether a new callback added in this
    // pass should be queued for later execution if something in the
    // list of callbacks throws, or if it should just be discarded.
    // However, it's such an edge case that it hardly matters, and either
    // choice is likely as surprising as the other.
    // As it happens, we do go ahead and schedule it for later execution.
    try {
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args)
      }
    } finally {
      if (cbs.length > len) {
        // added more in the interim.
        // de-zalgo, just in case, but don't call again.
        cbs.splice(0, len)
        process.nextTick(function () {
          RES.apply(null, args)
        })
      } else {
        delete reqs[key]
      }
    }
  })
}

function slice (args) {
  var length = args.length
  var array = []

  for (var i = 0; i < length; i++) array[i] = args[i]
  return array
}


/***/ })

}]);