/**
 * observer callback.
 *
 * @param {node list} entries
 * @returns {Void}
 */
const observerCallback = (entries) => {
	entries.forEach((entry) => {
		const isVisible = entry.isIntersecting;

		if (isVisible) {
			entry.target.classList.add('is-visible');
		}
	});
};

export const observer = new IntersectionObserver(observerCallback, {
	rootMargin: '-30%',
});
