document.addEventListener('DOMContentLoaded', () => {

    const statusCode = document.getElementById('statusCode');
    const jsonOutput = document.getElementById('jsonOutput');

    function updateUI(status, data, loading = false) {
        if (loading) {
            statusCode.innerText = "Loading...";
            jsonOutput.innerText = "Fetching data...";
            return;
        }

        statusCode.innerText = status;
        if (status >= 200 && status < 300) {
            statusCode.className = "has-text-success";
        } else {
            statusCode.className = "has-text-danger";
        }
        jsonOutput.innerText = JSON.stringify(data, null, 2);
    }

    // Get User
    document.getElementById('getUserBtn').addEventListener('click', () => {
        updateUI(0, {}, true);
        setTimeout(() => {
            const mockUser = {
                id: 101,
                username: "j.doe",
                email: "j.doe@example.com",
                roles: ["admin", "editor"]
            };
            updateUI(200, mockUser);
        }, 800);
    });

    // 404
    document.getElementById('get404Btn').addEventListener('click', () => {
        updateUI(0, {}, true);
        setTimeout(() => {
            updateUI(404, { error: "Resource not found" });
        }, 600);
    });

    // POST
    document.getElementById('postBtn').addEventListener('click', () => {
        updateUI(0, {}, true);
        setTimeout(() => {
            updateUI(201, { message: "Data created successfully", id: 999 });
        }, 1200);
    });

    // Slow
    document.getElementById('slowBtn').addEventListener('click', () => {
        updateUI(0, {}, true);
        const btn = document.getElementById('slowBtn');
        btn.classList.add('is-loading');

        setTimeout(() => {
            btn.classList.remove('is-loading');
            updateUI(200, { message: "Slow request finished!" });
        }, 5000);
    });

});
