import { html, render } from "../../lib/lit-html.js";

const template = (hasUser) => html`

`

export function naviView(ctx, next) {
    const userData = ctx.userData;

    render(template(userData), document.querySelector('#navi'));

    next();
}


