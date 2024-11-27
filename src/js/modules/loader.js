/**
 * Handel window load event.
 */
$(window).on('load', () => {
	const $loadingWrapper = $('.js-loading-wrapper');
	$loadingWrapper.addClass('page-loaded');

	setTimeout(() => {
		$loadingWrapper.addClass('hidden');
	}, 300);
});
