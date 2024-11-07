import createPage from "./views/create.js";
import homePage from "./views/home.js";
import loginPage from "./views/login.js";
import logoutPage from "./views/logout.js";
import registerPage from "./views/register.js";
import { renderNavigation } from "./views/navigation.js";

const pathnameViews = {
    '/': homePage,
    '/login': loginPage,
    '/register': registerPage,
    '/create': createPage,
    '/logout': logoutPage,
};

function initNavigation() {
    const navElement = document.querySelector('header nav');

    navElement.addEventListener('click', (e) => {
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
