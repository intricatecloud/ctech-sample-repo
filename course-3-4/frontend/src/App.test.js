import { render, screen } from '@testing-library/react';
import App from './App';

test('shows landing page', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn how/i);
  expect(linkElement).toBeInTheDocument();
});
