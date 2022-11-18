import { sendMouse } from '@web/test-runner-commands';

export const clickOnCenterOf = async (element: Element) => {
	const { left, top, width, height } = element.getBoundingClientRect();
	
	await sendMouse({ type: 'click', position: [ Math.floor(left + width / 2), Math.floor(top + height / 2) ] });
};
