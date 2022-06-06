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
  createElement,
  createContext,
  createRef,
  forwardRef,
  useState,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useImperativeHandle,
  memo,
  render,
  Component,
  PureComponent,
  Fragment,
};
