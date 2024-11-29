import { html } from "../../lib/lit-html.js";
import { get } from "../data/api.js";

const template = (data) => html`
<h3 class="heading">Market</h3>
  <section id="dashboard">
    ${data.length == 0
        ? html`<h3 class="empty">No Items Yet</h3>`
        : data.map(res => html`<div class="item">
            <img src="${res.imageUrl}" alt="example1" />
            <h3 class="model">${res.item}</h3>
            <div class="item-info">
              <p class="price">Price: €${res.price}</p>
              <p class="availability">
                ${res.availability}
              </p>
              <p class="type">Type: ${res.type}</p>
            </div>
            <a class="details-btn" href="/details/${res._id}">Uncover More</a>
    </div>`)}
`

export async function dashboardView(ctx) {

    try {
        const data = await get('/data/cyberpunk?sortBy=_createdOn%20desc');
        ctx.render(template(data))

    } catch (err) {
        err.handled = true
        ctx.render(template([]))
    }

}