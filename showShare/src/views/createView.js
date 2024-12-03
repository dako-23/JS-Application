// import { html } from "../../lib/lit-html.js";
import { html } from "../../node_modules/lit-html/lit-html.js"
import { post } from "../data/api.js";
// import { showError } from "./showError.js";

const template = (onCreate) => html`
<section id="create">
          <div class="form">
            <h2>Add Show</h2>
        <form class="create-form" @submit=${onCreate} >
               <input type="text" name="title" id="title" placeholder="TV Show title" />
               <input type="text" name="image-url" id="imageUrl" placeholder="Image URL" />
               <input type="text" name="genre" id="genre" placeholder="Genre" />
               <input type="text" name="country" id="country" placeholder="Country"/>
             <textarea id="details" name="details" placeholder="Details" rows="2" cols="10"></textarea>
              <button type="submit">Add Show</button>
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

        const product = {
            title: data.title.trim(),
            imageUrl: data["image-url"].trim(),
            genre: data.genre.trim(),
            country: data.country.trim(),
            details: data.details.trim()
        };
        
        if (Object.values(product).some((x) => !x)) {
            
            return window.alert("All fields are required!")
        }

        await post('/data/shows', product);
        ctx.page.redirect('/dashboard');
    }
}

