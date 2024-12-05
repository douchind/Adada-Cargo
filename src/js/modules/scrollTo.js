/**
 * Handle skip btn click event.
 */
$('.js-skip').on('click', function(event) {
	event.preventDefault();

	const targetData = $(this).data('target');
	const $target = $(`[data-target-element=${targetData}]`)

	$('html, body').animate({scrollTop: $target.offset().top}, 0)
})
