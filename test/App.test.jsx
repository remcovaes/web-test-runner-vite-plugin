import * as React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import App from './App';

describe('<App>', () => {
  it('works when adding the plugin via the @web/test-runner config', async () => {
    render(<App/>);
    const button = document.querySelector("[data-testid=button]");
    button.click()
    await Promise.resolve();
    expect(button.textContent).to.contain('1');
  });
  it('loads a CSS link tag', async () => {
    render(
      <div>
        <link href="./test/style.css" rel="stylesheet" />
        <div data-testid="css-example"></div>
      </div>
    );

    // wait for stylesheet to load
    let style = document.querySelector("link[rel='stylesheet']");
    await new Promise((resolve, reject) => {
      // stylesheet already loaded
      if(style.sheet) {
        resolve();
        return;
      }
      style.onload = () => resolve();
      style.onerror = () => reject(new Error('Failed to load stylesheet'));
    });

    const div = document.querySelector("[data-testid='css-example']");    
    expect(getComputedStyle(div).borderWidth).to.eq("2px");
  });
});
