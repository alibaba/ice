// See https://github.com/alibaba/rax/blob/master/packages/rax-create-class/src/index.js
// Imported by 'rax-compat/createReactClass'
import type { ComponentSpec, ClassicComponentClass } from 'react';
import { Component } from 'react';

const AUTOBIND_BLACKLIST = {
  render: 1,
  shouldComponentUpdate: 1,
  componentWillReceiveProps: 1,
  componentWillUpdate: 1,
  componentDidUpdate: 1,
  componentWillMount: 1,
  componentDidMount: 1,
  componentWillUnmount: 1,
  componentDidUnmount: 1,
};

function collateMixins(mixins: any) {
  let keyed: Record<string, any> = {};

  for (let i = 0; i < mixins.length; i++) {
    let mixin = mixins[i];
    if (mixin.mixins) {
      applyMixins(mixin, collateMixins(mixin.mixins));
    }

    for (let key in mixin) {
      if (mixin.hasOwnProperty(key) && key !== 'mixins') {
        (keyed[key] || (keyed[key] = [])).push(mixin[key]);
      }
    }
  }

  return keyed;
}

function flattenHooks(key: string, hooks: Array<any>) {
  let hookType = typeof hooks[0];
  // Consider "null" value.
  if (hooks[0] && hookType === 'object') {
    // Merge objects in hooks
    hooks.unshift({});
    return Object.assign.apply(null, hooks);
  } else if (hookType === 'function' && (key === 'getInitialState' || key === 'getDefaultProps' || key === 'getChildContext')) {
    return function () {
      let ret;
      for (let i = 0; i < hooks.length; i++) {
        // @ts-ignore
        let r = hooks[i].apply(this, arguments);
        if (r) {
          if (!ret) ret = {};
          Object.assign(ret, r);
        }
      }
      return ret;
    };
  } else {
    return hooks[0];
  }
}
function applyMixins(proto: any, mixins: Record<string, any>) {
  for (let key in mixins) {
    // eslint-disable-next-line no-prototype-builtins
    if (mixins.hasOwnProperty(key)) {
      proto[key] = flattenHooks(key, mixins[key].concat(proto[key] || []));
    }
  }
}

function createReactClass<P, S = {}>(spec: ComponentSpec<P, S>): ClassicComponentClass<P> {
  class ReactClass extends Component<P, S> {
    constructor(props: P, context: any) {
      super(props, context);

      for (let methodName in this) {
        let method = this[methodName];
        // @ts-ignore
        if (typeof method === 'function' && !AUTOBIND_BLACKLIST[methodName]) {
          this[methodName] = method.bind(this);
        }
      }

      if (spec.getInitialState) {
        this.state = spec.getInitialState.call(this);
      }
    }
  }

  if (spec.mixins) {
    applyMixins(spec, collateMixins(spec.mixins));
  }

  // Not to pass contextTypes to prototype.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { propTypes, contextTypes, ...others } = spec;
  Object.assign(ReactClass.prototype, others);

  if (spec.statics) {
    Object.assign(ReactClass, spec.statics);
  }

  if (spec.propTypes) {
    // @ts-ignore
    ReactClass.propTypes = spec.propTypes;
  }

  if (spec.getDefaultProps) {
    // @ts-ignore
    ReactClass.defaultProps = spec.getDefaultProps();
  }

  if (spec.contextTypes) {
    // @ts-ignore
    ReactClass.contextTypes = spec.contextTypes;
  }

  if (spec.childContextTypes) {
    // @ts-ignore
    ReactClass.childContextTypes = spec.childContextTypes;
  }

  if (spec.displayName) {
    // @ts-ignore
    ReactClass.displayName = spec.displayName;
  }

  return ReactClass as ClassicComponentClass<P>;
}
export default createReactClass;
