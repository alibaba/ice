import { createElement } from './create-element';
import render from './render';
import {
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
  useImperativeHandle,
} from './hooks';
import Fragment from './fragment';
import { forwardRef, createRef } from './ref';
import { Component, PureComponent, memo } from './component';
import { createContext } from './context';
import shared from './shared';

// Mocked version for rax.
const version = '1.2.2-compat';

export {
  Component,
  Fragment,
  PureComponent,

  createContext,
  createElement,
  createRef,
  forwardRef,
  memo,

  render,

  // This is mocked object for rax compatible.
  shared,

  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,

  version,
};
