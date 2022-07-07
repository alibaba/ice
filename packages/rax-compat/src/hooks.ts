import type {
  Context,
  DependencyList,
  DispatchWithoutAction,
  EffectCallback,
  MutableRefObject,
  ReducerStateWithoutAction,
  ReducerWithoutAction,
  Ref,
} from 'react';
import {
  useCallback as _useCallback,
  useContext as _useContext,
  useEffect as _useEffect,
  useImperativeHandle as _useImperativeHandle,
  useLayoutEffect as _useLayoutEffect,
  useMemo as _useMemo,
  useReducer as _useReducer,
  useRef as _useRef,
  useState as _useState,
  createContext as _createContext,
} from 'react';
import is from './is';

/**
 * Compat useState for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L39
 * @param initialState
 * @returns [ value, dispatch ]
 */
export function useState<S>(initialState: S | (() => S)): ReturnType<typeof _useState> | any {
  // The eagerState should be saved for filter shallow-equal value set.
  const stateHook = _useState({
    state: initialState,
    eagerState: initialState,
  });
  // @NOTE: Rax will not re-render if set a same value.
  function updateState(newState: S) {
    // Filter shallow-equal value set.
    if (!is(newState, stateHook[0].eagerState)) {
      stateHook[1]({
        state: newState,
        eagerState: newState,
      });
    }

    stateHook[0].eagerState = newState;
  }

  return [stateHook[0].state, updateState, stateHook[0].eagerState];
}

/**
 * Compat useContext for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L93
 * @param context
 * @returns context
 */
export function useContext<T>(context: Context<T>): ReturnType<typeof _useContext> {
  return _useContext(context);
}

/**
 * Compat useEffect for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L98
 * @param effect
 * @param inputs
 * @returns void
 */
export function useEffect(effect: EffectCallback, inputs?: DependencyList): void {
  return _useEffect(effect, inputs);
}

/**
 * Compat useLayoutEffect for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L102
 * @param effect
 * @param inputs
 * @returns void
 */
export function useLayoutEffect(effect: EffectCallback, inputs: DependencyList): void {
  return _useLayoutEffect(effect, inputs);
}

/**
 * Compat useImperativeHandle for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L190
 * @param ref
 * @param create
 * @param inputs
 * @returns void
 */
export function useImperativeHandle<T, R extends T>(
  ref: Ref<T> | undefined, create: () => R, inputs?: DependencyList): void {
  return _useImperativeHandle(ref, create, inputs);
}

/**
 * Compat useRef for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L206
 * @param initialValue
 * @returns MutableRefObject
 */
export function useRef<T>(initialValue: T): MutableRefObject<T> {
  return _useRef(initialValue);
}

/**
 * Compat useCallback for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L220
 * @param callback
 * @param inputs
 * @returns callback
 */
export function useCallback<T extends Function>(callback: T, inputs: DependencyList): T {
  return _useCallback(callback, inputs);
}

/**
 * Compat useMemo for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L224
 * @param create
 * @param inputs
 * @returns create
 */
export function useMemo<T>(create: () => T, inputs: DependencyList | undefined): T {
  return _useMemo(create, inputs);
}

/**
 * Compat useReducer for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L224
 * @param reducer
 * @param initialArg
 * @param init
 * @returns [ state, dispatch ]
 */
export function useReducer<R extends ReducerWithoutAction<any>, I>(
  reducer: R,
  initialArg: I,
  init: (arg: I) => ReducerStateWithoutAction<R>,
): [ReducerStateWithoutAction<R>, DispatchWithoutAction] {
  return _useReducer(reducer, initialArg, init);
}

export function createContext<T>(defaultValue: T): Context<T> {
  return _createContext(defaultValue);
}
