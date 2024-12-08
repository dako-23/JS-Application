import { html, nothing } from "../../lib/lit-html.js";
import { get, del } from "../data/api.js";


const template = (product, isOwner) => html`
<section id="details">
        <div id="details-wrapper">
          <div>
            <img id="details-img" src=${product.imageUrl} alt="example1" />
            <p id="details-model">${product.model}</p>
          </div>
          <div id="info-wrapper">
            <div id="details-description">
              <p class="details-price">Price: €${product.price}</p>
              <p class="details-condition">Condition: ${product.condition}</p>
              <p class="details-weight">Weight: ${product.weight}g</p>
              <p class="drone-description">
              ${product.description}
              </p>
              <p class="phone-number">Phone: ${product.phone}</p>
            </div>
            <!--Edit and Delete are only for creator-->
            <div class="buttons">
            ${isOwner ? html`
            <a href="/edit/${product._id}" id="edit-btn">Edit</a>
            <a href="/delete/${product._id}" id="delete-btn">Delete</a>` : nothing}
            </div>
          </div>
        </div>
</section>
`
export async function detailsView(ctx) {
    const { itemId } = ctx.params

    const product = await get(`/data/drones/${itemId}`)

    const ownerId = product._ownerId;
    const isOwner = ctx.userData && ctx.userData.id === ownerId;
    
    ctx.render(template(product, isOwner));

}

export async function deleteProduct(ctx) {

    const isConfirmed = confirm('Are you sure?')
    if (isConfirmed) {
        const { itemId } = ctx.params

        await del(`/data/drones/${itemId}`)
        ctx.page.redirect('/dashboard');
    }
}