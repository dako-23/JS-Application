import { html, nothing } from "../../lib/lit-html.js";
import { get, del } from "../data/api.js";

const template = (product, isOwner) => html`
`


export async function detailsView(ctx) {
    const { itemId } = ctx.params

    const product = await get(`/data/....../${itemId}`)

    const ownerId = product._ownerId;
    const isOwner = ctx.userData && ctx.userData.id === ownerId;

    ctx.render(template(product, isOwner));
}

export async function deleteProduct(ctx) {

    const isConfirmed = confirm('siguren li si brat')
    if (isConfirmed) {
        const { itemId } = ctx.params

        await del(`/data/......./${itemId}`)
        ctx.page.redirect('/dashboard');
    }
}