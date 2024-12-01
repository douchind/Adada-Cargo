/**
 * Handle accordion trigger click event.
 */
$('.js-accordion .accordion__head').on('click', function (e) {
	$(this).closest('.accordion__section').toggleClass('is-open').siblings().removeClass('is-open');

	e.preventDefault();
});
