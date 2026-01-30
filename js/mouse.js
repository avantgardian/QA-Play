document.addEventListener('DOMContentLoaded', () => {

    // Hover
    const hoverBtn = document.getElementById('hoverBtn');
    const hoverMsg = document.getElementById('hoverMsg');

    hoverBtn.addEventListener('mouseenter', () => {
        hoverMsg.classList.remove('is-hidden');
    });

    hoverBtn.addEventListener('mouseleave', () => {
        hoverMsg.classList.add('is-hidden');
    });

    // Right Click (Context Menu)
    const contextZone = document.getElementById('contextZone');
    const contextMenu = document.getElementById('contextMenu');

    contextZone.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        contextMenu.classList.add('is-active');
        contextZone.style.backgroundColor = '#effaf5';
        contextZone.innerText = "Context Menu Triggered";
    });

    document.addEventListener('click', (e) => {
        // Close context menu on click elsewhere
        if (!contextZone.contains(e.target)) {
            contextMenu.classList.remove('is-active');
            contextZone.style.backgroundColor = '';
            contextZone.innerText = "Right-click here";
        }
    });


    // Double Click
    const dblClickZone = document.getElementById('dblClickZone');
    const dblClickMsg = document.getElementById('dblClickMsg');

    dblClickZone.addEventListener('dblclick', () => {
        dblClickZone.classList.add('has-background-warning');
        dblClickMsg.innerText = "Double Clicked!";
        setTimeout(() => {
            dblClickZone.classList.remove('has-background-warning');
            dblClickMsg.innerText = "";
        }, 1500);
    });

    // Click & Hold
    const clickHoldZone = document.getElementById('clickHoldZone');
    const holdTimeDisplay = document.getElementById('holdTime');
    let startTime, timerInterval;

    clickHoldZone.addEventListener('mousedown', () => {
        startTime = new Date().getTime();
        clickHoldZone.classList.add('has-background-danger');
        clickHoldZone.classList.add('has-text-white');

        timerInterval = setInterval(() => {
            const current = new Date().getTime();
            holdTimeDisplay.innerText = current - startTime;
        }, 10);
    });

    const endHold = () => {
        if (startTime) {
            clearInterval(timerInterval);
            clickHoldZone.classList.remove('has-background-danger');
            clickHoldZone.classList.remove('has-text-white');
            startTime = null;
        }
    }

    clickHoldZone.addEventListener('mouseup', endHold);
    clickHoldZone.addEventListener('mouseleave', endHold);

});
