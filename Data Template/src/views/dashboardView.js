import { html, nothing } from "../../lib/lit-html.js";
import { get } from "../data/api.js";

const template = (data) => html`
`

export async function dashboardView(ctx) {

    try {
        const data = await get('/data/NaN?sortBy=_createdOn%20desc');
        console.log(data);
        ctx.render(template(data))

    } catch (err) {
        err.handled = true
        ctx.render(template([]))
    }

}