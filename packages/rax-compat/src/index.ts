import { createElement } from './create-element.js';
import render from './render.js';
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
} from './hooks.js';
import Fragment from './fragment.js';
import { forwardRef, createRef } from './ref.js';
import { Component, PureComponent, memo } from './component.js';
import { createContext } from './context.js';
import shared from './shared.js';

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
