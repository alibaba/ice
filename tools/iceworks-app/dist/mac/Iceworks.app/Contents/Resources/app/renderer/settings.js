(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ 1183:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1184:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1185:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1186:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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




var BrowserLink =
/*#__PURE__*/
function (_Component) {
  _inherits(BrowserLink, _Component);

  function BrowserLink() {
    _classCallCheck(this, BrowserLink);

    return _possibleConstructorReturn(this, _getPrototypeOf(BrowserLink).apply(this, arguments));
  }

  _createClass(BrowserLink, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          href = _this$props.href,
          _this$props$style = _this$props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", _extends({}, this.props, {
        style: _objectSpread({
          textDecoration: 'none'
        }, style),
        onClick: function onClick(event) {
          event.preventDefault();
          electron__WEBPACK_IMPORTED_MODULE_0__["shell"].openExternal(href);
        }
      }));
    }
  }]);

  return BrowserLink;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (BrowserLink);

/***/ }),

/***/ 658:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/switch/index.js
var lib_switch = __webpack_require__(713);
var switch_default = /*#__PURE__*/__webpack_require__.n(lib_switch);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/select/index.js
var lib_select = __webpack_require__(724);
var select_default = /*#__PURE__*/__webpack_require__.n(lib_select);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/input/index.js
var input = __webpack_require__(664);
var input_default = /*#__PURE__*/__webpack_require__.n(input);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/field/index.js
var field = __webpack_require__(697);
var field_default = /*#__PURE__*/__webpack_require__.n(field);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/radio/index.js
var lib_radio = __webpack_require__(691);
var radio_default = /*#__PURE__*/__webpack_require__.n(lib_radio);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/form/index.js
var lib_form = __webpack_require__(757);
var form_default = /*#__PURE__*/__webpack_require__.n(lib_form);

// EXTERNAL MODULE: external "electron"
var external_electron_ = __webpack_require__(4);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/notification/lib/index.js
var lib = __webpack_require__(44);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: external "window.React"
var external_window_React_ = __webpack_require__(1);
var external_window_React_default = /*#__PURE__*/__webpack_require__.n(external_window_React_);

// EXTERNAL MODULE: ./renderer/node_modules/mobx-react/index.module.js
var index_module = __webpack_require__(81);

// EXTERNAL MODULE: ./renderer/node_modules/@icedesign/base/lib/button/index.js
var lib_button = __webpack_require__(65);
var button_default = /*#__PURE__*/__webpack_require__.n(lib_button);

// EXTERNAL MODULE: ./renderer/src/pages/Settings/separator.scss
var separator = __webpack_require__(1183);

// CONCATENATED MODULE: ./renderer/src/pages/Settings/Separator.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Separator_Separator =
/*#__PURE__*/
function (_Component) {
  _inherits(Separator, _Component);

  function Separator() {
    _classCallCheck(this, Separator);

    return _possibleConstructorReturn(this, _getPrototypeOf(Separator).apply(this, arguments));
  }

  _createClass(Separator, [{
    key: "render",
    value: function render() {
      return external_window_React_default.a.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'row',
          padding: '0 20px',
          lineHeight: '36px'
        }
      }, external_window_React_default.a.createElement("div", {
        style: {
          fontSize: 16,
          fontWeight: 400,
          color: '#444',
          paddingRight: 10
        }
      }, this.props.title), external_window_React_default.a.createElement("div", {
        className: "separator-line",
        style: {
          flex: 'auto'
        }
      }), this.props.additional && external_window_React_default.a.createElement("div", {
        className: "separator-additional",
        style: {
          paddingLeft: 10
        }
      }, this.props.additional));
    }
  }]);

  return Separator;
}(external_window_React_["Component"]);

/* harmony default export */ var Settings_Separator = (Separator_Separator);
// EXTERNAL MODULE: ./renderer/src/pages/Settings/RecommendMaterials/index.scss
var Settings_RecommendMaterials = __webpack_require__(1184);

// CONCATENATED MODULE: ./renderer/src/pages/Settings/RecommendMaterials/index.jsx



var _dec, _class, _temp;

function RecommendMaterials_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { RecommendMaterials_typeof = function _typeof(obj) { return typeof obj; }; } else { RecommendMaterials_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return RecommendMaterials_typeof(obj); }

function RecommendMaterials_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function RecommendMaterials_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function RecommendMaterials_createClass(Constructor, protoProps, staticProps) { if (protoProps) RecommendMaterials_defineProperties(Constructor.prototype, protoProps); if (staticProps) RecommendMaterials_defineProperties(Constructor, staticProps); return Constructor; }

function RecommendMaterials_possibleConstructorReturn(self, call) { if (call && (RecommendMaterials_typeof(call) === "object" || typeof call === "function")) { return call; } return RecommendMaterials_assertThisInitialized(self); }

function RecommendMaterials_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function RecommendMaterials_getPrototypeOf(o) { RecommendMaterials_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return RecommendMaterials_getPrototypeOf(o); }

function RecommendMaterials_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) RecommendMaterials_setPrototypeOf(subClass, superClass); }

function RecommendMaterials_setPrototypeOf(o, p) { RecommendMaterials_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return RecommendMaterials_setPrototypeOf(o, p); }





var RecommendMaterials_RecommendMaterials = (_dec = Object(index_module["b" /* inject */])('settingsMaterials'), _dec(_class = Object(index_module["c" /* observer */])(_class = (_temp =
/*#__PURE__*/
function (_Component) {
  RecommendMaterials_inherits(RecommendMaterials, _Component);

  function RecommendMaterials() {
    var _getPrototypeOf2;

    var _this;

    RecommendMaterials_classCallCheck(this, RecommendMaterials);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = RecommendMaterials_possibleConstructorReturn(this, (_getPrototypeOf2 = RecommendMaterials_getPrototypeOf(RecommendMaterials)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.notificationTimer = null;

    _this.handleCheckChange = function (checked, selectedMaterial) {
      _this.props.settingsMaterials.switchBuitInMaterial(checked, selectedMaterial);
    };

    _this.handleResetMaterials = function () {
      _this.props.settingsMaterials.resetBuiltInMaterials();
    };

    return _this;
  }

  RecommendMaterials_createClass(RecommendMaterials, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return external_window_React_default.a.createElement("div", null, external_window_React_default.a.createElement(Settings_Separator, {
        title: "\u5B98\u65B9\u63A8\u8350\u7269\u6599\u6E90",
        additional: external_window_React_default.a.createElement("span", null, external_window_React_default.a.createElement(button_default.a, {
          size: "small",
          onClick: this.handleResetMaterials
        }, "\u91CD\u7F6E"))
      }), external_window_React_default.a.createElement("div", {
        className: "materials"
      }, this.props.settingsMaterials.builtInMaterials.map(function (material, index) {
        return external_window_React_default.a.createElement("div", {
          className: "material-item",
          key: index
        }, external_window_React_default.a.createElement("div", {
          className: "material-logo"
        }, material.homepage ? external_window_React_default.a.createElement("a", {
          href: material.homepage,
          title: '官网:' + material.homepage,
          target: "_blank"
        }, external_window_React_default.a.createElement("img", {
          src: material.logo,
          alt: material.name
        })) : external_window_React_default.a.createElement("img", {
          src: material.logo,
          alt: material.name
        })), external_window_React_default.a.createElement("div", {
          className: "material-body"
        }, external_window_React_default.a.createElement("div", {
          className: "material-info"
        }, external_window_React_default.a.createElement("div", {
          className: "material-name"
        }, material.name), external_window_React_default.a.createElement("div", {
          className: "material-tags"
        }, material.tags.map(function (tag, k) {
          return external_window_React_default.a.createElement("span", {
            className: "material-tag",
            key: k
          }, tag);
        }))), external_window_React_default.a.createElement("div", {
          className: "material-description"
        }, material.description)), external_window_React_default.a.createElement("div", {
          className: "material-extra"
        }, external_window_React_default.a.createElement("div", {
          className: "material-switch"
        }, external_window_React_default.a.createElement(switch_default.a, {
          checked: material.checked,
          onChange: function onChange(checked) {
            return _this2.handleCheckChange(checked, material);
          },
          size: "small"
        }))));
      })));
    }
  }]);

  return RecommendMaterials;
}(external_window_React_["Component"]), _temp)) || _class) || _class);
/* harmony default export */ var pages_Settings_RecommendMaterials = (RecommendMaterials_RecommendMaterials);
// EXTERNAL MODULE: ./renderer/src/pages/Settings/CustomMaterials/index.scss
var Settings_CustomMaterials = __webpack_require__(1185);

// CONCATENATED MODULE: ./renderer/src/pages/Settings/CustomMaterials/index.jsx




var CustomMaterials_dec, CustomMaterials_class, CustomMaterials_temp;

function CustomMaterials_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { CustomMaterials_typeof = function _typeof(obj) { return typeof obj; }; } else { CustomMaterials_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return CustomMaterials_typeof(obj); }

function CustomMaterials_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function CustomMaterials_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function CustomMaterials_createClass(Constructor, protoProps, staticProps) { if (protoProps) CustomMaterials_defineProperties(Constructor.prototype, protoProps); if (staticProps) CustomMaterials_defineProperties(Constructor, staticProps); return Constructor; }

function CustomMaterials_possibleConstructorReturn(self, call) { if (call && (CustomMaterials_typeof(call) === "object" || typeof call === "function")) { return call; } return CustomMaterials_assertThisInitialized(self); }

function CustomMaterials_getPrototypeOf(o) { CustomMaterials_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return CustomMaterials_getPrototypeOf(o); }

function CustomMaterials_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) CustomMaterials_setPrototypeOf(subClass, superClass); }

function CustomMaterials_setPrototypeOf(o, p) { CustomMaterials_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return CustomMaterials_setPrototypeOf(o, p); }

function CustomMaterials_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }





var CustomMaterials_CustomMaterials = (CustomMaterials_dec = Object(index_module["b" /* inject */])('settingsMaterials'), CustomMaterials_dec(CustomMaterials_class = Object(index_module["c" /* observer */])(CustomMaterials_class = (CustomMaterials_temp =
/*#__PURE__*/
function (_Component) {
  CustomMaterials_inherits(CustomMaterials, _Component);

  function CustomMaterials() {
    var _getPrototypeOf2;

    var _this;

    CustomMaterials_classCallCheck(this, CustomMaterials);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = CustomMaterials_possibleConstructorReturn(this, (_getPrototypeOf2 = CustomMaterials_getPrototypeOf(CustomMaterials)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleEditMaterial = function (index) {
      _this.props.settingsMaterials.editCustomMaterial(index);
    };

    _this.handleCancelEditMaterial = function (index) {
      _this.props.settingsMaterials.cancelEditCustomMaterial(index);
    };

    _this.handleRemoveMaterial = function (index) {
      _this.props.settingsMaterials.removeCustomMaterial(index);
    };

    _this.handleChangeMaterialName = function (index, value) {
      _this.props.settingsMaterials.updateCustomMaterialName(index, value);
    };

    _this.handleChangeMaterialSource = function (index, value) {
      _this.props.settingsMaterials.updateCustomMaterialSource(index, value);
    };

    _this.handleSaveMaterial = function () {
      _this.props.settingsMaterials.save();
    };

    _this.handleCheckChange = function (checked, selectedMaterial) {
      _this.props.settingsMaterials.switchCustomMaterial(checked, selectedMaterial);
    };

    _this.handleAddMaterial = function () {
      _this.props.settingsMaterials.addCustomMaterials();
    };

    _this.renderMaterialItem = function (item, index) {
      var editting = item.editing || item.update;
      return external_window_React_default.a.createElement("div", {
        key: index,
        className: "cm-item"
      }, external_window_React_default.a.createElement("div", {
        className: "cm-item-name"
      }, editting ? external_window_React_default.a.createElement(input_default.a, {
        placeholder: "\u7269\u6599\u540D",
        style: {
          width: '100%'
        },
        value: item.name,
        onChange: _this.handleChangeMaterialName.bind(CustomMaterials_assertThisInitialized(CustomMaterials_assertThisInitialized(_this)), index)
      }) : item.name), external_window_React_default.a.createElement("div", {
        className: "cm-item-source"
      }, editting ? external_window_React_default.a.createElement(input_default.a, {
        htmlType: "url",
        placeholder: "\u7269\u6599\u5730\u5740",
        style: {
          width: '100%'
        },
        value: item.source,
        onChange: _this.handleChangeMaterialSource.bind(CustomMaterials_assertThisInitialized(CustomMaterials_assertThisInitialized(_this)), index)
      }) : item.source), external_window_React_default.a.createElement("div", {
        className: "cm-item-action"
      }, editting ? external_window_React_default.a.createElement(button_default.a, {
        size: "small",
        type: "primary",
        style: {
          marginRight: 10
        },
        onClick: _this.handleSaveMaterial
      }, "\u4FDD\u5B58") : external_window_React_default.a.createElement(button_default.a, {
        size: "small",
        type: "primary",
        style: {
          marginRight: 10
        },
        onClick: _this.handleEditMaterial.bind(CustomMaterials_assertThisInitialized(CustomMaterials_assertThisInitialized(_this)), index)
      }, "\u7F16\u8F91"), editting ? external_window_React_default.a.createElement(button_default.a, {
        size: "small",
        style: {
          marginRight: 10
        },
        onClick: _this.handleCancelEditMaterial.bind(CustomMaterials_assertThisInitialized(CustomMaterials_assertThisInitialized(_this)), index)
      }, "\u53D6\u6D88") : external_window_React_default.a.createElement(button_default.a, {
        size: "small",
        style: {
          marginRight: 10
        },
        onClick: _this.handleRemoveMaterial.bind(CustomMaterials_assertThisInitialized(CustomMaterials_assertThisInitialized(_this)), index)
      }, "\u5220\u9664"), // 编辑状态不显示 switch
      !_this.props.settingsMaterials.edittingCustomMaterialValue && external_window_React_default.a.createElement(switch_default.a, {
        checked: item.checked !== false,
        onChange: function onChange(checked) {
          return _this.handleCheckChange(checked, item);
        },
        checkedChildren: "\u5C55\u793A",
        unCheckedChildren: "\u9690\u85CF",
        size: "small"
      })));
    };

    return _this;
  }

  CustomMaterials_createClass(CustomMaterials, [{
    key: "render",
    value: function render() {
      var customMaterials = this.props.settingsMaterials.customMaterials;
      return external_window_React_default.a.createElement("div", {
        className: "custom-materials"
      }, external_window_React_default.a.createElement(Settings_Separator, {
        title: "\u81EA\u5B9A\u4E49\u7269\u6599\u6E90",
        additional: external_window_React_default.a.createElement("span", null, external_window_React_default.a.createElement(button_default.a, {
          size: "small",
          onClick: this.handleAddMaterial
        }, "\u65B0\u589E"), ' ')
      }), external_window_React_default.a.createElement("div", {
        style: {
          padding: '0 20px'
        }
      }, customMaterials.length === 0 ? external_window_React_default.a.createElement("div", {
        className: "cm-list-empty"
      }, "\u81EA\u5B9A\u4E49\u7269\u6599\u6E90\u4E3A\u7A7A\uFF0C\u4F60\u53EF\u4EE5", external_window_React_default.a.createElement("a", {
        href: "javascript:void(0)",
        onClick: this.handleAddMaterial
      }, "\u65B0\u589E\u7269\u6599\u6E90"), "\u6216\u8005\u4E86\u89E3", external_window_React_default.a.createElement("a", {
        href: "https://alibaba.github.io/ice/docs/materials/devtools",
        target: "__blank"
      }, "\u81EA\u5B9A\u4E49\u7269\u6599\u6E90\u4F7F\u7528\u6587\u6863")) : external_window_React_default.a.createElement("div", {
        className: "cm-list"
      }, customMaterials.map(this.renderMaterialItem))));
    }
  }]);

  return CustomMaterials;
}(external_window_React_["Component"]), CustomMaterials_temp)) || CustomMaterials_class) || CustomMaterials_class);
/* harmony default export */ var pages_Settings_CustomMaterials = (CustomMaterials_CustomMaterials);
// EXTERNAL MODULE: ./renderer/src/services.js
var services = __webpack_require__(6);

// CONCATENATED MODULE: ./renderer/src/lib/filter-registry.js

var settings = services["a" /* default */].settings;
function filterMaterial(registries) {
  var isAlibaba = settings.get('isAlibaba'); // 是否为管理员

  var isAdmin = localStorage.getItem('isAdmin') === 'true';
  return registries.filter(function (registry) {
    // 非内网用户屏蔽内置的 tnpm 源
    if (!isAdmin && !isAlibaba && registry.name === 'tnpm') {
      return false;
    }

    return true;
  });
}
// EXTERNAL MODULE: ./renderer/src/lib/logger.js
var logger = __webpack_require__(7);

// EXTERNAL MODULE: ./renderer/src/components/BrowserLink.jsx
var BrowserLink = __webpack_require__(176);

// CONCATENATED MODULE: ./renderer/src/pages/Settings/Settings.jsx







var Settings_class, Settings_temp;

function Settings_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Settings_typeof = function _typeof(obj) { return typeof obj; }; } else { Settings_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Settings_typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Settings_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Settings_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Settings_createClass(Constructor, protoProps, staticProps) { if (protoProps) Settings_defineProperties(Constructor.prototype, protoProps); if (staticProps) Settings_defineProperties(Constructor, staticProps); return Constructor; }

function Settings_possibleConstructorReturn(self, call) { if (call && (Settings_typeof(call) === "object" || typeof call === "function")) { return call; } return Settings_assertThisInitialized(self); }

function Settings_getPrototypeOf(o) { Settings_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Settings_getPrototypeOf(o); }

function Settings_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Settings_setPrototypeOf(subClass, superClass); }

function Settings_setPrototypeOf(o, p) { Settings_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Settings_setPrototypeOf(o, p); }

function Settings_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }













var _remote$require = external_electron_["remote"].require('./shared'),
    originRegistries = _remote$require.registries;

var Settings_settings = services["a" /* default */].settings,
    nrm = services["a" /* default */].nrm;
var Shell = services["a" /* default */].shells.shared.Shell;
var _services$editors$sha = services["a" /* default */].editors.shared,
    ExternalEditor = _services$editors$sha.ExternalEditor,
    CUSTOM_EDITOR = _services$editors$sha.CUSTOM_EDITOR;
var registries = filterMaterial(originRegistries).concat([{
  label: '自定义',
  value: '__custom_registry__'
}]);
var FormItem = form_default.a.Item;
var RadioGroup = radio_default.a.Group;

var Settings_Setting = Object(index_module["c" /* observer */])(Settings_class = (Settings_temp =
/*#__PURE__*/
function (_Component) {
  Settings_inherits(Setting, _Component);

  function Setting(props) {
    var _this;

    Settings_classCallCheck(this, Setting);

    _this = Settings_possibleConstructorReturn(this, Settings_getPrototypeOf(Setting).call(this, props));

    _this.checkRegistryIsCustom = function (registryUrl) {
      var inRegistryes = originRegistries.some(function (reg) {
        if (reg.value === registryUrl) {
          return true;
        }

        return false;
      });
      return !inRegistryes;
    };

    _this.notificationTimer = null;

    _this.udpateSettings = function (key, value) {
      Settings_settings.set(key, value);
      clearTimeout(_this.notificationTimer);
      _this.notificationTimer = setTimeout(function () {
        try {
          lib_default.a.destroy();
          lib_default.a.success({
            message: '设置变更已保存'
          });
        } catch (e) {
          logger["a" /* default */].info('提示失败', e);
        }
      }, 300);
    };

    _this.throttleTimer = null;

    _this.handleFormChange = function (key, value) {
      if (key === 'registryCustom') {
        // 输入自定义 NPM 源地址
        if (!_this.field.getError('registryCustom')) {
          clearTimeout(_this.throttleTimer);
          _this.throttleTimer = setTimeout(function () {
            _this.udpateSettings('registry', value);
          }, 300);
        }
      } else if (key === 'editorShell') {
        // 输入自定义编辑器启动脚本
        if (!_this.field.getError(key)) {
          clearTimeout(_this.throttleTimer);
          _this.throttleTimer = setTimeout(function () {
            _this.udpateSettings(key, value);
          }, 300);
        }
      } else if (key === 'editor') {
        _this.setState({
          currentEditor: value
        });

        _this.udpateSettings(key, value);
      } else if (key === 'registry') {
        var isRegistryCustom = _this.checkRegistryIsCustom(value);

        _this.setState({
          registryCustomVisible: isRegistryCustom
        });

        if (!isRegistryCustom) {
          // 不是自定义的直接保存变更
          _this.udpateSettings(key, value);
        }
      } else {
        _this.udpateSettings(key, value);
      }
    };

    _this.handleTestSpeed = function (value) {
      _this.setState({
        testing: true
      }, function () {
        _this.getDownloadSpeed(value);
      });
    };

    _this.getDownloadSpeed = function (registry) {
      var nrmArgs = ['test', registry];
      return nrm.run(nrmArgs, {
        cwd: ''
      }).then(function (data) {
        _this.setState({
          speedData: data,
          testing: false
        });
      }).catch(function (err) {
        logger["a" /* default */].info(err);
      });
    };

    var userconfig = Settings_settings.getAll();
    var _registry = userconfig.registry; // 判断是否在默认定义的 registries 里，不在则表示是自定义的类型

    var _isRegistryCustom = _this.checkRegistryIsCustom(_registry);

    _this.state = {
      testing: false,
      speedData: '',
      userconfig: userconfig || {},
      currentEditor: userconfig.editor || 'VisualStudioCode',
      // 当前选择的浏览器
      editorShell: userconfig.editorShell || '',
      registryCustomVisible: _isRegistryCustom // 判断是否为自定义源，则展示自定义输入框

    };
    _this.field = new field_default.a(Settings_assertThisInitialized(Settings_assertThisInitialized(_this)), {
      onChange: _this.handleFormChange
    });
    return _this;
  }

  Settings_createClass(Setting, [{
    key: "render",
    value: function render() {
      var formItemLayout = {
        className: 'settings-item',
        labelCol: {
          fixedSpan: 6
        },
        wrapperCol: {
          span: 18
        },
        size: 'medium'
      };
      var init = this.field.init;
      var terminalSource = Object.keys(Shell).map(function (name) {
        return {
          label: Shell[name],
          value: name
        };
      });
      var registriesSource = ['cnpm', 'npm'];
      var externalEditorSource = Object.keys(ExternalEditor).map(function (name) {
        return {
          label: ExternalEditor[name],
          value: name
        };
      });
      var _this$state = this.state,
          testing = _this$state.testing,
          speedData = _this$state.speedData;
      return external_window_React_default.a.createElement("div", {
        className: "settings"
      }, external_window_React_default.a.createElement("div", {
        key: "r1",
        className: "settings-body"
      }, external_window_React_default.a.createElement(pages_Settings_RecommendMaterials, null), external_window_React_default.a.createElement(pages_Settings_CustomMaterials, null), external_window_React_default.a.createElement(Settings_Separator, {
        title: "\u901A\u7528"
      }), external_window_React_default.a.createElement(form_default.a, {
        style: {
          padding: '0 20px'
        },
        size: "large",
        direction: "ver",
        field: this.field
      }, external_window_React_default.a.createElement(FormItem, _extends({
        label: "\u7EC8\u7AEF"
      }, formItemLayout), external_window_React_default.a.createElement(RadioGroup, _extends({
        dataSource: terminalSource
      }, init('terminal', {
        initValue: this.state.userconfig.terminal || 'Terminal'
      })))), external_window_React_default.a.createElement(FormItem, _extends({
        label: "\u7F16\u8F91\u5668"
      }, formItemLayout), external_window_React_default.a.createElement(RadioGroup, _extends({
        dataSource: externalEditorSource
      }, init('editor', {
        initValue: this.state.userconfig.editor || 'VisualStudioCode'
      })))), external_window_React_default.a.createElement(FormItem, _extends({
        style: {
          display: this.state.currentEditor === CUSTOM_EDITOR ? 'flex' : 'none'
        },
        label: " "
      }, formItemLayout), external_window_React_default.a.createElement(input_default.a, _extends({
        style: {
          width: 300
        }
      }, init('editorShell', {
        initValue: this.state.userconfig.editorShell,
        rules: [{
          required: true,
          message: '编辑器启动脚本不能为空'
        }]
      }), {
        placeholder: "\u81EA\u5B9A\u4E49\u542F\u52A8\u811A\u672C\u5982: open --project=${cwd}"
      })), external_window_React_default.a.createElement(BrowserLink["a" /* default */], {
        style: {
          marginLeft: 20
        },
        href: "https://github.com/alibaba/ice/wiki/custom-editor"
      }, "\u9700\u8981\u5E2E\u52A9")), external_window_React_default.a.createElement(FormItem, _extends({
        style: {
          display: this.state.registryCustomVisible ? 'flex' : 'none'
        },
        label: " "
      }, formItemLayout), external_window_React_default.a.createElement(input_default.a, _extends({
        style: {
          width: 300
        }
      }, init('registryCustom', {
        initValue: this.state.userconfig.registry,
        rules: [{
          required: true,
          type: 'url',
          message: '请输入正确的 URL 地址'
        }]
      }), {
        placeholder: "\u8BF7\u8F93\u5165\u81EA\u5B9A\u4E49\u6E90\u5730\u5740"
      }))), external_window_React_default.a.createElement(FormItem, _extends({
        label: "NPM \u6E90"
      }, formItemLayout), external_window_React_default.a.createElement(select_default.a, _extends({
        style: {
          width: 300
        },
        autoWidth: true,
        dataSource: registries
      }, init('registry', {
        initValue: this.state.registryCustomVisible ? '__custom_registry__' : this.state.userconfig.registry || 'http://registry.npmjs.org'
      })))), external_window_React_default.a.createElement(FormItem, _extends({
        label: "\u6D88\u606F\u63D0\u793A\u97F3"
      }, formItemLayout), external_window_React_default.a.createElement(switch_default.a, init('tone', {
        initValue: this.state.userconfig.tone,
        valueName: 'checked'
      }))))));
    }
  }]);

  return Setting;
}(external_window_React_["Component"]), Settings_temp)) || Settings_class;

/* harmony default export */ var Settings = (Settings_Setting);
// EXTERNAL MODULE: ./renderer/src/pages/Settings/index.scss
var pages_Settings = __webpack_require__(1186);

// CONCATENATED MODULE: ./renderer/src/pages/Settings/index.js



/* harmony default export */ var src_pages_Settings = __webpack_exports__["default"] = (Settings);

/***/ }),

/***/ 683:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(683);
module.exports = __webpack_require__(744);

/***/ }),

/***/ 685:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(685);
module.exports = __webpack_require__(793);

/***/ }),

/***/ 691:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(683);
__webpack_require__(683);
module.exports = __webpack_require__(747);

/***/ }),

/***/ 713:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(685);
__webpack_require__(685);
module.exports = __webpack_require__(795);

/***/ }),

/***/ 793:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(794);

/***/ }),

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 795:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextUtil = __webpack_require__(39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Switch*/
var Switch = (_temp = _class = function (_React$Component) {
    _inherits(Switch, _React$Component);

    function Switch(props, context) {
        _classCallCheck(this, Switch);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        var checked = props.checked || props.defaultChecked;
        _this.onChange = _this.onChange.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        _this.state = {
            checked: checked
        };
        return _this;
    }

    Switch.prototype.render = function render() {
        var _classNames;

        var _props = this.props,
            prefix = _props.prefix,
            className = _props.className,
            disabled = _props.disabled,
            size = _props.size,
            checkedChildren = _props.checkedChildren,
            unCheckedChildren = _props.unCheckedChildren,
            others = _objectWithoutProperties(_props, ['prefix', 'className', 'disabled', 'size', 'checkedChildren', 'unCheckedChildren']),
            status = this.state.checked ? 'on' : 'off',
            children = this.state.checked ? checkedChildren : unCheckedChildren;

        if (size !== 'small' && size !== 'medium') {
            size = 'medium';
        }

        prefix = this.context.prefix || prefix;
        var classes = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'switch', true), _defineProperty(_classNames, prefix + 'switch-' + status, true), _defineProperty(_classNames, prefix + 'switch-' + size, true), _defineProperty(_classNames, className, className), _classNames));
        var attrs = void 0;

        var triggerCls = (0, _classnames2['default'])(_defineProperty({}, this.props.prefix + 'switch-trigger', true));
        if (!disabled) {
            attrs = {
                onClick: this.onChange,
                tabIndex: 0,
                onKeyDown: this.onKeyDown,
                disabled: disabled
            };
        } else {
            attrs = {
                disabled: disabled
            };
        }

        if (size === 'small') {
            // size small不允许设置内容
            children = null;
        }

        return _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { className: classes }, attrs, { 'aria-checked': this.state.checked }),
            _react2['default'].createElement('div', { className: triggerCls }),
            _react2['default'].createElement(
                'div',
                { className: this.props.prefix + 'switch-children' },
                children
            )
        );
    };

    Switch.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('checked' in nextProps) {
            var checked = nextProps.checked;
            if (checked === undefined) {
                checked = false;
            }
            this.setState({
                checked: checked
            });
        }
    };

    Switch.prototype.onChange = function onChange(ev) {
        var checked = !this.state.checked;

        if (!('checked' in this.props)) {
            this.setState({
                checked: checked
            });
        }
        this.props.onChange(checked, ev);
        this.props.onClick && this.props.onClick(ev);
    };

    Switch.prototype.onKeyDown = function onKeyDown(e) {
        if (e.keyCode === 13 || e.keyCode === 32) {
            this.onChange(e);
        }
        this.props.onKeyDown && this.props.onKeyDown(e);
    };

    return Switch;
}(_react2['default'].Component), _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.propTypes = {
    /**
     * 样式类名的品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 自定义类名
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义内敛样式
     */
    style: _propTypes2['default'].object,
    /**
     * 打开时的内容
     */
    checkedChildren: _propTypes2['default'].any,
    /**
     * 关闭时的内容
     */
    unCheckedChildren: _propTypes2['default'].any,
    /**
     * 开关状态改变是触发此事件
     * @param {Boolean} checked 是否为打开状态
     * @param {Event} e DOM事件对象
     */
    onChange: _propTypes2['default'].func,
    /**
     * 开关当前的值(针对受控组件)
     */
    checked: _propTypes2['default'].bool,
    /**
     * 开关默认值 (针对非受控组件)
     */
    defaultChecked: _propTypes2['default'].bool,
    /**
     * 表示开关被禁用
     */
    disabled: _propTypes2['default'].bool,
    /**
     * switch的尺寸
     * @enumdesc 正常大小, 缩小版大小
     */
    size: _propTypes2['default'].oneOf(['medium', 'small']),
    /**
     * 鼠标点击事件
     * @param {Event} e DOM事件对象
     */
    onClick: _propTypes2['default'].func,
    /**
     * 键盘按键事件
     * @param {Event} e DOM事件对象
     */
    onKeyDown: _propTypes2['default'].func
}, _class.defaultProps = {
    prefix: 'next-',
    disabled: false,
    size: 'medium',
    onChange: function onChange() {}
}, _temp);
Switch.displayName = 'Switch';
exports['default'] = Switch;
module.exports = exports['default'];

/***/ })

}]);