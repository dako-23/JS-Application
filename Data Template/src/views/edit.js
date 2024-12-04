import { html, nothing } from "../../lib/lit-html.js";
import { put, get } from "../data/api.js";
// import { showError } from "./showError.js";

const template = (onEdit, product) => html`
<section id="edit">
        <div class="form" @submit=${onEdit}>
          <h2>Edit tattoo</h2>
          <form class="edit-form">
            <input type="text" name="type" id="type" placeholder="Tattoo Type" value=${product.type} />
            <input type="text" name="image-url" id="image-url" placeholder="Image URL" value=${product.imageUrl} />
            <textarea id="description" name="description" placeholder="Description" rows="2" cols="10">${product.description}</textarea>
            <select id="user-type" name="user-type">
              <option value="" disabled selected>Select your role</option>
              <option value="Tattoo Artist" ?selected=${product.userType === "Tattoo Artist"}>Tattoo Artist</option>
              <option value="Tattoo Enthusiast" ?selected=${product.userType === "Tattoo Enthusiast"}>Tattoo Enthusiast</option>
              <option value="First Time in Tattoo" ?selected=${product.userType === "First Time in Tattoo"}>First Time in Tattoo</option>
              <option value="Tattoo Collector" ?selected=${product.userType === "Tattoo Collector"}>Tattoo Collector</option>
</select>
            <button type="submit">Edit</button>
          </form>
        </div>
      </section>
`

export async function editView(ctx) {

  const { itemId } = ctx.params
  const product = await get(`/data/tattoos/${itemId}`)

  ctx.render(template(onEdit, product));

  async function onEdit(event) {
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
      // return showError("All fields are required!");
      return window.alert('All fields are required!');
    }

    await put(`/data/tattoos/${itemId}`, product);
    ctx.page.redirect(`/details/${itemId}`);

  }

}

