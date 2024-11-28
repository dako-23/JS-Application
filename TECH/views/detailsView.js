import { html, nothing } from '../lib/lit-html.js'
import { get } from '../data/api.js'
import onLike from './like.js'
import { getLikesCount } from '../data/api.js'
import { hasUserLiked } from '../data/api.js'

const template = ({ product, isOwner, hasUser, likes, userLiked }) => html`
<section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${product['image-url']} alt="example1" />
            <div>
                <p id="details-type">${product.type}</p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <p id="description">
                        ${product.description}
                        </p>
                        <p id="more-info">
                        ${product['more-info']}
                        </p>
                    </div>
                </div>
                <h3>Like Solution:<span id="like">${likes}</span></h3>
                <div id="action-buttons">
                ${isOwner
        ? html`
                      <a href="/edit/${product._id}" id="edit-btn">Edit</a>
                      <a href="/delete/${product._id}" id="delete-btn">Delete</a>`
        : hasUser && !userLiked
            ? html`<a href="javascript:void(0)" @click=${() => onLike(product._id)} id="like-btn">Like</a>`
            : nothing}
                </div>
            </div>
        </div>
    </section>
`

export async function detailsView(ctx) {
    const { productId } = ctx.params

    const product = await get(`/data/solutions/${productId}`)

    const userId = ctx.userData ? ctx.userData.id : null;
    const likes = await getLikesCount(productId);
    const userLiked = userId ? await hasUserLiked(productId, userId) : false;

    const ownerId = product._ownerId;
    const isOwner = ctx.userData && ctx.userData.id === ownerId;
    const hasUser = Boolean(ctx.userData);

    ctx.render(template({ product, isOwner, hasUser, likes, userLiked }));
}