import { sendKeys, SendKeysPayload } from '@web/test-runner-commands';

const sticky = (stickyKey: string) => (...callbackOrPayloadArray: (SendKeysPayload | (() => Promise<void>))[]) => async () => {
	await sendKeys({ down: stickyKey });
	for (const key of callbackOrPayloadArray) {
		if (typeof key === 'function') {
			await key();
		}
		else {
			await sendKeys(key);
		}
	}
	await sendKeys({ up: stickyKey });
};

export const type = async (...callbackOrPayloadArray: (SendKeysPayload | (() => Promise<void>))[]) => {
	for (const key of callbackOrPayloadArray) {
		if (typeof key === 'function') {
			await key();
		}
		else {
			await sendKeys(key);
		}
	}
};

export const control = sticky('Control');
export const shift = sticky('Shift');
export const alt = sticky('Alt');
export const meta = sticky('Meta');
