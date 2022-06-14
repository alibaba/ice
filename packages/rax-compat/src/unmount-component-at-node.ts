import type { Container } from 'react-dom';

export default function unmountComponentAtNode(container: Container) {
  // @TODO: unmount
  container.textContent = '';
}
