const employees = [
    { id: 1, name: "Tiger Nixon", position: "System Architect", office: "Edinburgh", salary: "$320,800" },
    { id: 2, name: "Garrett Winters", position: "Accountant", office: "Tokyo", salary: "$170,750" },
    { id: 3, name: "Ashton Cox", position: "Junior Technical Author", office: "San Francisco", salary: "$86,000" },
    { id: 4, name: "Cedric Kelly", position: "Senior Javascript Developer", office: "Edinburgh", salary: "$433,060" },
    { id: 5, name: "Airi Satou", position: "Accountant", office: "Tokyo", salary: "$162,700" },
    { id: 6, name: "Brielle Williamson", position: "Integration Specialist", office: "New York", salary: "$372,000" },
    { id: 7, name: "Herrod Chandler", position: "Sales Assistant", office: "San Francisco", salary: "$137,500" },
    { id: 8, name: "Rhona Davidson", position: "Integration Specialist", office: "Tokyo", salary: "$327,900" },
    { id: 9, name: "Colleen Hurst", position: "Javascript Developer", office: "San Francisco", salary: "$205,500" },
    { id: 10, name: "Sonya Frost", position: "Software Engineer", office: "Edinburgh", salary: "$103,600" },
    { id: 11, name: "Jena Gaines", position: "Office Manager", office: "London", salary: "$90,560" },
    { id: 12, name: "Quinn Flynn", position: "Support Lead", office: "Edinburgh", salary: "$342,000" },
    { id: 13, name: "Charde Marshall", position: "Regional Director", office: "San Francisco", salary: "$470,600" },
    { id: 14, name: "Haley Kennedy", position: "Senior Marketing Designer", office: "London", salary: "$313,500" },
    { id: 15, name: "Tatyana Fitzpatrick", position: "Regional Director", office: "London", salary: "$385,750" },
    { id: 16, name: "Michael Silva", position: "Marketing Designer", office: "London", salary: "$198,500" },
    { id: 17, name: "Paul Byrd", position: "Chief Financial Officer (CFO)", office: "New York", salary: "$725,000" },
    { id: 18, name: "Gloria Little", position: "Systems Administrator", office: "New York", salary: "$237,500" },
    { id: 19, name: "Bradley Greer", position: "Software Engineer", office: "London", salary: "$132,000" },
    { id: 20, name: "Dai Rios", position: "Personnel Lead", office: "Edinburgh", salary: "$217,500" },
    { id: 21, name: "Jenette Caldwell", position: "Development Lead", office: "New York", salary: "$345,000" },
    { id: 22, name: "Yuri Berry", position: "Chief Marketing Officer (CMO)", office: "New York", salary: "$675,000" },
    { id: 23, name: "Caesar Vance", position: "Pre-Sales Support", office: "New York", salary: "$106,450" },
    { id: 24, name: "Doris Wilder", position: "Sales Assistant", office: "Sidney", salary: "$85,600" },
];

let state = {
    'querySet': employees,
    'page': 1,
    'rows': 5,
    'window': 5,
    'sortColumn': null,
    'sortOrder': 'asc'
}

function buildTable() {
    const table = document.getElementById('tableBody');
    table.innerHTML = '';

    // Sort logic
    if (state.sortColumn) {
        state.querySet.sort((a, b) => {
            let valA = a[state.sortColumn];
            let valB = b[state.sortColumn];

            // Simple string/number comparison
            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();

            // Handle salary string with $ and ,
            if (state.sortColumn === 'salary') {
                valA = Number(a[state.sortColumn].replace(/[^0-9.-]+/g, ""));
                valB = Number(b[state.sortColumn].replace(/[^0-9.-]+/g, ""));
            }

            if (valA < valB) return state.sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return state.sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }

    const data = pagination(state.querySet, state.page, state.rows);
    const myList = data.querySet;

    for (let i in myList) {
        const row = `<tr>
            <td>${myList[i].id}</td>
            <td>${myList[i].name}</td>
            <td>${myList[i].position}</td>
            <td>${myList[i].office}</td>
            <td>${myList[i].salary}</td>
        </tr>`;
        table.innerHTML += row;
    }

    pageButtons(data.pages);
}

function pagination(querySet, page, rows) {
    const trimStart = (page - 1) * rows;
    const trimEnd = trimStart + rows;
    const trimmedData = querySet.slice(trimStart, trimEnd);
    const pages = Math.ceil(querySet.length / rows);
    return {
        'querySet': trimmedData,
        'pages': pages,
    };
}

function pageButtons(pages) {
    const wrapper = document.getElementById('paginationList');
    wrapper.innerHTML = '';

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (state.page === 1) {
        prevBtn.setAttribute('disabled', true);
    } else {
        prevBtn.removeAttribute('disabled');
        prevBtn.onclick = () => { state.page--; buildTable() };
    }

    if (state.page === pages) {
        nextBtn.setAttribute('disabled', true);
    } else {
        nextBtn.removeAttribute('disabled');
        nextBtn.onclick = () => { state.page++; buildTable() };
    }

    let maxLeft = (state.page - Math.floor(state.window / 2));
    let maxRight = (state.page + Math.floor(state.window / 2));

    if (maxLeft < 1) {
        maxLeft = 1;
        maxRight = state.window;
    }

    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1);

        if (maxLeft < 1) {
            maxLeft = 1;
        }
        maxRight = pages;
    }

    for (let page = maxLeft; page <= maxRight; page++) {
        let li = document.createElement('li');
        let button = document.createElement('a');
        button.classList.add('pagination-link');
        if (state.page === page) button.classList.add('is-current');
        button.innerText = page;
        button.addEventListener('click', () => {
            state.page = page;
            buildTable();
        });
        li.appendChild(button);
        wrapper.appendChild(li);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    buildTable();

    // Search
    document.getElementById('searchBtn').addEventListener('click', () => {
        const value = document.getElementById('searchInput').value.toLowerCase();
        state.querySet = employees.filter(e =>
            e.name.toLowerCase().includes(value) ||
            e.position.toLowerCase().includes(value) ||
            e.office.toLowerCase().includes(value)
        );
        state.page = 1;
        buildTable();
    });

    // Sort handlers
    document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', () => {
            const column = header.dataset.sort;
            if (state.sortColumn === column) {
                state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                state.sortColumn = column;
                state.sortOrder = 'asc';
            }
            buildTable();
        });
    });
});
