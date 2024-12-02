$('.js-quantity').on('click', '.btn-increase', function (event) {
	event.preventDefault();

	const $countSpan = $(this).closest('.js-quantity').find('.checkbox__count');
	let count = parseInt($countSpan.text());
	count += 1;
	$countSpan.text(count);
});

$('.js-quantity').on('click', '.btn-decrease', function (event) {
	event.preventDefault();
	const $countSpan = $(this).closest('.js-quantity').find('.checkbox__count');
	let count = parseInt($countSpan.text());

	if (count === 0) {
		return;
	}

	count -= 1;
	$countSpan.text(count);
});
