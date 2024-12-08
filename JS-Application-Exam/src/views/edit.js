import { html, nothing } from "../../lib/lit-html.js";
import { put, get } from "../data/api.js";
import { showError } from "./showError.js";

const template = (onEdit, product) => html`
<section id="edit">
        <div class="form form-item">
          <h2>Edit Offer</h2>
          <form class="edit-form" @submit=${onEdit}>
            <input type="text" name="model" id="model" value="${product.model}" placeholder="Drone Model" />
            <input type="text" name="imageUrl" id="imageUrl" value="${product.imageUrl}" placeholder="Image URL" />
            <input type="number" name="price" id="price" value="${product.price}" placeholder="Price" />
            <input type="number" name="weight" id="weight" value="${product.weight}" placeholder="Weight" />
            <input type="number" name="phone" id="phone" value="${product.phone}" placeholder="Phone Number for Contact" />
            <input type="text" name="condition" id="condition" value="${product.condition}" placeholder="Condition" />
            <textarea name="description" id="description" placeholder="Description">${product.description}</textarea>
            <button type="submit">Edit</button>
          </form>
        </div>
</section>
`

export async function editView(ctx) {

  const { itemId } = ctx.params
  const product = await get(`/data/drones/${itemId}`)

  ctx.render(template(onEdit, product));

  async function onEdit(event) {
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
      return showError("All fields are required!");
      // return window.alert('All fields are required!');
    }

    await put(`/data/drones/${itemId}`, product);
    ctx.page.redirect(`/details/${itemId}`);

  }

}

