import { html, render } from 'https://unpkg.com/lit-html';


const template = (hasUser) => html`
<a id="logo" href="/"
          ><img id="logo-img" src="./images/logo2.png" alt="logo"/>
        </a>
        <nav>
          <div>
            <a href="/dashboard">Solutions</a>
          </div>
          ${hasUser
        ?
        html`
          <div class="user">
            <a href="/create">Add Solution</a>
            <a href="/logout">Logout</a>
          </div>
          `
        : html`
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