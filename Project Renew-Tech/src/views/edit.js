import { html } from 'https://unpkg.com/lit-html';
import { put, get } from '../data/api.js';


const template = (onEdit, products) => html`
<section id="edit">
        <div @submit=${onEdit} class="form">
            <img class="border" src=${products.image} alt="" />
            <h2>Edit Solution</h2>
            <form class="edit-form">
                <input type="text" name="type" id="type" placeholder="Solution Type" value="${products.type}" />
                <input type="text" name="image" id="image-url" placeholder="Image URL" value="${products.image}" />
                <textarea id="description" name="description" placeholder="Description" rows="2" cols="10">${products.description}</textarea>
                <textarea id="more-info" name="more" placeholder="more Info" rows="2" cols="10">${products.more}</textarea>
                <button type="submit">Edit</button>
            </form>
        </div>
    </section>
`
export async function editView(ctx) {

    const { productId } = ctx.params
    const product = await get(`/data/solutions/${productId}`)

    ctx.render(template(onEdit, product));

    async function onEdit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        if (data.type === '' || data.image === '' || data.description === '' || data.more === '') return;

        try {
            await put(`/data/solutions/${productId}`, data);

            ctx.page.redirect('/');
        } catch (err) {
            console.log(err);
        }
    }

}