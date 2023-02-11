import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders learn react link', () => {
  const { getByLabelText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByLabelText(/cloverfield/i)).toBeInTheDocument();
});
