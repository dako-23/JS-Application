// import { html } from "../../lib/lit-html.js";
import { html } from "../../node_modules/lit-html/lit-html.js"
import { post } from "../data/api.js";
// import { showError } from "./showError.js";

const template = (onCreate) => html`

`

export function createView(ctx) {

    ctx.render(template(onCreate));

    async function onCreate(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        const product = {
            type: data.type.trim(),
            imageUrl: data['image-url'].trim(),
            description: data.description.trim(),
            userType: data['user-type'].trim()
        };

        if (Object.values(product).some((x) => !x)) {
            return window.alert("All fields are required!");
        }

        await post('/data/NaN', product);
        ctx.page.redirect('/dashboard');

    }
}

