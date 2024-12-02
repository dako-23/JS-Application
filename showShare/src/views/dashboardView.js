import { html } from "../../lib/lit-html.js";
import { get } from "../data/api.js";

const template = (data) => html`
<h2>Users Recommendations</h2>
        <section id="shows">
          ${data.map(item => html`
            <div class="show">
            <img src="${item.imageUrl}" alt="${item.title}" />
            <div class="show-info">
              <h3 class="title">${item.title}</h3>
              <p class="genre">Genre: ${item.genre}</p>
              <p class="country-of-origin">Country of Origin: ${item.country}</p>
              <a class="details-btn" href="/dashboard/${item._id}/details">Details</a>
            </div>
          </div>`)}
        </section>
       ${data.length == 0 ? html`<h2 id="no-show">No shows Added.</h2>` : ''}
`
export async function dashboardView(ctx) {

    try {
        const data = await get('/data/shows?sortBy=_createdOn%20desc');
        console.log(data);

        ctx.render(template(data))

    } catch (err) {
        err.handled = true
        ctx.render(template([]))
    }
}