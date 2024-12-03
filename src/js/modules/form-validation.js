$('.js-form form').on('submit', function (event) {
	let isValid = true;
	const $form = $(this).closest('form');

	$form.find('[data-validate]').each(function(index, el) {
		const $this = $(el);
		const type = $this[0].type;


		if(type === 'checkbox') {
			const $parent = $this.closest('.checkbox-alt');

			if ($this[0].checked) {
				$parent.removeClass('is-error');
				return;
			}

			$parent.addClass('is-error');
		}

		if(type === 'text') {
			const $parent = $this.closest('.form__controls');
			console.log($this[0].value);


			if ($this[0].value === '') {
				$parent.addClass('is-error');
				return;
			}

			$parent.removeClass('is-error');
		}
	})

	isValid = $form.find('.is-error').length === 0 ? true : false;

	if (!isValid) {
		event.preventDefault();
	}

});
