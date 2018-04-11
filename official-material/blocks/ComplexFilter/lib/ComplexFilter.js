import _Array$from from 'babel-runtime/core-js/array/from';
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Select from '@icedesign/base/lib/select';
import _Grid from '@icedesign/base/lib/grid';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return _Array$from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

import './ComplexFilter.scss';

var Row = _Grid.Row,
    Col = _Grid.Col;
var Combobox = _Select.Combobox,
    Option = _Select.Option;
var ComplexFilter = (_temp = _class = function (_Component) {
  _inherits(ComplexFilter, _Component);

  function ComplexFilter(props) {
    _classCallCheck(this, ComplexFilter);

    var _this = _possibleConstructorReturn(this, (ComplexFilter.__proto__ || _Object$getPrototypeOf(ComplexFilter)).call(this, props));

    _this.state = {
      currentFilterType: 'article',
      categories: ['type1', 'type3']
    };
    return _this;
  }

  _createClass(ComplexFilter, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          currentFilterType = _state.currentFilterType,
          categories = _state.categories;

      var FILTERS = [{ type: 'article', text: '文章' }, { type: 'app', text: '应用' }, { type: 'other', text: '其他' }];

      var CATEGORIES = [{ type: 'all', text: '全部' }, { type: 'type1', text: '类目一' }, { type: 'type2', text: '类目二' }, { type: 'type3', text: '类目三' }, { type: 'type4', text: '类目四' }];
      return React.createElement(
        'div',
        { className: 'complex-filter' },
        React.createElement(
          IceContainer,
          { style: styles.tabFilterContainer },
          FILTERS.map(function (item, idx) {
            return React.createElement(
              'div',
              {
                key: idx,
                className: 'tab-filter-item ' + (currentFilterType === item.type ? 'active' : ''),
                onClick: function onClick() {
                  _this2.setState({
                    currentFilterType: item.type
                  });
                }
              },
              item.text
            );
          })
        ),
        React.createElement(
          IceContainer,
          null,
          React.createElement(
            'div',
            { style: styles.filterBelonging },
            React.createElement(
              'span',
              { style: styles.filterBelongingLabel },
              '\u6240\u5C5E\u7C7B\u76EE\uFF1A'
            ),
            CATEGORIES.map(function (cat, idx) {
              return React.createElement(
                'span',
                {
                  className: 'filter-belonging-item ' + (categories.indexOf(cat.type) > -1 ? 'active' : ''),
                  onClick: function onClick() {
                    var isInCategory = categories.indexOf(cat.type) > -1;
                    if (isInCategory) {
                      _this2.setState({
                        categories: categories.filter(function (item) {
                          return item !== cat.type;
                        })
                      });
                    } else {
                      _this2.setState({
                        categories: [].concat(_toConsumableArray(categories), [cat.type])
                      });
                    }
                  },
                  key: idx
                },
                cat.text
              );
            })
          ),
          React.createElement(
            Row,
            { wrap: true, style: styles.filterForm },
            React.createElement(
              Col,
              { xxs: 24, s: 8, style: styles.col },
              '\u6240\u6709\u8005\uFF1A',
              React.createElement(Combobox, {
                style: styles.combobox,
                multiple: true,
                value: '\u5353\u51CC',
                tags: true,
                filterLocal: false,
                onInputBlur: function onInputBlur() {
                  return console.log('blur');
                }
              })
            ),
            React.createElement(
              Col,
              { xxs: 24, s: 8, style: styles.col },
              '\u6D3B\u8DC3\u7528\u6237\uFF1A',
              React.createElement(
                _Select,
                { style: styles.select },
                React.createElement(
                  Option,
                  { value: '' },
                  '\u7A7A'
                ),
                React.createElement(
                  Option,
                  { value: 'jack' },
                  'Jack'
                ),
                React.createElement(
                  Option,
                  { value: 'lucy' },
                  'Lucy'
                ),
                React.createElement(
                  Option,
                  { value: 'andy' },
                  'Andy'
                ),
                React.createElement(
                  Option,
                  { value: 'disabled', disabled: true },
                  'Disabled'
                )
              )
            ),
            React.createElement(
              Col,
              { xxs: 24, s: 8, style: styles.col },
              '\u597D\u8BC4\u5EA6\uFF1A',
              React.createElement(
                _Select,
                { style: styles.select },
                React.createElement(
                  Option,
                  { value: '' },
                  '\u7A7A'
                ),
                React.createElement(
                  Option,
                  { value: 'jack' },
                  'Jack'
                ),
                React.createElement(
                  Option,
                  { value: 'lucy' },
                  'Lucy'
                ),
                React.createElement(
                  Option,
                  { value: 'andy' },
                  'Andy'
                ),
                React.createElement(
                  Option,
                  { value: 'disabled', disabled: true },
                  'Disabled'
                )
              )
            )
          )
        )
      );
    }
  }]);

  return ComplexFilter;
}(Component), _class.displayName = 'ComplexFilter', _class.defaultProps = {}, _temp);
export { ComplexFilter as default };


var styles = {
  tabFilterContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 0
  },
  filterBelonging: { paddingBottom: '10px', borderBottom: '1px solid #F4F4F4' },
  filterBelongingLabel: {
    fontSize: '14px',
    color: '#333',
    marginRight: '19px'
  },
  filterForm: {
    marginTop: '20px'
  },
  combobox: { width: '200px', marginRight: '25px' },
  select: { width: '50px', marginRight: '25px' },
  col: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px'
  }
};