document.addEventListener('DOMContentLoaded', () => {
    // === Upload Logic ===
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadText = document.getElementById('uploadText');
    const uploadSuccess = document.getElementById('uploadSuccess');
    const uploadedFileName = document.getElementById('uploadedFileName');

    let selectedFile = null;

    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFileSelect(e.target.files[0]);
        }
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropZone.classList.add('is-active');
    }

    function unhighlight(e) {
        dropZone.classList.remove('is-active');
    }

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFileSelect(files[0]);
    });

    function handleFileSelect(file) {
        selectedFile = file;
        uploadText.innerText = `Selected: ${file.name}`;
        uploadBtn.removeAttribute('disabled');
        uploadSuccess.classList.add('is-hidden');
    }

    uploadBtn.addEventListener('click', () => {
        if (selectedFile) {
            uploadBtn.classList.add('is-loading');

            // Simulate network delay
            setTimeout(() => {
                uploadBtn.classList.remove('is-loading');
                uploadedFileName.innerText = selectedFile.name;
                uploadSuccess.classList.remove('is-hidden');

                // Reset
                selectedFile = null;
                uploadText.innerText = "Drag file here or click to browse";
                uploadBtn.setAttribute('disabled', true);
            }, 1000);
        }
    });


    // === Download Logic ===
    const downloadBtn = document.getElementById('downloadBtn');
    const fileContent = document.getElementById('fileContent');

    downloadBtn.addEventListener('click', () => {
        const text = fileContent.value || "Default content from QAPlay.";
        const blob = new Blob([text], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.style.display = 'none';
        a.href = url;
        a.download = 'qaplay_sample.txt';

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
    });
});
