import { html, nothing } from "../../lib/lit-html.js";
import { get, del } from "../data/api.js";

const template = (item, isOwner) => html`
<section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${item.imageUrl}" alt="${item.title}" />
        <div id="details-text">
              <p id="details-title">${item.title}</p>
              <div id="info-wrapper">
                <div id="description">
                  <p id="details-description">
                  ${item.details}
                  </p>
                </div>
              </div>
              ${isOwner 
              ? 
              html`<div id="action-buttons">
                <a href="/dashboard/${item._id}/edit" id="edit-btn">Edit</a>
                <a href="/dashboard/${item._id}/delete" id="delete-btn">Delete</a>
              </div>`
              : ''}
        </div>
    </div>        
</section>`

export async function detailsView(ctx) {
    const { itemId } = ctx.params

    const item = await get(`/data/shows/${itemId}`)

    const ownerId = item._ownerId;
    const isOwner = ctx.userData && ctx.userData.id === ownerId;

    ctx.render(template(item, isOwner));
}

export async function deleteProduct(ctx) {

    const isConfirmed = confirm('siguren li si brat')
    if (isConfirmed) {
        const { itemId } = ctx.params

        await del(`/data/shows/${itemId}`)
        ctx.page.redirect('/dashboard');
    }
}