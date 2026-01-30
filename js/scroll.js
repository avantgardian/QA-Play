document.addEventListener('DOMContentLoaded', () => {
    const scrollZone = document.getElementById('scrollZone');
    const itemCountLabel = document.getElementById('itemCount');
    let count = 0;

    function addItems(amount) {
        for (let i = 0; i < amount; i++) {
            count++;
            const div = document.createElement('div');
            div.className = 'content-box';
            div.innerText = `Item #${count}`;
            scrollZone.appendChild(div);
        }
        itemCountLabel.innerText = `Items: ${count}`;
    }

    // Initial load
    addItems(5);

    scrollZone.addEventListener('scroll', () => {
        if (scrollZone.scrollTop + scrollZone.clientHeight >= scrollZone.scrollHeight - 10) {
            // Scrolled to bottom, load more
            // Add a small delay to simulate network
            setTimeout(() => {
                addItems(3);
            }, 500);
        }
    });

    const targetBtn = document.getElementById('targetBtn');
    targetBtn.addEventListener('click', () => {
        alert("You clicked the hidden target!");
    });
});
