import { html, nothing } from "../../lib/lit-html.js";
import { get } from "../data/api.js";

const template = (data) => html`
<h3 class="heading">Marketplace</h3>
      <section id="dashboard">
        ${data.map(item => html`
        <div class="drone">
          <img src=${item.imageUrl} alt="example1" />
          <h3 class="model">${item.model}</h3>
          <div class="drone-info">
            <p class="price">Price: €${item.price}</p>
            <p class="condition">Condition: ${item.condition}</p>
            <p class="weight">Weight: ${item.weight}</p>
          </div>
          <a class="details-btn" href="/details/${item._id}">Details</a>
        </div>`)}
        ${data.length == 0 ? html`<h3 class="no-drones">No Drones Available</h3>` : nothing}
        </section>
`

export async function dashboardView(ctx) {

    try {
        const data = await get('/data/drones?sortBy=_createdOn%20desc');
        console.log(data);
        ctx.render(template(data))

    } catch (err) {
        err.handled = true
        ctx.render(template([]))
    }

}