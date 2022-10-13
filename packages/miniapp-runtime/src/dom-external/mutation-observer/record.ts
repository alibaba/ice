import type { Node } from '../../dom/node.js';

/**
 * A MutationRecord represents an individual DOM mutation.
 * It is the object that is passed to MutationObserver's callback.
 * @see https://dom.spec.whatwg.org/#interface-mutationrecord
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord
*/
export interface MutationRecord {
  readonly target: Node;
  readonly addedNodes?: Node[];
  readonly removedNodes?: Node[];
  readonly previousSibling?: Node | null;
  readonly nextSibling?: Node | null;
  readonly attributeName?: string | null;
  readonly attributeNamespace?: string | null;
  oldValue?: string | null;

  // extended
  readonly type: MutationRecordType;
  readonly value?: string | null;
}

export const enum MutationRecordType {
  ATTRIBUTES = 'attributes',
  CHARACTER_DATA = 'characterData',
  CHILD_LIST = 'childList',
}
