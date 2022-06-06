import * as React from 'react';
/**
 * Compat useState for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L39
 * @param initialState
 * @returns [ value, dispatch ]
 */
export declare function useState<S>(initialState: S | (() => S)): ReturnType<typeof React.useState>;
/**
 * Compat useContext for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L93
 * @param context
 * @returns context
 */
export declare function useContext<T>(context: React.Context<T>): ReturnType<typeof React.useContext>;
/**
 * Compat useEffect for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L98
 * @param effect
 * @param inputs
 * @returns void
 */
export declare function useEffect(effect: React.EffectCallback, inputs: React.DependencyList): void;
/**
 * Compat useLayoutEffect for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L102
 * @param effect
 * @param inputs
 * @returns void
 */
export declare function useLayoutEffect(effect: React.EffectCallback, inputs: React.DependencyList): void;
/**
 * Compat useImperativeHandle for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L190
 * @param ref
 * @param create
 * @param inputs
 * @returns void
 */
export declare function useImperativeHandle<T, R extends T>(ref: React.Ref<T> | undefined, create: () => R, inputs?: React.DependencyList): void;
/**
 * Compat useRef for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L206
 * @param initialValue
 * @returns MutableRefObject
 */
export declare function useRef<T>(initialValue: T): React.MutableRefObject<T>;
/**
 * Compat useCallback for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L220
 * @param callback
 * @param inputs
 * @returns callback
 */
export declare function useCallback<T extends Function>(callback: T, inputs: React.DependencyList): T;
/**
 * Compat useMemo for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L224
 * @param create
 * @param inputs
 * @returns create
 */
export declare function useMemo<T>(create: () => T, inputs: React.DependencyList | undefined): T;
/**
 * Compat useReducer for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L224
 * @param reducer
 * @param initialArg
 * @param init
 * @returns [ state, dispatch ]
 */
export declare function useReducer<R extends React.ReducerWithoutAction<any>, I>(reducer: R, initialArg: I, init: (arg: I) => React.ReducerStateWithoutAction<R>): [React.ReducerStateWithoutAction<R>, React.DispatchWithoutAction];
export declare function useDebugValue<T>(value: T, format?: (value: T) => any): void;
export declare function useInsertionEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
export declare function useSyncExternalStore<Snapshot>(subscribe: (onStoreChange: () => void) => () => void, getSnapshot: () => Snapshot, getServerSnapshot?: () => Snapshot): Snapshot;
