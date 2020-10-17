import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import App from './App';

test('Render weather report text', async () => {
  const { getByText } = render(<App />);
  const titleElement = await waitForElement(() => getByText(/weather report/i));
  expect(titleElement).toBeInTheDocument();
});

test('Render inputs', async () => {
  const { getByText } = render(<App />);
  const selectElement = await waitForElement(() => getByText(/choose location/i));
  expect(selectElement).toBeInTheDocument();
});
