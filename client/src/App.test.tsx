jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: () => (value: any) => ({
    values: value,
    errors: {},
  }),
}));

import { render } from '@testing-library/react';
import App from './App';

test('renders App without crashing', () => {
  render(<App />);
});
