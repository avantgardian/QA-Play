/**
 * Main JavaScript file for QA Automation Playground
 * Handles shared logic like navigation menu toggling and dynamic component injection
 */

document.addEventListener('DOMContentLoaded', () => {
    injectNavbar();
    injectFooter();
    initNavbarBurger();
});

function getRootPath() {
    // Determine if we are in a subdirectory (like /pages/)
    // This is a simple check based on the current path structure
    const path = window.location.pathname;
    return path.includes('/pages/') ? '../' : './';
}

function injectNavbar() {
    const rootPath = getRootPath();
    // To handle the "is-active" state or specific links, we could add more logic here.
    const isActive = rootPath === './' ? 'is-active' : '';
    const homeLink = rootPath + "index.html";

    const navbarHTML = `
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="${homeLink}">
                    <span class="icon is-large">
                        <i class="fas fa-robot fa-lg"></i>
                    </span>
                    <span class="has-text-weight-bold is-size-4 ml-2">QAPlay</span>
                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
                    data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item ${isActive}" href="${homeLink}">
                        Home
                    </a>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="button is-primary" href="https://github.com/avantgardian/QAPlay" target="_blank">
                                <span class="icon">
                                    <i class="fab fa-github"></i>
                                </span>
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    `;

    // Inject into placeholder if exists, otherwise prepend to body
    const placeholder = document.getElementById('navbar-placeholder');
    if (placeholder) {
        placeholder.innerHTML = navbarHTML;
    } else {
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    }
}

function injectFooter() {
    const footerHTML = `
    <footer class="footer has-background-dark has-text-white">
        <div class="content has-text-centered">
            <p>
                <strong>QAPlay</strong> by Avantgardian. The source code is licensed
                <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            </p>
        </div>
    </footer>
    `;

    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
        placeholder.innerHTML = footerHTML;
    } else {
        // Append to body if no placeholder
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
}

function initNavbarBurger() {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
}
