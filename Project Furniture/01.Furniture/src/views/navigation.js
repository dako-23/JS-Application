import { html, render } from 'https://unpkg.com/lit-html';

const headerSection = document.querySelector('.site-header');

const template = (isAuthenticated) => html`
    <h1><a href="/">Furniture Store</a></h1>
        <nav>
            <a id="catalogLink" href="/" class="active">Dashboard</a>
    ${isAuthenticated
        ? html`
           <div id="user">
                <a id="createLink" href="create">Create Furniture</a>
                <a id="profileLink" href="my-furniture">My Publications</a>
                <a id="logoutBtn" href="logout">Logout</a>
            </div>
            `
        : html`<div id="guest">
                <a id="loginLink" href="login">Login</a>
                <a id="registerLink" href="register">Register</a>
            </div>`}
        </nav>
`;

export function renderNavigation(ctx, next) {
    const email = localStorage.getItem('email');
    const isAuthenticated = !!email;

    render(template(isAuthenticated), headerSection);

    next();
}
