// import { html } from "../../lib/lit-html.js";
import { html } from "../../node_modules/lit-html/lit-html.js"
import { post } from "../data/api.js";
// import { showError } from "./showError.js";

const template = (onCreate) => html`
@submit=${onCreate}
`

export function createView(ctx) {

    ctx.render(template(onCreate));

    async function onCreate(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        const product = {
            item: data.item.trim(),
            imageUrl: data.imageUrl.trim(),
            price: data.price.trim(),
            availability: data.availability.trim(),
            type: data.type.trim(),
            description: data.description.trim()
        };

        if (Object.values(product).some((x) => !x)) {
            return showError("All fields are required!");
        }

        await post('/data/.......', data);
        ctx.page.redirect('/dashboard');
    }
}

