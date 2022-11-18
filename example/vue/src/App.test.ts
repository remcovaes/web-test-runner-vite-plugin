import { render } from '@testing-library/vue';
import { expect } from '@open-wc/testing';
import App from './App.vue';

import { control, type, clickOnCenterOf } from '../util';

export const sleep = (millis: number) => new Promise<void>(resolve => setTimeout(resolve, millis));

describe('input field', () => {
  it('is filled', async () => {
    const { input } = await setup();
    
    await clickOnCenterOf(input)
    await type(control({ press: 'a' }));
    await type({ press: 'Delete' });
    await type({ type: 'Hi!' });
    
    expect(input.value).to.equal('Hi!');
  });
});

const setup = async () => {
  render(App);
  await sleep(100);
  
  const input = document.querySelector('input');
  if (!input) {
    throw new Error('no input field found');
  }
  
  return {
    input,
  }
}
