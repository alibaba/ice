export default function __ICE__CREATE_ELEMENT({ tagName, attributes = {}, children = [], text }, container) {
  const ele = text ? document.createTextNode(text) : document.createElement(tagName);
  for (const key in attributes) {
    ele.setAttribute(key, attributes[key]);
  }
  children.forEach((child) => {
    __ICE__CREATE_ELEMENT(child, ele);
  });

  container.appendChild(ele);
  return ele;
}