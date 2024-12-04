import { html, nothing } from "../../lib/lit-html.js";
import { get, del } from "../data/api.js";
import { getLikesCount } from '../data/api.js'
import { hasUserLiked } from '../data/api.js'
import onLike from "./like.js";

const template = (product, isOwner, hasUser, likes, userLiked) => html`
<section id="details">
        <div id="details-wrapper">
          <img id="details-img" src="${product.imageUrl}" alt="example1" />
          <div>
            <div id="info-wrapper">
              <p id="details-type">${product.type}</p>
              <div id="details-description">
                <p id="user-type">${product.userType}</p>
                <p id="description">
                ${product.description}
                </p>
              </div>
              <h3>Like tattoo:<span id="like">${likes}</span></h3>
              <div id="action-buttons">
                 ${isOwner
                       ? html`
                      <a href="/edit/${product._id}" id="edit-btn">Edit</a>
                      <a href="/delete/${product._id}" id="delete-btn">Delete</a>`
                      : hasUser && !userLiked
                      ? html`<a href="javascript:void(0)" @click=${() => onLike(product._id)} id="like-btn">Like</a>`
                      : nothing}
                <!--Bonus - Only for logged-in users ( not authors )-->
                </div>
              </div>
            </div>
          </div>
        </div>
</section>
`


export async function detailsView(ctx) {
    const { itemId } = ctx.params

    const product = await get(`/data/tattoos/${itemId}`)

    const userId = ctx.userData ? ctx.userData.id : null;
    const likes = await getLikesCount(itemId);
    const userLiked = userId ? await hasUserLiked(itemId, userId) : false;

    const ownerId = product._ownerId;
    const isOwner = ctx.userData && ctx.userData.id === ownerId;
    const hasUser = Boolean(ctx.userData);


    ctx.render(template(product, isOwner, hasUser, likes, userLiked));

}

export async function deleteProduct(ctx) {

    const isConfirmed = confirm('siguren li si brat')
    if (isConfirmed) {
        const { itemId } = ctx.params

        await del(`/data/tattoos/${itemId}`)
        ctx.page.redirect('/dashboard');
    }
}