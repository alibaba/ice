import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$setPrototypeOf from 'babel-runtime/core-js/object/set-prototype-of';
import _Object$create from 'babel-runtime/core-js/object/create';
import _Search from '@icedesign/base/lib/search';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _Grid from '@icedesign/base/lib/grid';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _Object$defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = _Object$create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

import './FilterWithSearch.scss';

var Row = _Grid.Row,
    Col = _Grid.Col;
var FilterWithSearch = (_temp = _class = function (_Component) {
  _inherits(FilterWithSearch, _Component);

  function FilterWithSearch(props) {
    _classCallCheck(this, FilterWithSearch);

    var _this = _possibleConstructorReturn(this, (FilterWithSearch.__proto__ || _Object$getPrototypeOf(FilterWithSearch)).call(this, props));

    _this.selectFilter = function (type) {
      console.log(type);
      // type can be 'all', 'process', 'pending'
      // handler
    };

    _this.handleSearch = function () {
      // handler logical
    };

    _this.state = {};
    return _this;
  }

  _createClass(FilterWithSearch, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'filter-with-search', style: styles.filterWithSearch },
        React.createElement(
          IceContainer,
          {
            className: 'filter-with-search-container',
            style: styles.filterWithSearchContainer
          },
          React.createElement(
            Row,
            { wrap: true, justify: 'space-between', style: styles.row },
            React.createElement(
              Col,
              { xxs: 24, s: 8, style: styles.filterContainer },
              React.createElement(
                'span',
                {
                  className: 'filter-item selected',
                  style: styles.filterItem,
                  onClick: this.selectFilter.bind(this, 'all')
                },
                '\u5168\u90E8'
              ),
              React.createElement(
                'span',
                {
                  className: 'filter-item',
                  style: styles.filterItem,
                  onClick: this.selectFilter.bind(this, 'process')
                },
                '\u8FDB\u884C\u4E2D'
              ),
              React.createElement(
                'span',
                {
                  className: 'filter-item',
                  style: styles.filterItem,
                  onClick: this.selectFilter.bind(this, 'pending')
                },
                '\u7B49\u5F85\u4E2D'
              )
            ),
            React.createElement(
              Col,
              { xxs: 24, s: 16, style: styles.searchWrapper },
              React.createElement(_Search, {
                inputWidth: 250,
                searchText: '',
                size: 'large',
                placeholder: '\u8BF7\u8F93\u5165\u8981\u641C\u7D22\u7684\u5173\u952E\u8BCD\u6216\u5546\u54C1\u94FE\u63A5',
                onSearch: this.handleSearch,
                style: { display: 'inline-block' }
              })
            )
          )
        )
      );
    }
  }]);

  return FilterWithSearch;
}(Component), _class.displayName = 'FilterWithSearch', _class.propTypes = {}, _class.defaultProps = {}, _temp);
export { FilterWithSearch as default };


var styles = {
  row: {
    alignItems: 'center'
  },
  filterContainer: {
    lineHeight: '32px'
  },
  filterItem: {
    height: '20px',
    padding: '0 20px',
    color: '#333',
    fontSize: '14px',
    cursor: 'pointer',
    borderRight: '1px solid #D8D8D8'
  },
  searchWrapper: {
    textAlign: 'right',
    margin: '10px 0'
  }
};