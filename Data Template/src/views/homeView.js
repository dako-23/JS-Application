import { html } from "../../lib/lit-html.js";

const template = (hasUser) => html`

`

export function homeView(ctx) {
    const userData = ctx.userData;

    ctx.render(template(userData));
}
