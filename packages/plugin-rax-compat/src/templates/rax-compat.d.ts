import type * as React from 'react';

declare namespace Rax {
  export type FC<P = {}> = React.FunctionComponent<P>;
  export type FunctionComponent<P = {}> = React.FunctionComponent<P>;
  export type Component<P = {}> = React.Component<P>;
  export type JSXElementConstructor<P> = React.JSXElementConstructor<P>;

  export type RaxComponentElement<
    T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
    P = Pick<
      React.ComponentProps<T>,
      Exclude<keyof React.ComponentProps<T>, 'key' | 'ref'>
    >,
  > = React.ReactElement<P, Exclude<T, number>>;
}

export = Rax;
export as namespace Rax;

export type __UNUSED_TYPE_FOR_IMPORT_EFFECT_ONLY__ = never;
