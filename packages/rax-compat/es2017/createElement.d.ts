import { cloneElement, isValidElement, createFactory } from 'react';
/**
 * Compat createElement for rax export.
 * Reference: https://github.com/alibaba/rax/blob/master/packages/rax/src/createElement.js#L13
 * @param type
 * @param props
 * @param children
 * @param others
 * @returns Element
 */
export declare function createElement(type: any, props: Object, children: any, ...others: any): any;
export { cloneElement, isValidElement, createFactory, };
