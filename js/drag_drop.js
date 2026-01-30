document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable-item');
    const containers = [document.getElementById('source'), document.getElementById('target')];
    const dropSuccess = document.getElementById('dropSuccess');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('is-dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('is-dragging');
        });
    });

    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
            container.classList.add('hovered');
            const afterElement = getDragAfterElement(container, e.clientY);
            const draggable = document.querySelector('.is-dragging');
            if (afterElement == null) {
                container.appendChild(draggable);
            } else {
                container.insertBefore(draggable, afterElement);
            }
        });

        container.addEventListener('dragleave', () => {
            container.classList.remove('hovered');
        });

        container.addEventListener('drop', () => {
            container.classList.remove('hovered');
            if (container.id === 'target') {
                dropSuccess.classList.remove('is-hidden');
                setTimeout(() => dropSuccess.classList.add('is-hidden'), 2000);
            }
        });
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable-item:not(.is-dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});
