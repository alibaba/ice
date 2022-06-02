import * as React from 'react';

/**
 * Compat useState for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L39
 * @param initialState 
 * @returns [ value, dispatch ]
 */
export function useState<S>(initialState: S | (() => S)): ReturnType<typeof React.useState> {
  return React.useState(initialState);
}

/**
 * Compat useContext for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L93
 * @param context 
 * @returns context
 */
export function useContext<T>(context: React.Context<T>): ReturnType<typeof React.useContext> {
  return React.useContext(context);
}

/**
 * Compat useEffect for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L98
 * @param effect
 * @param inputs
 * @returns void
 */
export function useEffect(effect: React.EffectCallback, inputs: React.DependencyList): void {
  return React.useEffect(effect, inputs);
}

/**
 * Compat useLayoutEffect for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L102
 * @param effect
 * @param inputs
 * @returns void
 */
export function useLayoutEffect(effect: React.EffectCallback, inputs: React.DependencyList): void {
  return React.useLayoutEffect(effect, inputs);
}

/**
 * Compat useImperativeHandle for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L190
 * @param ref
 * @param create
 * @param inputs
 * @returns void
 */
export function useImperativeHandle<T, R extends T>(ref: React.Ref<T> | undefined, create: () => R, inputs?: React.DependencyList): void {
  return React.useImperativeHandle(ref, create, inputs);
}

/**
 * Compat useRef for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L206
 * @param initialValue
 * @returns MutableRefObject
 */
export function useRef<T>(initialValue: T): React.MutableRefObject<T> {
  return React.useRef(initialValue);
}

/**
 * Compat useCallback for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L220
 * @param callback
 * @param inputs
 * @returns callback
 */
export function useCallback<T extends Function>(callback: T, inputs: React.DependencyList): T {
  return React.useCallback(callback, inputs);
}

/**
 * Compat useMemo for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L224
 * @param create
 * @param inputs
 * @returns create
 */
export function useMemo<T>(create: () => T, inputs: React.DependencyList | undefined): T {
  return React.useMemo(create, inputs);
}

/**
 * Compat useReducer for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L224
 * @param reducer
 * @param initialArg
 * @param init
 * @returns [ state, dispatch ]
 */
export function useReducer<R extends React.ReducerWithoutAction<any>, I>(reducer: R, initialArg: I, init: (arg: I) => React.ReducerStateWithoutAction<R>): [React.ReducerStateWithoutAction<R>, React.DispatchWithoutAction] {
  return React.useReducer(reducer, initialArg, init);
}

export function useDebugValue<T>(value: T, format?: (value: T) => any): void {
  return React.useDebugValue(value, format);
}

export function useInsertionEffect(effect: React.EffectCallback, deps?: React.DependencyList): void {
  return React.useInsertionEffect(effect, deps);
}

export function useSyncExternalStore<Snapshot>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => Snapshot,
  getServerSnapshot?: () => Snapshot,
): Snapshot {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
