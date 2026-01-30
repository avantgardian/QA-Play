document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const registerBtn = document.getElementById('registerBtn');
    const registerSuccess = document.getElementById('registerSuccess');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Browser handles most validation due to 'required' attributes and types
        // But we add a delay to simulate processing

        registerBtn.classList.add('is-loading');

        setTimeout(() => {
            registerBtn.classList.remove('is-loading');
            registerSuccess.classList.remove('is-hidden');
            registerForm.reset();
        }, 1500);
    });
});
