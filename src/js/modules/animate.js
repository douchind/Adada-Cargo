/**
 * Internal dependencies.
 */
import { observer } from './observer';

// Handle window load event.
$(window).on('load', () => {
	$('.js-animate').each((index, element) => {
		observer.observe(element);
	});
});
