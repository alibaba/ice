/* eslint-disable */
import type * as React from 'react';

/**
 * typing overrides from commits below(@types/react since v17):
 *
 * https://github.com/DefinitelyTyped/DefinitelyTyped/commit/443451ccc5db3adf1865853e152636f1a9ba5dd5
 * https://github.com/DefinitelyTyped/DefinitelyTyped/commit/b57d67064938d173fa950cd519524445d20d2ef7#diff-32cfd8cb197872bcba371f5018185d2e75fa540b52cda2dd7d8ac12dcc021299
 * https://github.com/DefinitelyTyped/DefinitelyTyped/commit/220087807a5746367416c2a3ef87c17d7344f22f
 * https://github.com/DefinitelyTyped/DefinitelyTyped/commit/89596431d2bf885a298b369e6e53d7ede6db72fa#diff-32cfd8cb197872bcba371f5018185d2e75fa540b52cda2dd7d8ac12dcc021299
 * https://github.com/DefinitelyTyped/DefinitelyTyped/commit/55dc209ceb6dbcd59c4c68cc8dfb77faadd9de12#diff-32cfd8cb197872bcba371f5018185d2e75fa540b52cda2dd7d8ac12dcc021299
 * https://github.com/DefinitelyTyped/DefinitelyTyped/commit/afd309b4193c1f448386bf8fe09e512e4422e69e
 * https://github.com/DefinitelyTyped/DefinitelyTyped/commit/14f568cded146f89864a06da1884364bd4e6ced0
 * https://github.com/DefinitelyTyped/DefinitelyTyped/commit/684c905d533f1a4f5a62edf9011d5eca5a9458a6
 */
declare namespace Rax {
  export type FC<P = {}> = React.FunctionComponent<P>;
  export type ForwardRefRenderFunction<
    T,
    P = {}
  > = React.ForwardRefRenderFunction<P>;
  export type FC<P = {}> = React.FunctionComponent<P>;
  export type VoidFunctionComponent<P = {}> = React.VoidFunctionComponent<P>;
  export type ForwardRefExoticComponent<P> = React.ForwardRefExoticComponent<P>

  export type JSXElementConstructor<P> =
    | ((
      props: P,
      /**
       * @deprecated https://legacy.reactjs.org/docs/legacy-context.html#referencing-context-in-stateless-function-components
       */
      deprecatedLegacyContext?: any
    ) => React.ReactNode)
    | (new (props: P) => React.Component<any, any>);

  export type RaxNode = React.ReactNode;

  // Omit would not be sufficient for this. We'd like to avoid unnecessary mapping and need a distributive conditional to support unions.
  export type PropsWithoutRef<P> = React.PropsWithoutRef<P>;

  export type PropsWithChildren<P = unknown> = React.PropsWithChildren<P>;

  export type RaxFragment = React.ReactFragment;

  export type ComponentPropsWithRef<T extends React.ElementType> =
    React.ComponentPropsWithRef<T>;

  export type DependencyList = React.DependencyList;

  export type RaxNodeArray = React.ReactNodeArray;

  export type RaxChildren = React.ReactChildren;
}
export = Rax;
export as namespace Rax;
