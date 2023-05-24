import * as _rax from '../../esm/index.js';

let { Instance } = _rax.shared;

function unmountComponentAtNode(node) {
  let component = Instance.get(node);
  if (!component) {
    return false;
  }

  Instance.remove(node);

  component._internal.unmountComponent();

  return true;
}


export default unmountComponentAtNode;