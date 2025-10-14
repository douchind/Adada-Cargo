/**
 * Handle Custom Flags
 * @param {JQURY} $customFlags
 * @returns {Void}
 */
function handleCustomFlags($customFlags) {
	$customFlags.each((idx, customFlag) => {
		const $customFlag = $(customFlag);
		const $targetSelect = $customFlag.find('select');

		$targetSelect.select2({
			templateResult: formatCountry,
			templateSelection: formatCountry,
			dropdownParent: $customFlags,
			minimumResultsForSearch: -1,
		});
	});
}

/**
 * formatCountry
 * @param {*} state
 * @returns {Node}
 */
function formatCountry(state) {
	if (!state.id) return state.text;

	const flag = $(state.element).data('flag');
	let imgUrl;

	if (flag === 'trnc') {
		imgUrl = 'assets/images/svg/trnc.png';
	} else {
		imgUrl = `https://flagcdn.com/${flag}.svg`;
	}

	return $(`
		<span style="margin-top: 3px; display: inline-block;">
			<img src="${imgUrl}" width="28" style="display: inline-block; margin-top: -5px;" />
			${state.text}
		</span>
	`);
}

handleCustomFlags($('.js-custom-flags'));
