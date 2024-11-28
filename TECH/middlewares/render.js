import { render } from "../lib/lit-html.js";

export function addRender(root) {
    return function (ctx, next) {
        ctx.render = (templateResult) => render(templateResult, root);

        next();
    };
}