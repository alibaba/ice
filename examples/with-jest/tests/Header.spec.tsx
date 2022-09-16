import { render, screen } from '@testing-library/react';
import Header from '../src/components/Header';

test('test Header component', () => {
  render(<Header />);
  expect(screen.getByTestId('title')).toHaveTextContent('Jest Test');
});
