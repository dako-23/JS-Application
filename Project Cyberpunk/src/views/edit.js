import { html, nothing } from "../../lib/lit-html.js";
import { put, get } from "../data/api.js";
import { showError } from "./showError.js";

const template = (onEdit, product) => html`
<section id="edit">
          <div class="form form-item">
            <h2>Edit Your Item</h2>
            <form class="edit-form" @submit=${onEdit} >
              <input type="text" name="item" id="item" placeholder="Item" value="${product.item}" />
              <input type="text" name="imageUrl" id="item-image" placeholder="Your item Image URL" value="${product.imageUrl}"
              />
              <input type="text" name="price" id="price" placeholder="Price in Euro" value="${product.price}"
              />
              <input type="text" name="availability" id="availability" placeholder="Availability Information" value="${product.availability}"
              />
              <input type="text" name="type" id="type" placeholder="Item Type" value="${product.type}" 
              />
              <textarea id="description" name="description" placeholder="More About The Item" rows="10" cols="50"
              > ${product.description}</textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`

export async function editView(ctx) {

  const { itemId } = ctx.params
  const product = await get(`/data/cyberpunk/${itemId}`)

  ctx.render(template(onEdit, product));

  async function onEdit(event) {
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

    await put(`/data/cyberpunk/${itemId}`, data);
    ctx.page.redirect(`/details/${itemId}`);

  }

}

