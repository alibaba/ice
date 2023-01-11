interface CreateElementOptions {
  tagName?: string;
  attributes?: {
    [attribute: string]: any;
  };
  children?: Array<CreateElementOptions>;
  text?: string;
}

export default function __ICE__CREATE_ELEMENT(options: CreateElementOptions, container: Node) {
  const {
    tagName,
    attributes = {},
    children = [],
    text,
  } = options;

  let node: Element | Text;
  if (text) {
    container.textContent = text;
  } else {
    node = document.createElement(tagName);

    for (const key in attributes) {
      node.setAttribute(key, attributes[key]);
    }

    children.forEach((child) => {
      __ICE__CREATE_ELEMENT(child, node);
    });
    container.appendChild(node);
  }

  return node;
}
