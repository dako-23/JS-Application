import { html, render } from "../../lib/lit-html.js";

const template = (hasUser) => html`
 
            <a id="logo" href="/"><img id="logo" src="./images/logo2.png" alt="img" /></a>
            <nav>
                <div>
                    <a href="/dashboard">Marketplace</a>
                </div>
     ${hasUser ? html`
       <!-- Logged-in users -->
                <div class="user">
                    <a href="/create">Sell</a>
                    <a href="/logout">Logout</a>
                </div>
       `: html`
       <!-- Guest users -->
                <div class="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
       `}   
        </nav>
`

export function naviView(ctx, next) {
    const userData = ctx.userData;

    render(template(userData), document.querySelector('#navi'));

    next();
}


