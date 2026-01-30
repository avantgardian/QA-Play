document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('validationForm');
    const inputMax = document.getElementById('inputMax');
    const charCount = document.getElementById('charCount');
    const countrySelect = document.getElementById('countrySelect');
    const countryError = document.getElementById('countryError');
    const notes = document.getElementById('notes');
    const notesError = document.getElementById('notesError');

    // Max Length Counter
    inputMax.addEventListener('input', () => {
        const remaining = 10 - inputMax.value.length;
        charCount.innerText = remaining;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Country Validation
        if (!countrySelect.value) {
            countrySelect.parentElement.classList.add('is-danger');
            countryError.classList.remove('is-hidden');
            isValid = false;
        } else {
            countrySelect.parentElement.classList.remove('is-danger');
            countryError.classList.add('is-hidden');
        }

        // Notes Validation (Alphanumeric)
        const notesValue = notes.value;
        const alphanumericRegex = /^[a-z0-9\s]+$/i;

        if (notesValue && !alphanumericRegex.test(notesValue)) {
            notes.classList.add('is-danger');
            notesError.classList.remove('is-hidden');
            isValid = false;
        } else {
            notes.classList.remove('is-danger');
            notesError.classList.add('is-hidden');
        }

        if (isValid) {
            alert("Form submitted successfully!");
        }
    });
});
