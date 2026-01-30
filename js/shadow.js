document.addEventListener('DOMContentLoaded', () => {
    // Simple Shadow DOM
    const host = document.getElementById('shadow-host');
    const shadowRoot = host.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.style.padding = '20px';
    wrapper.style.backgroundColor = '#1e1e1e';
    wrapper.style.border = '1px solid #2c2c2c';
    wrapper.style.color = '#e0e0e0';
    wrapper.innerHTML = `
        <h4 style="margin-top:0;">I am in a Shadow Root</h4>
        <input type="text" placeholder="Input inside Shadow DOM" id="shadow-input">
        <button id="shadow-btn" style="background: #48c78e; color: white; border: none; padding: 5px 10px; cursor: pointer;">Click Me</button>
    `;

    shadowRoot.appendChild(wrapper);

    const btn = shadowRoot.getElementById('shadow-btn');
    btn.addEventListener('click', () => {
        btn.innerText = "Clicked!";
        btn.style.backgroundColor = "#3e8ed0";
    });

    // Nested Shadow DOM
    const complexHost = document.getElementById('complex-shadow-host');
    const complexRoot = complexHost.attachShadow({ mode: 'open' });

    const div = document.createElement('div');
    div.innerHTML = `<p style="color: #e0e0e0;">I am the first level shadow root.</p><div id="nested-host"></div>`;
    complexRoot.appendChild(div);

    const nestedHost = complexRoot.getElementById('nested-host');
    const nestedRoot = nestedHost.attachShadow({ mode: 'open' });
    nestedRoot.innerHTML = `
        <div style="border: 1px dotted #ff3860; padding: 10px; color: #e0e0e0;">
            <p>I am the nested shadow root!</p>
             <input type="checkbox" id="nested-check"> <label for="nested-check">Check me</label>
        </div>
    `;

});
