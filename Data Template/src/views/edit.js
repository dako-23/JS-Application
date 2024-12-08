import { html, nothing } from "../../lib/lit-html.js";
import { put, get } from "../data/api.js";
// import { showError } from "./showError.js";

const template = (onEdit, product) => html`

`

export async function editView(ctx) {

  const { itemId } = ctx.params
  const product = await get(`/data/NaN/${itemId}`)

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

    await put(`/data/NaN/${itemId}`, product);
    ctx.page.redirect(`/details/${itemId}`);

  }

}

