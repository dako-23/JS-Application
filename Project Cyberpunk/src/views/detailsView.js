import { html, nothing } from "../../lib/lit-html.js";
import { get, del } from "../data/api.js";

const template = (product, isOwner) => html`
<section id="details">
          <div id="details-wrapper">
            <div>
              <img id="details-img" src="${product.imageUrl}" alt="example1" />
              <p id="details-title">${product.item}</p>
            </div>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="details-price">Price: €${product.price}</p>
                <p class="details-availability">
                ${product.availability}
                </p>
                <p class="type">Type: ${product.type}</p>
                <p id="item-description">
                 ${product.description}
                </p>
              </div>
              ${isOwner ? html`
              <div id="action-buttons">
                <a href="/edit/${product._id}" id="edit-btn">Edit</a>
                <a href="/delete/${product._id}" id="delete-btn">Delete</a>
              </div>` : nothing}
            </div>
          </div>
</section>
`

export async function detailsView(ctx) {
    const { itemId } = ctx.params

    const product = await get(`/data/cyberpunk/${itemId}`)

    const ownerId = product._ownerId;
    const isOwner = ctx.userData && ctx.userData.id === ownerId;

    ctx.render(template(product, isOwner));
}

export async function deleteProduct(ctx) {

    const isConfirmed = confirm('siguren li si brat')
    if (isConfirmed) {
        const { itemId } = ctx.params

        await del(`/data/cyberpunk/${itemId}`)
        ctx.page.redirect('/dashboard');
    }
}