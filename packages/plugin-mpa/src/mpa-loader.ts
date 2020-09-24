function mpaLoader() {
  // TODO ssr render, use rax-app-renderer?
  const source = `
    import { render, createElement} from 'rax';
    import Component from '${this.resourcePath}';
    import DriverUniversal from 'driver-universal';

    const comProps = {};
    function EntryComponent() {
      return createElement(Component, comProps);
    }
    render(createElement(EntryComponent), null, { driver: DriverUniversal });
  `;
  return source;
}

export default mpaLoader;