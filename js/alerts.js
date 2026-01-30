document.addEventListener('DOMContentLoaded', () => {

    // Native Alerts
    const nativeResult = document.getElementById('nativeResult');

    document.getElementById('alertBtn').addEventListener('click', () => {
        alert("I am a simple alert!");
        nativeResult.innerText = "Alert OK";
    });

    document.getElementById('confirmBtn').addEventListener('click', () => {
        const result = confirm("Are you sure?");
        nativeResult.innerText = result ? "Confirmed" : "Cancelled";
    });

    document.getElementById('promptBtn').addEventListener('click', () => {
        const name = prompt("What is your name?");
        if (name !== null) {
            nativeResult.innerText = `Hello, ${name}!`;
        } else {
            nativeResult.innerText = "Prompt Cancelled";
        }
    });

    // Delayed Alert
    document.getElementById('delayedAlertBtn').addEventListener('click', () => {
        setTimeout(() => {
            alert("I appeared after 3 seconds!");
        }, 3000);
    });


    // Custom Modal
    const modalBtn = document.getElementById('modalBtn');
    const modal = document.getElementById('myModal');
    const modalClose = modal.querySelectorAll('.delete, .button');
    const background = modal.querySelector('.modal-background');

    function openModal() {
        modal.classList.add('is-active');
    }

    function closeModal() {
        modal.classList.remove('is-active');
    }

    modalBtn.addEventListener('click', openModal);
    background.addEventListener('click', closeModal);

    modalClose.forEach(el => {
        el.addEventListener('click', closeModal);
    });
});
