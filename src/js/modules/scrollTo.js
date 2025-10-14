$('.js-skip').on('click', function (event) {
	if ($(this).is('a')) {
		event.preventDefault();
	}

	const targetData = $(this).data('target');
	const $target = $(`[data-target-element="${targetData}"]`);

	if ($target.length) {
		$('html, body').animate({ scrollTop: $target.offset().top }, 200);
	}
});
