$('.js-quantity').on('click', '.btn-increase', function (event) {
	event.preventDefault();

	const $input = $(this).closest('.checkbox').find('input');
	const $countSpan = $(this).closest('.js-quantity').find('.checkbox__count');
	let count = parseInt($countSpan.text());
	count += 1;
	$countSpan.text(count);
	$input.attr('checked', true);
});

$('.js-quantity').on('click', '.btn-decrease', function (event) {
	event.preventDefault();
	const $input = $(this).closest('.checkbox').find('input')
	const $countSpan = $(this).closest('.js-quantity').find('.checkbox__count');
	let count = parseInt($countSpan.text());

	if (count === 0) {
		return;
	}

	count -= 1;
	$countSpan.text(count);

	if (count === 0) {
		$input.attr('checked', false);
		return;
	}
});

$('.checkbox').on('click', 'label', function(event) {
	event.preventDefault();

	let isClicked = true;
	$(this).siblings('input').attr('checked', isClicked);

	isClicked = !isClicked
})
