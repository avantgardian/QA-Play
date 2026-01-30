document.addEventListener('DOMContentLoaded', () => {
    const geoBtn = document.getElementById('geoBtn');
    const latValue = document.getElementById('latValue');
    const longValue = document.getElementById('longValue');

    geoBtn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        geoBtn.classList.add('is-loading');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                geoBtn.classList.remove('is-loading');
                latValue.innerText = position.coords.latitude;
                longValue.innerText = position.coords.longitude;
            },
            () => {
                geoBtn.classList.remove('is-loading');
                alert("Unable to retrieve your location. Check permissions.");
            }
        );
    });
});
