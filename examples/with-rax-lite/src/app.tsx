import { createElement, render } from 'rax';
import DriverUniversal from 'driver-universal';

render(<div>123</div>, document.body, {
  driver: DriverUniversal
});
