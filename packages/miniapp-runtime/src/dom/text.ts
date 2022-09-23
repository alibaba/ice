import { Shortcuts } from '@ice/shared';

import { MutationObserver, MutationRecordType } from '../dom-external/mutation-observer/index.js';
import { Node } from './node.js';
import { NodeType } from './node_types.js';

export class Text extends Node {
  public _value: string;
  public nodeType = NodeType.TEXT_NODE;
  public nodeName = '#text';

  constructor(value) {
    super();
    this._value = value;
  }

  public set textContent(text: string) {
    MutationObserver.record({
      target: this,
      type: MutationRecordType.CHARACTER_DATA,
      oldValue: this._value,
    });
    this._value = text;
    this.enqueueUpdate({
      path: `${this._path}.${Shortcuts.Text}`,
      value: text,
    });
  }

  public get textContent(): string {
    return this._value;
  }

  public set nodeValue(text: string) {
    this.textContent = text;
  }

  public get nodeValue(): string {
    return this._value;
  }

  public set data(text: string) {
    this.textContent = text;
  }

  public get data(): string {
    return this._value;
  }
}
