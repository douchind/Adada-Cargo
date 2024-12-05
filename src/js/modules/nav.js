/**
 * jQuery elements.
 */
const $header = $('.js-header');

/**
 * Handle nav trigger click event.
 *
 * @param {Event} event
 * @returns {void}
 */
const handleNavTriggerClick = (event) => {
	event.preventDefault();

	$header.toggleClass('menu-visible');
};

/**
 * Close dropdown on document click.
 *
 * @param {Event} event
 * @returns {void}
 */
const handleOutsideClick = (event) => {
	if ($(event.target).closest('.header').length === 0) {
		$header.removeClass('menu-visible');
	}
};

/**
 * Hide menu on desktop view
 *
 *  @returns {void}
 */
function hideMenuOnDesktop() {
	if ($(this).innerWidth() < 1023) {
		return;
	}

	$header.removeClass('menu-visible');
}

/**
 * Handle events.
 */
$(window).on('load resize', hideMenuOnDesktop);

$(document).on('click', handleOutsideClick);

$('.js-nav-trigger').on('click', handleNavTriggerClick);
