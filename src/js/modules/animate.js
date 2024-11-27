/**
 * Internal dependencies.
 */
import { observer } from './observer';

// Handle window load event.
$(window).on('load', () => {
	setTimeout(() => {
		$('.js-animate').each((index, element) => {
			observer.observe(element);
		});
	}, 500);
});
