(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ 1176:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1177:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 657:
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

// EXTERNAL MODULE: ./renderer/src/components/Scaffold/index.js + 4 modules
var Scaffold = __webpack_require__(714);

// EXTERNAL MODULE: ./renderer/src/components/CreateProjectDialog/index.jsx
var CreateProjectDialog = __webpack_require__(772);

// EXTERNAL MODULE: ./renderer/src/components/CustomScaffold/Attribute.jsx
var Attribute = __webpack_require__(707);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/dialog/index.js
var dialog = __webpack_require__(24);
var dialog_default = /*#__PURE__*/__webpack_require__.n(dialog);

// EXTERNAL MODULE: ./renderer/src/components/Chrome/index.jsx
var Chrome = __webpack_require__(792);

// CONCATENATED MODULE: ./renderer/src/components/CustomScaffold/ColorCard.jsx


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



var
/**
 * 显示色彩阶梯
 */
ColorCard_ColorCard = (_dec = Object(index_module["b" /* inject */])('customScaffold'), _dec(_class = Object(index_module["c" /* observer */])(_class =
/*#__PURE__*/
function (_Component) {
  _inherits(ColorCard, _Component);

  function ColorCard() {
    _classCallCheck(this, ColorCard);

    return _possibleConstructorReturn(this, _getPrototypeOf(ColorCard).apply(this, arguments));
  }

  _createClass(ColorCard, [{
    key: "render",
    value: function render() {
      var customScaffold = this.props.customScaffold;
      var primaryColors = customScaffold.primaryColors;
      var secondaryColors = customScaffold.secondaryColors;
      return external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'row',
          padding: '10px 0'
        }
      }, external_window_React_default.a.createElement("div", null, "\u4E3B\u8272\u9636\uFF1A"), primaryColors.map(function (hex, i) {
        return external_window_React_default.a.createElement("div", {
          title: hex,
          key: i,
          style: {
            backgroundColor: hex,
            width: 16,
            height: 16
          }
        });
      })), external_window_React_default.a.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'row',
          padding: '5px 0'
        }
      }, external_window_React_default.a.createElement("div", null, "\u8F85\u8272\u9636\uFF1A"), secondaryColors.map(function (hex) {
        return external_window_React_default.a.createElement("div", {
          title: hex,
          key: hex,
          style: {
            backgroundColor: hex,
            width: 16,
            height: 16
          }
        });
      })), external_window_React_default.a.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'row',
          padding: '5px 0'
        }
      }, external_window_React_default.a.createElement(button_default.a, {
        type: "primary",
        size: "small",
        style: {
          backgroundColor: primaryColors[5]
        }
      }, "\u4E3B\u6309\u94AE"), external_window_React_default.a.createElement(button_default.a, {
        type: "secondary",
        size: "small",
        style: {
          backgroundColor: secondaryColors[0],
          marginLeft: 10
        }
      }, "\u6B21\u6309\u94AE")));
    }
  }]);

  return ColorCard;
}(external_window_React_["Component"])) || _class) || _class);
/* harmony default export */ var CustomScaffold_ColorCard = (ColorCard_ColorCard);
// EXTERNAL MODULE: ./renderer/src/components/Scaffold/Preview.jsx
var Preview = __webpack_require__(740);

// CONCATENATED MODULE: ./renderer/src/components/CustomScaffold/CustomDialog.jsx



var CustomDialog_dec, CustomDialog_class, _temp;

function CustomDialog_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { CustomDialog_typeof = function _typeof(obj) { return typeof obj; }; } else { CustomDialog_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return CustomDialog_typeof(obj); }

function CustomDialog_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function CustomDialog_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function CustomDialog_createClass(Constructor, protoProps, staticProps) { if (protoProps) CustomDialog_defineProperties(Constructor.prototype, protoProps); if (staticProps) CustomDialog_defineProperties(Constructor, staticProps); return Constructor; }

function CustomDialog_possibleConstructorReturn(self, call) { if (call && (CustomDialog_typeof(call) === "object" || typeof call === "function")) { return call; } return CustomDialog_assertThisInitialized(self); }

function CustomDialog_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function CustomDialog_getPrototypeOf(o) { CustomDialog_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return CustomDialog_getPrototypeOf(o); }

function CustomDialog_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) CustomDialog_setPrototypeOf(subClass, superClass); }

function CustomDialog_setPrototypeOf(o, p) { CustomDialog_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return CustomDialog_setPrototypeOf(o, p); }







var CustomDialog_CustomDialog = (CustomDialog_dec = Object(index_module["b" /* inject */])('customScaffold', 'scaffold'), CustomDialog_dec(CustomDialog_class = Object(index_module["c" /* observer */])(CustomDialog_class = (_temp =
/*#__PURE__*/
function (_Component) {
  CustomDialog_inherits(CustomDialog, _Component);

  function CustomDialog() {
    var _getPrototypeOf2;

    var _this;

    CustomDialog_classCallCheck(this, CustomDialog);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = CustomDialog_possibleConstructorReturn(this, (_getPrototypeOf2 = CustomDialog_getPrototypeOf(CustomDialog)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleToggle = function () {
      if (!_this.props.scaffold.isCreating) {
        _this.props.customScaffold.toggle();
      }
    };

    _this.handleSaveCustomScaffold = function () {
      // 需要将 Ovservable 对象转换为普通 javascript 结构
      var scaffold = _this.props.customScaffold.scaffold;
      var layoutConfig = _this.props.customScaffold.layoutConfig; // 添加到自定义脚手架历史记录中

      _this.props.customScaffold.saveCustomScaffoldConfig({
        scaffold: scaffold,
        layoutConfig: layoutConfig
      }).then(function () {
        _this.handleToggle();
      });
    };

    _this.handleSaveCustomScaffoldLayoutConfig = function (value) {
      _this.props.customScaffold.setLayoutConfig(value);
    };

    return _this;
  }

  CustomDialog_createClass(CustomDialog, [{
    key: "render",
    value: function render() {
      var customScaffold = this.props.customScaffold;
      return external_window_React_default.a.createElement(dialog_default.a, {
        className: "fullscreen-dialog",
        title: customScaffold.title,
        visible: customScaffold.visible,
        onClose: this.handleToggle,
        footer: external_window_React_default.a.createElement("div", {
          style: {
            background: '#f3f3f3',
            padding: '10px 0',
            textAlign: 'center',
            borderBottomLeftRadius: '6px',
            borderBottomRightRadius: '6px'
          }
        }, external_window_React_default.a.createElement(button_default.a, {
          onClick: this.handleSaveCustomScaffold,
          type: "primary"
        }, "\u4FDD\u5B58"), external_window_React_default.a.createElement(button_default.a, {
          disabled: this.props.scaffold.isCreating,
          onClick: this.handleToggle
        }, "\u53D6\u6D88"))
      }, external_window_React_default.a.createElement("div", {
        className: "custom-scaffold"
      }, external_window_React_default.a.createElement("div", {
        className: "custom-scaffold-form"
      }, external_window_React_default.a.createElement(Attribute["a" /* default */], {
        onChange: this.handleSaveCustomScaffoldLayoutConfig,
        layoutConfig: this.props.customScaffold.layoutConfig
      })), external_window_React_default.a.createElement("div", {
        className: "custom-scaffold-preview"
      }, external_window_React_default.a.createElement(Chrome["a" /* default */], null, external_window_React_default.a.createElement(Preview["a" /* default */], {
        layoutConfig: this.props.customScaffold.layoutConfig
      })), external_window_React_default.a.createElement(CustomScaffold_ColorCard, null))));
    }
  }]);

  return CustomDialog;
}(external_window_React_["Component"]), _temp)) || CustomDialog_class) || CustomDialog_class);
/* harmony default export */ var CustomScaffold_CustomDialog = (CustomDialog_CustomDialog);
// CONCATENATED MODULE: ./renderer/src/components/ColorBlock/index.jsx
function ColorBlock_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ColorBlock_typeof = function _typeof(obj) { return typeof obj; }; } else { ColorBlock_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ColorBlock_typeof(obj); }

function ColorBlock_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ColorBlock_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ColorBlock_createClass(Constructor, protoProps, staticProps) { if (protoProps) ColorBlock_defineProperties(Constructor.prototype, protoProps); if (staticProps) ColorBlock_defineProperties(Constructor, staticProps); return Constructor; }

function ColorBlock_possibleConstructorReturn(self, call) { if (call && (ColorBlock_typeof(call) === "object" || typeof call === "function")) { return call; } return ColorBlock_assertThisInitialized(self); }

function ColorBlock_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ColorBlock_getPrototypeOf(o) { ColorBlock_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ColorBlock_getPrototypeOf(o); }

function ColorBlock_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ColorBlock_setPrototypeOf(subClass, superClass); }

function ColorBlock_setPrototypeOf(o, p) { ColorBlock_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ColorBlock_setPrototypeOf(o, p); }



var ColorBlock_ColorBlock =
/*#__PURE__*/
function (_Component) {
  ColorBlock_inherits(ColorBlock, _Component);

  function ColorBlock() {
    ColorBlock_classCallCheck(this, ColorBlock);

    return ColorBlock_possibleConstructorReturn(this, ColorBlock_getPrototypeOf(ColorBlock).apply(this, arguments));
  }

  ColorBlock_createClass(ColorBlock, [{
    key: "render",
    value: function render() {
      var backgroundColor = this.props.backgroundColor;
      return external_window_React_default.a.createElement("div", {
        style: {
          border: '3px solid #fff',
          borderRadius: 2,
          height: 20,
          width: 50,
          backgroundColor: backgroundColor,
          boxShadow: '0 0 1px rgba(0,0,0,0.5)'
        }
      });
    }
  }]);

  return ColorBlock;
}(external_window_React_["Component"]);

/* harmony default export */ var components_ColorBlock = (ColorBlock_ColorBlock);
// CONCATENATED MODULE: ./renderer/src/components/CustomScaffold/Recent.jsx


var Recent_dec, Recent_class;

function Recent_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Recent_typeof = function _typeof(obj) { return typeof obj; }; } else { Recent_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Recent_typeof(obj); }

function Recent_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Recent_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Recent_createClass(Constructor, protoProps, staticProps) { if (protoProps) Recent_defineProperties(Constructor.prototype, protoProps); if (staticProps) Recent_defineProperties(Constructor, staticProps); return Constructor; }

function Recent_possibleConstructorReturn(self, call) { if (call && (Recent_typeof(call) === "object" || typeof call === "function")) { return call; } return Recent_assertThisInitialized(self); }

function Recent_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Recent_getPrototypeOf(o) { Recent_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Recent_getPrototypeOf(o); }

function Recent_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Recent_setPrototypeOf(subClass, superClass); }

function Recent_setPrototypeOf(o, p) { Recent_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Recent_setPrototypeOf(o, p); }





var Recent_Recent = (Recent_dec = Object(index_module["b" /* inject */])('customScaffold', 'scaffold'), Recent_dec(Recent_class = Object(index_module["c" /* observer */])(Recent_class =
/*#__PURE__*/
function (_Component) {
  Recent_inherits(Recent, _Component);

  function Recent() {
    Recent_classCallCheck(this, Recent);

    return Recent_possibleConstructorReturn(this, Recent_getPrototypeOf(Recent).apply(this, arguments));
  }

  Recent_createClass(Recent, [{
    key: "handleClick",
    value: function handleClick(_ref) {
      var scaffold = _ref.scaffold,
          layoutConfig = _ref.layoutConfig;
      this.props.onClick({
        scaffold: scaffold,
        layoutConfig: layoutConfig
      });
    }
  }, {
    key: "handleRemove",
    value: function handleRemove(index) {
      this.props.customScaffold.removeScaffoldConfigByIndex(index);
    }
  }, {
    key: "handleEdit",
    value: function handleEdit(index) {
      this.props.customScaffold.editScaffoldConfigByIndex(index);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var customScaffold = this.props.customScaffold;
      var scaffoldConfigStores = customScaffold.scaffoldConfigStores;

      if (Array.isArray(scaffoldConfigStores) && scaffoldConfigStores.length > 0) {
        return scaffoldConfigStores.map(function (scaffoldConfig, index) {
          var layoutConfig = scaffoldConfig.layoutConfig,
              scaffold = scaffoldConfig.scaffold;
          return external_window_React_default.a.createElement("div", {
            key: index,
            className: "scaffold-item",
            style: {
              cursor: 'pointer'
            },
            onClick: _this.handleCustomCreateProject
          }, external_window_React_default.a.createElement(Preview["a" /* default */], {
            width: 235,
            scale: 0.7257,
            style: {
              borderRadius: 6
            },
            layoutConfig: layoutConfig
          }), external_window_React_default.a.createElement("div", {
            className: "scaffold-flipcard"
          }, external_window_React_default.a.createElement("div", {
            className: "scaffold-flipcard-body"
          }, external_window_React_default.a.createElement("div", {
            style: {
              display: 'flex',
              padding: '4px 0'
            }
          }, "\u4E3B\u8272\uFF1A", external_window_React_default.a.createElement(components_ColorBlock, {
            backgroundColor: layoutConfig.themeConfig.primaryColor
          })), external_window_React_default.a.createElement("div", {
            style: {
              display: 'flex',
              padding: '4px 0'
            }
          }, "\u8F85\u8272\uFF1A", external_window_React_default.a.createElement(components_ColorBlock, {
            backgroundColor: layoutConfig.themeConfig.secondaryColor
          }))), external_window_React_default.a.createElement("div", {
            className: "scaffold-flipcard-button"
          }, external_window_React_default.a.createElement(button_default.a, {
            size: "small",
            onClick: _this.handleClick.bind(_this, {
              scaffold: scaffold,
              layoutConfig: layoutConfig
            }),
            type: "primary"
          }, "\u4F7F\u7528\u8BE5\u6A21\u677F"), "\xA0\xA0", external_window_React_default.a.createElement(button_default.a, {
            type: "secondary",
            size: "small",
            onClick: _this.handleEdit.bind(_this, index)
          }, "\u7F16\u8F91"), "\xA0\xA0", external_window_React_default.a.createElement(button_default.a, {
            size: "small",
            onClick: _this.handleRemove.bind(_this, index)
          }, "\u5220\u9664"))));
        });
      }

      return null;
    }
  }]);

  return Recent;
}(external_window_React_["Component"])) || Recent_class) || Recent_class);
/* harmony default export */ var CustomScaffold_Recent = (Recent_Recent);
// EXTERNAL MODULE: ./renderer/src/components/Icon/index.jsx
var Icon = __webpack_require__(22);

// CONCATENATED MODULE: ./renderer/src/components/CustomScaffold/Trigger.jsx
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
        className: "scaffold-title-wrapper"
      }, external_window_React_default.a.createElement("div", {
        className: "scaffold-title"
      }, "\u65B0\u5EFA\u81EA\u5B9A\u4E49\u6A21\u677F")));
    }
  }]);

  return ScaffoldTrigger;
}(external_window_React_["Component"]), _class2.displayName = 'ScaffoldTrigger', Trigger_temp)) || Trigger_class) || Trigger_class);
/* harmony default export */ var Trigger = (Trigger_ScaffoldTrigger);
// EXTERNAL MODULE: ./renderer/src/components/CustomScaffold/index.scss
var CustomScaffold = __webpack_require__(1176);

// CONCATENATED MODULE: ./renderer/src/components/CustomScaffold/index.js






// EXTERNAL MODULE: ./renderer/src/pages/Scaffolds/index.scss
var pages_Scaffolds = __webpack_require__(1177);

// CONCATENATED MODULE: ./renderer/src/pages/Scaffolds/index.jsx



var Scaffolds_dec, Scaffolds_class, Scaffolds_class2, Scaffolds_temp;

function Scaffolds_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Scaffolds_typeof = function _typeof(obj) { return typeof obj; }; } else { Scaffolds_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Scaffolds_typeof(obj); }

function Scaffolds_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Scaffolds_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Scaffolds_createClass(Constructor, protoProps, staticProps) { if (protoProps) Scaffolds_defineProperties(Constructor.prototype, protoProps); if (staticProps) Scaffolds_defineProperties(Constructor, staticProps); return Constructor; }

function Scaffolds_possibleConstructorReturn(self, call) { if (call && (Scaffolds_typeof(call) === "object" || typeof call === "function")) { return call; } return Scaffolds_assertThisInitialized(self); }

function Scaffolds_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Scaffolds_getPrototypeOf(o) { Scaffolds_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Scaffolds_getPrototypeOf(o); }

function Scaffolds_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Scaffolds_setPrototypeOf(subClass, superClass); }

function Scaffolds_setPrototypeOf(o, p) { Scaffolds_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Scaffolds_setPrototypeOf(o, p); }








var TabPane = tab_default.a.TabPane;
var Scaffolds_Scaffolds = (Scaffolds_dec = Object(index_module["b" /* inject */])('materials', 'scaffold', 'customScaffold'), Scaffolds_dec(Scaffolds_class = Object(index_module["c" /* observer */])(Scaffolds_class = (Scaffolds_temp = Scaffolds_class2 =
/*#__PURE__*/
function (_Component) {
  Scaffolds_inherits(Scaffolds, _Component);

  function Scaffolds() {
    var _getPrototypeOf2;

    var _this;

    Scaffolds_classCallCheck(this, Scaffolds);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Scaffolds_possibleConstructorReturn(this, (_getPrototypeOf2 = Scaffolds_getPrototypeOf(Scaffolds)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.renderScaffoldsTabPanel = function () {
      var _this$props$materials = _this.props.materials,
          materials = _this$props$materials.materials,
          getScaffoldTabActiveKey = _this$props$materials.getScaffoldTabActiveKey;

      if (!materials || materials.length === 0) {
        return null;
      }

      return materials.map(function (material, index) {
        return external_window_React_default.a.createElement(TabPane, {
          tab: material.name,
          key: getScaffoldTabActiveKey(index)
        }, external_window_React_default.a.createElement(Scaffold["c" /* Panel */], {
          onClick: _this.props.handleSelectedScaffold,
          material: material
        }));
      });
    };

    return _this;
  }

  Scaffolds_createClass(Scaffolds, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.materials.refresh();
    }
  }, {
    key: "render",
    value: function render() {
      return external_window_React_default.a.createElement("div", {
        className: "scaffold-page"
      }, external_window_React_default.a.createElement("div", {
        className: "scaffold-header"
      }, "\u6A21\u677F\u5E02\u573A"), external_window_React_default.a.createElement("div", {
        className: "scaffold-body"
      }, external_window_React_default.a.createElement(tab_default.a, {
        className: "tab-fullscreen",
        activeKey: this.props.materials.tabScaffoldActiveKey,
        onChange: this.props.handleTabChange,
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
          onClick: this.props.handleRefresh
        }, "\u5237\u65B0\u5217\u8868"))
      }, this.renderScaffoldsTabPanel(), external_window_React_default.a.createElement(TabPane, {
        tab: "\u81EA\u5B9A\u4E49\u6A21\u677F",
        key: "custom-scaffold"
      }, external_window_React_default.a.createElement("div", {
        className: "scaffold-custom"
      }, external_window_React_default.a.createElement("div", {
        className: "scaffold-items-wrapper"
      }, external_window_React_default.a.createElement(Trigger, {
        onClick: this.props.handleOpenCustomScaffoldDialog
      }), external_window_React_default.a.createElement(CustomScaffold_Recent, {
        onClick: this.props.handleGenerateProjectByCustom
      })))))), external_window_React_default.a.createElement(CustomScaffold_CustomDialog, null), external_window_React_default.a.createElement(CreateProjectDialog["a" /* default */], null));
    }
  }]);

  return Scaffolds;
}(external_window_React_["Component"]), Scaffolds_class2.displayName = 'Scaffolds', Scaffolds_class2.propTypes = {
  materials: prop_types_default.a.object.isRequired,
  handleSelectedScaffold: prop_types_default.a.func.isRequired,
  handleTabChange: prop_types_default.a.func.isRequired,
  handleRefresh: prop_types_default.a.func.isRequired,
  handleOpenCustomScaffoldDialog: prop_types_default.a.func.isRequired,
  handleGenerateProjectByCustom: prop_types_default.a.func.isRequired
}, Scaffolds_temp)) || Scaffolds_class) || Scaffolds_class);
/* harmony default export */ var src_pages_Scaffolds = __webpack_exports__["default"] = (Object(Scaffold["d" /* ScaffoldHoc */])(Scaffolds_Scaffolds));

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

/***/ 671:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(680);
__webpack_require__(680);
module.exports = __webpack_require__(716);

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

/***/ 680:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(680);
module.exports = __webpack_require__(715);

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

/***/ 707:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Attribute; });
/* harmony import */ var _icedesign_base_lib_tab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(674);
/* harmony import */ var _icedesign_base_lib_tab__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_icedesign_base_lib_tab__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var deepcopy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(773);
/* harmony import */ var deepcopy__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(deepcopy__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _icedesign_template_builder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(725);
/* harmony import */ var _icedesign_template_builder__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_icedesign_template_builder__WEBPACK_IMPORTED_MODULE_3__);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var TabPane = _icedesign_base_lib_tab__WEBPACK_IMPORTED_MODULE_0___default.a.TabPane;

var Attribute =
/*#__PURE__*/
function (_Component) {
  _inherits(Attribute, _Component);

  function Attribute(props) {
    var _this;

    _classCallCheck(this, Attribute);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Attribute).call(this, props));

    _this.onChange = function (value) {
      _this.props.onChange(value);
    };

    return _this;
  }

  _createClass(Attribute, [{
    key: "render",
    value: function render() {
      var layoutConfig = this.props.layoutConfig;
      var lc = deepcopy__WEBPACK_IMPORTED_MODULE_2___default()(layoutConfig);
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "project-config-form"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_icedesign_base_lib_tab__WEBPACK_IMPORTED_MODULE_0___default.a, {
        size: "small",
        onChange: this.handleChange
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(TabPane, {
        key: "1",
        tab: "\u4E3B\u9898"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_icedesign_template_builder__WEBPACK_IMPORTED_MODULE_3__["BasicForm"], {
        value: lc,
        onChange: this.onChange
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(TabPane, {
        key: "2",
        tab: "\u5E03\u5C40"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          height: '284px',
          overflowY: 'scroll'
        }
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_icedesign_template_builder__WEBPACK_IMPORTED_MODULE_3__["HeaderForm"], {
        value: lc,
        onChange: this.onChange
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_icedesign_template_builder__WEBPACK_IMPORTED_MODULE_3__["AsideForm"], {
        value: lc,
        onChange: this.onChange
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_icedesign_template_builder__WEBPACK_IMPORTED_MODULE_3__["FooterForm"], {
        value: lc,
        onChange: this.onChange
      }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(TabPane, {
        key: "3",
        tab: "\u9AD8\u7EA7"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_icedesign_template_builder__WEBPACK_IMPORTED_MODULE_3__["AdvancedForm"], {
        value: lc,
        onChange: this.onChange
      }))));
    }
  }]);

  return Attribute;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

Attribute.defaultProps = {
  onChange: function onChange() {}
};


/***/ }),

/***/ 714:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/checkbox/index.js
var lib_checkbox = __webpack_require__(671);
var checkbox_default = /*#__PURE__*/__webpack_require__.n(lib_checkbox);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/input/index.js
var input = __webpack_require__(664);
var input_default = /*#__PURE__*/__webpack_require__.n(input);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/select/index.js
var lib_select = __webpack_require__(724);
var select_default = /*#__PURE__*/__webpack_require__.n(lib_select);

// EXTERNAL MODULE: ./renderer/node_modules/mobx-react/index.module.js
var index_module = __webpack_require__(81);

// EXTERNAL MODULE: external "electron"
var external_electron_ = __webpack_require__(4);

// EXTERNAL MODULE: external "window.React"
var external_window_React_ = __webpack_require__(1);
var external_window_React_default = /*#__PURE__*/__webpack_require__.n(external_window_React_);

// EXTERNAL MODULE: ./renderer/node_modules/rc-tooltip/es/index.js + 28 modules
var es = __webpack_require__(99);

// EXTERNAL MODULE: ./renderer/src/services.js
var services = __webpack_require__(6);

// EXTERNAL MODULE: ./renderer/src/components/Icon/index.jsx
var Icon = __webpack_require__(22);

// EXTERNAL MODULE: ./renderer/src/components/Progress/index.jsx
var Progress = __webpack_require__(679);

// CONCATENATED MODULE: ./renderer/src/components/Scaffold/Form.jsx




var Form_dec, Form_class, Form_temp;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var Option = select_default.a.Option;
/**
 * 模板生成表单项目
 */

var Form_ScaffoldForm = (Form_dec = Object(index_module["b" /* inject */])('scaffold', 'projects'), Form_dec(Form_class = Object(index_module["c" /* observer */])(Form_class = (Form_temp =
/*#__PURE__*/
function (_Component) {
  _inherits(ScaffoldForm, _Component);

  function ScaffoldForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ScaffoldForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScaffoldForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.openProjectDirectory = function () {
      if (!_this.props.scaffold.isCreating) {
        _this.props.scaffold.openDirectory();
      }
    };

    _this.changeProjectName = function (value) {
      _this.props.scaffold.setProjectName(value);
    };

    _this.changeProjectFolderName = function (value) {
      _this.props.scaffold.setProjectFolderName(value);
    };

    _this.toggleInstall = function () {
      _this.props.scaffold.toggleInstall();
    };

    _this.toggleNodeProject = function (checked) {
      _this.props.scaffold.toggleNodeSelect(checked);
    };

    _this.handleNodeFrameSelect = function (value) {
      _this.props.scaffold.toggleNodeProject(value);
    };

    _this.handleOpenMidwayDoc = function () {
      external_electron_["shell"].openExternal('https://midwayjs.org/midway/guide.html');
    };

    _this.handleMidwaySelect = function (checked) {
      if (checked) {
        _this.props.scaffold.toggleNodeProject('midwayAli');
      } else {
        _this.props.scaffold.toggleNodeProject('');
      }
    };

    return _this;
  }

  _createClass(ScaffoldForm, [{
    key: "render",
    value: function render() {
      var builder = this.props.scaffold.scaffold.builder;
      var isAlibaba = services["a" /* default */].settings.get('isAlibaba');
      var hasIce = builder && builder === 'ice-scripts';
      var showNodeOutside = !isAlibaba && hasIce;
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
      }, "*"), " \u8DEF\u5F84\uFF1A"), external_window_React_default.a.createElement(es["default"], {
        placement: 'bottomRight',
        overlay: external_window_React_default.a.createElement("div", {
          style: {
            maxWidth: 120
          }
        }, "\u57FA\u7840\u8DEF\u5F84\uFF0C\u9879\u76EE\u76EE\u5F55\u4F1A\u521B\u5EFA\u5230\u8BE5\u8DEF\u5F84\u4E0B")
      }, external_window_React_default.a.createElement("div", {
        onClick: this.openProjectDirectory
      }, external_window_React_default.a.createElement(input_default.a, {
        style: {
          width: '100%'
        },
        readOnly: true,
        addonAfter: external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement(Icon["a" /* default */], {
          type: 'folderopen'
        })),
        value: this.props.scaffold.getProjectPathWithWorkspace()
      })))), external_window_React_default.a.createElement("div", {
        className: "project-config-form-item"
      }, external_window_React_default.a.createElement("h3", {
        style: {
          margin: 0
        }
      }, external_window_React_default.a.createElement("span", {
        style: {
          color: 'red'
        }
      }, "*"), " \u9879\u76EE\u76EE\u5F55\u540D\uFF1A"), external_window_React_default.a.createElement(input_default.a, {
        ref: "name",
        placeholder: '首字母开头、字母数字中下划线组合 (必填)',
        disabled: this.props.scaffold.isCreating,
        value: this.props.scaffold.projectFolderName,
        onChange: this.changeProjectFolderName
      }), external_window_React_default.a.createElement("div", {
        className: "project-config-form-item-error-message"
      }, this.props.scaffold.projectFolderNameValidation)), external_window_React_default.a.createElement("div", {
        className: "project-config-form-item"
      }, external_window_React_default.a.createElement("h3", {
        style: {
          margin: 0
        }
      }, "\u9879\u76EE\u522B\u540D\uFF1A"), external_window_React_default.a.createElement(input_default.a, {
        placeholder: '可输入中文 (选填)',
        disabled: this.props.scaffold.isCreating,
        value: this.props.scaffold.projectName,
        onChange: this.changeProjectName
      })), external_window_React_default.a.createElement("div", {
        className: "project-config-form-item",
        style: {
          lineHeight: '28px'
        }
      }, isAlibaba ? // TODO 解决tnpm的问题
      // <label>
      //   添加 Midway 
      //   <Checkbox
      //     disabled={this.props.scaffold.isCreating}
      //     onChange={this.handleMidwaySelect}
      //     style={{ margin: '0 4px', verticalAlign: 'middle' }}
      //   />
      // </label>
      null : hasIce ? external_window_React_default.a.createElement("label", null, "\u6DFB\u52A0\u670D\u52A1\u7AEF\u5F00\u53D1\u6846\u67B6", external_window_React_default.a.createElement(checkbox_default.a, {
        disabled: this.props.scaffold.isCreating,
        onChange: this.toggleNodeProject,
        style: {
          margin: '0 4px',
          verticalAlign: 'middle'
        }
      })) : null, this.props.scaffold.isNode && external_window_React_default.a.createElement(select_default.a, {
        placeholder: "\u9009\u62E9\u6846\u67B6",
        onChange: this.handleNodeFrameSelect,
        style: {
          verticalAlign: 'middle'
        }
      }, external_window_React_default.a.createElement(Option, {
        value: "midway"
      }, "Midway"), external_window_React_default.a.createElement(Option, {
        value: "koa2"
      }, "Koa")), this.props.scaffold.nodeFramework === 'midway' // TODO 解决tnpm的问题
      // || this.props.scaffold.nodeFramework === 'midwayAli'
      && external_window_React_default.a.createElement("span", {
        style: {
          cursor: 'pointer'
        },
        onClick: this.handleOpenMidwayDoc
      }, external_window_React_default.a.createElement(Icon["a" /* default */], {
        type: "help",
        style: {
          margin: '0 4px 0 8px',
          color: '#5797fb'
        }
      }), external_window_React_default.a.createElement("span", {
        style: {
          color: '#5797fb'
        }
      }, "Midway \u5B98\u65B9\u6587\u6863"))), external_window_React_default.a.createElement(Progress["a" /* default */], null));
    }
  }]);

  return ScaffoldForm;
}(external_window_React_["Component"]), Form_temp)) || Form_class) || Form_class);
/* harmony default export */ var Form = (Form_ScaffoldForm);
// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/button/index.js
var lib_button = __webpack_require__(65);
var button_default = /*#__PURE__*/__webpack_require__.n(lib_button);

// EXTERNAL MODULE: ./renderer/node_modules/classnames/index.js
var classnames = __webpack_require__(8);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// EXTERNAL MODULE: ./renderer/node_modules/react-in-viewport/dist/es/index.js
var dist_es = __webpack_require__(717);

// EXTERNAL MODULE: ./renderer/src/components/dialog/index.js + 4 modules
var dialog = __webpack_require__(100);

// CONCATENATED MODULE: ./renderer/src/components/Scaffold/Item.jsx


var Item_class, Item_class2, Item_temp;

function Item_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Item_typeof = function _typeof(obj) { return typeof obj; }; } else { Item_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Item_typeof(obj); }

function Item_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Item_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Item_createClass(Constructor, protoProps, staticProps) { if (protoProps) Item_defineProperties(Constructor.prototype, protoProps); if (staticProps) Item_defineProperties(Constructor, staticProps); return Constructor; }

function Item_possibleConstructorReturn(self, call) { if (call && (Item_typeof(call) === "object" || typeof call === "function")) { return call; } return Item_assertThisInitialized(self); }

function Item_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Item_getPrototypeOf(o) { Item_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Item_getPrototypeOf(o); }

function Item_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Item_setPrototypeOf(subClass, superClass); }

function Item_setPrototypeOf(o, p) { Item_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Item_setPrototypeOf(o, p); }








var Item_ScaffoldItem = Object(index_module["c" /* observer */])(Item_class = (Item_temp = Item_class2 =
/*#__PURE__*/
function (_Component) {
  Item_inherits(ScaffoldItem, _Component);

  function ScaffoldItem() {
    var _getPrototypeOf2;

    var _this;

    Item_classCallCheck(this, ScaffoldItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Item_possibleConstructorReturn(this, (_getPrototypeOf2 = Item_getPrototypeOf(ScaffoldItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.openInBrowser = function () {
      // https://github.com/alibaba/ice/issues/219
      // sometimes data is not trustable
      // make sure home page is a valid URL any time
      var _this$props$data = _this.props.data,
          data = _this$props$data === void 0 ? {} : _this$props$data;
      external_electron_["shell"].openExternal(data.homepage);
    };

    _this.createProject = function () {
      var _this$props = _this.props,
          createProject = _this$props.createProject,
          _this$props$data2 = _this$props.data,
          data = _this$props$data2 === void 0 ? {} : _this$props$data2,
          _this$props$scaffolds = _this$props.scaffolds,
          scaffolds = _this$props$scaffolds === void 0 ? {} : _this$props$scaffolds,
          _this$props$isOfficia = _this$props.isOfficialSource,
          isOfficialSource = _this$props$isOfficia === void 0 ? false : _this$props$isOfficia;
      var isOfficialSrc = isOfficialSource || /ice\.alicdn\.com\/(pre-)?assets\/react-materials\.json/.test(scaffolds.material.source);
      var hasIceScripts = data.builder === 'ice-scripts';

      if (isOfficialSrc) {
        if (hasIceScripts) {
          createProject(data);
        } else {
          dialog["a" /* default */].confirm({
            title: '提示',
            content: external_window_React_default.a.createElement("div", null, "\u5F53\u524D\u6A21\u677F\u4F7F\u7528\u7684\u6784\u5EFA\u5DE5\u5177\u975E\u98DE\u51B0\u5B98\u65B9\u63D0\u4F9B\u7684 ice-scripts\uFF0C\u5982\u9700\u8981\u81EA\u5B9A\u4E49\u6784\u5EFA\uFF0C\u8BF7\u53C2\u8003\u9879\u76EE README \u8FDB\u884C\u4F7F\u7528\u3002")
          }, function (ok) {
            if (ok) {
              createProject(data);
            }
          });
        }
      } else {
        createProject(data);
      }
    };

    return _this;
  }

  Item_createClass(ScaffoldItem, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          data = _this$props2.data,
          mobile = _this$props2.mobile,
          innerRef = _this$props2.innerRef,
          enterCount = _this$props2.enterCount;
      var showInviewport = enterCount > 0;
      return external_window_React_default.a.createElement("div", {
        ref: innerRef,
        className: classnames_default()({
          'scaffold-item': true,
          'scaffold-item-mobile': mobile,
          'scaffold-item-pc': !mobile
        })
      }, showInviewport && external_window_React_default.a.createElement("div", {
        className: "scaffold-image",
        style: {
          backgroundImage: "url(\"".concat(data.screenshot, "\")")
        }
      }), showInviewport && external_window_React_default.a.createElement("div", {
        className: "scaffold-title-wrapper"
      }, external_window_React_default.a.createElement("div", {
        className: "scaffold-title"
      }, data.title), data._isNew && external_window_React_default.a.createElement("div", {
        className: "global-new-tag"
      }, "new")), showInviewport && external_window_React_default.a.createElement("div", {
        className: "scaffold-flipcard"
      }, external_window_React_default.a.createElement("div", {
        className: "scaffold-flipcard-body"
      }, external_window_React_default.a.createElement("h2", null, data.title), external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement("p", null, data.description))), external_window_React_default.a.createElement("div", {
        className: "scaffold-flipcard-button"
      }, external_window_React_default.a.createElement(button_default.a, {
        size: "small",
        onClick: this.createProject,
        type: "primary"
      }, "\u4F7F\u7528\u8BE5\u6A21\u677F"), "\xA0\xA0", data.homepage && external_window_React_default.a.createElement(button_default.a, {
        size: "small",
        onClick: this.openInBrowser,
        type: "normal"
      }, "\u5728\u7EBF\u9884\u89C8"))));
    }
  }]);

  return ScaffoldItem;
}(external_window_React_["Component"]), Item_class2.displayName = 'ScaffoldItem', Item_temp)) || Item_class;

/* harmony default export */ var Item = (Object(dist_es["a" /* default */])(Item_ScaffoldItem));
// EXTERNAL MODULE: ./renderer/src/components/CateMenu/index.jsx
var CateMenu = __webpack_require__(705);

// EXTERNAL MODULE: ./renderer/src/components/EmptyTips/index.jsx
var EmptyTips = __webpack_require__(663);

// CONCATENATED MODULE: ./renderer/src/components/Scaffold/Panel.jsx
var Panel_class, Panel_temp;

function Panel_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Panel_typeof = function _typeof(obj) { return typeof obj; }; } else { Panel_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Panel_typeof(obj); }

function Panel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Panel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Panel_createClass(Constructor, protoProps, staticProps) { if (protoProps) Panel_defineProperties(Constructor.prototype, protoProps); if (staticProps) Panel_defineProperties(Constructor, staticProps); return Constructor; }

function Panel_possibleConstructorReturn(self, call) { if (call && (Panel_typeof(call) === "object" || typeof call === "function")) { return call; } return Panel_assertThisInitialized(self); }

function Panel_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Panel_getPrototypeOf(o) { Panel_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Panel_getPrototypeOf(o); }

function Panel_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Panel_setPrototypeOf(subClass, superClass); }

function Panel_setPrototypeOf(o, p) { Panel_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Panel_setPrototypeOf(o, p); }







var Panel_Panel = Object(index_module["c" /* observer */])(Panel_class = (Panel_temp =
/*#__PURE__*/
function (_Component) {
  Panel_inherits(Panel, _Component);

  function Panel(props) {
    var _this;

    Panel_classCallCheck(this, Panel);

    _this = Panel_possibleConstructorReturn(this, Panel_getPrototypeOf(Panel).call(this, props));

    _this.handleClick = function (value) {
      var material = _this.props.material;
      var scaffolds = material.scaffolds;

      if (scaffolds) {
        scaffolds.activeCategory = value;
      }
    };

    return _this;
  }
  /**
   * 点击模板分类菜单的回调
   */


  Panel_createClass(Panel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var material = this.props.material;
      var scaffolds = material.scaffolds || null;

      if (material.error) {
        return external_window_React_default.a.createElement(EmptyTips["a" /* default */], {
          size: 120,
          style: {
            margin: '0 10px'
          }
        }, material.error);
      }

      if (!scaffolds) {
        return external_window_React_default.a.createElement(EmptyTips["a" /* default */], {
          size: 120
        }, "\u52A0\u8F7D\u4E2D...");
      }

      if (Array.isArray(scaffolds.values) && scaffolds.values.length === 0) {
        return external_window_React_default.a.createElement("div", {
          style: {
            padding: 10
          }
        }, external_window_React_default.a.createElement(EmptyTips["a" /* default */], {
          size: 120
        }, "\u5F53\u524D\u7269\u6599\u6E90\u6682\u65E0\u6A21\u677F"));
      }

      return external_window_React_default.a.createElement("div", {
        className: "scaffold-panel-body"
      }, scaffolds.categories && scaffolds.categories.length > 0 && external_window_React_default.a.createElement(CateMenu["a" /* default */], {
        data: scaffolds.categories,
        onClick: this.handleClick
      }), external_window_React_default.a.createElement("div", {
        className: "scaffold-items-wrapper"
      }, scaffolds.values.map(function (scaffold, index) {
        return external_window_React_default.a.createElement(Item, {
          key: index,
          mobile: material.platform === 'mobile',
          data: scaffold,
          scaffolds: scaffolds,
          createProject: _this2.props.onClick
        });
      })));
    }
  }]);

  return Panel;
}(external_window_React_["Component"]), Panel_temp)) || Panel_class;

/* harmony default export */ var Scaffold_Panel = (Panel_Panel);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(2);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./renderer/src/lib/logger.js
var logger = __webpack_require__(7);

// CONCATENATED MODULE: ./renderer/src/components/Scaffold/ScaffoldHoc.jsx
function ScaffoldHoc_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ScaffoldHoc_typeof = function _typeof(obj) { return typeof obj; }; } else { ScaffoldHoc_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ScaffoldHoc_typeof(obj); }

function ScaffoldHoc_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ScaffoldHoc_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ScaffoldHoc_createClass(Constructor, protoProps, staticProps) { if (protoProps) ScaffoldHoc_defineProperties(Constructor.prototype, protoProps); if (staticProps) ScaffoldHoc_defineProperties(Constructor, staticProps); return Constructor; }

function ScaffoldHoc_possibleConstructorReturn(self, call) { if (call && (ScaffoldHoc_typeof(call) === "object" || typeof call === "function")) { return call; } return ScaffoldHoc_assertThisInitialized(self); }

function ScaffoldHoc_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ScaffoldHoc_getPrototypeOf(o) { ScaffoldHoc_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ScaffoldHoc_getPrototypeOf(o); }

function ScaffoldHoc_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ScaffoldHoc_setPrototypeOf(subClass, superClass); }

function ScaffoldHoc_setPrototypeOf(o, p) { ScaffoldHoc_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ScaffoldHoc_setPrototypeOf(o, p); }






var ScaffoldHoc_ScaffoldHoc = function ScaffoldHoc(WrappedComponent) {
  var _dec, _class, _class2, _temp;

  var Scaffold = (_dec = Object(index_module["b" /* inject */])('materials', 'scaffold', 'customScaffold'), _dec(_class = Object(index_module["c" /* observer */])(_class = (_temp = _class2 =
  /*#__PURE__*/
  function (_Component) {
    ScaffoldHoc_inherits(Scaffold, _Component);

    function Scaffold() {
      var _getPrototypeOf2;

      var _this;

      ScaffoldHoc_classCallCheck(this, Scaffold);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = ScaffoldHoc_possibleConstructorReturn(this, (_getPrototypeOf2 = ScaffoldHoc_getPrototypeOf(Scaffold)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _this.handleRefresh = function () {
        _this.props.materials.refresh();
      };

      _this.handleTabChange = function (key) {
        _this.props.materials.setScaffoldTabActiveKey(key);
      };

      _this.handleSelectedScaffold = function (scaffold) {
        _this.props.scaffold.setScaffoldConfig({
          scaffold: scaffold
        });

        _this.props.scaffold.open();
      };

      _this.handleClose = function () {
        if (!_this.props.scaffold.isCreating) {
          _this.props.scaffold.close();
        } else {
          _this.props.scaffold.abort();
        }
      };

      _this.handleOpenCustomScaffoldDialog = function () {
        _this.props.customScaffold.reset();

        _this.props.customScaffold.toggle();
      };

      _this.handleGenerateProjectByCustom = function (config) {
        _this.props.scaffold.setScaffoldConfig(config);

        _this.props.scaffold.toggle();
      };

      _this.handleGeneratorProject = function () {
        // 需要将 Ovservable 对象转换为普通 javascript 结构
        var layoutConfig = _this.props.scaffold.layoutConfig;
        var scaffold = _this.props.scaffold.scaffold;
        var projectName = _this.props.scaffold.projectFinalName;
        var nodeFramework = _this.props.scaffold.nodeFramework;
        var options = {
          scaffold: scaffold,
          projectName: projectName,
          layoutConfig: layoutConfig,
          isCustomScaffold: !!layoutConfig,
          // 存在 layoutConfig 表示自定义模板
          nodeFramework: nodeFramework
        };

        var currentPath = _this.props.scaffold.getProjectPathWithWorkspace();

        _this.props.scaffold.createProjectFolder().then(function (gotoCreate) {
          if (gotoCreate) {
            var SectionCount = nodeFramework ? 2 : 1;

            _this.props.scaffold.startProgress(SectionCount);

            return _this.props.scaffold.create(currentPath, options);
          } else {
            return Promise.resolve(gotoCreate);
          }
        }).then(function (cpmpleteConfig) {
          // eslint-disable-next-line no-console
          logger["a" /* default */].info(cpmpleteConfig); //  完成后的结果展示

          _this.props.scaffold.endProgress();

          _this.props.scaffold.addNewProjectToProjects(currentPath, true); // true 用来标识提示用户安装依赖


          _this.props.scaffold.pushRoute('/');

          _this.props.materials.updateComponents();
        }).catch(function (error) {
          // eslint-disable-next-line no-console
          logger["a" /* default */].error(error);

          _this.props.scaffold.resetProgress();
        });
      };

      return _this;
    }

    ScaffoldHoc_createClass(Scaffold, [{
      key: "render",
      value: function render() {
        return external_window_React_default.a.createElement(WrappedComponent, {
          handleRefresh: this.handleRefresh,
          handleTabChange: this.handleTabChange,
          handleSelectedScaffold: this.handleSelectedScaffold,
          handleClose: this.handleClose,
          handleOpenCustomScaffoldDialog: this.handleOpenCustomScaffoldDialog,
          handleGenerateProjectByCustom: this.handleGenerateProjectByCustom,
          handleGeneratorProject: this.handleGeneratorProject
        });
      }
    }]);

    return Scaffold;
  }(external_window_React_["Component"]), _class2.displayName = 'Scaffold', _class2.propTypes = {
    materials: prop_types_default.a.object,
    scaffold: prop_types_default.a.object,
    customScaffold: prop_types_default.a.object
  }, _temp)) || _class) || _class);
  return Scaffold;
};

/* harmony default export */ var Scaffold_ScaffoldHoc = (ScaffoldHoc_ScaffoldHoc);
// EXTERNAL MODULE: ./renderer/src/components/Scaffold/form.scss
var Scaffold_form = __webpack_require__(770);

// EXTERNAL MODULE: ./renderer/src/components/Scaffold/item.scss
var item = __webpack_require__(771);

// CONCATENATED MODULE: ./renderer/src/components/Scaffold/index.js
/* concated harmony reexport Form */__webpack_require__.d(__webpack_exports__, "a", function() { return Form; });
/* concated harmony reexport Item */__webpack_require__.d(__webpack_exports__, "b", function() { return Item; });
/* concated harmony reexport Panel */__webpack_require__.d(__webpack_exports__, "c", function() { return Scaffold_Panel; });
/* concated harmony reexport ScaffoldHoc */__webpack_require__.d(__webpack_exports__, "d", function() { return Scaffold_ScaffoldHoc; });








/***/ }),

/***/ 740:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _icedesign_template_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(725);
/* harmony import */ var _icedesign_template_builder__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_icedesign_template_builder__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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




var Preview =
/*#__PURE__*/
function (_Component) {
  _inherits(Preview, _Component);

  function Preview() {
    _classCallCheck(this, Preview);

    return _possibleConstructorReturn(this, _getPrototypeOf(Preview).apply(this, arguments));
  }

  _createClass(Preview, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$style = _this$props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style,
          _this$props$width = _this$props.width,
          width = _this$props$width === void 0 ? 350 : _this$props$width,
          _this$props$scale = _this$props.scale,
          scale = _this$props$scale === void 0 ? 0.65 : _this$props$scale,
          layoutConfig = _this$props.layoutConfig;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: _objectSpread({}, style, {
          width: width,
          height: width * scale,
          overflow: 'hidden'
        })
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_icedesign_template_builder__WEBPACK_IMPORTED_MODULE_0__["PreviewLayout"], {
        value: layoutConfig,
        scale: width / 960 // 缩放比例
        ,
        width: 960 // 预览宽度
        ,
        height: 960 * scale // 预览高度

      }));
    }
  }]);

  return Preview;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Preview);

/***/ }),

/***/ 770:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 771:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 772:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _icedesign_base_lib_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _icedesign_base_lib_dialog__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_icedesign_base_lib_dialog__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _icedesign_base_lib_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65);
/* harmony import */ var _icedesign_base_lib_button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_icedesign_base_lib_button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Scaffold__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(714);
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(81);



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





var CreateProjectDialog = (_dec = Object(mobx_react__WEBPACK_IMPORTED_MODULE_5__[/* inject */ "b"])('scaffold'), _dec(_class = Object(mobx_react__WEBPACK_IMPORTED_MODULE_5__[/* observer */ "c"])(_class = (_temp = _class2 =
/*#__PURE__*/
function (_Component) {
  _inherits(CreateProjectDialog, _Component);

  function CreateProjectDialog() {
    _classCallCheck(this, CreateProjectDialog);

    return _possibleConstructorReturn(this, _getPrototypeOf(CreateProjectDialog).apply(this, arguments));
  }

  _createClass(CreateProjectDialog, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_icedesign_base_lib_dialog__WEBPACK_IMPORTED_MODULE_0___default.a, {
        title: "\u521B\u5EFA\u9879\u76EE",
        autoFocus: true,
        className: "poject-config-dialog",
        footerAlign: "center",
        onClose: this.props.handleClose,
        footer: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "project-config-footer"
        }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_icedesign_base_lib_button__WEBPACK_IMPORTED_MODULE_1___default.a, {
          onClick: this.props.handleGeneratorProject,
          disabled: this.props.scaffold.isDisabled,
          type: "primary"
        }, this.props.scaffold.isCreating ? '正在创建项目' : '开始创建项目'), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_icedesign_base_lib_button__WEBPACK_IMPORTED_MODULE_1___default.a, {
          disabled: this.props.scaffold.isCreating && this.props.scaffold.progress <= 0,
          onClick: this.props.handleClose
        }, "\u53D6\u6D88")),
        visible: this.props.scaffold.visible
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Scaffold__WEBPACK_IMPORTED_MODULE_4__[/* Form */ "a"], null));
    }
  }]);

  return CreateProjectDialog;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]), _class2.displayName = 'CreateProjectDialog', _class2.propTypes = {
  scaffold: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object.isRequired,
  handleGeneratorProject: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired,
  handleClose: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired
}, _class2.defaultProps = {}, _temp)) || _class) || _class);
/* harmony default export */ __webpack_exports__["a"] = (Object(_Scaffold__WEBPACK_IMPORTED_MODULE_4__[/* ScaffoldHoc */ "d"])(CreateProjectDialog));

/***/ }),

/***/ 792:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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



var Chrome =
/*#__PURE__*/
function (_Component) {
  _inherits(Chrome, _Component);

  function Chrome() {
    _classCallCheck(this, Chrome);

    return _possibleConstructorReturn(this, _getPrototypeOf(Chrome).apply(this, arguments));
  }

  _createClass(Chrome, [{
    key: "render",
    value: function render() {
      var _this$props$style = this.props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: styles.browserWraper
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: styles.browserHeader
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: _objectSpread({}, styles.dot, {
          backgroundColor: '#EE5C56',
          left: 14
        })
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: _objectSpread({}, styles.dot, {
          backgroundColor: '#F8BD32',
          left: 34
        })
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: _objectSpread({}, styles.dot, {
          backgroundColor: '#62CB43',
          left: 54
        })
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: _objectSpread({}, styles.browserBody, style)
      }, this.props.children));
    }
  }]);

  return Chrome;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var styles = {
  browserWraper: {
    backgroundColor: '#fff',
    borderRadius: '5px',
    border: '1px solid #ddd',
    overflow: 'hidden'
  },
  browserHeader: {
    height: 30,
    backgroundColor: '#fefefe',
    // background: 'linear-gradient(to bottom, #eee 0%,#d5d5d5 100%)',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    boxShadow: '0 0 2px #ddd',
    borderBottom: '1px solid #ddd',
    position: 'relative'
  },
  dot: {
    height: 12,
    width: 12,
    borderRadius: '50%',
    boxShadow: '0 0 1px rgba(0,0,0,.3) inset',
    position: 'absolute',
    top: 30 / 2 - 12 / 2
  },
  browserBody: {}
};
/* harmony default export */ __webpack_exports__["a"] = (Chrome);

/***/ })

}]);