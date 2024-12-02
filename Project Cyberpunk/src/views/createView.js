// import { html } from "../../lib/lit-html.js";
import { html } from "../../node_modules/lit-html/lit-html.js"
import { post } from "../data/api.js";
import { showError } from "./showError.js";

const template = (onCreate) => html`
<section id="create">
          <div class="form form-item">
            <h2>Share Your item</h2>
            <form class="create-form" @submit=${onCreate} >
              <input type="text" name="item" id="item" placeholder="Item" />
              <input type="text" name="imageUrl" id="item-image" placeholder="Your item Image URL"
              />
              <input type="text" name="price" id="price" placeholder="Price in Euro"
              />
              <input type="text" name="availability" id="availability" placeholder="Availability Information"
              />
              <input type="text" name="type" id="type" placeholder="Item Type"
              />
              <textarea id="description" name="description" placeholder="More About The Item" rows="10" cols="50"
              ></textarea>
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

        await post('/data/cyberpunk', data);
        ctx.page.redirect('/dashboard');

    }
}

