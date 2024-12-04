import { html, render } from "../../lib/lit-html.js";

const template = (hasUser) => html`
<!-- Navigation -->
<a id="logo" href="/"
          ><img id="logo-img" src="./images/logo.png" alt="logo" />
        </a>
    <nav>
          <a href="/dashboard">Collection</a>
${hasUser
        ?
        html`
    <!-- Logged-in users -->
    <div class="user">
            <a href="/create">Add Tattoo</a>
            <a id="logout" href="/logout">Logout</a>
    </div>`
        :
        html`
    <!-- Guest users -->
    <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
    </div>`}
    </nav>
`

export function naviView(ctx, next) {
    const userData = ctx.userData;

    render(template(userData), document.querySelector('#navi'));

    next();
}


