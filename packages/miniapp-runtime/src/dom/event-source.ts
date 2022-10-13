import type { Node } from './node.js';

interface IEventSource extends Map<string | undefined | null, Node> {
  removeNode: (child: Node) => void;
  removeNodeTree: (child: Node) => void;
}

class EventSource extends Map {
  removeNode(child: Node) {
    const { sid, uid } = child;
    this.delete(sid);
    if (uid !== sid && uid) this.delete(uid);
  }

  removeNodeTree(child: Node) {
    this.removeNode(child);
    const { childNodes } = child;
    childNodes.forEach(node => this.removeNodeTree(node));
  }
}

export const eventSource: IEventSource = new EventSource();
