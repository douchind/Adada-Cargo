$('.js-form form').on('submit', function (event) {
	let isValid = true;

	const $form = $(this).closest('form');
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	$form.find('[data-validate]').each(function (index, el) {
		const $this = $(el);
		const type = $this[0].type;

		if (type === 'checkbox') {
			const $parent = $this.closest('.checkbox-alt');

			if ($this[0].checked) {
				$parent.removeClass('is-error');
				return;
			}

			$parent.addClass('is-error');
		}

		if (type === 'text') {
			const $parent = $this.closest('.form__controls');

			if ($this[0].value === '') {
				$parent.addClass('is-error');
				return;
			}

			$parent.removeClass('is-error');
		}

		if (type === 'password') {
			const $parent = $this.closest('.form__controls');

			if ($this[0].value === '') {
				$parent.addClass('is-error');
				return;
			}

			$parent.removeClass('is-error');
		}

		if ($this[0].tagName.toLowerCase() === 'textarea') {
			const $parent = $this.closest('.form__controls');

			if ($this[0].value === '') {
				$parent.addClass('is-error');
				return;
			}

			$parent.removeClass('is-error');
		}

		if (type === 'email') {
			const $parent = $this.closest('.form__controls');
			const emailValue = $this[0].value.trim();

			if (!emailRegex.test(emailValue)) {
				$parent.addClass('is-error'); // Add error class for invalid emails
				return;
			}

			$parent.removeClass('is-error');
		}
	});

	isValid = $form.find('.is-error').length === 0 ? true : false;

	if (!isValid) {
		event.preventDefault();
	}
});
