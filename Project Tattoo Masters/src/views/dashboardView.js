import { html, nothing } from "../../lib/lit-html.js";
import { get } from "../data/api.js";

const template = (data) => html`
<h2>Collection</h2>
      <section id="tattoos">
       ${data.map(item => html`
        <div class="tattoo">
          <img src=${item.imageUrl} alt="example1" />
          <div class="tattoo-info">
            <h3 class="type">${item.type}</h3>
            <span>Uploaded by </span>
            <p class="user-type">${item.userType}</p>
            <a class="details-btn" href="/details/${item._id}">Learn More</a>
          </div>
        </div>`)}
      </section>
      ${data.length == 0 ? html`
      <h2 id="no-tattoo">Collection is empty, be the first to contribute</h2>` : nothing}`

export async function dashboardView(ctx) {

    try {
        const data = await get('/data/tattoos?sortBy=_createdOn%20desc');
        console.log(data);
        ctx.render(template(data))

    } catch (err) {
        err.handled = true
        ctx.render(template([]))
    }

}