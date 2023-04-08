import { config } from './config.js';
import { timeoutProvider } from './timeoutProvider.js';

export function reportUnhandledError(err) {
	timeoutProvider.setTimeout(() => {
		const { onUnhandledError } = config;
		if (onUnhandledError) {
			onUnhandledError(err);
		} else {
			throw err;
		}
	});
}
