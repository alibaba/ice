import * as Inspector from 'inspector-dom';

export default ({ addProvider, context: { createElement } }) => {
  const Provider = ({ children }) => {
    return createElement('div', null, children);
  };

  const inspector = Inspector({
    root: 'body', // root element
    excluded: [], // excluded children, string or node Element
    outlineStyles: '2px solid orange', // styles
    onClick: (el) => {
      console.log('Element was clicked:', el);
      try {
        fetch(`/vscode/goto?file=${el.getAttribute('data-inspector-relative-path')}&line=${el.getAttribute('data-inspector-line')}&column=${el.getAttribute('data-inspector-column')}`);
      } catch (e) {
        // ignore
      }
    },
  });

  inspector.enable();
  addProvider(Provider);
};
