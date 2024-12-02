import { html, render } from "../../lib/lit-html.js";

const template = (hasUser) => html`
<a id="logo" href="/"
          ><img id="logo-img" src="./images/show_logo.png" alt="logo" />
        </a>
    <nav>
          <div>
            <a href="/dashboard">TV Shows</a>
            <a href="/search">Search</a>
          </div>

          ${hasUser
        ?
        html`
        <div class="user">
            <a href="create">Add Show</a>
            <a href="logout">Logout</a>
        </div>
          ` :
        html`
        <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>`
    }
    </nav>
`
export function naviView(ctx, next) {
    const userData = ctx.userData;

    render(template(userData), document.querySelector('#navi'));

    next();
}


