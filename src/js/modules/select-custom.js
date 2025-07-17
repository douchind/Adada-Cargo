/**
 * Select 2 Plugin
 */

/**
 * handleCustomSelect
 */
// function handleCustomSelect($select) {
// 	$select.each((idx, select) => {
// 		const $customSelect = $(select);
// 		const targetSelect = $customSelect.find('select');

// 		targetSelect.select2({
// 			placeholder: 'Select a location',
// 			allowClear: true,
// 			dropdownParent: $customSelect,
// 		});
// 	});
// }

function handleCustomSelect($select) {
	$select.each((idx, select) => {
		const $customSelect = $(select);
		const targetSelect = $customSelect.find('select');

		targetSelect.select2({
			placeholder: 'Select a location',
			allowClear: true,
			dropdownParent: $customSelect,

			templateResult: function (data) {
				if (data.loading) return data.text;

				if (data.element && data.element.parentElement && data.element.parentElement.label) {
					data.parentText = data.element.parentElement.label;
				}

				return data.text;
			},

			matcher: function (params, data) {
				if ($.trim(params.term) === '') return data;

				if (!data.children) {
					if (
						data.text.toLowerCase().includes(params.term.toLowerCase()) ||
						(data.parentText && data.parentText.toLowerCase().includes(params.term.toLowerCase()))
					) {
						return data;
					}
					return null;
				}

				const matchedChildren = [];

				for (let i = 0; i < data.children.length; i++) {
					const child = data.children[i];

					if (
						child.text.toLowerCase().includes(params.term.toLowerCase()) ||
						(data.text && data.text.toLowerCase().includes(params.term.toLowerCase()))
					) {
						matchedChildren.push(child);
					}
				}

				if (matchedChildren.length > 0) {
					return $.extend({}, data, { children: matchedChildren });
				}

				return null;
			},
		});
	});
}

handleCustomSelect($('.js-select-custom'));
