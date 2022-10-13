import { controlledComponent, isUndefined } from '@ice/shared';

import {
  COMMENT,
  DOCUMENT_ELEMENT_NAME,
  ROOT_STR,
} from '../constants/index.js';
import { Element } from '../dom/element.js';
import { createEvent } from '../dom/event.js';
import { eventSource } from '../dom/event-source.js';
import { FormElement } from '../dom/form.js';
import { NodeType } from '../dom/node_types.js';
import { RootElement } from '../dom/root.js';
import { Text } from '../dom/text.js';
import env from '../env.js';

export class Document extends Element {
  public documentElement: Element;
  public head: Element;
  public body: Element;
  public createEvent = createEvent;

  public constructor() {
    super();
    this.nodeType = NodeType.DOCUMENT_NODE;
    this.nodeName = DOCUMENT_ELEMENT_NAME;
  }

  public createElement(type: string): Element | RootElement | FormElement {
    if (type === ROOT_STR) {
      return new RootElement();
    }

    const element = controlledComponent.has(type)
      ? new FormElement()
      : new Element();

    element.nodeName = type;
    element.tagName = type.toUpperCase();

    return element;
  }

  // an ugly fake createElementNS to deal with @vue/runtime-dom's
  // support mounting app to svg container since vue@3.0.8
  public createElementNS(_svgNS: string, type: string): Element | RootElement | FormElement {
    return this.createElement(type);
  }

  public createTextNode(text: string): Text {
    return new Text(text);
  }

  public getElementById<T extends Element>(id: string | undefined | null): T | null {
    const el = eventSource.get(id);
    return isUndefined(el) ? null : el as T;
  }

  public querySelector<T extends Element>(query: string): T | null {
    // 为了 Vue3 的乞丐版实现
    if (/^#/.test(query)) {
      return this.getElementById<T>(query.slice(1));
    }
    return null;
  }

  public querySelectorAll() {
    // fake hack
    return [];
  }

  // @TODO: @PERF: 在 hydrate 移除掉空的 node
  public createComment(): Text {
    const textnode = new Text('');
    textnode.nodeName = COMMENT;
    return textnode;
  }

  get defaultView() {
    return env.window;
  }
}
