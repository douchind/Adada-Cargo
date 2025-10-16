/**
 * Handle phone field input event with automatic formatting.
 */

// Country code mapping with formats
const countryFormats = {
	tr: { code: '+90', format: 'XXX XXX XX XX', placeholder: '50X XXX XX XX' },
	bg: { code: '+359', format: 'XXX XXX XXX', placeholder: 'XXX XXX XXX' },
	us: { code: '+1', format: '(XXX) XXX-XXXX', placeholder: '(XXX) XXX-XXXX' },
};

// Format phone number based on country
function formatPhoneNumber(value, countryCode) {
	const format = countryFormats[countryCode];
	if (!format) return value;

	// Remove all non-digit characters
	const digits = value.replace(/\D/g, '');
	let phoneDigits = digits;

	// Apply formatting based on country
	let formatted = '';
	let digitIndex = 0;

	for (let i = 0; i < format.format.length && digitIndex < phoneDigits.length; i++) {
		if (format.format[i] === 'X') {
			formatted += phoneDigits[digitIndex];
			digitIndex++;
		} else {
			formatted += format.format[i];
		}
	}

	return formatted;
}

// Handle phone input formatting
$('.js-phone-field').on('input', function (e) {
	const $input = $(this);
	const $flagsSelect = $input.siblings('.js-custom-flags').find('select');
	const selectedCountry = $flagsSelect.val() || 'tr';
	const currentValue = e.target.value;

	// Format the input
	const formatted = formatPhoneNumber(currentValue, selectedCountry);
	e.target.value = formatted;

	// Update placeholder based on selected country
	const format = countryFormats[selectedCountry];
	if (format) {
		e.target.placeholder = format.placeholder;
	}
});

// Handle country flag selection change
$('.js-custom-flags select').on('change', function () {
	const $select = $(this);
	const $phoneInput = $select.closest('.form__controls').find('.js-phone-field');
	const selectedCountry = $select.val();

	// Update placeholder
	const format = countryFormats[selectedCountry];
	if (format) {
		$phoneInput.attr('placeholder', format.placeholder);
	}

	// Reformat existing input if any
	const currentValue = $phoneInput.val();
	if (currentValue) {
		const formatted = formatPhoneNumber(currentValue, selectedCountry);
		$phoneInput.val(formatted);
	}
});

// Initialize placeholder on page load
$(document).ready(function () {
	$('.js-phone-field').each(function () {
		const $input = $(this);
		const $flagsSelect = $input.siblings('.js-custom-flags').find('select');
		const selectedCountry = $flagsSelect.val() || 'tr';
		const format = countryFormats[selectedCountry];

		if (format) {
			$input.attr('placeholder', format.placeholder);
		}
	});
});
