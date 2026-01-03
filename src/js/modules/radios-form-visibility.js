// Select the radio buttons and the element to toggle
const $noRadio = $('#radio-alt-1');
const $yesRadio = $('#radio-alt-2');
const $receiverCol = $('.form__col--receiver');

// When "No" is selected, remove the class
$noRadio.on('change', function () {
	if ($(this).is(':checked')) {
		$receiverCol.removeClass('is-active');
	}
});

// When "Yes" is selected, add the class
$yesRadio.on('change', function () {
	if ($(this).is(':checked')) {
		$receiverCol.addClass('is-active');
	}
});
