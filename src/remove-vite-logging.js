const ignoredBrowserLogs = [
	'[vite] connecting...',
	'[vite] connected.',
];

export const removeViteLogging = ({ args }) => !args.some((arg) => ignoredBrowserLogs.includes(arg));
