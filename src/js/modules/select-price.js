function handleCustomSelectPrice($select) {
	$select.each((idx, select) => {
		const $customSelect = $(select);
		const targetSelect = $customSelect.find('select');

		targetSelect.select2({
			placeholder: 'Select a duration',
			allowClear: true,
			dropdownParent: $customSelect,

			templateResult: formatOption,
			templateSelection: formatSelected,
		});
	});
}

function formatOption(option) {
	if (!option.id) return option.text;

	const time = $(option.element).data('time');
	const price = $(option.element).data('price');

	return $(`
	<div class="select-option">
	  <span class="select-option__time">${time}</span>
	  <span class="select-option__price">${price}</span>
	</div>
  `);
}

function formatSelected(option) {
	if (!option.id) return option.text;

	const time = $(option.element).data('time');
	const price = $(option.element).data('price');

	return `${time} – ${price}`;
}

handleCustomSelectPrice($('.js-select-custom-price'));
