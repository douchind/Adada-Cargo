/**
 * Select 2 Plugin
 */

/**
 * handleCustomSelect
 */
function handleCustomSelect($select) {
	$select.each((idx, select) => {
		const $customSelect = $(select);
		const targetSelect = $customSelect.find('select');

		targetSelect.select2({
			placeholder: 'Select a location',
			allowClear: true,
			dropdownParent: $customSelect,
		});
	});
}

handleCustomSelect($('.js-select-custom'));
