// import { html } from "../../lib/lit-html.js";
import { html } from "../../node_modules/lit-html/lit-html.js"
import { post } from "../data/api.js";
// import { showError } from "./showError.js";

const template = (onCreate) => html`
<section id="create">
        <div class="form">
          <h2>Add tattoo</h2>
          <form class="create-form" @submit=${onCreate}>
            <input type="text" name="type" id="type" placeholder="Tattoo Type" />
            <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
            <textarea id="description" name="description" placeholder="Description" rows="2" cols="10"></textarea>
            <select id="user-type" name="user-type">
              <option value="" disabled selected>Select your role</option>
              <option value="Tattoo Artist">Tattoo Artist</option>
              <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
              <option value="First Time in Tattoo">
                First Time in Tattoo
              </option>
              <option value="Tattoo Collector">Tattoo Collector</option>
            </select>
            <button type="submit">Add tattoo</button>
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
            type: data.type.trim(),
            imageUrl: data['image-url'].trim(),
            description: data.description.trim(),
            userType: data['user-type'].trim()
        };

        if (Object.values(product).some((x) => !x)) {
            return window.alert("All fields are required!");
        }

        await post('/data/tattoos', product);
        ctx.page.redirect('/dashboard');

    }
}

