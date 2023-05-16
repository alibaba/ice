import { forwardRef as _forwardRef, createRef } from 'react';
import type { ForwardRefRenderFunction, ForwardedRef } from 'react';

export function forwardRef(render: ForwardRefRenderFunction<unknown, ForwardedRef<unknown>>) {
  if (render.defaultProps) {
    const { defaultProps } = render;

    // forwardRef render functions do not support propTypes or defaultProps.
    delete render.defaultProps;

    const component = _forwardRef(render);
    component.defaultProps = defaultProps;

    return component;
  }

  return _forwardRef(render);
}

export {
  createRef,
};
