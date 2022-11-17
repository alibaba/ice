import { ensure, hooks, Shortcuts } from '@ice/shared';

import { DOCUMENT_FRAGMENT } from '../constants/index.js';
import { MutationObserver, MutationRecordType } from '../dom-external/mutation-observer/index.js';
import env from '../env.js';
import { hydrate } from '../hydrate.js';
import type { Func, UpdatePayload } from '../interface/index.js';
import { extend, incrementId, isComment } from '../utils/index.js';
import type { Document } from './document.js';
import type { Element } from './element.js';
import { eventSource } from './event-source.js';
import { EventTarget } from './event-target.js';
import { NodeType } from './node_types.js';
import type { RootElement } from './root.js';

interface RemoveChildOptions {
  cleanRef?: boolean;
  doUpdate?: boolean;
}

const CHILDNODES = Shortcuts.Childnodes;
const nodeId = incrementId();

export class Node extends EventTarget {
  public uid: string;
  public sid: string;
  public nodeType: NodeType;
  public nodeName: string;
  public parentNode: Node | null = null;
  public childNodes: Node[] = [];

  public constructor() {
    super();
    this.uid = `_${nodeId()}`; // dom 节点 id，开发者可修改
    this.sid = this.uid; // dom 节点全局唯一 id，不可被修改
    eventSource.set(this.sid, this);
  }

  private hydrate = (node: Node) => () => hydrate(node as Element);

  private updateChildNodes(isClean?: boolean) {
    const cleanChildNodes = () => [];
    const rerenderChildNodes = () => {
      const childNodes = this.childNodes.filter(node => !isComment(node));
      return childNodes.map(hydrate);
    };

    this.enqueueUpdate({
      path: `${this._path}.${CHILDNODES}`,
      value: isClean ? cleanChildNodes : rerenderChildNodes,
    });
  }

  public get _root(): RootElement | null {
    return this.parentNode?._root || null;
  }

  protected findIndex(refChild: Node): number {
    const index = this.childNodes.indexOf(refChild);

    ensure(index !== -1, 'The node to be replaced is not a child of this node.');

    return index;
  }

  public get _path(): string {
    const { parentNode } = this;

    if (parentNode) {
      // 计算路径时，先过滤掉 comment 节点
      const list = parentNode.childNodes.filter(node => !isComment(node));
      const indexOfNode = list.indexOf(this);
      const index = hooks.call('getPathIndex', indexOfNode);

      return `${parentNode._path}.${CHILDNODES}.${index}`;
    }

    return '';
  }

  public get nextSibling(): Node | null {
    const { parentNode } = this;
    return parentNode?.childNodes[parentNode.findIndex(this) + 1] || null;
  }

  public get previousSibling(): Node | null {
    const { parentNode } = this;
    return parentNode?.childNodes[parentNode.findIndex(this) - 1] || null;
  }

  public get parentElement(): Element | null {
    const { parentNode } = this;
    if (parentNode?.nodeType === NodeType.ELEMENT_NODE) {
      return parentNode as Element;
    }
    return null;
  }

  public get firstChild(): Node | null {
    return this.childNodes[0] || null;
  }

  public get lastChild(): Node | null {
    const { childNodes } = this;
    return childNodes[childNodes.length - 1] || null;
  }

  /**
   * @textContent 目前只能置空子元素
   * @TODO 等待完整 innerHTML 实现
   */
  // eslint-disable-next-line accessor-pairs
  public set textContent(text: string) {
    const removedNodes = this.childNodes.slice();
    const addedNodes: Node[] = [];

    // Handle old children' data structure & ref
    while (this.firstChild) {
      this.removeChild(this.firstChild, { doUpdate: false });
    }

    if (text === '') {
      this.updateChildNodes(true);
    } else {
      const newText = env.document.createTextNode(text);
      addedNodes.push(newText);
      this.appendChild(newText);
      this.updateChildNodes();
    }

    // @Todo: appendChild 会多触发一次
    MutationObserver.record({
      type: MutationRecordType.CHILD_LIST,
      target: this,
      removedNodes,
      addedNodes,
    });
  }

  /**
   * @doc https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore
   * @scenario
   * [A,B,C]
   *   1. insert D before C, D has no parent
   *   2. insert D before C, D has the same parent of C
   *   3. insert D before C, D has the different parent of C
   */
  public insertBefore<T extends Node>(newChild: T, refChild?: Node | null, isReplace?: boolean): T {
    if (newChild.nodeName === DOCUMENT_FRAGMENT) {
      newChild.childNodes.reduceRight((previousValue, currentValue) => {
        this.insertBefore(currentValue, previousValue);
        return currentValue;
      }, refChild);
      return newChild;
    }

    // Parent release newChild
    //   - cleanRef: false (No need to clean eventSource, because newChild is about to be inserted)
    //   - update: true (Need to update parent.childNodes, because parent.childNodes is reordered)
    newChild.remove({ cleanRef: false });

    // Data structure
    newChild.parentNode = this;
    if (refChild) {
      // insertBefore & replaceChild
      const index = this.findIndex(refChild);
      this.childNodes.splice(index, 0, newChild);
    } else {
      // appendChild
      this.childNodes.push(newChild);
    }

    // Serialization
    if (this._root) {
      if (!refChild) {
        // appendChild
        const isOnlyChild = this.childNodes.length === 1;
        if (isOnlyChild) {
          this.updateChildNodes();
        } else {
          this.enqueueUpdate({
            path: newChild._path,
            value: this.hydrate(newChild),
          });
        }
      } else if (isReplace) {
        // replaceChild
        this.enqueueUpdate({
          path: newChild._path,
          value: this.hydrate(newChild),
        });
      } else {
        // insertBefore
        this.updateChildNodes();
      }
    }

    MutationObserver.record({
      type: MutationRecordType.CHILD_LIST,
      target: this,
      addedNodes: [newChild],
      removedNodes: isReplace
        ? [refChild as Node] /** replaceChild */
        : [],
      nextSibling: isReplace
        ? (refChild as Node).nextSibling /** replaceChild */
        : (refChild || null), /** insertBefore & appendChild */
      previousSibling: newChild.previousSibling,
    });

    return newChild;
  }

  /**
   * @doc https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild
   * @scenario
   * [A,B,C]
   *   1. append C, C has no parent
   *   2. append C, C has the same parent of B
   *   3. append C, C has the different parent of B
   */
  public appendChild(newChild: Node) {
    return this.insertBefore(newChild);
  }

  /**
   * @doc https://developer.mozilla.org/zh-CN/docs/Web/API/Node/replaceChild
   * @scenario
   * [A,B,C]
   *   1. replace B with C, C has no parent
   *   2. replace B with C, C has no parent, C has the same parent of B
   *   3. replace B with C, C has no parent, C has the different parent of B
   */
  public replaceChild(newChild: Node, oldChild: Node) {
    if (oldChild.parentNode !== this) return;

    // Insert the newChild
    this.insertBefore(newChild, oldChild, true);

    // Destroy the oldChild
    // - cleanRef: true (Need to clean eventSource, because the oldChild was detached from the DOM tree)
    // - update: false (No need to update parent.childNodes,
    // because replace will not cause the parent.childNodes being reordered)
    oldChild.remove({ doUpdate: false });

    return oldChild;
  }

  /**
   * @doc https://developer.mozilla.org/zh-CN/docs/Web/API/Node/removeChild
   * @scenario
   * [A,B,C]
   *   1. remove A or B
   *   2. remove C
   */
  public removeChild<T extends Node>(child: T, options: RemoveChildOptions = {}): T {
    const { cleanRef, doUpdate } = options;

    if (cleanRef !== false && doUpdate !== false) {
      // appendChild/replaceChild/insertBefore 不应该触发
      // @Todo: 但其实如果 newChild 的父节点是另一颗子树的节点，应该是要触发的
      MutationObserver.record({
        type: MutationRecordType.CHILD_LIST,
        target: this,
        removedNodes: [child],
        nextSibling: child.nextSibling,
        previousSibling: child.previousSibling,
      });
    }

    // Data Structure
    const index = this.findIndex(child);
    this.childNodes.splice(index, 1);
    child.parentNode = null;

    // Set eventSource
    if (cleanRef !== false) {
      eventSource.removeNodeTree(child);
    }

    // Serialization
    if (this._root && doUpdate !== false) {
      this.updateChildNodes();
    }

    return child;
  }

  public remove(options?: RemoveChildOptions) {
    this.parentNode?.removeChild(this, options);
  }

  public hasChildNodes() {
    return this.childNodes.length > 0;
  }

  public enqueueUpdate(payload: UpdatePayload) {
    this._root?.enqueueUpdate(payload);
  }

  public get ownerDocument(): Document {
    return env.document;
  }

  static extend(methodName: string, options: Func | Record<string, any>) {
    extend(Node, methodName, options);
  }
}
