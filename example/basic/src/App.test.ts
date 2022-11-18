import { expect } from '@open-wc/testing';

describe('input field', () => {
  it('is filled', async () => {
    const { input } = await setup();
    input.value = 'Hi!';
    expect(input.value).to.equal('Hi!');
  });
});

const setup = async () => {
  const input = document.createElement('input');
  document.body.append(input);
  
  return {
    input,
  }
}
