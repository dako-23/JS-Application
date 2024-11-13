import createPage from "./views/create.js";
import catalogPage from "./views/catalog.js";
import loginPage from "./views/login.js";
import logoutPage from "./views/logout.js";
import registerPage from "./views/register.js";
import { renderNavigation } from "./views/navigation.js";
import homePage from "./views/home.js";

const pathnameViews = {
    '/': homePage,
    '/catalog': catalogPage,
    '/login': loginPage,
    '/register': registerPage,
    '/create': createPage,
    '/logout': logoutPage,
};

function initNavigation() {
    // Not optimal but it woks
    const bodyElement = document.querySelector('body');

    bodyElement.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
            return;
        }

        e.preventDefault();

        const url = new URL(e.target.href);
        const pathname = url.pathname;

        // hide all sections
        document
            .querySelectorAll('.site-section')
            .forEach(section => section.style.display = 'none');

        pathnameViews[pathname]();
    });
    
    pathnameViews['/']();
    renderNavigation();
}

initNavigation()
