import { html, nothing } from "../../lib/lit-html.js";
import { put, get } from "../data/api.js";
// import { showError } from "./showError.js";

const template = (onEdit, product) => html`

`

export async function editView(ctx) {

  const { itemId } = ctx.params
  const product = await get(`/data/....../${itemId}`)

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
      // return showError("All fields are required!");

    }

    await put(`/data/...../${itemId}`, data);
    ctx.page.redirect(`/details/${itemId}`);

  }

}

