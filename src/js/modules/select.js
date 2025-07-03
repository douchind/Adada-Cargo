function handleSelect($select) {
	const $selectTarget = $select.find('select');
	const $input = $select.find('input');

	$selectTarget.on('change', function () {
		if ($(this).val() === 'other') {
			$input.show();
		} else {
			$input.hide().val('');
		}
	});
}

handleSelect($('.js-select'));
