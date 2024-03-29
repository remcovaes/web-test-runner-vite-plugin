import { expect } from '@open-wc/testing';

describe('binary file', () => {
	it('can be fetched as a proper array buffer', async () => {
		const { buffer } = await setup();
		expect(buffer.byteLength).to.equal(8);
		
		for (const i of buffer) {
			expect(i).to.equal(0xff);
		}
	});
});

const setup = async () => {
	const url = new URL('./binary.bin', import.meta.url);
	const res = await fetch(url);
	const buffer = new Uint8Array(await res.arrayBuffer());
	
	return {
		buffer
	};
}
