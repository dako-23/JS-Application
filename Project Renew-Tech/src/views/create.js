import { html } from 'https://unpkg.com/lit-html';
import { post } from '../data/api.js';

const template = (onCreate) => html`
<section id="create">
    <div class="form">
            <img class="border" src="./images/border.png" alt="" />
            <h2>Add Solution</h2>
        <form @submit=${onCreate} class="create-form">
                <input type="text" name="type" id="type" placeholder="Solution Type" />
                <input type="text" name="image" id="image-url" placeholder="Image URL" />
                <textarea id="description" name="description" placeholder="Description" rows="2" cols="10"></textarea>
                <textarea id="more-info" name="more" placeholder="more Info" rows="2" cols="10"></textarea>
                <button type="submit">Add Solution</button>
        </form>
    </div>
</section>
`

export function createView(ctx) {

    ctx.render(template(onCreate));

    async function onCreate(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        if (data.type === '' || data.image === '' || data.description === '' || data.more === '') return;

        try {
            await post('/data/solutions', data);
            ctx.page.redirect('/');
        } catch (err) {
            console.log(err);
        }
    }
}