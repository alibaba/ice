const reactDocGen = require('react-docgen');
// const parseJsDoc = require('./parseJsDoc');
const fusionApiExtractor = require('./apiExtractor');

const typeMap = {
  FunctionDeclaration: 'function',
  ObjectExpression: 'object',
};

// function parse(tree) {
//   for (let key in tree) {
//     const item = tree[key];

//     item.root = parseNode(item.root);

//     for (let key in item.refs) {
//       item.refs[key] = parseNode(item.refs[key]);
//     }
//   }
//   return tree;
// }

// function parseNode(node) {
//   let doc;
//   try {
//     doc = reactDocGen.parse(node.code);
//     doc.type = 'component';
//     for (let key in doc.props) {
//       const item = doc.props[key];
//       let params;
//       try {
//         params = parseJsDoc(item.description);
//       } catch (e) { }
//       if (item.type) {
//         if (item.type.name === 'object') {
//           item.properties = params.params;
//         } else if (item.type.name === 'func') {
//           item.params = params.params;
//         }
//       }
//     }
//     return doc;
//   } catch (e) {
//     node = node || {};
//     let leadingComments = node.leadingComments;
//     let target;
//     doc = {};
//     doc.type = typeMap[node.type] || 'function';

//     if (doc.type === 'object') {
//       target = 'properties';
//     } else {
//       target = 'params';
//     }

//     doc[target] = [];

//     if (leadingComments) {
//       try {
//         leadingComments = leadingComments
//           .map(item => {
//             try {
//               return parseJsDoc(item.value);
//             } catch (e) {
//               return null;
//             }
//           })
//           .filter(item => item)
//           .forEach(item => {
//             doc[target] = doc[target].concat(item.params);
//           });
//         return doc;
//       } catch (e) { }
//     }
//     return null;
//   }
// }

// function toPropsSchema(parsed) {
//   const root = parsed.default.root;
//   const children = parsed.default.refs;
//   const otherChildren = Object.assign({}, parsed, {
//     default: null
//   });
//   return Object.assign({}, root, {
//     "subComponents": Object.keys(children).map(key => {
//       if (children[key]) {
//         children[key].name = key;
//       }
//       return children[key];
//     }).concat(
//       Object.keys(otherChildren).map(key => {
//         if (otherChildren[key]) {
//           otherChildren[key].name = key
//         }
//         return otherChildren[key] && otherChildren[key].root;
//       })
//       ).filter(item => item)
//   });
// }

function run(node, nodeName) {
  const propsSchema = {};
  if (nodeName) {
    propsSchema.name = nodeName;
  }

  if (node.root && node.root.filepath) {
    Object.assign(
      propsSchema,
      fusionApiExtractor.extractSource(node.root.code, {
        filePath: node.root.filepath,
        componentName: nodeName,
      })
    );
  }
  if (node.refs) {
    propsSchema.subComponents = Object.keys(node.refs).map((componentName) => {
      return run(
        {
          root: node.refs[componentName],
        },
        componentName
      );
    });
  }
  return propsSchema;
}

module.exports = function treeToJSON({ output }) {
  const schema = run(output.default || {});
  // const parsed = parse(tree.output);
  return schema;
};
