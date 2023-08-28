/// <reference types="@ice/pkg/types" />

interface ImportMeta {
  // The build target
  target: 'weex' | 'web';
}


interface Node {
  _nativeNode: Node;
}
