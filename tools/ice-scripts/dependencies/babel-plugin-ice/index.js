'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var template = require('babel-template');

exports.default = function (_ref) {
  var types = _ref.types;


  var defaultLibraryName = '@icedesign/base';
  var libDir = 'lib';

  function camel2Dash(_str) {
    var str = _str[0].toLowerCase() + _str.substr(1);
    return str.replace(/([A-Z])/g, function camel2DashReplace($1) {
      return '-' + $1.toLowerCase();
    });
  }

  return {
    visitor: {

      // modify import
      ImportDeclaration: function ImportDeclaration(path, _ref2) {
        var opts = _ref2.opts;


        var node = path.node;
        // npm name
        var libraryName = opts.libraryName || defaultLibraryName;
        var value = node.source.value;

        if (value === libraryName) {

          node.specifiers.map(function (spec) {

            if (types.isImportSpecifier(spec)) {
              // import {field as Field} from '@icedesign/base'
              // field
              var importedName = spec.imported.name;
              // Field
              var varName = spec.local.name;
              // @ali/ice/lib/button
              var modPath = libraryName + '/' + libDir + '/' + camel2Dash(importedName);

              var buildRequire = template('\n                var IMPORT_NAME = require(SOURCE);\n              ');

              var requireAst = buildRequire({
                IMPORT_NAME: types.identifier(varName),
                SOURCE: types.stringLiteral(modPath)
              });

              path.insertBefore(requireAst);
            }
          });

          // remove old import
          path.remove();
        }
      }
    }
  };
};
