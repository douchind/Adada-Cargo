/**
 * Handle phone field input event.
 */
$('.js-phone-field').on('input', function (e) {
	const value = e.target.value;

	if (value.length < 4) {
		e.target.value = `+90 `;
	}

	if (value.includes('+90')) {
		return;
	}

	e.target.value = `+90 ${value}`;
});
