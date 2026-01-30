document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('dynamic-btn-placeholder');
    const successMsg = document.getElementById('dynamicSuccess');

    // Generate random ID
    const randomId = 'btn-' + Math.random().toString(36).substr(2, 9);
    btn.id = randomId;

    // Log for debugging (but automation shouldn't rely on console)
    console.log(`Dynamic Button ID is: ${randomId}`);

    btn.addEventListener('click', () => {
        successMsg.classList.remove('is-hidden');
    });
});
