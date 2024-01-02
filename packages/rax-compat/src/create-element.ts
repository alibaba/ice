import type { Attributes, CSSProperties, FunctionComponent, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { createElement as _createElement } from 'react';
import { createJSXElementFactory } from './compat/element.js';

const jsx = createJSXElementFactory((type: any, props: any, ...children: ReactNode[]) =>
  _createElement(type, props, ...children),
);

/**
 * Transform array type style to avoid
 * `Failed to set an indexed property on 'CSSStyleDeclaration': Index property setter is not supported`
 * error.
 */
const normalizeStyleProp = (style: (CSSProperties | CSSProperties[])[]) => {
  return style.flat().reduce((acc, val) => {
    return { ...acc, ...val };
  }, {});
};

/**
 * Compat createElement for rax export.
 * Reference: https://github.com/alibaba/rax/blob/master/packages/rax/src/createElement.js#L13
 * @param type
 * @param props
 * @param children
 * @returns Element
 */
export function createElement<P>(
  type: FunctionComponent<P> | string,
  props?: (Attributes & P & HTMLAttributes<any>) | null,
  ...children: ReactNode[]
): ReactElement {
  if (Array.isArray(props?.style)) {
    const normalizedStyle = normalizeStyleProp(props.style);

    return jsx(
      type,
      {
        ...props,
        style: normalizedStyle,
      },
      ...children,
    );
  }

  return jsx(type, props as object, ...children);
}
