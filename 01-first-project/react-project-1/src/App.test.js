import React from 'react';
import { render } from '@testing-library/react';
import SamuraiJSAPP from './App';

test('renders learn react link', () => {
  const { getByText } = render(<SamuraiJSAPP />);
  expect(linkElement).toBeInTheDocument();
});
