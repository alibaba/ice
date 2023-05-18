import * as _rax from '../../esm/index.js';
import raxUnmountComponentAtNode from './rax-unmount-component-at-node.js';

let _raxUnmountComponentAtNode = _interopRequireDefault(raxUnmountComponentAtNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

let Portal =
/* #__PURE__ */
(function (_Component) {
  _inheritsLoose(Portal, _Component);

  function Portal(props, context) {
    return _Component.call(this, props, context) || this;
  }

  let _proto = Portal.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.renderPortal();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.container !== this.props.container) {
      (0, _raxUnmountComponentAtNode.default)(prevProps.container);
    }

    this.renderPortal();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    (0, _raxUnmountComponentAtNode.default)(this.props.container);
  };

  _proto.renderPortal = function renderPortal() {
    (0, _rax.render)(this.props.element, this.props.container, {
      parent: this,
    });
  };

  _proto.render = function render() {
    return null;
  };

  return Portal;
}(_rax.Component));

function createPortal(element, container) {
  return (0, _rax.createElement)(Portal, {
    element: element,
    container: container,
  });
}

export default createPortal;