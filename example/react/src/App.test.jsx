import * as React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import App from './App';

describe('<App>', () => {
  it('renders learn react link', async () => {
    const { getByText } = render(<App/>);
    const button = document.querySelector("[data-testid=button]");
    button.click()
    await Promise.resolve();
    expect(button.textContent).to.contain('1');
  });
});
