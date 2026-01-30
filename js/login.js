document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');

    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const loginError = document.getElementById('loginError');
    const loginSuccess = document.getElementById('loginSuccess');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reset state
        usernameInput.classList.remove('is-danger');
        passwordInput.classList.remove('is-danger');
        usernameError.classList.add('is-hidden');
        passwordError.classList.add('is-hidden');
        loginError.classList.add('is-hidden');
        loginSuccess.classList.add('is-hidden');

        let isValid = true;

        if (!usernameInput.value.trim()) {
            usernameInput.classList.add('is-danger');
            usernameError.classList.remove('is-hidden');
            isValid = false;
        }

        if (!passwordInput.value.trim()) {
            passwordInput.classList.add('is-danger');
            passwordError.classList.remove('is-hidden');
            isValid = false;
        }

        if (isValid) {
            // Simulate API call
            loginBtn.classList.add('is-loading');

            setTimeout(() => {
                loginBtn.classList.remove('is-loading');

                if (usernameInput.value === 'admin' && passwordInput.value === 'admin123') {
                    loginSuccess.classList.remove('is-hidden');
                    // Optional: redirect logic
                    // window.location.href = '../index.html'; 
                } else {
                    loginError.classList.remove('is-hidden');
                }
            }, 1000);
        }
    });
});
