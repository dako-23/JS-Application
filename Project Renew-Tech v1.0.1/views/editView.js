import { html } from '../lib/lit-html.js'
import { put, get } from '../data/api.js'

const template = (onEdit, products) => html`
<section id="edit">
        <div @submit=${onEdit} class="form">
            <img class="border" src=${products.imageUrl} alt="" />
            <h2>Edit Solution</h2>
            <form class="edit-form">
                <input type="text" name="type" id="type" placeholder="Solution Type" value="${products.type}" />
                <input type="text" name="image-url" id="image-url" placeholder="Image URL" value="${products.imageUrl}" />
                <textarea id="description" name="description" placeholder="Description" rows="2" cols="10">${products.description}</textarea>
                <textarea id="more-info" name="more-info" placeholder="more Info" rows="2" cols="10">${products.learnMore}</textarea>
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

        const solution = {
            type: data.type.trim(),
            imageUrl: data['image-url'].trim(),
            description: data.description.trim(),
            learnMore: data['more-info'].trim(),
        };

        if (Object.values(solution).some((x) => !x)) {
            return alert("All fields are required!");
        }

        await put(`/data/solutions/${productId}`, solution);
        ctx.page.redirect(`/details/${productId}`);

    }

}