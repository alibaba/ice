import * as React from 'react';
/**
 * Compat useState for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L39
 * @param initialState 
 * @returns [ value, dispatch ]
 */ export function useState(initialState) {
    return React.useState(initialState);
}
/**
 * Compat useContext for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L93
 * @param context 
 * @returns context
 */ export function useContext(context) {
    return React.useContext(context);
}
/**
 * Compat useEffect for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L98
 * @param effect
 * @param inputs
 * @returns void
 */ export function useEffect(effect, inputs) {
    return React.useEffect(effect, inputs);
}
/**
 * Compat useLayoutEffect for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L102
 * @param effect
 * @param inputs
 * @returns void
 */ export function useLayoutEffect(effect, inputs) {
    return React.useLayoutEffect(effect, inputs);
}
/**
 * Compat useImperativeHandle for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L190
 * @param ref
 * @param create
 * @param inputs
 * @returns void
 */ export function useImperativeHandle(ref, create, inputs) {
    return React.useImperativeHandle(ref, create, inputs);
}
/**
 * Compat useRef for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L206
 * @param initialValue
 * @returns MutableRefObject
 */ export function useRef(initialValue) {
    return React.useRef(initialValue);
}
/**
 * Compat useCallback for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L220
 * @param callback
 * @param inputs
 * @returns callback
 */ export function useCallback(callback, inputs) {
    return React.useCallback(callback, inputs);
}
/**
 * Compat useMemo for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L224
 * @param create
 * @param inputs
 * @returns create
 */ export function useMemo(create, inputs) {
    return React.useMemo(create, inputs);
}
/**
 * Compat useReducer for rax export.
 * https://github.com/alibaba/rax/blob/master/packages/rax/src/hooks.js#L224
 * @param reducer
 * @param initialArg
 * @param init
 * @returns [ state, dispatch ]
 */ export function useReducer(reducer, initialArg, init) {
    return React.useReducer(reducer, initialArg, init);
}
export function useDebugValue(value, format) {
    return React.useDebugValue(value, format);
}
export function useInsertionEffect(effect, deps) {
    return React.useInsertionEffect(effect, deps);
}
export function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
    return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
