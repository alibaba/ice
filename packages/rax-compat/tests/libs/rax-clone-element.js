import * as _rax from '../../esm/index.js';
import raxIsValidElement from './rax-is-valid-element.js';

let _raxIsValidElement = _interopRequireDefault(raxIsValidElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let { Host } = _rax.shared,
    { Element } = _rax.shared,
    { flattenChildren } = _rax.shared;
let RESERVED_PROPS = {
  key: true,
  ref: true,
};

function cloneElement(element, config) {
  if (!(0, _raxIsValidElement.default)(element)) {
    throw Error('cloneElement: not a valid element.');
  } // Original props are copied


  let props = Object.assign({}, element.props); // Reserved names are extracted

  let { key } = element;
  let { ref } = element; // Owner will be preserved, unless ref is overridden

  let owner = element._owner;

  if (config) {
    // Should reset ref and owner if has a new ref
    if (config.ref !== undefined) {
      ref = config.ref;
      owner = Host.owner;
    }

    if (config.key !== undefined) {
      key = String(config.key);
    } // Resolve default props


    let defaultProps;

    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    } // Remaining properties override existing props


    let propName;

    for (propName in config) {
      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if (children.length) {
    props.children = flattenChildren(children);
  }

  return new Element(element.type, key, ref, props, owner);
}

export default cloneElement;