import { html, nothing } from "../../lib/lit-html.js";
import { put, get } from "../data/api.js";
// import { showError } from "./showError.js";

const template = (onEdit, product) => html`
<section id="edit">
          <div class="form" @submit=${onEdit}>
            <h2>Edit Show</h2>
            <form class="edit-form">
              <input type="text" name="title" id="title" placeholder="TV Show title" value="${product.title}"
              />
              <input type="text" name="image-url" id="image-url" placeholder="Image URL" value="${product.imageUrl}"
              />
              <input type="text" name="genre" id="genre" placeholder="Genre" value="${product.genre}"
              />
            <input type="text" name="country" id="country" placeholder="Country" value="${product.country}"
          />
              <textarea id="details" name="details" placeholder="Details" rows="2" cols="10"
              >${product.details}</textarea>
              <button type="submit">Edit Show</button>
            </form>
          </div>
        </section>
`

export async function editView(ctx) {

  const { itemId } = ctx.params
  const product = await get(`/data/shows/${itemId}`)

  ctx.render(template(onEdit, product));

  async function onEdit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const product = {
      title: data.title.trim(),
      imageUrl: data["image-url"].trim(),
      genre: data.genre.trim(),
      country: data.country.trim(),
      details: data.details.trim()
    };

    if (Object.values(product).some((x) => !x)) {
      // return showError("All fields are required!");
      return window.alert('All fields are required!')
    }

    await put(`/data/shows/${itemId}`, data);
    ctx.page.redirect(`/dashboard/${itemId}/details`);

  }
}

