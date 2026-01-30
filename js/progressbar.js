document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const progressBar = document.getElementById('progressBar');
    const progressLabel = document.getElementById('progressLabel');
    const finishedMsg = document.getElementById('finishedMsg');

    let interval = null;

    startBtn.addEventListener('click', () => {
        if (interval) return; // already running

        startBtn.setAttribute('disabled', true);
        finishedMsg.classList.add('is-hidden');
        let value = 0;
        progressBar.value = 0;
        progressLabel.innerText = "0%";
        progressBar.classList.remove('is-success');
        progressBar.classList.add('is-info');

        interval = setInterval(() => {
            value += 2; // increments by 2%
            if (value > 100) value = 100;

            progressBar.value = value;
            progressLabel.innerText = `${value}%`;

            if (value >= 100) {
                clearInterval(interval);
                interval = null;
                progressBar.classList.remove('is-info');
                progressBar.classList.add('is-success');
                finishedMsg.classList.remove('is-hidden');
                startBtn.removeAttribute('disabled');
            }
        }, 100); // updates every 100ms, total time ~5 seconds
    });

    stopBtn.addEventListener('click', () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
            startBtn.removeAttribute('disabled');
            progressLabel.innerText = `Stopped at ${progressBar.value}%`;
            progressBar.classList.add('is-danger');
            progressBar.classList.remove('is-info');
        }
    });
});
