// Select the radio buttons and the element to toggle
const yesRadio = document.getElementById('radio-alt-1');
const noRadio = document.getElementById('radio-alt-2');
const receiverCol = document.querySelector('.form__col--receiver');

// Listen for changes
noRadio.addEventListener('change', () => {
	receiverCol.classList.add('is-active');
});

yesRadio.addEventListener('change', () => {
	receiverCol.classList.remove('is-active');
});
