import { captionForDate } from '#lib/captions.js';

export function load() {
	return {
		caption: captionForDate(new Date())
	};
}
