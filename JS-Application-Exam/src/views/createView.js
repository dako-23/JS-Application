// import { html } from "../../lib/lit-html.js";
import { html } from "../../node_modules/lit-html/lit-html.js"
import { post } from "../data/api.js";
import { showError } from "./showError.js";

const template = (onCreate) => html`
<section id="create">
        <div class="form form-item">
          <h2>Add Drone Offer</h2>
          <form class="create-form" @submit=${onCreate}>
            <input type="text" name="model" id="model" placeholder="Drone Model" />
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
            <input type="number" name="price" id="price" placeholder="Price" />
            <input type="number" name="weight" id="weight" placeholder="Weight" />
            <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" />
            <input type="text" name="condition" id="condition" placeholder="Condition" />
            <textarea name="description" id="description" placeholder="Description"></textarea>
            <button type="submit">Add</button>
          </form>
        </div>
</section>
`

export function createView(ctx) {

    ctx.render(template(onCreate));

    async function onCreate(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        const product = {
            model: data.model.trim(),
            imageUrl: data.imageUrl.trim(),
            price: data.price.trim(),
            weight: data.weight.trim(),
            phone: data.phone.trim(),
            condition: data.condition.trim(),
            description: data.description.trim()
        };

        if (Object.values(product).some((x) => !x)) {
            // return window.alert("All fields are required!");
            return showError("All fields are required!");
        }

        await post('/data/drones', product);
        ctx.page.redirect('/dashboard');

    }
}

