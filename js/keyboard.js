document.addEventListener('DOMContentLoaded', () => {

    // Keyboard Shortcut (Ctrl/Cmd + K)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault(); // prevent browser default
            const modal = document.getElementById('searchModal');
            modal.classList.add('is-active');
        }
    });

    // Modal Close
    const modal = document.getElementById('searchModal');
    const closeBtn = modal.querySelector('.modal-close');
    const bg = modal.querySelector('.modal-background');

    [closeBtn, bg].forEach(el => {
        el.addEventListener('click', () => {
            modal.classList.remove('is-active');
        });
    });

    // Clipboard Copy
    const copyBtn = document.getElementById('copyBtn');
    const copyInput = document.getElementById('copyInput');
    const copyMsg = document.getElementById('copyMsg');

    copyBtn.addEventListener('click', () => {
        // Use modern Clipboard API
        if (navigator.clipboard) {
            navigator.clipboard.writeText(copyInput.value).then(() => {
                copyMsg.classList.remove('is-hidden');
                setTimeout(() => copyMsg.classList.add('is-hidden'), 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                alert("Failed to copy. Clipboard permission denied/not available.");
            });
        } else {
            // Fallback
            copyInput.select();
            document.execCommand('copy');
            copyMsg.innerText = "Copied (Fallback)";
            copyMsg.classList.remove('is-hidden');
            setTimeout(() => copyMsg.classList.add('is-hidden'), 2000);
        }
    });
});
